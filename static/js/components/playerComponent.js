import Component from "../router/component.js";
import { TextComponent } from "../router/utils.js";
import {
  asYouTypeComponent,
  animatedInputComponent,
  handleKeyDown as defaulthandleKeyDown
} from "./index.js";
import { parseHash } from "../router/routerUtils.js";
import { getShowMetaData } from "../services/showMetaDataService.js";
import { showErrorComponent } from "./errorComponent.js";
import {
  iframeSelectorComponent,
  urlSelectorComponent,
  downloadURLComponent
} from "./iframeComponent.js";
const addEpisodes = (component, _nos) => {
  const nos = parseInt(_nos);
  for (let i = 1; i < nos + 1; i++) {
    const child = new Component(
      "button",
      { episode: i },
      [new TextComponent(`Episode ${i}`)],
      { className: "episode-button" }
    );
    child.attachEventListener("click", () => {
      component.setState({ currentEp: child.getState.episode });
    });
    component.addChild(child);
  }
  component.update();
};
const currentShowName = new TextComponent("");
const currentShowNameComponent = new Component("h2", {}, [currentShowName], {
  style: "font-weight:bold"
});
const episodeSelectorComponent = new Component("div", { currentEp: null }, [], {
  className: "episode-selector"
});

export const playerComponent = new Component("div", {}, [
  asYouTypeComponent,
  currentShowNameComponent,
  urlSelectorComponent,
  iframeSelectorComponent,
  episodeSelectorComponent,
  downloadURLComponent
]);

iframeSelectorComponent.bindData(
  "currentEp",
  episodeSelectorComponent,
  "currentEp",
  !1
);
iframeSelectorComponent.bindData(
  "URLArray",
  urlSelectorComponent,
  "URLArray",
  !1
);
iframeSelectorComponent.bindData(
  "URLArray",
  downloadURLComponent,
  "URLArray",
  false
);
iframeSelectorComponent.bindData(
  "selectedURL",
  urlSelectorComponent,
  "selectedURL",
  true
);
playerComponent.onDestroy = () => {
  episodeSelectorComponent.destroyChildComponents(!1, !0);
};

playerComponent.onAttached = async () => {
  currentShowName.textContent = "Loading";
  animatedInputComponent.inputComponent.attachEventListener(
    "keydown",
    defaulthandleKeyDown.bind(animatedInputComponent.inputComponent),
    !0
  );
  const currentQS = parseHash(location.href).qs;
  const showID = currentQS.get("id");
  const metaData = await getShowMetaData(showID);
  if (metaData.error) {
    return showErrorComponent(
      "No TV Show exists with the given ID",
      playerComponent,
      () => playerComponent.destroyComponent(!0)
    );
  }
  iframeSelectorComponent.setState({ showID }, !1);
  episodeSelectorComponent.destroyChildComponents(false, true);
  addEpisodes(episodeSelectorComponent, metaData.episode_meta);
  currentShowName.textContent = `Watch: ${metaData.movie_name}  (${
    metaData.episode_meta
  } episodes)`;

  episodeSelectorComponent.setState({ currentEp: 1 });
};
iframeSelectorComponent.onDestroy = () => iframeSelectorComponent.clearState();
