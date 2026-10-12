// A single filter tab (All / Pending / Completed) with its task count.
// children is the label text placed between <Tabs> and </Tabs>.
export default function Tabs({ count, isActive, onSelect, children }) {
  return (
    <li className="tabs__item">
      <button
        type="button"
        className={`tabs__link ${isActive ? "active" : ""}`}
        onClick={onSelect}
      >
        {children} <span className="tabs__count">{count}</span>
      </button>
    </li>
  );
}
