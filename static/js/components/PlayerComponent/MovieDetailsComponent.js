import Component, { createElement as h } from "../../@ui/ui-lib.js";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner.js";
import { getMovieDetails, txtComponent } from "./util.js";
import { InternalPlayerComponent } from "./InternalPlayer.js";
export class MovieDetailsComponent extends Component {
  state = {
    badId: false,
    fetchingDetails: false,
    movieName: "",
    episodeMeta: 0
  };
  render({ id }, { badId, fetchingDetails, movieName, episodeMeta }) {
    if (badId || (!movieName && !fetchingDetails)) {
      return txtComponent;
    } else if (fetchingDetails) {
      return h(
        "div",
        { "data-fetch": JSON.stringify(this.props) },
        "Loading Movie Data",
        h("div", null, h(LoadingSpinner))
      );
    } else {
      return h(InternalPlayerComponent, {
        movieName,
        id,
        episodeMeta
      });
    }
  }
  componentDidMount(oldProps) {
    const id = this.props.id;
    if (!id) {
      this.setState({ badId: true });
    }
    if (
      !this.state.fetchingDetails &&
      (!oldProps || oldProps.id !== this.props.id)
    ) {
      this.setState({ badId: false, fetchingDetails: true });
      return getMovieDetails(id)
        .then(x =>
          this.setState({
            episodeMeta: x.episode_meta,
            badId: false,
            fetchingDetails: false,
            movieName: x.movie
          })
        )
        .catch(
          e =>
            console.log(e) ||
            this.setState({ badId: true, fetchingDetails: false })
        );
    }
  }
  componentDidUpdate = this.componentDidMount;
}
