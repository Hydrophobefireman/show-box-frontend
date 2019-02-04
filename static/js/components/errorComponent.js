import Component from "../router/component.js";
import { TextComponent } from "../router/utils.js";
export const showErrorComponent = (q, parent, _extraOnClick = () => void 0) => {
  /**
   * @todo add css
   */
  const errComponent = new Component("div", {}, [], {
    className: "err-component-full-cover"
  });
  const errDiv = new Component(
    "div",
    {},
    [new Component("div", {}, [new TextComponent(q)])],
    { className: "err-component-area" }
  ).addChild(
    new Component("button", {}, [new TextComponent("Okay")], {
      className: "search-button"
    }).attachEventListener("click", () => {
      errComponent.destroyComponent(false, true);
      parent.removeChild(errDiv);
      _extraOnClick();
    })
  );
  errComponent.addChild(errDiv);
  errComponent.render(parent.$element);
};
