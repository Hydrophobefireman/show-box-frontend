export const asyncNoop = async () => void 0;
export const isDev = (() => location.hostname === "localhost")();
export const isKeyValObj = (a) => a.constructor === Object;
export { TextComponent } from "./component";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QyxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLFdBQVcsQ0FBQyxFQUFFLENBQUM7QUFDakUsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBTSxFQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQU8sRUFBRSxDQUFPLEVBQVcsRUFBRTtJQUNyRCxPQUFPLENBQ0wsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUU7UUFDbkMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFDN0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FDNUIsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUNGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxDQUFDLEdBQXNCLEVBQUUsRUFBRTtJQUN4RCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtRQUMzQixPQUFPLEdBQUcsQ0FBQztLQUNaO1NBQU07UUFDTCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdkI7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsTUFBTSxDQUFDLE1BQU0sT0FBTyxH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