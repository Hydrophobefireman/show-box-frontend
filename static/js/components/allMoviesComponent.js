import Component from "../router/component.js";

import { getIntegrity, Requests } from "../services/httpService.js";
import { generateComponents } from "../services/searchService.js";
import {
  asYouTypeComponent,
  animatedInputComponent,
  handleKeyDown,
  handleButtonClick,
  searchButtonComponent
} from "./index.js";

const resComponent = new Component("div", {}, [], { className: "rec-box" });
export const allComponent = new Component(
  "div",
  {},
  [asYouTypeComponent, resComponent],
  {}
);

allComponent.onAttached = async () => {
  animatedInputComponent.inputComponent.attachEventListener(
    "keydown",
    handleKeyDown.bind(animatedInputComponent.inputComponent),
    true
  );
  searchButtonComponent.attachEventListener(
    "click",
    handleButtonClick.bind(searchButtonComponent),
    true
  );
  const token = await getIntegrity();
  const data = await Requests.post(
    "/api/get-all/",
    true,
    { token },
    { "content-type": "application/json" }
  );
  const resp = await data.json();
  const components = await generateComponents(resp.movies);
  resComponent.destroyChildComponents(false, true);
  components.forEach(c => {
    resComponent.addChild(c, false);
  });
  resComponent.update();
};
