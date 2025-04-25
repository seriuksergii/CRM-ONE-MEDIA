import Icon from "../Icon/Icon";

export default function TableHead({
  columns,
  sortableConfig,
  onSort,
  selectable,
  allSelected,
  onToggleSelectAll,
}) {
  const getSortSymbol = (colKey) => {
    if (sortableConfig.key === colKey) {
      return <Icon className="icon-s" name="sorting-arow" />;
    }
    return <Icon className="icon-s" name="sorting-arow" />; // символ сортировки для неактивных колонок
  };

  return (
    <thead className="table__header">
      <tr>
        {selectable && (
          <th>
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onToggleSelectAll}
            />
          </th>
        )}
        {columns.map((col) => (
          <th key={col.key} onClick={() => col.sortable && onSort(col.key)}>
            {col.sortable ? (
              <div className="table__header-sort">
                {col.title}
                {col.sortable && getSortSymbol(col.key)}
              </div>
            ) : (
              col.title
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}
