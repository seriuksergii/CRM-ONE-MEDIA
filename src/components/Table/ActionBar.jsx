export default function ActionBar({ selectedCount, onDelete, onExport }) {
  <div className="">
    <span>Выбрано: {selectedCount}</span>
    <div className="flex gap-2">
      <button onClick={onExport} className="btn btn-secondary">
        Экспорт
      </button>
      <button onClick={onDelete} className="btn btn-danger">
        Удалить
      </button>
    </div>
  </div>;
}
