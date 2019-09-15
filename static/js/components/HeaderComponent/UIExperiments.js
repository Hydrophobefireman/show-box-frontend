import { h, Component, Fragment } from "../../@ui/ui-lib";
import values from "@hydrophobefireman/j-utils/src/modules/Object/values.js";
import keys from "@hydrophobefireman/j-utils/src/modules/Object/keys.js";
function normalize(obj) {
  const r = {};
  obj.map(x => {
    r[x.id] = x;
  });
  return r;
}
const experimentsJSON = JSON.parse(
  document.getElementById("ui-experiments").textContent
);
export default class UIExperiments extends Component {
  state = {
    experiments: normalize(experimentsJSON.experiments),
    showModal: false,
    addStyleElement: false
  };
  _reactToPrefChanges(exp) {
    const prop = this.state.experiments[exp];
    const value = !!prop.data.value.current;
    switch (exp) {
      case "FONT.CASING.EXPERIMENT":
        if (this.state.addStyleElement !== value)
          this.setState({ addStyleElement: value });
        break;

      default:
        break;
    }
  }
  _toggleModal = () => this.setState(ps => ({ showModal: !ps.showModal }));
  _updateConf = data => this.setState({ experiments: data });
  componentDidUpdate() {
    if (this.state.showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    keys(this.state.experiments).forEach(this._reactToPrefChanges, this);
  }
  render() {
    return h(
      Fragment,
      null,
      h(
        "button",
        { class: "toggle-option", onClick: this._toggleModal },
        "UI Experiments"
      ),
      this.state.showModal &&
        h(UiModal, {
          experiments: this.state.experiments,
          updateConf: this._updateConf,
          toggle: this._toggleModal
        }),
      this.state.addStyleElement &&
        h("style", null, "*{text-transform:lowercase !important}")
    );
  }
}

function UiModal({ experiments, updateConf, toggle }) {
  function onPrefUpdateClick(e) {
    const target = e.target;
    const set = target.dataset;
    const id = set.id;
    const val = !JSON.parse(set.value).current;
    experiments[id].data.value.current = val;
    updateConf(experiments);
  }
  return h(
    "div",
    { class: "modal-ui-selector" },
    h(
      "div",
      null,
      "Current Experiments",
      values(experiments).map(x =>
        h(
          "div",
          { data: JSON.stringify(x) },
          h(
            "div",
            { class: "expirement-opts" },
            x.displayName,
            h("div", { class: "info-text" }, x.additionalText),
            h(
              "div",
              { class: "current-exp" },
              "Current Value:",
              h("span", { class: "data-value" }, String(x.data.value.current))
            ),
            h(
              "div",
              { class: "c-edit" },
              h(
                "button",
                {
                  class: "search-button",
                  "data-id": x.id,
                  "data-value": JSON.stringify(x.data.value),
                  onClick: onPrefUpdateClick
                },
                "Toggle"
              )
            )
          )
        )
      ),
      h("button", { class: "_done", onClick: toggle }, "Done")
    )
  );
}
