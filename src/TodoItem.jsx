// TodoItem Component
export const TodoItem = ({ todo, onCompleteTodo, onDeleteTodo, onEdit }) => {
  const isOverdue = todo.overdue;
  const isCompleted = todo.completed;

  return (
    <div
      className={`todo-item ${isOverdue ? "overdue" : ""} ${
        isCompleted ? "completed" : ""
      }`}
    >
      <div className="todo-content">
        <div className="todo-header">
          <h3 className="todo-title">{todo.title}</h3>
          <span className={`priority-badge ${todo.priority.toLowerCase()}`}>
            {todo.priority}
          </span>
        </div>
        <div className="todo-meta">
          {isOverdue ? (
            <span className="due-date overdue-date">
              Due: {todo.dueDate} (Overdue)
            </span>
          ) : isCompleted ? (
            <span className="due-date">
              Completed on: {todo?.completeDate?.toLocaleString()}
            </span>
          ) : (
            <span className="due-date">Due: {todo.dueDate}</span>
          )}
        </div>
      </div>
      <div className="todo-actions">
        {isCompleted ? (
          <button onClick={onCompleteTodo} className="action-btn undo-btn">
            ↶
          </button>
        ) : (
          <>
            <button
              onClick={onCompleteTodo}
              className="action-btn complete-btn"
            >
              ✓
            </button>
            <button onClick={onEdit} className="action-btn edit-btn">
              ✎
            </button>
          </>
        )}
        <button onClick={onDeleteTodo} className="action-btn delete-btn">
          ×
        </button>
      </div>
    </div>
  );
};
