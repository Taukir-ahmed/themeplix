import { useEffect, useRef } from 'react';

export default function InfiniteSentinel({
  onHit,
  disabled,
}: {
  onHit: () => void;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && onHit(),
      { rootMargin: '800px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onHit, disabled]);

  return <div ref={ref} className="h-px w-full" aria-hidden />;
}
