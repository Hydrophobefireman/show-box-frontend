import { createElement as h, Fragment } from "../../@ui/ui-lib.js";
let spinner;
if (window.customElements) {
  const template = document.createElement("template");
  template.innerHTML = `<style>.ripple-spinner{display:inline-block;position:relative;width:64px;height:64px}.ripple-spinner div{position:absolute;border:4px solid var(--primary-color);opacity:1;border-radius:50%;-webkit-animation:ripple-spinner 1s cubic-bezier(0,.2,.8,1) infinite;animation:ripple-spinner 1s cubic-bezier(0,.2,.8,1) infinite}div[delayed]{-webkit-animation-delay:-.5s;animation-delay:-.5s}@-webkit-keyframes ripple-spinner{0%{top:28px;left:28px;width:0;height:0;opacity:1}100%{top:-1px;left:-1px;width:58px;height:58px;opacity:0}}@keyframes ripple-spinner{0%{top:28px;left:28px;width:0;height:0;opacity:1}100%{top:-1px;left:-1px;width:58px;height:58px;opacity:0}}</style><div class="ripple-spinner"><div></div><div delayed></div></div>
  `;

  window.customElements.define(
    "loading-spinner",
    class extends HTMLElement {
      constructor() {
        super();
        const src = template.content.cloneNode(true);
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(src);
      }
    }
  );
  spinner = h("loading-spinner", { height: 100, width: 100 });
} else {
  spinner = "Connecting to the server";
}
export function LoadingSpinner() {
  return h(Fragment, null, spinner);
}
