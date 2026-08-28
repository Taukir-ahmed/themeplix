export interface Wallpaper {
  id: string;
  title: string;
  /** Small WebP used in grids — never the full file. */
  thumbUrl: string;
  /** Phone-sized JPEG (1080x1920 max). The web never serves anything larger. */
  fullUrl: string;
  categorySlug: string;
  /** height / width. Drives the masonry grid before images load. */
  aspectRatio: number;
  premium: boolean;
  /** Real download counter. */
  downloads: number;
  /** Head start on the displayed count; UI shows downloadsSeed + downloads. */
  downloadsSeed?: number;
  downloadsLabel?: string | null;
}

export interface Category {
  slug: string;
  name: string;
  count: number;
  coverUrl: string;
}

export interface Page<T> {
  items: T[];
  page: number;
  hasMore: boolean;
}
