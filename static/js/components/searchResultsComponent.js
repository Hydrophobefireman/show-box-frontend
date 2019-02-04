import Component from "../router/component.js";
import { TextComponent } from "../router/utils.js";
import { showErrorComponent } from "./errorComponent.js";
import { asYouTypeComponent, animatedInputComponent } from "./index.js";
import { parseHash } from "../router/routerUtils.js";
import {
  searchShows,
  createResponseComponents
} from "../services/searchService.js";
import { getResponseComponent as getAsYouTypeResponseComponent } from "./socketResponseParser.js";
const buttonComponent =
  asYouTypeComponent.children[asYouTypeComponent.children.length - 1];
const responseComponent = createResponseComponents();
const loadingComponent = new TextComponent("Searching");

export const searchResultsComponent = new Component("div", {}, [
  asYouTypeComponent,
  loadingComponent,
  responseComponent
]);

const searchAndParseResults = async q => {
  const data = await searchShows(q);
  if (!data || !data.length) {
    showErrorComponent(
      `No Results found for your query:${q}`,
      responseComponent
    );
  }
  createResponseComponents(data);
  if (loadingComponent.isConnected) {
    loadingComponent.destroyComponent();
  }
};
function handleButtonClick() {
  const q = (this.getState.query || "").trim();
  if (q) {
    getAsYouTypeResponseComponent();
    searchAndParseResults(q);
  }
}
function handleKeyDown(e) {
  /*CTRL+u*/
  if (e.keyCode === 85 && e.ctrlKey) {
    e.preventDefault();
    this.setState({ value: "" });
    getAsYouTypeResponseComponent();
  } else if (e.keyCode === 13) {
    const val = this.getState.value || "";
    const data = val.trim();
    if (data) {
      getAsYouTypeResponseComponent();
      searchAndParseResults(data);
    }
  }
}
searchResultsComponent.onAttached = wasRendered => {
  const currentRouteData = parseHash(location.href);
  const inputComponent = animatedInputComponent.inputComponent;
  const value = inputComponent.getState.value;
  const qr = currentRouteData.qs.get("q");
  if (wasRendered) {
    getAsYouTypeResponseComponent();
    searchAndParseResults(qr);
  }
  if (qr !== value && qr) {
    if (!wasRendered) {
      searchAndParseResults(qr);
    }
    inputComponent.setState({ value: qr });
  }
  buttonComponent.attachEventListener(
    "click",
    handleButtonClick.bind(buttonComponent),
    true
  );
  inputComponent.attachEventListener(
    "keydown",
    handleKeyDown.bind(inputComponent),
    true
  );
};
