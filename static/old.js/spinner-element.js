function createTemplate() {
  const template = document.createElement("template");
  const templateText = `<style>svg{-webkit-animation:rotate360 linear 2s;animation:rotate360 linear 2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-transform-origin:50% 50%;-ms-transform-origin:50% 50%;transform-origin:50% 50%;display:inline-block;width:65px;height:65px}@-webkit-keyframes rotate360{0%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}75%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate360{0%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}75%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}circle{stroke-width:4px;stroke:#6f70ee;-webkit-animation:rotateSp linear 1.4s;animation:rotateSp linear 1.4s;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;stroke-dasharray:185}@-webkit-keyframes rotateSp{0%{stroke-dashoffset:0}100%{stroke-dashoffset:-365}}@keyframes rotateSp{0%{stroke-dashoffset:0}100%{stroke-dashoffset:-365}}</style><svg viewbox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>`;
  template.innerHTML = templateText;
  return template;
}
const template = createTemplate();
export default class MatSpinner extends HTMLElement {
  set size(val) {
    const spinner = this.svg();
    spinner.style.height = spinner.style.width = val;
  }
  get size() {
    return this.svg().style.height;
  }
  set color(val) {
    this.circle().style.stroke = val;
  }
  get color() {
    return this.circle().style.stroke;
  }
  set svgstyle(v) {
    return (this.svg().style = v);
  }
  set circlestyle(v) {
    return (this.circle().style = v);
  }
  static get observedAttributes() {
    return ["size", "color", "svgstyle", "circlestyle"];
  }
  attributeChangedCallback(a, _, c) {
    "size" === a
      ? (this.size = c)
      : "color" === a
      ? (this.color = c)
      : "svgstyle" === a
      ? (this.svgstyle = c)
      : "circlestyle" === a && (this.circlestyle = c);
  }

  constructor(size, color, svgstyle, circlestyle) {
    super();
    const e = template,
      f = this.attachShadow({ mode: "open" });
    f.appendChild(e.content.cloneNode(!0));
    this.svg = () => this.shadowRoot.querySelector("svg");
    this.circle = () => this.shadowRoot.querySelector("circle");
    size && (this.size = size);
    color && (this.color = color);
    svgstyle && (this.svg().style = svgstyle);
    circlestyle && (this.circle().style = circlestyle);
  }
}
