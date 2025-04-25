export default function TableBody({
  columns,
  data,
  selectable,
  selectedIds,
  onToggleSelect,
}) {
  return (
    <tbody className="table__body">
      {data.map((row) => (
        <tr key={row.id}>
          {selectable && (
            <td>
              <input
                type="checkbox"
                checked={selectedIds.includes(row.id)}
                onChange={() => onToggleSelect(row.id)}
              />
            </td>
          )}
          {columns.map((col) => (
            <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
