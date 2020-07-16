import Component, { createElement as h, Fragment } from "@hydrophobefireman/ui-lib";
import { SearchBoxComponent } from "../SearchBoxComponent/SearchBoxComponent.js";
import { rot13 } from "../../rot13.js";
import { Requests } from "../../services/httpService.js";
import { URLBASE, urlencode } from "../../common.js";

const transformURL = s => {
  const _ = btoa(s);
  const dat = rot13(_);
  return dat
    .split("")
    .reverse()
    .join("");
};
export default class AddMediaComponent extends Component {
  state = { hasError: false, shows: [], isSearching: false };
  handleFormSubmit = async s => {
    this.setState({ isSearching: true });
    let shows;
    try {
      const data = await Requests.get(
        `/media/add-shows/fetch/?${urlencode({ s })}`,
        true
      );
      const resp = (await data.json()) || {};
      shows = resp.shows;
    } catch (e) {
      console.log(e);
      this.setState({ hasError: true, isSearching: false });
    }
    if (shows && shows.length) {
      this.setState({ shows, hasError: false, isSearching: false });
    } else {
      this.setState({ hasError: true, isSearching: false });
    }
  };
  componentDidMount() {
    document.title = "Add New Shows";
  }
  render({}, { shows }) {
    return "We Are Currently Working On a Fix!";
    return h(
      Fragment,
      null,
      h(SearchBoxComponent, {
        id: "add-media-component",
        onSubmit: this.handleFormSubmit
      }),
      this.state.hasError
        ? h("div", null, "An Error Ocurred")
        : shows.map(x =>
            h(
              "a",
              {
                style: {
                  width: "65%",
                  margin: "auto",
                  display: "block",
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "var(--text-color)"
                },
                href: `${URLBASE}/api/add/tv-show/lookup?${urlencode({
                  s: transformURL(x.url),
                  t: x.title
                })}`
              },
              x.title
            )
          )
    );
  }
}
