import searchIcon from "../assets/search.svg";
import Button from "./Button";
import plusIcon from "../assets/plus.svg";

/*
 * The top bar of the main area: page title, search box and "Add Task" button.
 *
 * This component does not keep its own state. Everything comes from App
 * as props:
 *   title, subTitle - change when a different sidebar item is selected.
 *   searchQuery     - the current search text.
 *   onSearchChange  - tells App the search text changed.
 *   onAddClick      - tells App to open the "Add a new task" form.
 */
export default function Header({
  title,
  subTitle,
  searchQuery,
  onSearchChange,
  onAddClick,
}) {
  return (
    <header className="header">
      <div className="header__title">
        <h1>{title}</h1>
        <p>{subTitle}</p>
      </div>
      <div className="header__actions">
        {/* preventDefault stops the page from reloading when Enter is pressed
            in the search box. */}
        <form className="header__form" onSubmit={(e) => e.preventDefault()}>
          <label className="header__form-search">
            <img src={searchIcon} alt="" />
            {/* A controlled input: its value comes from App's state, and every
                keystroke sends the new text back up to App. */}
            <input
              type="search"
              name="search"
              placeholder="Search tasks..."
              aria-label="Search tasks"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </label>
        </form>
        <Button className="btn-primary" icon={plusIcon} onClick={onAddClick}>
          Add Task
        </Button>
      </div>
    </header>
  );
}
