type ComparisonFeatureTableProps = {
  title?: string;
  columns: string[];
  rows: string[][];
  caption?: string;
};

export function ComparisonFeatureTable({
  title = "Feature comparison",
  columns,
  rows,
  caption,
}: ComparisonFeatureTableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
      <table className="w-full text-sm md:text-base border-collapse min-w-[520px]">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="text-left py-3 pr-4 font-semibold text-foreground"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-border/60">
              {row.map((cell, i) => (
                <td
                  key={`${row[0]}-${i}`}
                  className={`py-3 pr-4 align-top ${
                    i === 0 ? "font-medium text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
