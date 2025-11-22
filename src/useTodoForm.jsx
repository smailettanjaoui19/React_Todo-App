import { useState } from "react";

const useTodoForm = (onSubmit, initialTodo) => {
  const [error, setError] = useState("");
  const [todo, setTodo] = useState(
    initialTodo
      ? { ...initialTodo }
      : {
          title: "",
          dueDate: "",
          priority: "medium",
        }
  );

  const handleChange = (event) => {
    setTodo((p) => ({
      ...p,
      [event.target.name]: event.target.value,
    }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.title || todo.title.length < 10 || !todo.dueDate) {
      setError("Please fill in all required fields");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(todo.dueDate);

    if (today > dueDate) {
      setError("Due date cannot be in the past");
      return;
    }

    onSubmit?.({
      ...todo,
      id: Date.now(),
      completed: false,
      completeDate: null,
      overdue: false,
    });

    setTodo({
      title: "",
      dueDate: "",
      priority: "medium",
    });
  };

  return { todo, handleChange, handleSubmit, error };
};

export default useTodoForm;
