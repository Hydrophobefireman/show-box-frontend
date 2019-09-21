import { Requests } from "../../services/httpService.js";
import { createElement as h } from "../../@ui/ui-lib.js";
// import { compatMap, compatMapGet, compatMapSet } from "../../common.js";
import _Map from "@hydrophobefireman/j-utils/@build-modern/src/modules/es6/loose/Map/index.js";
export const defaultHTML =
  "data:text/html;base64,PGh0bWw+PGhlYWQ+PC9oZWFkPjxib2R5IHN0eWxlPSJtYXJnaW46YXV0bztjb2xvcjogI2ZmZjt0ZXh0LWFsaWduOmNlbnRlcjtmb250LWZhbWlseTpzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OmJvbGQ7YmFja2dyb3VuZC1jb2xvcjogIzAwMDsiPkxvYWRpbmcuLi48L2JvZHk+PC9odG1sPg==";
export const cache = new _Map();
console.log("video player cache:", cache);
export const sanitizeURL = url => {
  if (!url || url.toLowerCase() === "none") {
    return null;
  }
  let f;
  try {
    f = new URL(url, `${location.protocol}//${location.hostname}`);
    f.protocol = "https:";
    f = f.toString();
  } catch (e) {
    f = url;
    if (url.startsWith("//")) {
      f = `https:${f}`;
    }
  }
  return f;
};
const endPoint = "/api/get-show-metadata/";
const makeRequest = async id => {
  const data = await Requests.post(
    endPoint,
    true,
    { id },
    {
      "content-type": "application/json"
    }
  );
  const ret = await data.json();
  if (!ret.movie_name || ret.error) throw new Error();
  return {
    movie: ret.movie_name,
    episode_meta: ret.episode_meta
  };
};
export const txtComponent = h("div", null, "No show exists with the given ID");
export const getMovieDetails = async id => {
  const c = cache.get(id);
  if (c) {
    console.log("refreshing cache in background");
    makeRequest(id).then(data => cache.set(id, data));
    return c;
  } else {
    const data = await makeRequest(id);
    cache.set(id, data);

    return data;
  }
};

export function getHost(href) {
  return new URL(href).hostname;
}
