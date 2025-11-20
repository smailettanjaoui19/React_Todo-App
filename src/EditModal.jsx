import { useState } from "react";

// EditModal Component
export const EditModal = ({ todo, isOpen, onClose, onEditTodo }) => {
  const [info, setInfo] = useState({
    title: todo?.title,
    dueDate: todo?.dueDate,
    priority: todo?.priority,
  });

  if (!isOpen) return null;
  const handleChange = (event) => {
    setInfo((p) => ({
      ...p,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!info.title || !info.dueDate) return;
    // if (new Date() > new Date(info.dueDate)) return;
    console.log('sumbited')
    onEditTodo({
      ...todo,
      ...info,
    });
  };
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
            name="title"
              onChange={handleChange}
              type="text"
              id="edit-task-title"
              defaultValue={todo?.title || ""}
              placeholder="What needs to be done?"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-task-priority">Priority</label>
              <select
              name="priority"
                onChange={handleChange}
                id="edit-task-priority"
                defaultValue={todo?.priority || "medium"}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="edit-task-due-date">Due Date</label>
              <input
              name="dueDate"
                type="date"
                onChange={handleChange}
                id="edit-task-due-date"
                defaultValue={todo?.dueDate || ""}
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
