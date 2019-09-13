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
    preferences: { darkMode: false }
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
    const dark = document.body.getAttribute("dark");
    const dm = this.state.preferences.darkMode;
    if (dm && !dark) {
      return document.body.setAttribute("dark", true);
    } else if (!dm && dark) {
      document.body.removeAttribute("dark");
    }
  }

  setPreferences = (prefname, val) =>
    this.setState(p => {
      p.preferences[prefname] = val;
      const prefs = JSON.parse(localStorage.getItem("prefs") || "{}");
      prefs[prefname] = val;
      localStorage.setItem("prefs", JSON.stringify(prefs));
      return p;
    });
  toggleMenu = e => {
    e.stopPropagation();
    this.setState(p => ({ showMenu: !p.showMenu }));
  };
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
            "All Shows"
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
