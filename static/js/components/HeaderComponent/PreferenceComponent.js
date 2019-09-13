import { h, Fragment } from "../../@ui/ui-lib";

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
      h(
        Fragment,
        null,
        h("div", null, "Preferences"),
        h(
          "button",
          {
            class: "toggle-option",
            onClick: () => setPreferences("darkMode", !preferences.darkMode)
          },
          "Dark Mode is ",
          preferences.darkMode ? "On" : "Off"
        )
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
