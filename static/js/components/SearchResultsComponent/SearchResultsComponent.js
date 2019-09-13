import Component, {
  createElement as h,
  Router,
  Fragment
} from "../../@ui/ui-lib.js";
import { DynamicResponseComponent } from "../DynamicResponseComponent/DynamicResponseComponent.js";
import { SearchComponent } from "./SearchComponent.js";
export default class SearchResultsComponent extends Component {
  get query() {
    const qs = new URLSearchParams(Router.getQs);
    return qs.get("q");
  }
  componentDidMount() {
    document.title = `Search for ${this.query}`;
  }
  componentWillUpdate = this.componentDidMount;
  constructor(props) {
    super(props);
  }
  render() {
    return h(
      Fragment,
      null,
      h(DynamicResponseComponent),
      h(
        "section",
        { data: "search-results" },
        h(SearchComponent, { q: this.query })
      )
    );
  }
}
