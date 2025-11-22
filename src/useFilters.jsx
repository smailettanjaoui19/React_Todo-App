import { useMemo, useState } from "react";
import getComparator from "./Comparator";

const STATUS = {
  active: false,
  completed: true,
};

const statusFilter = (status) => (todo) =>
  STATUS[status] == todo.completed || status == "all";
const priorityFilter = (priority) => (todo) =>
  todo.priority == priority || priority == "all";

const useFilters = (todos) => {
  const [sortBy, setSortBy] = useState({ field: "none", direction: "asc" });
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
  });

  const filteredSortedTodos = useMemo(() => {
    let result = [...todos];

    if (filters.status != "all")
      result = result.filter(statusFilter(filters.status));

    if (filters.priority != "all")
      result = result.filter(priorityFilter(filters.priority));

    const comparator = getComparator(sortBy.field, sortBy.direction);

    result.sort(comparator);

    return result;
  }, [todos, sortBy, filters]);

  return { sortBy, setSortBy, setFilters, filteredSortedTodos };
};
export default useFilters;
