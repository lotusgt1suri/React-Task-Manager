import logo from "../assets/logo.svg";

// The app logo and name at the top of the sidebar.
export default function Brand() {
  return (
    <a href="#" className="sidebar__logo">
      <img src={logo} alt="Task-Manager-Logo" />
      TaskManager
    </a>
  );
}
