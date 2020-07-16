import Component, {
  createElement as h,
  Fragment,
  A
} from "@hydrophobefireman/ui-lib";
import { defaultHTML as _default, sanitizeURL, getHost } from "./util.js";
import { decodeHTML, urlencode } from "../../common.js";
import { Requests } from "../../services/httpService.js";
export class InternalPlayerComponent extends Component {
  state = { src: _default, URLs: [], currentEp: 0, previousEp: 0 };
  componentDidMount() {
    const title = this.props.movieName;
    title && (document.title = "Watch " + title);
    if (
      this.state.currentEp === this.state.previousEp &&
      this.state.currentEp == 0
    ) {
      return getFetchFn(1, this.setEpisode, this.props.id)();
    }
    if (this.state.src !== _default && this.state.URLs.includes(this.state.src))
      return;
    if (this.state.URLs.length) {
      this.setState({ src: this.state.URLs[0] });
    }
  }
  componentDidUpdate = this.componentDidMount;
  setSrc = src => this.setState({ src });
  _update = () => this.setState({ src: _default });
  setEpisode = (n, arr) => {
    this.setState(k => ({ currentEp: n, previousEp: k.currentEp, URLs: arr }));
  };
  render({ movieName, episodeMeta, id }, { URLs, currentEp }) {
    return h(
      Fragment,
      null,
      h("h2", { style: { fontWeight: "bold" } }, decodeHTML(movieName)),
      h(
        "h2",
        { style: { fontWeight: "bold" } },
        "Now Playing Episode: ",
        currentEp
      ),
      URLs &&
        URLs.map(x =>
          h(URLSelectorComponent, { url: x, onClick: this.setSrc })
        ),
      h("iframe", { class: "frame-src", src: this.state.src }),
      h(EpisodeSelectorComponent, {
        data: episodeMeta,
        updater: this.setEpisode,
        id,
        up: this._update
      }),
      URLs && URLs.map(x => h(URLDownloaderComponent, { href: x }))
    );
  }
}
function URLSelectorComponent({ url, onClick }) {
  if (!url) return null;
  return h(
    "button",
    {
      onClick() {
        onClick(url);
      },
      class: "url-selector-button",
      style: { cursor: "pointer" }
    },
    getHost(url)
  );
}
function URLDownloaderComponent({ href }) {
  if (!href) return null;
  const url = `/out?${urlencode({ u: href })}`;
  return h(
    A,
    { href: url, class: ["download-url-component", "search-button"] },
    "Download from: ",
    getHost(href)
  );
}
function EpisodeSelectorComponent({ data, updater, id, up }) {
  return h(
    "div",
    null,
    Array.from({ length: data }).map((_, i) =>
      h(
        "button",
        {
          class: "selector-button",
          onClick: getFetchFn(i + 1, updater, id, up)
        },
        "Episode:",
        i + 1
      )
    )
  );
}

function getFetchFn(i, updater, id, up) {
  return async function() {
    up && up();
    const x = await Requests.post(
      "/api/build-player/ep/",
      true,
      { mid: id, eid: i },
      { "content-type": "application/json" }
    );
    const ret = await x.json();
    return updater(i, [ret.url, ret.alt1, ret.alt2].map(sanitizeURL));
  };
}
