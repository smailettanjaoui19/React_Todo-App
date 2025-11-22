import useTodoForm from "./useTodoForm";

const AddTodoForm = ({ onAddTodo }) => {
  const { todo, handleChange, handleSubmit, error } = useTodoForm(onAddTodo);

  return (
    <section className="add-todo-section">
      <h2>Add New Task</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="add-todo-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="task-title">Task</label>
          <input
            value={todo.title} // Add this to sync with state
            onChange={handleChange}
            type="text"
            id="task-title"
            name="title"
            placeholder="What needs to be done?"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="task-priority">Priority</label>
            <select
              value={todo.priority} // Add this to sync with state
              id="task-priority"
              name="priority"
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="task-due-date">Due Date</label>
            <input
              value={todo.dueDate} // Add this to sync with state
              type="date"
              id="task-due-date"
              name="dueDate"
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add Task
        </button>
      </form>
    </section>
  );
};

export default AddTodoForm;
