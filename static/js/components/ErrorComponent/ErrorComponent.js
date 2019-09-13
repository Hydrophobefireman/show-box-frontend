import { createElement as h } from "../../@ui/ui-lib.js";
export function ErrorComponent({ onRetryClick }) {
  return h(
    "div",
    null,
    "An Error Occured while connecting to the server",
    h(
      "button",
      { class: "reload-connection", onClick: onRetryClick },
      "Click here to try again"
    )
  );
}
