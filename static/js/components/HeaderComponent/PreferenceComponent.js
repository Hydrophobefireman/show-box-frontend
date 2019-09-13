import { h, Fragment } from "../../@ui/ui-lib";
const canZoom = "ontouchstart" in window || navigator.maxTouchPoints;
export default function PreferenceComponent({
  preferences,
  setPreferences,
  removeMenu,
  showMenu
}) {
  return h(
    Fragment,
    null,
    h("div", applyProp({ class: "mask", onClick: removeMenu }, showMenu)),
    h(
      "div",
      applyProp({ id: "preference-component" }, showMenu),
      h("div", null, "Preferences"),
      h(
        "button",
        {
          class: "toggle-option",
          onClick: () => setPreferences("darkMode", !preferences.darkMode)
        },
        "Dark Mode is ",
        preferences.darkMode ? "On" : "Off"
      ),
      canZoom &&
        h(
          "button",
          {
            class: "toggle-option",
            onClick: () => setPreferences("zoom", !preferences.zoom)
          },
          "Zoom is ",
          preferences.zoom ? "Enabled" : "Disabled"
        )
    )
  );
}

const applyProp = (obj, sm) => {
  if (!sm) {
    obj.hidden = true;
  }
  return obj;
};
