import Component, {
  createElement as h,
  A,
  RouterSubscription,
  Router,
  Fragment
} from "../../@ui/ui-lib.js";
import "./HeaderComponent.css";
import PreferenceComponent from "./PreferenceComponent.js";
export class HeaderComponent extends Component {
  state = {
    currentUrl: Router.getPath,
    showMenu: false,
    preferences: { darkMode: false, zoom: false }
  };
  onURLChange = () => this.setState({ currentUrl: Router.getPath });
  componentWillMount() {
    RouterSubscription.subscribe(this.onURLChange);
  }
  componentDidMount() {
    const prefs = JSON.parse(localStorage.getItem("prefs") || "{}");
    this.setState(() => {
      const c = {};
      for (const i of Object.keys(prefs)) {
        c[i] = prefs[i];
      }
      return { preferences: c };
    });
  }
  componentDidUpdate() {
    const state = this.state;
    updateDarkModePreference(state);
    updateZoomPreference(state);
  }

  setPreferences = (prefname, val) =>
    this.setState(p => {
      p.preferences[prefname] = val;
      const prefs = JSON.parse(localStorage.getItem("prefs") || "{}");
      prefs[prefname] = val;
      localStorage.setItem("prefs", JSON.stringify(prefs));
      return p;
    });
  toggleMenu = () => this.setState(p => ({ showMenu: !p.showMenu }));
  // // // component will never unmount // // //
  //   componentWillUnmount() {
  //     RouterSubscription.unsubscribe(this.onUrlChange);
  //   }
  render({}, { currentUrl, showMenu, preferences }) {
    const c = h(
      Fragment,
      null,
      h(
        "header",
        null,
        h("img", {
          src:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDBWMHoiPjwvcGF0aD48cGF0aCBkPSJNMyAxOGgxOHYtMkgzdjJ6bTAtNWgxOHYtMkgzdjJ6bTAtN3YyaDE4VjZIM3oiIGZpbGw9IndoaXRlIj48L3BhdGg+PC9zdmc+",
          alt: "menu button",
          style: {
            position: "fixed",
            left: 0,
            cursor: "pointer"
          },
          onClick: this.toggleMenu
        }),
        currentUrl !== "/" &&
          h(
            A,
            { href: "/", class: ["banner-button", "router-link"] },
            "Home Page"
          ),
        currentUrl !== "/all" &&
          h(
            A,
            { href: "/all", class: ["banner-button", "router-link"] },
            "All Movies"
          )
      ),
      h(PreferenceComponent, {
        showMenu,
        preferences,
        setPreferences: this.setPreferences,
        removeMenu: this.toggleMenu
      })
    );
    return c;
  }
}

function updateDarkModePreference(state) {
  const dark = document.body.getAttribute("dark");
  const dm = state.preferences.darkMode;
  if (dm && !dark) {
    return document.body.setAttribute("dark", true);
  } else if (!dm && dark) {
    document.body.removeAttribute("dark");
  }
}

function updateZoomPreference(state) {
  const zoom = state.preferences.zoom;
  const meta = document.querySelector("meta[name='viewport']");
  const content = "width=device-width,initial-scale=1";
  console.log(zoom);
  meta.setAttribute("content", zoom ? content : content + ",user-scalable=no");
}
