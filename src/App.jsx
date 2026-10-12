import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { NAV_ITEMS, INITIAL_TASKS } from "./data";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

/*
 * App is the top-level component and the "brain" of the project.
 *
 * All the important data (state) lives here, because several components
 * need the same data. For example, the Sidebar and the Header both need to
 * know which menu item is selected, and the FilterTabs and the TaskList both
 * need the list of tasks. Keeping the state in their shared parent and
 * passing it down as props is called "lifting state up".
 *
 * Child components never change this data directly. Instead, App passes
 * them functions (like onSelectTab or onDeleteTask). When a child calls one
 * of these functions, App updates its state and React re-renders the screen.
 */
export default function App() {
  // Which sidebar menu item is selected ("All Tasks", "Today", ...).
  const [selectedTab, setSelectedTab] = useState("All Tasks");

  // The full list of tasks. It starts with the sample tasks from data.js,
  // and after that it is changed only through setTasks.
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  // Find the full menu item (title + subtitle) for the selected tab, so the
  // Header can show the matching heading. This is not stored in state because
  // it can always be worked out from selectedTab.
  const activeItem = NAV_ITEMS.find((item) => item.title === selectedTab);

  /*
   * Flip one task between done and not done.
   *
   * Important rule in React: never change state directly (for example
   * task.completed = true). React would not notice the change and the screen
   * would not update. Instead we build a NEW array with map():
   *   - the task with the matching id is copied ({ ...task }) with
   *     "completed" flipped,
   *   - every other task is kept exactly as it was.
   *
   * We use the "prevTasks" form of setTasks so we always work with the
   * latest list, even if several updates happen quickly.
   */
  function handleToggleTask(id) {
    return setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  // Whether the pop-up task form is showing.
  const [isFormOpen, setIsFormOpen] = useState(false);

  // The task being edited, or null when the form is adding a new task.
  // The same form is used for both, and this tells it which job to do.
  const [editingTask, setEditingTask] = useState(null);

  // "+ Add Task" button: open an empty form.
  function handleOpenAddForm() {
    setEditingTask(null);
    setIsFormOpen(true);
  }

  // Edit (pencil) button: open the form filled in with this task.
  function handleOpenEditForm(task) {
    setEditingTask(task);
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingTask(null);
  }

  /*
   * Called by TaskForm when the user submits a valid form.
   *
   * If we are editing, we replace the old task with the new details. Like
   * toggling, map() builds a new list. Only the matching task changes, and
   * { ...task, ...formData } keeps its id and "completed" value while
   * replacing the title, description, priority and due date.
   *
   * If we are adding, we give the task a unique id, mark it as not completed
   * and put it at the top of a new list.
   */
  function handleSaveTask(formData) {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...formData } : task,
        ),
      );
    } else {
      setTasks((prevTasks) => [
        { ...formData, id: crypto.randomUUID(), completed: false },
        ...prevTasks,
      ]);
    }
    handleCloseForm();
  }

  // Remove a task. filter() builds a new list that keeps every task
  // except the one with this id.
  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  /*
   * The numbers shown on the All / Pending / Completed tabs.
   *
   * These are worked out from "tasks" every time App renders, instead of being
   * stored in their own state. This is called "derived state". Because they
   * are recalculated each time, they can never get out of sync: add, delete
   * or tick a task and the counts are automatically correct.
   */
  const completedCount = tasks.filter((task) => task.completed).length;

  const counts = {
    all: tasks.length,
    completed: completedCount,
    pending: tasks.length - completedCount,
  };

  // Which filter tab is active: "all", "pending" or "completed".
  const [filter, setFilter] = useState("all");

  // The text typed in the search box.
  const [searchQuery, setSearchQuery] = useState("");

  // Remove extra spaces and make it lowercase, so "  REACT " matches "React".
  const normalizedQuery = searchQuery.trim().toLowerCase();

  /*
   * The tasks that should actually appear on screen.
   *
   * A task is shown only if it passes BOTH checks:
   *   1. It matches the active filter tab (pending / completed / all).
   *   2. Its title or description contains the search text.
   *
   * This does not delete anything. "tasks" still holds every task; this is
   * just the part of it we want to display right now.
   */
  const visibleTasks = tasks.filter((task) => {
    if (filter === "pending" && task.completed) return false;
    if (filter === "completed" && !task.completed) return false;

    // Nothing typed in the search box, so every task that passed the filter is shown.
    if (!normalizedQuery) return true;

    return (
      task.title.toLowerCase().includes(normalizedQuery) ||
      task.description.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    // <> ... </> is a Fragment: it groups elements without adding an extra
    // <div> to the page.
    <>
      <Sidebar selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      <main>
        <Header
          title={activeItem.title}
          subTitle={activeItem.subtitle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddClick={handleOpenAddForm}
        />
        <FilterTabs
          counts={counts}
          activeFilter={filter}
          onChangeFilter={setFilter}
          tasks={tasks}
        />
        <TaskList
          tasks={visibleTasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleOpenEditForm}
        />
      </main>

      {/* Show the form only while isFormOpen is true. When it is false, React
          does not render the form at all, so it starts empty every time it
          opens. */}
      {isFormOpen && (
        <TaskForm
          taskToEdit={editingTask}
          onSave={handleSaveTask}
          onClose={handleCloseForm}
        />
      )}
    </>
  );
}
