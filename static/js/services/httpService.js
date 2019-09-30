import { URLBASE } from "../common.js";
export const Requests = {
  async get(url, isSameOrigin = true, headers = {}) {
    let finalURL;
    return (
      (finalURL = isSameOrigin ? `${URLBASE}${url}` : url),
      await fetch(finalURL, { headers, credentials: "include" })
    );
  },
  async post(
    url,
    isSameOrigin = !0,
    requestData,
    headers = { "content-type": "application/x-www-form-urlencoded" }
  ) {
    let finalURL;
    let finalData;
    if (
      headers["content-type"].toLowerCase() === "application/json" &&
      typeof requestData === "object"
    ) {
      finalData = JSON.stringify(requestData);
    } else {
      finalData = requestData;
    }
    return (
      (finalURL = isSameOrigin ? `${URLBASE}${url}` : url),
      await fetch(finalURL, {
        method: "post",
        body: finalData,
        headers,
        credentials: "include"
      })
    );
  }
};
