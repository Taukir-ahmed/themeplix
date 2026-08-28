import type { ReactNode } from 'react';

export default function StateView({
  title,
  body,
  action,
}: {
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md px-5 py-24 text-center">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      {body && <p className="mt-2 text-sm text-muted">{body}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
