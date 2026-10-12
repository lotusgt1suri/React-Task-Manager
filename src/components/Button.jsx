/*
 * A reusable button.
 *
 * Props:
 *   children - whatever is placed between <Button> and </Button>, such as the
 *              text "Add Task".
 *   icon     - optional image shown before the text.
 *   ...props - every other prop (onClick, className, type, ...) is collected
 *              here and passed straight to the real <button>.
 *
 * type="button" comes first, so it is the default. A button inside a form
 * submits the form unless told otherwise, so this default stops accidental
 * submits. Passing type="submit" overrides it, because {...props} comes after.
 */
export default function Button({ children, icon, ...props }) {
  return (
    <button type="button" {...props}>
      {/* Show the icon only if one was given. alt="" because the text
          already describes the button. */}
      {icon && <img src={icon} alt="" />}
      {children}
    </button>
  );
}
