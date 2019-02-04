import Component from "../router/component.js";
import { TextComponent } from "../router/utils.js";
import { getNewInputComponent } from "./inputComponent.js";
import { Requests } from "../services/httpService.js";
import { urlencode } from "../router/routerUtils.js";

const animInput = getNewInputComponent("Press enter to search", false);
const inputComponent = animInput.inputComponent;
export const addMediaComponent = new Component("div", {}, [
  animInput.component
]);
async function handleKeyDown(e) {
  if (e.keyCode === 13) {
    const $c = TextComponent.find("$$", addMediaComponent.$element)[0];
    if ($c) {
      $c.remove();
    }
    const val = (e.target.value || "").trim();
    if (val) {
      let shows;
      try {
        const data = await Requests.get(
          `/media/add-shows/fetch/?${urlencode({ s: val })}`,
          true
        );
        const resp = (await data.json()) || {};
        shows = resp.shows;
      } catch (e) {}
      if (shows && shows.length) {
        const children = [];
        for (const _child of shows) {
          const { title, url } = _child;
          const child = new Component(
            "div",
            { url },
            [new TextComponent(title)],
            {
              style:
                "width:65%;margin:auto;text-decoration:underline;cursor:pointer"
            }
          );
          child.attachEventListener(
            "click",
            async function() {
              const $resp = await Requests.get(
                `/api/add/tv-show/lookup?${urlencode({ s: this.getState.url })}`
              );
              const resp = await $resp.text();
              addMediaComponent.destroyChildComponents(false, true);
              addMediaComponent.$element.appendChild(new TextComponent(resp));
              const a = document.createElement("a");
              a.href = `#/search?${urlencode({ q: title })}`;
              a.style.margin = "auto";
              a.style.display = "block";
              a.innerHTML = `Search for ${title}`;
              addMediaComponent.$element.appendChild(a);
              //   addMediaComponent.appendChild(a);
            }.bind(child)
          );
          children.push(child);
          addMediaComponent.addChild(new Component("div", {}, children));
          addMediaComponent.update();
        }
      } else {
        return addMediaComponent.$element.appendChild(
          new TextComponent("No Results found", "$$")
        );
      }
    }
  }
}
inputComponent.attachEventListener(
  "keydown",
  handleKeyDown.bind(inputComponent)
);
