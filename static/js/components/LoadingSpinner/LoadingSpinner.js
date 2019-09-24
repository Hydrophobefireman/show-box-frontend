import { createElement as h, Fragment } from "../../@ui/ui-lib.js";
let spinner;
if (window.customElements) {
  const SIZE = "size";
  const template = document.createElement("template");
  template.innerHTML = `<style>.spinner{margin:auto;height: 50px; width: 50px; animation: rotate 0.8s infinite linear; border: 6px solid var(--background-color); border-right-color: var(--primary-color); border-radius: 50%;}@keyframes rotate{from{transform: rotate(0deg);}to{transform: rotate(360deg);}}</style><div class="spinner"></div>`;
  const installStringReflection = (obj, attrName, propName = attrName) => {
    Object.defineProperty(obj, propName, {
      enumerable: true,
      get() {
        const value = this.getAttribute(attrName);
        return value === null ? "" : value;
      },
      set(v) {
        this.setAttribute(attrName, v);
      }
    });
  };
  window.customElements.define(
    "loading-spinner",
    class extends HTMLElement {
      constructor() {
        super();
        const src = template.content.cloneNode(true);
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(src);
        installStringReflection(this, SIZE);
        /**
         * @type {HTMLDivElement}
         */
        this.div = shadow.querySelector(".spinner");
      }
      static get observedAttributes() {
        return [SIZE];
      }
      attributeChangedCallback(name, oldVal, newVal) {
        if (name === SIZE && newVal !== oldVal) {
          const css = this.div.style;
          css.height = css.width =
            typeof newVal === "string" && newVal.includes("px")
              ? newVal
              : `${newVal}px`;
        }
      }
    }
  );
  spinner = h("loading-spinner", { size: 55 });
} else {
  spinner = "Connecting to the server";
}
export function LoadingSpinner() {
  return h(Fragment, null, spinner);
}
