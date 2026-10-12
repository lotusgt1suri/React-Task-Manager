import TaskItem from "./TaskItem";

/*
 * Shows the list of tasks, one TaskItem per task.
 *
 * "tasks" here is already filtered by App (by tab and search), so this
 * component just displays whatever it is given.
 */
export default function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) {
  // Nothing to show (no tasks, or nothing matches the filter or search).
  if (tasks.length === 0) {
    return <p className="task-list__empty">No tasks found.</p>;
  }

  return (
    <ul className="task-lists">
      {/* map() turns each task object into a TaskItem.
          "key" must be unique for every item in a list. It lets React tell the
          items apart when one is added, removed or reordered. We use the
          task's id because it never changes.
          The arrow functions fill in this task's id, so TaskItem can simply
          call onToggle() or onDelete() without knowing about ids.
          onEdit passes the whole task, because the form needs all its
          details, not just the id. */}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
          onEdit={() => onEditTask(task)}
        />
      ))}
    </ul>
  );
}
