// One item in the sidebar menu. When clicked, it tells the parent through
// onSelect, and the parent decides which item is selected.
export default function Navigation({ isSelected, image, title, onSelect }) {
  return (
    <li>
      <button
        type="button"
        // The "active" class (styled in index.css) highlights the selected item.
        className={isSelected ? "active" : undefined}
        onClick={() => {
          onSelect();
        }}
      >
        <img src={image} alt="" />
        {title}
      </button>
    </li>
  );
}
