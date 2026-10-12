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

## Tech stack

- [React 19](https://react.dev/) with function components and `useState`
- [Vite](https://vite.dev/) for the dev server and build
- Plain CSS with custom properties (color tokens taken from a Figma design)
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
    ├── Sidebar.jsx      # Left menu (Brand, Navigation, Account)
    ├── Navigation.jsx   # One sidebar menu item
    ├── Brand.jsx        # Logo and app name
    ├── Account.jsx      # User shown at the bottom of the sidebar
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

## Planned improvements

- [ ] Save tasks between page reloads with `localStorage` and `useEffect`
- [ ] Make the layout responsive for mobile
- [ ] Make the Today, Completed and Settings sidebar pages show their own content
- [ ] Replace the emoji edit and delete icons with SVG icons
- [ ] Close the form with the Escape key
