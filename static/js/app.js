import Router from "./router/router.js";
import "@babel/polyfill";
import _css from "../css/main.css";
import { $ } from "./router/utils.js";
import { indexComponent } from "./components/index.js";
import { searchResultsComponent } from "./components/searchResultsComponent.js";
import { playerComponent } from "./components/playerComponent.js";
import { outComponent } from "./components/outComponent.js";
import { addMediaComponent } from "./components/mediaAddComponent.js";
import { allComponent } from "./components/allMoviesComponent.js";
import { Requests } from "./services/httpService.js";
import { retry } from "./common.js";
window.oldTitle = document.title;
const appRoot = $.id("app-root");
const router = new Router(appRoot);

const obj = {
  "/": indexComponent,
  "/search/": searchResultsComponent,
  "/watch/": playerComponent,
  "/out/": outComponent,
  "/media/": addMediaComponent,
  "/all/": allComponent
};

appRoot.innerHTML = "Connecting to server";
retry(
  () => Requests.get("/collect/"),
  3,
  () => (appRoot.innerHTML = "could not connect"),
  200
).then(() => {
  for (const [k, v] of Object.entries(obj)) {
    router.registerComponent(k, v);
  }
  appRoot.innerHTML = "";
  router.startLoad();
});
