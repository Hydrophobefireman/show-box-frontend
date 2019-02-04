const apiHost = window.location.host.includes("localhost")
  ? "localhost:5000"
  : "show-box.herokuapp.com";
export const preventDefault = e => e.preventDefault();
export const sanitizedName = s =>
  s.replace(/([^\w]|_)/g, "-").replace(/--/g, "-");
export const retry = async (
  func,
  retryCount,
  callOnError,
  waitTimeInMS = 100
) => {
  let error;
  for (let tryCount = 0; tryCount < retryCount; tryCount++) {
    try {
      return await func();
    } catch (f) {
      error = f;
    }
    await (() =>
      new Promise(resolve => setTimeout(() => resolve(), waitTimeInMS)))();
  }
  callOnError(error);
};
export const URLBASE = `${window.location.protocol}//${apiHost}`;
export const localWebsocketURL = a =>
  `${
    "https:" === window.location.protocol ? "wss://" : "ws://"
  }${apiHost}/${a}`;

export const nextEvent = (target, name) =>
  new Promise(resolve =>
    target.addEventListener(name, resolve, { once: true })
  );
export const applyExternalCss = async a => {
  let b;
  try {
    return (
      (b = document.createElement("link")),
      (b.href = a),
      (b.rel = "stylesheet"),
      document.head.appendChild(b)
    );
  } catch (e) {
    console.log("Could not append stylesheet", e);
  }
};
