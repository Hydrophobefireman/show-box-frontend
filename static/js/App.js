import { createElement as h, render, Fragment } from "@hydrophobefireman/ui-lib";
import "./App.css";
import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent.js";
import { AppLoader } from "./AppLoader.js";

const assignProm = import(
  "@hydrophobefireman/j-utils/@build-modern/src/modules/Object/assign.js"
);
/**
 * @CSS
 */
import "./components/LandingComponent/LandingComponent.css";
import "./components/ErrorComponent/ErrorComponent.css";
import "./components/SearchBoxComponent/SearchBoxComponent.css";
import "./components/DynamicResponseComponent/DynamicResponseComponent.css";
import "./components/RecommendationsComponent/RecommendationsComponent.css";
import "./components/PlayerComponent/PlayerComponent.css";
const App = h(
  Fragment,
  null,
  h(HeaderComponent),
  h("main", { class: "center" }, h(AppLoader))
);
const root = document.getElementById("app-root");
root.removeAttribute("style");
const ns = document.querySelector("noscript");
ns.remove ? ns.remove() : document.body.removeChild(ns);
render(App, root);
window.addEventListener(
  "load",
  () => {
    assignProm.then(x =>
      document.head.appendChild(
        x.default(document.createElement("link"), {
          rel: "stylesheet",
          href: "https://fonts.pycode.tk/open-sans.css"
        })
      )
    );
  },
  { once: true }
);
