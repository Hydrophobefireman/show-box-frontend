import Component from "../router/component.js";
import { Requests } from "../services/httpService.js";
import { TextComponent } from "../router/utils.js";
import { loadHash, urlencode } from "../router/routerUtils";
import { sanitizedName, getWebpifSupported } from "../common.js";

export default class RecommendationsComponent extends Component {
  futureAddOn(d) {
    this._parent = d;
    return this;
  }

  async update() {
    const recommendations = this.getState.data;
    this.destroyChildComponents(false, true);
    for (const dat of recommendations) {
      const $url = await getWebpifSupported(dat.thumb);
      const img = new Component("div", {}, [], {
        style: { "background-image": `url(${$url})` },
        className: "rec-image"
      });
      const com = new Component(
        "a",
        { url: dat.id, name: dat.movie },
        [
          img,
          new Component("span", {}, [new TextComponent(dat.movie)], {
            className: "rec-title"
          })
        ],
        {
          className: "rec-wrapper",
          href: `#/watch?${urlencode({
            id: dat.id,
            show: sanitizedName(dat.movie)
          })}`
        }
      );
      com.attachEventListener(
        "click",
        function(e) {
          if (e.ctrlKey) {
            return;
          }
          loadHash(
            `/watch?${urlencode({
              id: this.getState.url,
              show: sanitizedName(this.getState.name)
            })}`
          );
        }.bind(com)
      );
      this.addChild(com);
    }
    this.updateChildren(this.$element);
    // this.update();
  }
  constructor() {
    super("div", { data: [] }, [], { class: "rec-box" });
    this.beforeRender = console.log;
    this.onAttached = () => {
      this.setState({ data: [] });
      Requests.get("/i/rec/", true)
        .then(resp => resp.json())
        .then(data => this.setState({ data: data.recommendations }, true))
        .catch(this.destroyComponent);
    };
    if (!this.getState.data.length) {
      for (let i = 0; i < 5; i++) {
        this.children.push(
          new Component(
            "div",
            {},
            [
              new Component("div", {}, [], { className: "rec-image" }),
              new Component("div", {}, [], { className: "ghostText" })
            ],
            { className: "rec-wrapper" }
          )
        );
      }
    }
  }
}
