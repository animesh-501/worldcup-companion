export function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
      <div className="h-full rounded-full bg-coral transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}
