import { h, Fragment, AsyncComponent } from "../../@ui/ui-lib";
import { getDefault } from "../../lazyExports";
const asyncUIExperiments = () => import("./UIExperiments.js").then(getDefault);
const canZoom = "ontouchstart" in window || navigator.maxTouchPoints;
export default function PreferenceComponent({
  preferences,
  setPreferences,
  removeMenu,
  showMenu,
  showUI,
  toggleUI
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
      canZoom
        ? h(
            "button",
            {
              class: "toggle-option",
              onClick: () => setPreferences("zoom", !preferences.zoom)
            },
            "Zoom is ",
            preferences.zoom ? "Enabled" : "Disabled"
          )
        : null,
      h(
        "button",
        { class: "toggle-option", onClick: toggleUI },
        "UI Experiments"
      ),
      showUI &&
        h(AsyncComponent, { componentPromise: asyncUIExperiments, toggleUI })
    )
  );
}

const applyProp = (obj, sm) => {
  if (!sm) {
    obj.hidden = true;
  }
  return obj;
};
