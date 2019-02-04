import Component from "../router/component.js";
import { TextComponent } from "../router/utils.js";
import { getSocket } from "../services/socket.js";
import { parseHash, loadHash, setQS } from "../router/routerUtils.js";
export const setTitle = text => void (document.title = text);
class _InputComponent extends Component {
  update() {
    const value = this.getState.value;
    setTitle(value ? `Search for ${value}` : window.oldTitle);
    this.setDomAttrs({ value }, false).updateDOMAttrs();
  }
  appendComponentOnResponse(func) {
    this.socket.onmessage = this.onResponse = func.bind(this);
  }
  async handleInput({ target: { value: val } }) {
    this.setState({ value: val });
    const currentRoute = parseHash(window.location.href);
    if (currentRoute.route === "/search/") {
      setQS("q", val);
    }
    if (!this.socket.isConnected && this.socket.isUsable && this.useSocket) {
      this.socket.startConn("suggestqueries", false);
    }
    const dat = val.trim();
    if (dat) {
      if (this.useSocket) {
        this.socket.sendString(dat);
      }
    }
  }
  handleFocus() {
    this.setState({ isFocused: true });
  }
  handleBlur() {
    this.setState({ isFocused: false });
  }

  constructor(socket) {
    super("input", { value: "" }, [], {
      className: ["paper-input"]
    });
    this.useSocket = !!socket;
    this.onResponse = () => void 0;
    this.socket = {};
    if (socket) {
      this.socket = getSocket();
      this.beforeRender = () => {
        this.onResponse();
      };
      this.onAttached = () => {
        if (!this.socket.isConnected && this.socket.isUsable) {
          this.socket.startConn("suggestqueries", false);
        }
      };
    }
    this.attachEventListener("input", this.handleInput.bind(this))
      .attachEventListener("focus", this.handleFocus.bind(this))
      .attachEventListener("blur", this.handleBlur.bind(this));
  }
}
class AnimatedInputComponent extends Component {
  constructor(text) {
    super("div", {}, [new TextComponent(text)], {
      className: "_animate"
    });
  }
  update() {
    this.updateChildren();
    const val = (this.getState.value || "").trim();
    if (val || this.getState.isFocused) {
      this.addClassName("moveup").removeClassName("movedown");
    } else {
      this.removeClassName("moveup").addClassName("movedown");
    }
    this.updateDOMAttrs();
  }
}
export const getNewInputComponent = (text, socket = true) => {
  const animatedInputComponent = new AnimatedInputComponent(text);
  const _inputComponent = new _InputComponent(socket)
    .bindData("value", animatedInputComponent, "value", false)
    .bindData("isFocused", animatedInputComponent, "isFocused", false);

  return {
    component: new Component(
      "div",
      {},
      [animatedInputComponent, _inputComponent],
      {
        className: ["search-component"]
      }
    ),
    inputComponent: _inputComponent,
    animatedInputComponent
  };
};
