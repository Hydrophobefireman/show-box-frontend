import Component from "../router/component.js";
import { TextComponent } from "../router/utils.js";
import { getEpisodeMetaData } from "../services/showMetaDataService.js";
import { loadHash, urlencode } from "../router/routerUtils.js";
const loadingHTML =
  "data:text/html;base64,PGRpdiBzdHlsZT0iZm9udC1mYW1pbHk6c2Fucy1zZXJpZjttYXJnaW46YXV0bzt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXdlaWdodDpib2xkIj5Mb2FkaW5nIEVwaXNvZGUgRGF0YTwvZGl2Pg==";

const extractHostName = url => {
  return new URL(url).hostname;
};
const sanitizeURL = url => {
  if (!url) {
    return null;
  }
  let f;
  try {
    f = new URL(url, `${location.protocol}//${location.hostname}`);
    f.protocol = "https:";
    f = f.toString();
  } catch (e) {
    f = url;
    if (url.startsWith("//")) {
      f = `https:${f}`;
    }
  }
  return f;
};
const attainEpisodeURL = async (id, num) => {
  let data = await getEpisodeMetaData(id, num);
  const { url: _url, alt1: _alt1, alt2: _alt2 } = data;
  const ret = {};
  const url = sanitizeURL(_url);
  const alt1 = sanitizeURL(_alt1);
  const alt2 = sanitizeURL(_alt2);
  ret.primaryURL = url || alt1 || alt2;
  ret.URLArray = [url, alt1, alt2].filter(x => x);
  return ret;
};

class IframeComponent extends Component {
  async update() {
    const state = this.getState;
    const episodeNumber = state.currentEp;
    const frameEl = this.children[1];
    if (
      episodeNumber === state.previousEP ||
      (!state.previousEP &&
        state.selectedURL &&
        frameEl.$element.src !== state.selectedURL)
    ) {
      frameEl.$element.src = loadingHTML;
      if (!state.selectedURL) {
        return;
      }
      return setTimeout(
        () =>
          state.selectedURL
            ? frameEl.setDomAttrs({ src: state.selectedURL }, true)
            : void 0,
        700
      );
    }
    const { URLArray, primaryURL } = await attainEpisodeURL(
      state.showID,
      episodeNumber
    );
    this.setState({ previousEP: episodeNumber }, false);
    this.setState({ URLArray }, false);
    if (primaryURL) {
      frameEl.setDomAttrs({ src: primaryURL }, false);
      this.children[0].data = `Now Playing: Episode:${episodeNumber}`;
    }
    this.updateChildren(this.$element);
    this.updateDOMAttrs();
  }
  constructor(type, props, children, domprops, evts) {
    super(type, props, children, domprops, evts);
  }
}

class URLSelectorComponent extends Component {
  update() {
    // if (!this.isConnected) {
    //   return this.updateDOMAttrs();
    // }
    const state = this.getState;
    const arr = state.URLArray;
    if (arr) {
      const comp = this;
      function handleButtonClick() {
        const $state = this.getState;
        const url = $state.url;
        console.log($state);
        comp.setState({ selectedURL: url });
      }
      this.destroyChildComponents(false, true);
      for (const child of arr) {
        const childComponent = new Component(
          "button",
          { url: child },
          [new TextComponent(extractHostName(child))],
          { className: "url-selector-button" }
        );
        childComponent.attachEventListener(
          "click",
          handleButtonClick.bind(childComponent)
        );
        this.addChild(childComponent);
      }
    }
    this.updateChildren(this.$element);
    this.updateDOMAttrs();
  }
  constructor(...args) {
    super(...args);
  }
}
class DownloadURLComponent extends Component {
  update() {
    const state = this.getState;
    const urls = state.URLArray;
    this.destroyChildComponents(false, true);
    if (urls) {
      const $child = new Component("div");
      for (const url of urls) {
        const child = new Component(
          "button",
          { url },
          [new TextComponent(`Download:${extractHostName(url)}`)],
          { className: "download-url-component" }
        ).attachEventListener("click", () => {
          loadHash(`/out?${urlencode({ url })}`);
        });
        $child.addChild(child, false);
      }
      this.addChild($child);
    }
    this.updateChildren(this.$element);
  }
  constructor(...a) {
    super(...a);
  }
}
export const iframeSelectorComponent = new IframeComponent(
  "div",
  { currentEp: null },
  [
    new TextComponent("", "episode-id"),
    new Component("iframe", {}, [], {
      src: loadingHTML,
      className: "frame-src"
    })
  ],
  {}
);
export const urlSelectorComponent = new URLSelectorComponent("div");
export const downloadURLComponent = new DownloadURLComponent("div", {}, []);
