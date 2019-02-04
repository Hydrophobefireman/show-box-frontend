export const asyncNoop = async () => void 0;
export const isDev = (() => location.hostname === "localhost")();
export const isKeyValObj = (a) => a.constructor === Object;
export const isSameDay = (c, d) => {
    return (c.getFullYear() === d.getFullYear() &&
        c.getMonth() === d.getMonth() &&
        c.getDate() === d.getDate());
};
export const getClassAsArray = (cls) => {
    if (typeof cls === "object") {
        return cls;
    }
    else {
        return cls.split(" ");
    }
};
export const noop = () => void 0;
export const makeCSS = (a) => {
    if ("string" == typeof a)
        return a;
    const b = [];
    for (const c of Object.keys(a))
        b.push(`${c}:${a[c]}`);
    return b.join(";");
};
export const $ = {
    q(query, single = !0) {
        return single
            ? document.querySelector(query)
            : Array.from(document.querySelectorAll(query));
    },
    id(elementId) {
        return document.getElementById(elementId);
    },
    className(elementClass, single = !0) {
        const c = Array.from(document.getElementsByClassName(elementClass));
        return single ? c[0] : c;
    },
    create(elementName, attributes) {
        const _element = document.createElement(elementName);
        return (attributes &&
            "object" === typeof attributes &&
            setattrs(_element, attributes),
            _element);
    },
    get(element, key) {
        return element.getAttribute(key);
    },
    set(element, key, value) {
        element.setAttribute(key, value);
    },
    empty(element) {
        let lastChild;
        for (lastChild = element.lastChild; lastChild;)
            element.removeChild(lastChild), (lastChild = element.lastChild);
    }
};
export const stampFormat = (timeStamp) => {
    try {
        const formatOptions = {
            hour: "numeric",
            hour12: !0,
            minute: "numeric"
        }, stampDate = new Date(timeStamp), currentDate = new Date();
        if ((stampDate.getFullYear() !== currentDate.getFullYear() &&
            (formatOptions.year = "numeric"),
            isSameDay(stampDate, currentDate) ||
                (formatOptions.month = formatOptions.day = "numeric"),
            stampDate.getMonth()))
            return Intl.DateTimeFormat("auto", formatOptions).format(stampDate);
    }
    catch (d) {
        return console.log(d), new Date(timeStamp).toLocaleString();
    }
};
export function setattrs(element, attrs) {
    for (const [key, val] of Object.entries(attrs)) {
        switch (key) {
            case "className":
                if (typeof val === "string") {
                    element.className = val;
                }
                else {
                    const classes = Array.isArray(val)
                        ? val
                        : [...val];
                    for (const cls of classes) {
                        if (!element.classList.contains(cls)) {
                            element.classList.add(cls);
                        }
                    }
                }
                break;
            case "style":
                if (typeof val === "string") {
                    //overriding
                    element.setAttribute("style", "");
                }
                const cssData = getObjectFromCss(val);
                for (const [rule, dat] of Object.entries(cssData)) {
                    if (element.style[rule] !== dat) {
                        element.style[rule] = dat;
                    }
                }
                break;
            default:
                if (key in element) {
                    element[key] = val;
                }
                else if (element.getAttribute(key) !== val) {
                    element.setAttribute(key, val);
                }
                break;
        }
    }
}
export const getObjectFromCss = (css) => {
    if ("object" == typeof css)
        return css;
    const rules = css.split(";");
    return rules.reduce((acc, d) => {
        const ruleAndValue = d.split(":"), filaObj = {};
        return 1 < ruleAndValue.length
            ? ((filaObj[ruleAndValue[0].trim()] = ruleAndValue[1].trim()),
                Object.assign(acc, filaObj))
            : acc;
    }, {});
};
export const selfClosingTags = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
];
export const _ComponentAsString = (componentProps) => {
    const { element, props = {}, children = [] } = componentProps;
    let proplist = [];
    for (const [key, val] of Object.entries(props || {})) {
        let jsonRepr;
        const type = typeof val;
        if (["bigint", "function", "symbol"].includes(type)) {
            throw new Error(`Cannot convert type "${type}" to string`);
        }
        switch (key) {
            case "style":
                jsonRepr = makeCSS(val);
                break;
            case "className":
                if (Array.isArray(val)) {
                    jsonRepr = val.join(" ");
                }
                else {
                    jsonRepr = val;
                }
                break;
            case "class": //compat
                if (Array.isArray(val)) {
                    jsonRepr = val.join(" ");
                }
                else {
                    jsonRepr = val;
                }
                break;
            default:
                if (type === "object") {
                    try {
                        jsonRepr = JSON.stringify(val);
                    }
                    catch (e) {
                        isDev ? console.error("JSON.stringify threw:", e) : void 0;
                        throw new Error(`Cannot serialize object typeof: "${type}"`);
                    }
                }
                else {
                    jsonRepr = val.toString();
                }
                break;
        }
        proplist.push(`${key === "className" ? "class" : key}="${jsonRepr}"`);
    }
    let html = proplist.length
        ? `<${element} ${proplist.join(" ")}`
        : `<${element}`;
    if (selfClosingTags.includes(element)) {
        if ((children || []).length) {
            throw new Error(`Self closing tag ${element} can not have child elements`);
        }
        html += " />";
    }
    else {
        html += ">";
        for (const child of children) {
            html += child.toHTMLString();
        }
        html += `</${element}>`;
    }
    return html;
};
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
export function safeDefine(name, cls) {
    if (!window.customElements.get(name)) {
        return window.customElements.define(name, cls);
    }
    return;
}
export const getLargerArray = (a1, a2) => {
    const a1Length = a1.length, a2Length = a2.length;
    return a1Length > a2Length
        ? [a1, a2]
        : a1Length < a2Length
            ? [a2, a1]
            : [a1, a2];
};
