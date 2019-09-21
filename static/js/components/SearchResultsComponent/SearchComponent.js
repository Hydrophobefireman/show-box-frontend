import Component, { createElement as h } from "../../@ui/ui-lib.js";
import { Requests } from "../../services/httpService.js";
import { urlencode } from "../../common.js";
import { ResultComponent } from "../RecommendationsComponent/RecommendationsComponent.js";
import FakeMap from "@hydrophobefireman/j-utils/@build-modern/src/modules/es6/loose/Map/index.js";
const cache = new FakeMap();
const makeRequest = async q => {
  const _data = await Requests.post(
    "/api/data/search/",
    true,
    urlencode({ q })
  );
  return await _data.json();
};
console.log("Search-results cache:", cache);
const getData = async q => {
  q = (q || "").toLowerCase();
  try {
    const c = cache.get(q);
    if (c) {
      console.log("refreshing cache in background");
      makeRequest(q).then(data => cache.set(q, data));
      return c;
    }
    const data = await makeRequest(q);
    cache.set(q, data);
    return data;
  } catch (x) {
    return {
      hasError: true
    };
  }
};
export const defaultData = { data: { thumb: "" } };
export class SearchComponent extends Component {
  state = {
    resp: [],
    fetchingPromise: null,
    isFetching: false,
    showGhost: true
  };
  /**
   *
   * @param {Response} resp
   */
  showResults = resp => {
    if (resp.hasError) {
      return this.setState({
        hasError: true,
        resp: [],
        fetchingPromise: null,
        isFetching: false,
        showGhost: false
      });
    }
    return this.setState({
      resp: { data: resp.movies, q: this.props.q },
      showGhost: false,
      isFetching: false,
      fetchingPromise: null
    });
  };
  componentDidMount() {
    this.setState({
      isFetching: true,
      fetchingPromise: getData(this.props.q).then(this.showResults),
      showGhost: true
    });
  }
  componentDidUpdate(previousProps) {
    if (
      (this.state.isFetching || this.props.q === this.state.resp.q) &&
      (previousProps || {}).q === this.props.q
    ) {
      return;
    }
    this.setState({
      isFetching: true,
      hasError: false,
      fetchingPromise: getData(this.props.q).then(this.showResults),
      showGhost: true
    });
  }
  render({ q, customOnClick }, { showGhost, resp, hasError }) {
    if (hasError) {
      return h("div", null, "An Error occured");
    }
    if (showGhost) {
      return h(
        "div",
        { class: "rec-box" },
        Array.from({ length: 5 }, () => h(ResultComponent, defaultData))
      );
    } else {
      if (!resp.data || !resp.data.length) {
        return h("div", null, 'No Results found for:"', q, '"');
      }
      return h(
        "div",
        { class: "rec-box" },
        resp.data.map(x => h(ResultComponent, { data: x, customOnClick }))
      );
    }
  }
}
