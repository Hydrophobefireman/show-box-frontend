import Component from "../router/component.js";
import { TextComponent } from "../router/utils.js";
import { parseHash, urlencode } from "../router/routerUtils.js";
import { Requests } from "../services/httpService.js";
import { URLBASE } from "../common.js";
const prepURL = (site, url) => `${site}${encodeURIComponent(url)}`;

export const outComponent = new Component("div");
outComponent.CURRENT_AVAILABLE_WEBSITES = {
  "PROXY-PY.HEROKUAPP.COM":
    "https://proxy-py.herokuapp.com/api/parse_query?url=",
  "DL-JS.HEROKUAPP.COM": "https://dl-js.herokuapp.com/video/?url=",
  "DL-PY.HEROKUAPP.COM": "https://dl-py.herokuapp.com/video/?url=",
  "PROXY-DL.HEROKUAPP.COM": "https://proxy-dl.herokuapp.com/video?url="
};
outComponent.onAttached = async () => {
  outComponent.destroyChildComponents(false, true);
  const urlToDownload = parseHash(location.href).qs.get("url");
  if (!urlToDownload) {
    return outComponent.addChild(new TextComponent("Bad URL"));
  }
  const components = [];
  const $ps = await Requests.get("/api/site-select/");
  const prevSite = (await $ps.json()).site;
  for (const [host, url] of Object.entries(
    outComponent.CURRENT_AVAILABLE_WEBSITES
  )) {
    const link = prepURL(url, urlToDownload);
    const comp = new Component("a", {}, [new TextComponent(host)], {
      href: `${URLBASE}/set-downloader/?${urlencode({ dl: link })}`,
      className: "download-set-url-links"
    });
    components.push(comp);
  }
  outComponent.$element.appendChild(new TextComponent("select a website"));
  outComponent.children = [...components];
  outComponent.update();
  outComponent.$element.appendChild(
    new TextComponent(
      `Previously Used Site - ${
        prevSite === "None" ? "None" : new URL(prevSite).hostname
      }`
    )
  );
};
