import { useState } from "react";
import Button from "./Button";

// What the form looks like when it first opens: empty fields, "Low" priority.
const EMPTY_FORM = {
  title: "",
  description: "",
  priority: "low",
  dueDate: "",
};

/*
 * A pop-up form for adding a new task OR editing an existing one.
 * The same form is reused for both, so we don't have to build it twice.
 *
 * Every field is a "controlled input": its value comes from React state
 * (formData), and every keystroke updates that state. React is always the
 * single place that knows what is typed in the form.
 *
 * Props:
 *   taskToEdit - the task being edited, or null when adding a new task.
 *   onSave     - function from App; we call it with the task's details.
 *   onClose    - function from App; we call it to hide the form.
 */
export default function TaskForm({ taskToEdit, onSave, onClose }) {
  // true when editing, false when adding. Used to change the heading and
  // button text.
  const isEditing = taskToEdit !== null;

  /*
   * All four fields are kept together in one object.
   *
   * When editing, the fields start filled in with the task's current values.
   * When adding, they start empty. useState only uses this starting value the
   * first time the form appears. That works here because App removes the
   * form when it closes, so every time it opens it starts again from scratch.
   */
  const [formData, setFormData] = useState(
    isEditing
      ? {
          title: taskToEdit.title,
          description: taskToEdit.description,
          priority: taskToEdit.priority,
          dueDate: taskToEdit.dueDate,
        }
      : EMPTY_FORM,
  );

  // The validation message to show under the title ("" means no error).
  const [error, setError] = useState("");

  /*
   * One change handler shared by all the fields.
   *
   * Each input has a "name" attribute that matches a key in formData
   * (title, description, priority, dueDate). We read which field changed
   * (name) and its new value, then copy the old form data and replace just
   * that one field. The square brackets in [name] mean "use the value of the
   * name variable as the key", so typing in the title input updates
   * formData.title.
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // As soon as the user starts typing a title, hide the error message.
    if (name === "title" && error) setError("");
  }

  function handleSubmit(e) {
    // Stop the browser's default form behaviour, which reloads the page.
    e.preventDefault();

    // Validation: the title is required. trim() removes spaces, so a title
    // made only of spaces also counts as empty.
    const title = formData.title.trim();
    if (!title) {
      setError("Title is required.");
      return; // Stop here. The task is not saved.
    }

    // Everything is valid, so send the task to App. App decides whether to
    // add it as a new task or update the one being edited.
    onSave({
      ...formData,
      title,
      description: formData.description.trim(),
    });
  }

  return (
    <div className="form-wrap">
      {/* The dark background behind the form. Clicking it closes the form. */}
      <div className="form-overlay" onClick={onClose}></div>

      {/* noValidate turns off the browser's own error pop-ups so we can show
          our own message instead. */}
      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <h2>{isEditing ? "Edit task" : "Add a new task"}</h2>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          {/* aria-invalid and aria-describedby tell screen readers that the
              field has an error and which text explains it. aria-invalid also
              turns the border red in the CSS. */}
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "title-error" : undefined}
            autoFocus
          />
          {/* Only show the message when there is an error. */}
          {error && (
            <p id="title-error" className="form-error">
              {error}
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          {/* Cancel is a normal button (type="button" by default), so it
              closes the form without submitting it. */}
          <Button className="btn-secondary" onClick={onClose}>
            Cancel
          </Button>
          {/* type="submit" makes this button run handleSubmit above. */}
          <Button type="submit" className="btn-primary">
            {isEditing ? "Save Changes" : "Add Task"}
          </Button>
        </div>
      </form>
    </div>
  );
}
