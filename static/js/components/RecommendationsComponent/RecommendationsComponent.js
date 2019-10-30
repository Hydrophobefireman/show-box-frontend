import Component, { createElement as h, Fragment, A } from "../../@ui/ui-lib";
import { Requests } from "../../services/httpService";
import {
  getWatchURL,
  getWebpifSupported,
  resize,
  decodeHTML
} from "../../common";

export function RecommendationsComponent() {
  return h(
    Fragment,
    null,
    h(
      "div",
      { style: { display: "block", marginTop: "50px" } },
      "Check some of these shows out!"
    ),
    h(Recommendations)
  );
}
class Recommendations extends Component {
  state = { resp: [] };
  componentWillMount() {
    Requests.get("/i/rec/")
      .then(data => data.json())
      .then(ret => {
        this.setState({ resp: ret.recommendations });
      });
  }
  render(props, { resp = [] }) {
    return h(
      "div",
      { class: "rec-box" },
      resp.map(child => h(ResultComponent, { data: child }))
    );
  }
}

export class ResultComponent extends Component {
  // componentDidMount() {
  //   const thumb = this.props.data.thumb;
  //   if (thumb && !this.state.thumb) {
  //   }
  // }
  // componentDidUpdate = this.componentDidMount;
  // componentWillUpdate() {
  //   if (this.state.thumb && !this.props.data.thumb)
  //     //ghost component
  //     this.setState({ thumb: "" });
  // }
  render({ data = {}, customOnClick }) {
    const child = h(
      Fragment,
      null,
      h(ImgComponent, {
        thumb: !data.thumb ? null : getWebpifSupported(data.thumb).then(resize)
      }),
      h("span", { class: "rec-title" }, decodeHTML(data.movie))
    );
    return !customOnClick
      ? getLink(data, child)
      : h(
          "div",
          {
            class: "rec-wrapper",
            onClick: () => customOnClick(data.id)
          },
          child
        );
  }
}
function getLink(data, child) {
  if (data.id)
    return h(
      A,
      {
        class: "rec-wrapper",
        href: getWatchURL(data.id, data.movie)
      },
      child
    );
  return h("span", { class: "rec-wrapper" }, child);
}
class ImgComponent extends Component {
  state = { thumb: "" };
  componentDidMount(prev) {
    if (this.props.thumb == null)
      return this.setState(t => (t != null && t.thumb ? { thumb: "" } : null));
    if (
      this.props.thumb &&
      this.props.thumb.then &&
      (!this.state.thumb || (prev && prev.thumb !== this.props.thumb))
    ) {
      this.props.thumb.then(x => x && this.setState({ thumb: x }));
    }
  }
  componentDidUpdate = this.componentDidMount;
  render({}, { thumb = "" }) {
    return h("div", {
      style: {
        backgroundImage: !thumb ? "none" : `url(${thumb})` //`url(${thumb || "about:blank"})`
      },
      class: "rec-image"
    });
  }
}
