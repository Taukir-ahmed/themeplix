import { WEB_DOWNLOAD } from './config';

/**
 * Browser-side "web preview" download.
 *
 * Input is the small grid thumbnail, not the full file (the site never loads
 * the full file at all). This downscales to WEB_DOWNLOAD.maxEdge, re-encodes at
 * a low JPEG quality, and stamps a faint themeplix.app watermark. The result is
 * fine for a quick look and visibly soft on a real phone screen — the clean,
 * full-resolution wallpaper is an app-only download.
 *
 * If the canvas can't be read (a CORS-tainted image, an ancient browser) it
 * throws, and the caller falls back to nudging the visitor to the app.
 */

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not load image'));
    img.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Encode failed'))),
      'image/jpeg',
      quality
    );
  });
}

function stampWatermark(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const text = 'themeplix.app';
  const size = Math.max(11, Math.round(w * 0.032));
  ctx.font = `600 ${size}px Inter, system-ui, sans-serif`;
  ctx.textBaseline = 'bottom';
  ctx.textAlign = 'right';
  const pad = Math.round(size * 0.9);
  ctx.shadowColor = 'rgba(0,0,0,0.45)';
  ctx.shadowBlur = size * 0.5;
  ctx.fillStyle = 'rgba(255,255,255,0.72)';
  ctx.fillText(text, w - pad, h - pad);
  ctx.shadowBlur = 0;
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function downloadWebPreview(thumbUrl: string, id: string): Promise<void> {
  const img = await loadImage(thumbUrl);
  const srcW = img.naturalWidth || img.width;
  const srcH = img.naturalHeight || img.height;

  const scale = Math.min(WEB_DOWNLOAD.maxEdge / Math.max(srcW, srcH), 1);
  const w = Math.max(1, Math.round(srcW * scale));
  const h = Math.max(1, Math.round(srcH * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'medium';
  ctx.drawImage(img, 0, 0, w, h);

  if (WEB_DOWNLOAD.watermark) stampWatermark(ctx, w, h);

  const blob = await canvasToBlob(canvas, WEB_DOWNLOAD.quality);
  triggerBlobDownload(blob, `themeplix-${id}.jpg`);
}
