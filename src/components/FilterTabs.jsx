import Tabs from "./Tabs";

// The three filter tabs. "value" is what App stores in its filter state;
// "label" is the text the user sees.
const FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

export default function FilterTabs({ counts, activeFilter, onChangeFilter }) {
  // counts[f.value] picks the right number from the counts object,
  // for example counts["pending"] is the same as counts.pending.
  return (
    <ul className="tabs">
      {FILTERS.map((f) => (
        <Tabs
          key={f.value}
          count={counts[f.value]}
          isActive={activeFilter === f.value}
          onSelect={() => onChangeFilter(f.value)}
        >
          {f.label}
        </Tabs>
      ))}
    </ul>
  );
}
