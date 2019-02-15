import Component, { TextComponent } from "./component";
import { $, isDev, safeDefine } from "./utils";
import { parseHash as _parseHash, loadHash } from "./routerUtils";
const _checkHashChangeHandler = () => {
    if (typeof window.onhashchange === "function") {
        isDev
            ? console.error("Current Hashchange handler:", window.onhashchange)
            : void 0;
        throw new Error("window already has a hashchange event listener. Have you re-initialized the router?");
    }
    return true;
};
const _aLink = new Component("a", {}, [new TextComponent("Click to go Back")], {
    style: "color:#000;display:flex;margin:auto;text-align:center;flex-direction:column;text-decoration:underline",
    href: "/"
});
_aLink.attachEventListener("click", function (e) {
    e.preventDefault();
    loadHash("/");
});
const _style = {
    style: "color:#000000;cursor:pointer;font-weight:bold"
};
const handlers = {
    404: new Component("div", {}, [new TextComponent("No page exists with the given URL"), _aLink], _style),
    500: new Component("div", {}, [
        new TextComponent("An Error Occured while processing your Request..please try again"),
        _aLink
    ], _style)
};
export default class Router {
    constructor(root = $.id("app-root") ||
        window.appRoot ||
        document.body) {
        //private.
        //fields
        this.routeList = [];
        this.routeData = {};
        this.parseHash = _parseHash;
        this.startLoad = this.routeChange;
        this.load = loadHash;
        this.root = root;
        _checkHashChangeHandler();
        window.onhashchange = (e) => {
            this.navData = e;
            this._runDirectives();
            return this.routeChange();
        };
        this._runDirectives();
    }
    get statusHandler() {
        return handlers;
    }
    //functions
    routeChange() {
        const { res, actualRoute: actualRoute, args } = this.getRouteProps(location.href);
        if (!res) {
            this.mountComponent(this.statusHandler["404"], this.root);
        }
        else {
            const { component, strictMatching } = this.routeData[actualRoute];
            if (strictMatching) {
                if (!this.routeData[this.currentRoute + this.currentPath.join("/")]) {
                    return this.mountComponent(this.statusHandler["404"], this.root);
                }
            }
            this.mountComponent(component, this.root);
        }
    }
    //functions
    mountComponent(component, mountOn, preserveState = true) {
        if (this.currentComponent) {
            if (this.currentComponent === component) {
                isDev ? console.log("Same Component..not mounting") : void 0;
                // same component..like 404 page
                component.onAttached(false);
                return;
            }
            this.currentComponent.destroyComponent(preserveState);
        }
        component.render(mountOn);
        this.currentComponent = component;
    }
    getRouteProps(route) {
        if (this.routeList.includes(route)) {
            return {
                res: !0,
                args: null,
                actualRoute: route
            };
        }
        try {
            const _sanitizedRoute = this.parseHash(route);
            const sanitizedRoute = _sanitizedRoute.route;
            if (this.routeList.includes(sanitizedRoute)) {
                return {
                    res: !0,
                    args: _sanitizedRoute.path,
                    actualRoute: sanitizedRoute
                };
            }
            else {
                return {
                    res: !1
                };
            }
        }
        catch (f) {
            console.log(f);
            return {
                res: !1
            };
        }
    }
    isUserGoingBack(nextRoute) {
        const navDat = this.navData || {}, fullURL = `${location.protocol}//${location.host}/#${nextRoute}`;
        return fullURL === navDat.oldURL;
    }
    registerComponent(route, component, strictMatching) {
        if (!(component instanceof Component)) {
            if ("function" === typeof component.then) {
                component.then(mod => {
                    this.routeData[route] = {
                        component: mod.default,
                        strictMatching
                    };
                    this.routeList.push(route);
                });
            }
            else {
                throw new Error("Can not register component please make sure your componentClass extends Component");
            }
        }
        this.routeData[route] = { component, strictMatching };
        this.routeList.push(route);
    }
    //getters
    get currentRoute() {
        return this.parseHash(location.href).route;
    }
    get currentPath() {
        return this.parseHash(location.href).path;
    }
    get currentQs() {
        return this.parseHash(location.href).qs;
    }
    async _runConditionals() {
        const elementArray = [
            ...document.querySelectorAll("[_routerif]")
        ];
        for (const element of elementArray) {
            const _condition = $.get(element, "_routerif");
            const _then = $.get(element, "_routerthen");
            const condition = new Function("$", `return ${_condition}`).call(this, element);
            if (condition) {
                if (element instanceof routerEmptyElement) {
                    element.replaceWith(element.$);
                }
                new Function("$", _then).call(this, element);
            }
            else {
                if (!(element instanceof routerEmptyElement)) {
                    const el = new routerEmptyElement();
                    el.setAttribute("_routerif", _condition);
                    el.$ = element;
                    element.replaceWith(el);
                }
            }
        }
    }
    async _runListeners() {
        const elementArray = [
            ...document.querySelectorAll("[_routerevt][_routeract]")
        ];
        for (const element of elementArray) {
            const event = $.get(element, "_routerevt");
            const func = $.get(element, "_routeract");
            _attachEventListener(element, event, func, this);
        }
    }
    async _runDirectives() {
        this._runConditionals();
        this._runListeners();
    }
}
class routerEmptyElement extends HTMLElement {
    constructor() {
        super();
        const a = this.attachShadow({ mode: "open" });
        a.appendChild(Object.assign(document.createElement("style"), {
            innerHTML: ":host{display:none}"
        }));
    }
}
safeDefine("router-empty", routerEmptyElement);
function _attachEventListener(element, event, listener, routerInstance) {
    element[event] = (e) => {
        console.log(listener);
        return new Function("$", "$event", listener).call(routerInstance, element, e);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxFQUFFLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxJQUFJLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEUsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLEVBQUU7SUFDbkMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxZQUFZLEtBQUssVUFBVSxFQUFFO1FBQzdDLEtBQUs7WUFDSCxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDO1lBQ25FLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNYLE1BQU0sSUFBSSxLQUFLLENBQ2IscUZBQXFGLENBQ3RGLENBQUM7S0FDSDtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRTtJQUM3RSxLQUFLLEVBQ0gsdUdBQXVHO0lBQ3pHLElBQUksRUFBRSxHQUFHO0NBQ1YsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxVQUFTLENBQWE7SUFDeEQsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25CLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQixDQUFDLENBQUMsQ0FBQztBQUNILE1BQU0sTUFBTSxHQUFHO0lBQ2IsS0FBSyxFQUFFLCtDQUErQztDQUN2RCxDQUFDO0FBQ0YsTUFBTSxRQUFRLEdBQUc7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