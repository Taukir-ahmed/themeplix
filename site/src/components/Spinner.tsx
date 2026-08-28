export default function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
      {label && <p className="text-sm">{label}</p>}
    </div>
  );
}
