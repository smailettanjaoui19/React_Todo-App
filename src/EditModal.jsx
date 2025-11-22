import { useEffect, useRef } from "react";
import useTodoForm from "./useTodoForm";

// EditModal Component
export const EditModal = ({
  todo: editingTodo,
  isOpen,
  onClose,
  onEditTodo,
}) => {
  const input = useRef();
  const { todo, handleChange, handleSubmit } = useTodoForm(
    onEditTodo,
    editingTodo
  );

  useEffect(() => {
    input.current.focus();
    input.current.select();
  }, []);

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-task-title">Task</label>
            <input
              ref={input}
              value={todo.title}
              name="title"
              onChange={handleChange}
              type="text"
              id="edit-task-title"
              placeholder="What needs to be done?"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-task-priority">Priority</label>
              <select
                value={todo.priority}
                name="priority"
                onChange={handleChange}
                id="edit-task-priority"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="edit-task-due-date">Due Date</label>
              <input
                value={todo.dueDate}
                name="dueDate"
                type="date"
                onChange={handleChange}
                id="edit-task-due-date"
              />
            </div>
          </div>

          {/* <div className="form-group">
            <label htmlFor="edit-task-status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              id="edit-task-status"
              defaultValue={todo?.completed ? "completed" : "active"}
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div> */}

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
