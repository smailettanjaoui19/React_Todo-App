import { useState } from "react";
import { EditModal } from "./EditModal";
import { useLocalStorage } from "./useLocalStorage";

// Main App Component
const TodoApp = () => {
  const [todos, setTodos] = useLocalStorage("todos");
  const [editTodo, setEditTodo] = useState(null);

  const handleAddTodo = (todo) => {
    setTodos((pre) => [...pre, todo]);
  };
  const handleDeleteTodo = (id) => {
    setTodos((p) => p.filter((t) => t.id != id));
  };
  const handleCompleteTodo = (id) => {
    setTodos((p) =>
      p.map((t) =>
        t.id == id
          ? { ...t, completed: !t.completed, completeDate: new Date() }
          : t
      )
    );
  };

  const handleEditTodo = (todo) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((t) => t.id == editTodo.id);
    const newTodo = { ...todo };
    newTodos[index] = newTodo;
    setTodos(() => newTodos);
    setEditTodo(null);
  };
  return (
    <div className="todo-app">
      <Header />

      <main className="app-main">
        <AddTodoForm onAddTodo={handleAddTodo} />
        <FilterSection />
        <TodoList
          todos={todos}
          onDeleteTodo={handleDeleteTodo}
          onCompleteTodo={handleCompleteTodo}
          onEdit={setEditTodo}
        />
        {editTodo && (
          <EditModal
            onClose={() => setEditTodo(null)}
            onEditTodo={handleEditTodo}
            isOpen={editTodo}
            todo={editTodo}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

// TodoItem Component
const TodoItem = ({ todo, onCompleteTodo, onDeleteTodo, onEdit }) => {
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
            <span className="due-date">Completed on: {todo.completedDate}</span>
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

// TodoList Component
const TodoList = ({ todos, onCompleteTodo, onDeleteTodo, onEdit }) => {
  // Static todo data

  return (
    <section className="todo-list-section">
      <h2>Tasks</h2>
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            onCompleteTodo={() => onCompleteTodo(todo.id)}
            onDeleteTodo={() => onDeleteTodo(todo.id)}
            onEdit={() => onEdit(todo)}
            key={todo.id}
            todo={todo}
          />
        ))}
      </div>
    </section>
  );
};

// AddTodoForm Component
const AddTodoForm = ({ onAddTodo }) => {
  const [info, setInfo] = useState({
    title: "",
    dueDate: "",
    priority: "medium",
  });

  const handleChange = (event) => {
    setInfo((p) => ({
      ...p,
      [event.target.name]: event.target.value,
    }));
  };

  const hanldeSubmit = (e) => {
    e.preventDefault();
    if (!info.title || !info.dueDate) return;
    if (new Date() > new Date(info.dueDate)) return;
    onAddTodo({
      ...info,
      id: Date.now(),
      completed: false,
      completeDate: null,
      overdue: false,
    });
  };
  return (
    <section className="add-todo-section">
      <h2>Add New Task</h2>
      <form className="add-todo-form" onSubmit={hanldeSubmit}>
        <div className="form-group">
          <label htmlFor="task-title">Task</label>
          <input
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
              defaultValue={"medium"}
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

// FilterSection Component
const FilterSection = () => {
  return (
    <section className="filter-section">
      <div className="filter-group">
        <label htmlFor="filter-status">Filter by status:</label>
        <select id="filter-status">
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-priority">Filter by priority:</label>
        <select id="filter-priority">
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </section>
  );
};

// Header Component
const Header = () => {
  return (
    <header className="app-header">
      <h1>Todo App</h1>
      <p>Stay organized and productive</p>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} Todo App. All rights reserved.</p>
    </footer>
  );
};

export default TodoApp;

// const todos = [
//   {
//     id: 1,
//     title: "Complete project proposal",
//     priority: "High",
//     dueDate: "May 10, 2023",
//     overdue: true,
//     completed: false,
//   },
//   {
//     id: 2,
//     title: "Prepare presentation slides",
//     priority: "High",
//     dueDate: "May 15, 2023",
//     overdue: false,
//     completed: false,
//   },
//   {
//     id: 3,
//     title: "Review code changes",
//     priority: "Medium",
//     dueDate: "May 18, 2023",
//     overdue: false,
//     completed: false,
//   },
//   {
//     id: 4,
//     title: "Update documentation",
//     priority: "Low",
//     dueDate: "May 25, 2023",
//     overdue: false,
//     completed: false,
//   },
//   {
//     id: 5,
//     title: "Team meeting",
//     priority: "Medium",
//     dueDate: "May 5, 2023",
//     overdue: false,
//     completed: true,
//     completedDate: "May 5, 2023",
//   },
// ];
