import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Fail loud in dev; on a misconfigured deploy the queries just error and the
  // UI shows its empty state.
  console.error('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing');
}

/**
 * Anon client — read-only, row-level-security enforced. This is the same public
 * key the phone app ships with. It can SELECT active wallpapers/categories and
 * call increment_downloads(), nothing else.
 */
export const supabase = createClient(url ?? 'http://localhost', anonKey ?? 'missing', {
  auth: { persistSession: false, autoRefreshToken: false },
});
