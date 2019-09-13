import Component, { createElement as h } from "../../@ui/ui-lib.js";
export class SearchBoxComponent extends Component {
  state = { isFocused: false, value: "" };
  onFocus = () => !this.state.value && this.setState({ isFocused: true });
  onBlur = () => !this.state.value && this.setState({ isFocused: false });
  onInput = e => this.setState({ value: e.target.value });
  onSubmit = () => this.props.onSubmit(this.state.value);
  render(
    {
      id,
      buttonText = "search",
      labelText = "search for shows",
      onInput,
      wssResponse
    },
    { isFocused }
  ) {
    const cls = ["_animate", isFocused ? "moveup" : "movedown"];
    return h(
      "div",
      { class: "search-component" },

      h(
        "form",
        { action: "javascript:", onSubmit: this.onSubmit },
        h("label", { class: cls, for: id }, labelText),
        h(InputComponent, {
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          id,
          onInput: e => {
            this.onInput(e);
            onInput != null ? onInput(e) : void 0;
          }
        }),
        wssResponse,
        h("button", { class: "search-button" }, buttonText)
      )
    );
  }
}

function InputComponent({ onFocus, onBlur, onInput, id }) {
  return h("input", { onFocus, onBlur, onInput, id, class: "paper-input" });
}
