import arrowDown from "../assets/chevron-down.svg";

// The signed-in user shown at the bottom of the sidebar.
// The name and initials are fixed text for now.
export default function Account() {
  return (
    <div className="sidebar__account">
      <span className="sidebar__account-user">
        <span className="sidebar__account-avatar">SR</span>
        Surendra Rana
      </span>
      <img src={arrowDown} alt="chevron-down" />
    </div>
  );
}
