import { TodoItem } from "./TodoItem";

// TodoList Component
export const TodoList = ({ todos, onCompleteTodo, onDeleteTodo, onEdit }) => {
  // Static todo data
  return (
    <section className="todo-list-section">
      <h2>Tasks</h2>
      <div className="todo-list">
        {todos?.length < 1 ? (
          <p style={{ textAlign: "center" }}>To Task Found </p>
        ) : (
          todos?.map((todo) => (
            <TodoItem
              onCompleteTodo={() => onCompleteTodo(todo.id)}
              onDeleteTodo={() => onDeleteTodo(todo.id)}
              onEdit={() => onEdit(todo)}
              key={todo.id}
              todo={todo}
            />
          ))
        )}
      </div>
    </section>
  );
};
