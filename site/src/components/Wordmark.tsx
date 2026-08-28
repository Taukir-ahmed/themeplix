import { Link } from 'react-router-dom';

export default function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-2 ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-gradient font-display text-base font-bold text-white">
        T
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-text">
        Themeplix
      </span>
    </Link>
  );
}
