import { supabase } from './supabase';

/**
 * Affiliate "Shop" data layer.
 *
 * A flat list of { image, outbound link }, shown as a tappable grid at /styles.
 * Anon key only: RLS lets the site read active rows and call
 * increment_affiliate_clicks(), nothing else. Rows are managed from the admin
 * app with the service_role key.
 */

export interface AffiliateProduct {
  id: string;
  imageUrl: string;
  /** The outbound affiliate URL. */
  url: string;
}

type ProductRow = {
  id: string;
  image_url: string | null;
  url: string;
};

export async function fetchProducts(): Promise<AffiliateProduct[]> {
  const { data, error } = await supabase
    .from('affiliate_products')
    .select('id, image_url, url')
    .eq('is_active', true)
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false });

  if (error || !data) throw error ?? new Error('No products');

  return (data as ProductRow[])
    .filter((r) => r.image_url)
    .map((r) => ({ id: r.id, imageUrl: r.image_url as string, url: r.url }));
}

const RPC_CLICK_URL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/increment_affiliate_clicks`;

/**
 * Fire-and-forget click counter. Uses a raw `keepalive` fetch so the request
 * still completes after the browser starts navigating to the affiliate link
 * (supabase-js's rpc() would be cancelled mid-flight). A few lost clicks here
 * are fine — it only feeds ordering, never anything user-facing.
 */
export function recordAffiliateClick(productId: string): void {
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;
  try {
    void fetch(RPC_CLICK_URL, {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        apikey: anon,
        Authorization: `Bearer ${anon}`,
      },
      body: JSON.stringify({ product_id: productId }),
    }).catch(() => {});
  } catch {
    /* best-effort only */
  }
}
