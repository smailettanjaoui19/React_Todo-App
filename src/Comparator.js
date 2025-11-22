const priorityOrder = { low: 3, medium: 2, high: 1 };

const compareByDate = (a, b) => new Date(a.dueDate) - new Date(b.dueDate);

const compareByPriority = (a, b) =>
  priorityOrder[a.priority] - priorityOrder[b.priority];

const compareByStatus = (a, b) => a.completed - b.completed;

const comparators = {
  date: compareByDate,
  priority: compareByPriority,
  status: compareByStatus,
};

/**
 * Returns a comparator function based on the provided field and direction.
 * @param {string} field - The field to sort by ('date', 'priority', 'status').
 * @param {string} direction - The direction to sort ('asc' or 'desc').
 * @returns {function} A comparator function for use with Array.prototype.sort().
 */
const getComparator = (field, direction) => {
  const comparator = comparators[field];

  if (!comparator) return () => 0;

  return (a, b) => (direction === "desc" ? -1 : 1) * comparator(a, b);
};

export default getComparator;
