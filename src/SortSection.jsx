// SortSection Component
export const SortSection = ({ sortBy, setSortBy }) => {
  const handleFieldChange = (event) => {
    setSortBy((prev) => ({ ...prev, field: event.target.value }));
  };

  const handleDirectionChange = () => {
    setSortBy((prev) => ({
      ...prev,
      direction: prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <section className="sort-section">
      <div className="sort-group">
        <label htmlFor="sort-field">Sort by:</label>
        <select
          onChange={handleFieldChange}
          id="sort-field"
          name="sortField"
          value={sortBy.field}
        >
          <option value="none">None</option>
          <option value="date">Due Date</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
        </select>
      </div>

      {sortBy.field !== "none" && (
        <div className="sort-group">
          <button
            onClick={handleDirectionChange}
            className="sort-direction-btn"
          >
            {sortBy.direction === "asc" ? "↑ Ascending" : "↓ Descending"}
          </button>
        </div>
      )}
    </section>
  );
};
