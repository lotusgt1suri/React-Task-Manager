# TaskManager

A task manager app built with **React 19** and **Vite** while learning React. You can add, edit, delete and complete tasks, filter them by status, and search them by title or description.

The code has plain-language comments throughout, so it's meant to be easy to read if you're learning React too.

## Features

- **Add tasks** with a title, description, priority (Low / Medium / High) and due date
- **Title validation:** a task can't be saved without a title
- **Edit tasks:** the same form opens with the task's details filled in
- **Delete tasks** with a confirmation prompt
- **Mark tasks as done:** completed tasks are struck through
- **Filter tabs:** All, Pending and Completed, with live counts
- **Search** by title or description; it works together with the filter tabs
- **Priority badges** in a different colour for each level
- **Sidebar navigation** with an active state; the page heading and subtitle change to match
- **Responsive layout:**
  - **Desktop:** a fixed sidebar with the account at the bottom
  - **Mobile:** a top bar with the logo and account, a bottom navigation menu, and a stacked header

## Tech stack

- [React 19](https://react.dev/) with function components and `useState`
- [Vite](https://vite.dev/) for the dev server and build
- Plain CSS with custom properties (color tokens taken from a Figma design), Flexbox and CSS Grid
- ESLint

## Getting started

You need [Node.js](https://nodejs.org/) installed.

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Builds the app for production into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Checks the code with ESLint |

## Project structure

```
src/
├── App.jsx              # Holds all the state and the main logic
├── data.js              # Sidebar menu items and the sample tasks
├── index.css            # All styles and the color tokens
├── main.jsx             # Entry point that renders <App />
├── assets/              # SVG icons
└── components/
    ├── Sidebar.jsx      # Left menu on desktop, top bar + bottom menu on mobile
    ├── Navigation.jsx   # One sidebar menu item
    ├── Brand.jsx        # Logo and app name
    ├── Account.jsx      # Signed-in user (avatar and name)
    ├── Header.jsx       # Page title, search box, "Add Task" button
    ├── FilterTabs.jsx   # All / Pending / Completed tabs
    ├── Tabs.jsx         # One filter tab with its count
    ├── TaskList.jsx     # The list of tasks
    ├── TaskItem.jsx     # One task row
    ├── TaskForm.jsx     # Pop-up form for adding and editing tasks
    └── Button.jsx       # Reusable button
```

## How it works

All the app's data lives in `App.jsx`:

| State | What it holds |
|---|---|
| `tasks` | The full list of tasks |
| `filter` | The active tab: `"all"`, `"pending"` or `"completed"` |
| `searchQuery` | The text in the search box |
| `selectedTab` | The selected sidebar item |
| `isFormOpen`, `editingTask` | Whether the form is showing, and which task it's editing |

`App` passes this data down to the components as props, along with functions such as `onDeleteTask`. The components call those functions to ask `App` to make changes.

The tab counts and the visible list aren't stored separately. They're calculated from `tasks`, `filter` and `searchQuery` every time the app renders, so they're always in sync.

### Responsive layout

The desktop and mobile layouts use the **same HTML**. Only the CSS changes:

- **Breakpoints:**
  - At **992px** and below, the sidebar becomes a top bar and the menu moves to a fixed bar at the bottom of the screen.
  - At **767px** and below, the header and the filter tabs rearrange for phones.
- **`display: contents`** makes wrapper elements disappear from the layout, so their children can be placed directly in the parent's CSS Grid. That's how the account name moves under the logo, and the "Add Task" button moves next to the page title, without changing the markup.

## React concepts used

- Components and props, including `children` and passing the remaining props through with `...props`
- Rendering lists with `map()` and `key`
- `useState`
- Lifting state up to a shared parent
- Derived state: values calculated from state instead of stored
- Updating arrays and objects without changing them directly, using `map`, `filter` and spread
- Controlled inputs and form validation
- Rendering based on conditions
- Reusing one form component for both adding and editing
- Responsive CSS with Flexbox, CSS Grid, `grid-template-areas` and `display: contents`
