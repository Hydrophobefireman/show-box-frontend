import Component, { createElement as h, Fragment } from "../../@ui/ui-lib.js";
import { SearchBoxComponent } from "../SearchBoxComponent/SearchBoxComponent.js";
import { loadSearchResults, defaultTitle } from "../../common.js";
import { WebSocketResponseComponent } from "./WebSocketResponseComponent.js";
import { getSocket } from "../../services/socket.js";
export class DynamicResponseComponent extends Component {
  state = { value: "" };

  onInput = e => {
    const val = (e.target.value || "").trim();
    document.title = val ? `Search for ${val}` : defaultTitle;
    this.setState({ value: val });
  };
  loadSearchResults = () => {
    const value = this.state.value;
    const v = (value || "").trim();
    if (v) loadSearchResults(v);
    this.setState({ value: "" });
  };
  componentWillMount() {
    const socket = getSocket();
    socket.startConn("suggestqueries");
  }
  render() {
    return h(
      Fragment,
      null,
      h(SearchBoxComponent, {
        id: "landing-search-component",
        onSubmit: this.loadSearchResults,
        wssResponse: h(WebSocketResponseComponent, { val: this.state.value }),
        onInput: this.onInput
      })
    );
  }
}
