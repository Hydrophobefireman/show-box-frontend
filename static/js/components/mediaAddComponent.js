import Component from "../router/component.js";
import { TextComponent } from "../router/utils.js";
import { getNewInputComponent } from "./inputComponent.js";
import { Requests } from "../services/httpService.js";
import { urlencode } from "../router/routerUtils.js";
import { rot13 } from "../common.js";
const transformURL = s => {
  const _ = btoa(s);
  const dat = rot13(_);
  return dat
    .split("")
    .reverse()
    .join("");
};
const animInput = getNewInputComponent("Press enter to search", false);
const inputComponent = animInput.inputComponent;
export const addMediaComponent = new Component("div", {}, [
  animInput.component
]);
const attachClkListener = (child, title) => {
  child.attachEventListener(
    "click",
    async function() {
      const $resp = await Requests.get(
        `/api/add/tv-show/lookup?${urlencode({
          s: transformURL(this.getState.url),
          t: this.getState.title
        })}`
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
};
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
            { url, title },
            [new TextComponent(title)],
            {
              style:
                "width:65%;margin:auto;text-decoration:underline;cursor:pointer"
            }
          );
          attachClkListener(child, title);
          children.push(child);
        }
        addMediaComponent.addChild(new Component("div", {}, children), false);
        addMediaComponent.update();
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
