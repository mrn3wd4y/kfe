type Row = {
  label: string;
  value: string;
};

export function DataTable({ rows }: { rows: Row[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 border-t border-line/70">
      {rows.map((row) => (
        <div key={row.label} className="border-b border-line/70 py-4">
          <dt className="text-label uppercase tracking-label text-muted">{row.label}</dt>
          <dd className="mt-1.5 text-small text-ink sm:text-body">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
