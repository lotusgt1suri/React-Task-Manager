import Brand from "./Brand";
import Navigation from "./Navigation";
import Account from "./Account";
import { NAV_ITEMS } from "../data";

/*
 * The dark menu on the left.
 *
 * Props from App:
 *   selectedTab - the title of the menu item that is selected.
 *   onSelectTab - call this with a title to select a different item.
 */
export default function Sidebar({ selectedTab, onSelectTab }) {
  // Build one Navigation item for each entry in NAV_ITEMS (from data.js).
  // isSelected is true only for the item whose title matches selectedTab,
  // so only that one gets highlighted.
  const sidebarItems = NAV_ITEMS.map((item) => (
    <Navigation
      key={item.title}
      isSelected={selectedTab === item.title}
      image={item.image}
      title={item.title}
      onSelect={() => onSelectTab(item.title)}
    />
  ));

  return (
    <aside className="sidebar">
      <Brand />

      <nav className="sidebar__menu">
        <ul className="sidebar__menu-list">{sidebarItems}</ul>
      </nav>

      <Account />
    </aside>
  );
}
