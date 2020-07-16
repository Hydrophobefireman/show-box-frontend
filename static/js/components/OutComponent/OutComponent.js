import Component, {
  createElement as h,
  Router,
  Fragment
} from "@hydrophobefireman/ui-lib";

const CURRENT_AVAILABLE_WEBSITES = {
  "PROXY-PY.HEROKUAPP.COM": "https://proxy-py.herokuapp.com/video?url=",
  "DL-JS.HEROKUAPP.COM": "https://dl-js.herokuapp.com/video/?url=",
  "DL-PY.HEROKUAPP.COM": "https://dl-py.herokuapp.com/video/?url=",
  "PROXY-DL.HEROKUAPP.COM": "https://proxy-dl.herokuapp.com/video?url="
};
export default class OutComponent extends Component {
  componentDidMount() {
    document.title = "Open External Downloader";
  }
  render() {
    const url = new URLSearchParams(Router.getQs).get("u");
    return h(
      Fragment,
      null,
      Object.keys(CURRENT_AVAILABLE_WEBSITES).map(x =>
        h(
          "a",
          {
            class: "download-set-url-links",
            href: `${CURRENT_AVAILABLE_WEBSITES[x]}${encodeURIComponent(url)}`
          },
          x
        )
      )
    );
  }
}
