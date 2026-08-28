import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type AppConfig = {
  instagram_url: string;
  website_url: string;
  maintenance_mode: string;
};

const DEFAULTS: AppConfig = {
  instagram_url: 'https://instagram.com/themeplix',
  website_url: 'https://themeplix.app',
  maintenance_mode: '0',
};

/** Mirrors hooks/useAppConfig.ts in the app — reads public app_config rows. */
export function useAppConfig() {
  const [config, setConfig] = useState<AppConfig>(DEFAULTS);

  useEffect(() => {
    let alive = true;
    supabase
      .from('app_config')
      .select('key, value')
      .then(({ data, error }) => {
        if (!alive || error || !data) return;
        const mapped = Object.fromEntries(data.map((r) => [r.key, r.value]));
        setConfig((prev) => ({ ...prev, ...mapped }));
      });
    return () => {
      alive = false;
    };
  }, []);

  return config;
}
