import Component, { createElement as h, Fragment } from "@hydrophobefireman/ui-lib";
import { Requests } from "../../services/httpService.js";
import { defaultData } from "../SearchResultsComponent/SearchComponent.js";
import { ResultComponent } from "../RecommendationsComponent/RecommendationsComponent.js";
import { DynamicResponseComponent } from "../DynamicResponseComponent/DynamicResponseComponent.js";
let cachedResults = [];

// const clearCache = () => (cachedResults.length = 0);
class InternalAllResultsComponent extends Component {
  state = { hasResults: false, showGhost: true, data: [] };
  componentDidMount() {
    document.title = "All TV Shows";
    if (cachedResults.length) {
      return this.setState({ resp: cachedResults, showGhost: false });
    }
    Requests.post("/api/get-all/", true, {})
      .then(data => data.json())
      .then(js => {
        cachedResults = js.movies;
        this.setState({ resp: js.movies, showGhost: false });
      });
  }
  getChildNodes({ showGhost, resp }) {
    if (showGhost) {
      return h(
        "div",
        { class: "rec-box" },
        Array.from({ length: 5 }, () => h(ResultComponent, defaultData))
      );
    }
    return h(
      "div",
      { class: "rec-box" },
      resp.map(x => h(ResultComponent, { data: x }))
    );
  }

  render({}, state) {
    return h("section", { data: "all-results" }, this.getChildNodes(state));
  }
}
export default function AllResultsComponent() {
  return h(
    Fragment,
    null,
    h(DynamicResponseComponent),
    h(InternalAllResultsComponent)
  );
}
