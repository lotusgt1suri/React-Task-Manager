import editTask from "../assets/pencil.svg";
import deleteTask from "../assets/trash.svg";
import dueDate from "../assets/calendar-days.svg";

/*
 * One row in the task list.
 *
 * Props:
 *   task     - the task object (title, description, priority, dueDate, completed).
 *   onToggle - call this to tick or untick the task.
 *   onDelete - call this to remove the task.
 *   onEdit   - call this to open the form with this task filled in.
 *
 * This component only shows the task and reports clicks. The real changes
 * to the task list happen in App.
 */
export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  // Ask the user to confirm before deleting. window.confirm() shows the
  // browser's OK / Cancel box and returns true only if they click OK.
  function handleDelete() {
    if (window.confirm(`Delete "${task.title}"? This can't be undone.`)) {
      onDelete();
    }
  }

  return (
    // Completed tasks get the extra class "task--done", which the CSS uses to
    // strike through the title.
    <li className={`task ${task.completed ? "task--done" : ""}`}>
      {/* A controlled checkbox: it is ticked when task.completed is true, and
          clicking it asks App to flip that value. */}
      <div>
        <input type="checkbox" checked={task.completed} onChange={onToggle} />

        <div className="task__content">
          <h3 className="task__title">{task.title}</h3>
          <p className="task__desc">{task.description}</p>
        </div>
      </div>
      <div>
        {/* The class becomes badge--low, badge--medium or badge--high, so each
          priority gets its own colour from the CSS. */}
        <span className={`badge badge--${task.priority}`}>{task.priority}</span>

        <span className="task__date">
          <img src={dueDate} alt="due-date" /> {task.dueDate}
        </span>

        <div className="task__actions">
          {/* Opens the form with this task's details already filled in. */}
          <button
            type="button"
            aria-label={`Edit ${task.title}`}
            onClick={onEdit}
          >
            <img src={editTask} alt="" />
          </button>
          {/* The icon has no text, so aria-label tells screen readers which
            task this button deletes. */}
          <button
            type="button"
            aria-label={`Delete ${task.title}`}
            onClick={handleDelete}
          >
            <img src={deleteTask} alt="" />
          </button>
        </div>
      </div>
    </li>
  );
}
