import Component, { createElement as h, A } from "../../@ui/ui-lib.js";
import { getSocket } from "../../services/socket.js";
import { getWatchURL, decodeHTML } from "../../common.js";
let socket;
export class WebSocketResponseComponent extends Component {
  state = { resp: [], prevVal: "" };
  onMessage = e => {
    if (e.data) {
      this.setState({
        resp: e.data.map(x => ({
          movie: x.movie,
          href: getWatchURL(x.id, x.movie)
        }))
      });
    } else {
      this.setState({ resp: [] });
    }
  };
  async fetchResponses() {
    const v = this.props.val;
    const prev = this.state.prevVal;
    if (v == prev || !v) {
      if (this.state.resp.length && !v)
        this.setState({ resp: [], prevVal: "" });
      return;
    }
    console.log("fetching");
    this.setState({ prevVal: v });
    socket = getSocket();
    await socket.startConn("suggestqueries");
    socket.onmessage = this.onMessage;
    socket.sendString(v);
  }
  componentWillUpdate = this.fetchResponses;
  componentWillMount = this.fetchResponses;
  render() {
    const cls = ["response-parent"];
    if (this.state.resp.length) cls.push("has-data");
    return h(
      "div",
      { class: cls },
      this.state.resp.map(x =>
        h(
          A,
          { class: ["movie-link", "query-response"], href: x.href },
          decodeHTML(x.movie)
        )
      )
    );
  }
}
