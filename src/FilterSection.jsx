// FilterSection Component
export const FilterSection = ({ setFilters }) => {
  const handleChange = (event) => {
    setFilters((p) => ({ ...p, [event.target.name]: event.target.value }));
  };
  return (
    <section className="filter-section">
      <div className="filter-group">
        <label htmlFor="filter-status">Filter by status:</label>
        <select onChange={handleChange} id="filter-status" name="status">
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-priority">Filter by priority:</label>
        <select onChange={handleChange} name="priority" id="filter-priority">
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </section>
  );
};
