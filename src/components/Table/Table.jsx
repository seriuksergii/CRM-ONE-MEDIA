import { useState, useMemo } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

import "./Table.scss";

export default function Table({
  columns,
  data,
  selectable = false,
  onSort,
  onSelectionChange,
}) {
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [selectedIds, setSelectedIds] = useState([]);

  const allSelected = useMemo(() => {
    return data.length > 0 && selectedIds.length === data.length;
  }, [selectedIds, data]);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
    onSort?.(key, direction);
  };

  const handleToggleSelect = (id) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
    setSelectedIds(updated);
    onSelectionChange?.(data.filter((item) => updated.includes(item.id)));
  };

  const handleToggleSelectAll = () => {
    const updated = allSelected ? [] : data.map((item) => item.id);
    setSelectedIds(updated);
    onSelectionChange?.(data.filter((item) => updated.includes(item.id)));
  };

  return (
    <table className="table">
      <TableHead
        columns={columns}
        sortableConfig={sortConfig}
        onSort={handleSort}
        selectable={true}
        allSelected={allSelected}
        onToggleSelectAll={handleToggleSelectAll}
      />
      <TableBody
        columns={columns}
        data={data}
        selectable={true}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
      />
    </table>
  );
}
