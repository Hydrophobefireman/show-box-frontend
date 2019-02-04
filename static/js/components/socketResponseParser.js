import { isDev, TextComponent } from "../router/utils.js";
import { loadHash, urlencode } from "../router/routerUtils.js";
import Component from "../router/component.js";
import _ from "../../css/AYTResponses.css";
import { sanitizedName } from "../common.js";
const parseSocketResponse = responeDict => {
  let response;
  if (typeof responeDict === "string") {
    isDev ? console.warn("return response as an object!") : void 0;
    response = JSON.parse(responeDict);
  }
  response = responeDict;
  if (response["no-res"]) {
    return [];
  }
  const data = response.data;
  return data || [];
};

const generateComponents = data => {
  const children = [];
  for (const resp of data) {
    const showID = resp.id;
    const showName = resp.movie;
    const url = `/watch?${urlencode({
      id: showID,
      show: sanitizedName(showName)
    })}`;
    const child = new Component("div", { id: showID, showName }, [], {
      className: "query-response"
    });
    const link = new Component("a", {}, [new TextComponent(showName, showID)], {
      href: `#${url}`,
      className: "show-link"
    }).attachEventListener("click", e => {
      e.preventDefault();
      loadHash(
        `/watch?${urlencode({
          id: child.getState.id,
          show: sanitizedName(showName)
        })}`
      );
    });
    child.addChild(link);
    children.push(child);
  }
  return children;
};

const updateChildrenEQLength = (_resp, childComponents) => {
  childComponents.forEach((child, i) => {
    const resp = _resp[i];
    const a = child.children[0];
    const prevID = child.getState.id;
    const textComponent = TextComponent.find(prevID, a.$element)[0];
    const showID = resp.id,
      showName = resp.movie;
    if (prevID === showID) {
      return;
    }
    const url = `/watch?${urlencode({ id: showID, show: showName })}`;
    a.setDomAttrs({ href: `#${url}` }, false);
    child.setState({ id: showID, showName }, false);
    textComponent.data = showName;
    textComponent.tag = showID;
  });
};

const component = new Component("div", {}, [], { class: ["response-parent"] });
export const getResponseComponent = responseDict => {
  if (!responseDict) {
    component.removeClassName("has-data");
    component.destroyChildComponents(false, true);
    return component;
  }
  component.addClassName("has-data");
  const data = parseSocketResponse(responseDict);
  const newLength = data.length;
  if (!newLength) {
    component.removeClassName("has-data");
  }
  const childLength = component.children.length;
  if (newLength === childLength) {
    updateChildrenEQLength(data, component.children);
  } else if (newLength > childLength) {
    const remainingPendingChildren = data.splice(childLength, newLength);
    updateChildrenEQLength(data, component.children);
    const children = generateComponents(remainingPendingChildren);
    for (const x of children) {
      component.addChild(x);
    }
  } else {
    const extraChildren = component.children.splice(newLength, childLength);
    updateChildrenEQLength(data, component.children);
    extraChildren.forEach(x => x.destroyComponent());
  }
  component.update();
};
