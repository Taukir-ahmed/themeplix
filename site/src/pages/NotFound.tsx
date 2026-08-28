import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" />
      <div className="mx-auto max-w-md px-5 py-28 text-center">
        <p className="font-display text-6xl font-bold text-gradient">404</p>
        <h1 className="mt-4 font-display text-xl font-bold">This page drifted off screen</h1>
        <p className="mt-2 text-sm text-muted">
          The link may be old or mistyped.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-brand-gradient px-6 py-3 font-display text-sm font-bold text-white"
        >
          Back home
        </Link>
      </div>
    </>
  );
}
