import Router from "./router/router.js";
import "@babel/polyfill";
import _0 from "../css/main.css";
import _1 from "../css/recommendations.css";
import _2 from "../css/AYTResponses.css";
import { $ } from "./router/utils.js";
import { Requests } from "./services/httpService.js";
import { retry, applyExternalCss } from "./common.js";
window.oldTitle = document.title;
const appRoot = $.id("app-root");
const router = new Router(appRoot);
applyExternalCss("https://fonts.googleapis.com/css?family=Open+Sans");

appRoot.innerHTML = "Connecting to server";
retry(
  () => Requests.get("/collect/"),
  3,
  () => (appRoot.innerHTML = "could not connect"),
  200
).then(async () => {
  const indexComponent = import(/* webpackChunkName:"landing"*/ /*webpackPrefetch: true */ "./components/index.js");
  const searchResultsComponent = import(/* webpackChunkName:"searchResults"*/ /*webpackPrefetch: true */ "./components/searchResultsComponent.js");
  const playerComponent = import(/* webpackChunkName:"player"*/ /*webpackPrefetch: true */ "./components/playerComponent.js");
  const outComponent = import(/* webpackChunkName:"out"*/ /*webpackPrefetch: true */ "./components/outComponent.js");
  const addMediaComponent = import(/* webpackChunkName:"add-media"*/ /*webpackPrefetch: true */ "./components/mediaAddComponent.js");
  const allComponent = import(/* webpackChunkName:"all-shows"*/ /*webpackPrefetch: true */ "./components/allMoviesComponent.js");
  const obj = {
    "/": indexComponent,
    "/search/": searchResultsComponent,
    "/watch/": playerComponent,
    "/out/": outComponent,
    "/media/": addMediaComponent,
    "/all/": allComponent
  };
  const currRoute = router.currentRoute;
  const reqComponent = obj[currRoute];
  const md = await reqComponent;
  console.log("registering:", md.default, " first");
  router.registerComponent(currRoute, md.default);
  delete obj[currRoute];
  for (const [k, v] of Object.entries(obj)) {
    router.registerComponent(k, v);
  }
  appRoot.innerHTML = "";
  router.startLoad();
});
