import { isDev, noop, $, setattrs, _ComponentAsString, selfClosingTags, getClassAsArray } from "./utils";
let renderCount = 0;
class BaseComponent {
    constructor() {
        this.eventListeners = {};
        this.hasUnAttachedEventListeners = false;
    }
    /**
     *
     */
    static createElement(component, parent, componentInstance, attachToDOM = true) {
        return (() => {
            if (!parent) {
                throw new Error("no parent element");
            }
            if (componentInstance.isConnected) {
                throw new Error("Cannot render a connected element. did you mean to call update()?");
            }
            if (isDev) {
                console.log(`Render Called ${++renderCount} times`);
            }
            const { element, children, props } = component;
            const el = $.create(element, props);
            for (const child of children) {
                try {
                    if (child.shouldRender()) {
                        child.render(el, true);
                    }
                }
                catch (e) {
                    console.log(e, child, children);
                }
            }
            componentInstance.isConnected = true;
            componentInstance.isMountedTo = parent;
            componentInstance.$element = el;
            componentInstance.wasEverMounted = true;
            if (attachToDOM) {
                parent.appendChild(el);
            }
            componentInstance.onAttached(true);
            if (componentInstance.hasUnAttachedEventListeners) {
                for (const [evt, listener] of Object.entries(componentInstance.eventListeners)) {
                    isDev ? console.log("Attaching listener:", evt) : void 0;
                    el.addEventListener(evt, listener);
                }
            }
            return el;
        })();
    }
    attachEventListener(event, listener, override, once = false) {
        const previousListener = this.eventListeners[event];
        if (previousListener && this.isConnected) {
            if (!override) {
                throw new Error("Cannot append multiple listeners.. please combine them in a single function");
            }
            else {
                this.$element.removeEventListener(event, previousListener);
            }
        }
        this.eventListeners[event] = listener;
        if (!this.isConnected) {
            this.hasUnAttachedEventListeners = true;
            return this;
        }
        this.$element.addEventListener(event, listener, { once });
        return this;
    }
    detachEventListener(event, listener) {
        this.$element.removeEventListener(event, listener);
        delete this.eventListeners[event];
        return this;
    }
}
BaseComponent.componentToString = _ComponentAsString;
export default class Component extends BaseComponent {
    constructor(name, props = {}, children = [], domAttrs = {}, events = {}) {
        super();
        this.DOMAttrs = {};
        this.bindings = {};
        this.wasEverMounted = false;
        this.updateDOMAttrs = () => this.isConnected ? setattrs(this.$element, this.DOMAttrs) : void 0;
        this.children = [];
        this.cleanUp = noop;
        this.onAttached = (wasRendered) => void 0;
        this.beforeRender = noop;
        this._props = props;
        this.element = name;
        this.children = children;
        if (selfClosingTags.includes(this.element) && this.children.length) {
            throw new Error(`Cannot add child elements to self closing element:${this.element}`);
        }
        for (const [k, v] of Object.entries(events)) {
            this.attachEventListener(k, v);
        }
        this.setDomAttrs(domAttrs, false);
    }
    updateChildren(parent) {
        this.children.forEach(child => {
            if (!child.shouldRender()) {
                return;
            }
            if (!child.isConnected) {
                return void child.render(parent);
            }
            else {
                child.update();
            }
        });
    }
    disconnectChildren() {
        this.children = [];
    }
    get preservedProps() {
        return {
            domAttrs: [],
            props: []
        };
    }
    removeChild(child) {
        const childIndex = this.children.indexOf(child);
        if (childIndex > -1) {
            this.children.splice(childIndex, 1);
            child.destroyComponent(false, true);
        }
    }
    destroyChildComponents(preserveState, disconnect) {
        this.children.forEach(child => {
            child.destroyComponent(preserveState, disconnect);
        });
        if (disconnect) {
            this.disconnectChildren();
        }
    }
    toggleClassName(cls) {
        if (this.isConnected) {
            if (this.$element.classList.contains(cls)) {
                this.$element.classList.remove(cls);
            }
            else {
                this.$element.classList.add(cls);
            }
            this.DOMAttrs.className = [...this.$element.classList];
        }
    }
    addClassName(cls) {
        this.DOMAttrs.className = getClassAsArray(this.DOMAttrs.className) || [];
        if (!this.DOMAttrs.className.includes(cls)) {
            this.DOMAttrs.className.push(cls);
        }
        if (this.isConnected) {
            !this.$element.classList.contains(cls)
                ? this.$element.classList.add(cls)
                : void 0;
        }
        return this;
    }
    removeClassName(cls) {
        this.DOMAttrs.className = getClassAsArray(this.DOMAttrs.className || []);
        this.DOMAttrs.className = this.DOMAttrs.className.filter((x) => x !== cls);
        if (this.isConnected) {
            this.$element.classList.remove(cls);
        }
        return this;
    }
    addChild(c, update) {
        this.children.push(c);
        if (update) {
            this.update();
        }
        return this;
    }
    setDomAttrs(props, shouldUpdate = true) {
        Object.assign(this.DOMAttrs, props);
        shouldUpdate ? this.update() : void 0;
        return this;
    }
    set attachedCallback(cb) {
        this.onAttached = cb;
    }
    set beforeRenderCallback(cb) {
        this.beforeRender = cb;
    }
    set onDestroy(fn) {
        this.cleanUp = fn;
    }
    shouldRender() {
        return true;
    }
    update() {
        this.updateChildren(this.$element);
        this.updateDOMAttrs();
        return void 0;
    }
    toHTMLString() {
        return Component.componentToString({
            element: this.element,
            props: this.DOMAttrs,
            children: this.children
        });
    }
    /**
     * Use after calling destroyChildComponents
     */
    renderChildrenOnly() {
        this.children.forEach(child => child.render(this.$element));
    }
    /**
     *
     To be run for the first time. Next updates should be done through setState()
     or forced through update()
     */
    render(parent, attachToDOM = true) {
        this.beforeRender();
        return Component.createElement({
            element: this.element,
            props: this.DOMAttrs,
            children: this.children
        }, parent, this, attachToDOM);
    }
    destroyComponent(preserveState = false, disconnectChildren) {
        this.destroyChildComponents(preserveState, disconnectChildren);
        if (this.isConnected) {
            try {
                this.$element.remove();
            }
            catch (e) {
                console.warn(e);
            }
        }
        this.isConnected = this.isMountedTo = this.$element = null;
        if (!preserveState) {
            const _preservedProps = this.preservedProps;
            this._props = (() => {
                const ret = {};
                for (const prop of _preservedProps.props) {
                    ret[prop] = this._props[prop];
                }
                return ret;
            })();
            this.eventListeners = {};
            this.DOMAttrs = (() => {
                const ret = {};
                for (const prop of _preservedProps.domAttrs) {
                    ret[prop] = this.DOMAttrs[prop];
                }
                return ret;
            })();
            this.bindings = {};
        }
        return this.cleanUp();
    }
    get getState() {
        return this._props;
    }
    bindData(propName, component, componentPropName, update = true) {
        const prop = this.getState[propName];
        const bindings = this.bindings[propName] || [];
        const componentBindings = component.bindings[componentPropName] || [];
        bindings.push({
            component,
            prop: componentPropName
        });
        this.bindings[propName] = bindings;
        componentBindings.push({ component: this, prop: propName });
        component.bindings[componentPropName] = componentBindings;
        if (update) {
            const state = {};
            state[componentPropName] = prop;
            component.setState(state, true, true);
        }
        return this;
    }
    updateBindings() {
        for (const [prop, otherComponentArray] of Object.entries(this.bindings)) {
            for (const otherComponent of otherComponentArray) {
                const { component: boundComponent, prop: componentProp } = otherComponent;
                const state = {};
                state[componentProp] = this.getState[prop];
                boundComponent.setState(state, true, true);
            }
        }
        return this;
    }
    clearState(shouldUpdate) {
        this._props = {};
        shouldUpdate ? this.update() : void 0;
        return this;
    }
    setState(prop, shouldUpdate = true, wasInvokedThroughBinding) {
        Object.assign(this._props, prop);
        if (!wasInvokedThroughBinding) {
            this.updateBindings();
        }
        if (shouldUpdate) {
            this.update();
        }
        return this;
    }
}
export class TextComponent extends Text {
    constructor(text, tag) {
        super(text);
        this._condition = () => this.data;
        this.tag = tag;
    }
    toHTMLString() {
        return this.data;
    }
    static find(tag, on) {
        const nodes = [...on.childNodes];
        return nodes.filter(node => node instanceof TextComponent && node.tag === tag);
    }
    set textCondition(conditionFn) {
        this._condition = conditionFn;
    }
    update() {
        const _ = this._condition();
        if (this.data !== _) {
            return void (this.data = _);
        }
    }
    render(on, append) {
        if (append && !this.isConnected) {
            this.isMountedTo = on;
            this.update();
            return on.appendChild(this);
        }
    }
    shouldRender() {
        return true;
    }
    destroyComponent() {
        this.remove();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxLQUFLLEVBQ0wsSUFBSSxFQUNKLENBQUMsRUFDRCxRQUFRLEVBQ1Isa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixlQUFlLEVBQ2hCLE1BQU0sU0FBUyxDQUFDO0FBQ2pCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztBQUNwQixNQUFNLGFBQWE7SUFDakI7UUFxRFUsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFHekIsZ0NBQTJCLEdBQVksS0FBSyxDQUFDO0lBeER4QyxDQUFDO0lBQ2hCOztPQUVHO0lBQ08sTUFBTSxDQUFDLGFBQWEsQ0FDNUIsU0FBNkIsRUFDN0IsTUFBbUIsRUFDbkIsaUJBQTRCLEVBQzVCLGNBQXVCLElBQUk7UUFFM0IsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNYLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ3RDO1lBQ0QsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQ2IsbUVBQW1FLENBQ3BFLENBQUM7YUFDSDtZQUNELElBQUksS0FBSyxFQUFFO2dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxRQUFRLENBQUMsQ0FBQzthQUNyRDtZQUNELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLFNBQVMsQ0FBQztZQUMvQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwQyxLQUFLLE1BQU0sS0FBSyxJQUFJLFFBQVEsRUFBRTtnQkFDNUIsSUFBSTtvQkFDRixJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsRUFBRTt3QkFDeEIsS0FB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