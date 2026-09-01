/**
 * FTC + Amazon Associates disclosure. Required wherever an affiliate link is
 * shown, so both /styles and /styles/:slug render it.
 */
export default function AffiliateDisclosure({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-faint ${className}`}>
      Some links on this page are affiliate links — if you buy through them
      Themeplix may earn a small commission, at no extra cost to you. As an Amazon
      Associate we earn from qualifying purchases.
    </p>
  );
}
