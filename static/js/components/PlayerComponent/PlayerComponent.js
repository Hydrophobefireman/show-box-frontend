import Component, {
  createElement as h,
  Fragment,
  Router
} from "../../@ui/ui-lib.js";

import { DynamicResponseComponent } from "../DynamicResponseComponent/DynamicResponseComponent.js";
import { MovieDetailsComponent } from "./MovieDetailsComponent.js";
import { txtComponent } from "./util.js";

export default class PlayerComponent extends Component {
  state = { badId: false };
  get movieId() {
    return new URLSearchParams(Router.getQs).get("id");
  }
  getChildren({}, { badId }) {
    if (badId) {
      return txtComponent;
    }
    return h(MovieDetailsComponent, { id: this.movieId });
  }
  render(props, state) {
    return h(
      Fragment,
      null,
      h(DynamicResponseComponent),
      h("section", { data: "player-component" }, this.getChildren(props, state))
    );
  }
}
