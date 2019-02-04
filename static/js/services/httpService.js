import { URLBASE } from "../common.js";
export class Requests {
  static async get(url, isSameOrigin = true, headers = {}) {
    let finalURL;
    return (
      (finalURL = isSameOrigin ? `${URLBASE}${url}` : url),
      await fetch(finalURL, { headers, credentials: "include" })
    );
  }
  static async post(
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
}

let integrity;
export const getIntegrity = async () => {
  const data = await Requests.post(
    "/api/get-integrity/",
    true,
    {
      integrity,
      $: !!integrity
    },
    { "content-type": "application/json" }
  );
  const js = await data.json();
  integrity = js.token;
  return integrity;
};
