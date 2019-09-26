import Component, {
  Router,
  createElement as h,
  AsyncComponent,
  absolutePath,
  redirect,
  Fragment
} from "./@ui/ui-lib.js";
import { Requests } from "./services/httpService.js";
import { retry } from "./common.js";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner.js";
import { ErrorComponent } from "./components/ErrorComponent/ErrorComponent.js";

function NotFoundComponent() {
  return h("div", null, "The Requested URL was not found");
}
const shouldPrefetch = (window.__appConfig).SHOULD_PREFETCH_MODULES

const getDefault = resolvedModule => resolvedModule.default;
/**
 * @type {{[path:string]:()=>Promise<{default:Component}>}}
 */

const componentMap = {
  "/": () =>
    import(
      /* webpackChunkName:"/@lazy--landing"*/ "./components/LandingComponent/LandingComponent.js"
    ).then(getDefault),
  "/search": () =>
    import(
      /* webpackChunkName:"/@lazy--search-results"*/ "./components/SearchResultsComponent/SearchResultsComponent.js"
    ).then(getDefault),
  "/all": () =>
    import(
      /* webpackChunkName:"/@lazy--all"*/ "./components/AllResultsComponent/AllResultsComponent.js"
    ).then(getDefault),
  "/watch": () =>
    import(
      /* webpackChunkName: "/@lazy--player-component"*/ "./components/PlayerComponent/PlayerComponent.js"
    ).then(getDefault),
  "/media/add": () =>
    import(
      /* webpackChunkName:"/@lazy--add-media"*/ "./components/AddMediaComponent/AddMediaComponent.js"
    ).then(getDefault),
  "/out": () =>
    import(
      /* webpackChunkName:"/@lazy--out"*/ "./components/OutComponent/OutComponent.js"
    ).then(getDefault)
};
export class AppLoader extends Component {
  state = {
    hasServerResponse: false,
    isContentLoadable: false,
    errorComponent: ErrorComponent,
    hasPrefetchedComponents: false
  };
  _prefetchComponents() {
    console.log("prefetching sources");
    for (const c of Object.keys(componentMap)) {
      const d = componentMap[c];
      d();
    }
  }
  _onMount = () => {
    if (!this.state.hasPrefetchedComponents) {
    if(shouldPrefetch)  this._prefetchComponents();
      this.setState({ hasPrefetchedComponents: true });
    }
    return Requests.get("/collect/");
  };
  componentDidMount() {
    const qs = Router.getQs;
    let c;
    if ((c = new URLSearchParams(qs).get("__loader"))) {
      redirect(c);
      return;
    }
  }
  componentWillMount = () => {
    if (this.state.hasServerResponse) {
      this.setState({ hasServerResponse: false });
    }
    return void retry(this._onMount, 3, 500)
      .then(() =>
        this.setState({ hasServerResponse: true, isContentLoadable: true })
      )
      .catch(() =>
        this.setState({ hasServerResponse: true, isContentLoadable: false })
      );
  };
  render(_, state) {
    if (!state.hasServerResponse) {
      return h(
        Fragment,
        null,
        h(LoadingSpinner),
        h("div", null, "Connecting to the server")
      );
    } else {
      if (state.isContentLoadable) {
        return h(
          Router,
          { fallbackComponent: NotFoundComponent },
          Object.keys(componentMap).map(key =>
            h(AsyncComponent, {
              componentPromise: componentMap[key],
              path: absolutePath(key)
            })
          )
        );
      } else {
        return h(state.errorComponent, {
          onRetryClick: this.componentWillMount
        });
      }
    }
  }
}
