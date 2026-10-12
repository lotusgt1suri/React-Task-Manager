import home from "./assets/home.svg";
import calendar from "./assets/calendar.svg";
import check_circle from "./assets/check-circle.svg";
import settings from "./assets/settings.svg";

/*
 * Fixed data used by the app.
 *
 * Images are imported like code. Vite turns each import into the correct
 * file path, so the images still work after the app is built.
 */

// The sidebar menu. Each item also has the heading and subtitle that the
// Header shows when that item is selected.
export const NAV_ITEMS = [
  {
    image: home,
    title: "All Tasks",
    subtitle: "Manage your tasks and stay productive.",
  },
  {
    image: calendar,
    title: "Today",
    subtitle: "Focus on what's due today.",
  },
  {
    image: check_circle,
    title: "Completed",
    subtitle: "Review the tasks you've finished.",
  },
  {
    image: settings,
    title: "Settings",
    subtitle: "Manage your preferences and account.",
  },
];

/*
 * Sample tasks that the app starts with.
 *
 * App copies these into state once, when it first loads. The app never
 * changes this file. New, ticked and deleted tasks only live in state, so
 * refreshing the page brings these sample tasks back.
 *
 * Every task needs a unique "id", so React can tell list items apart.
 */
export const INITIAL_TASKS = [
  {
    id: 1,
    title: "Build React Task Manager",
    description: "Create a simple task manager app using React 19 and Vite.",
    priority: "high",
    dueDate: "2025-10-14",
    completed: false,
  },
  {
    id: 2,
    title: "Design UI components",
    description: "Create reusable components (Button, Input, Card, etc.)",
    priority: "medium",
    dueDate: "2025-10-09",
    completed: true,
  },
  {
    id: 3,
    title: "Implement State Management",
    description: "Manage task list using useState and functional updates.",
    priority: "medium",
    dueDate: "2025-10-12",
    completed: false,
  },
  {
    id: 4,
    title: "Add Task Filtering",
    description: "Filter tasks by All, Pending and Completed.",
    priority: "low",
    dueDate: "2025-10-08",
    completed: true,
  },
  {
    id: 5,
    title: "Make it Responsive",
    description: "Ensure the app works well on mobile and desktop screens.",
    priority: "low",
    dueDate: "2025-10-15",
    completed: false,
  },
];
