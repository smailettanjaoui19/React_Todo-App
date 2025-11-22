import { useState } from "react";
import { EditModal } from "./EditModal";
import { useLocalStorage } from "./useLocalStorage";
import { SortSection } from "./SortSection";
import { FilterSection } from "./FilterSection";
import { TodoList } from "./TodoList";
import { Header } from "./Header";
import { Footer } from "./Footer";
import AddTodoForm from "./AddTodoForm";
import useFilters from "./useFilters";

// Main App Component

const TodoApp = () => {
  const [todos, setTodos] = useLocalStorage("todos");
  const [editTodo, setEditTodo] = useState(null);
  const { sortBy, setSortBy, setFilters, filteredSortedTodos } =
    useFilters(todos);

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
        <FilterSection setFilters={setFilters} />
        <SortSection sortBy={sortBy} setSortBy={setSortBy} />
        <TodoList
          todos={filteredSortedTodos}
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
