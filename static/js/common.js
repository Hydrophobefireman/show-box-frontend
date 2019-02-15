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
    await (() => new Promise(resolve => setTimeout(resolve, waitTimeInMS)))();
  }
  callOnError(error);
  throw new Error();
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
export const applyExternalCss = a =>
  new Promise((r, re) => {
    let b;
    try {
      return r(
        ((b = document.createElement("link")),
        (b.href = a),
        (b.rel = "stylesheet"),
        document.head.appendChild(b))
      );
    } catch (e) {
      re(console.log("Could not append stylesheet", e));
    }
  });

export const supportsWebp = () =>
  new Promise((resolve, _) => {
    const img = new Image();
    img.onload = () =>
      resolve(img.naturalHeight === 1 && img.naturalWidth === 1);

    img.onerror = () => resolve(false);

    img.src =
      "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
  });
export const getWebpifSupported = async url => {
  const s = await supportsWebp();
  if (s) {
    const _ = url.split(".");
    _[_.length - 1] = "webp";
    return _.join(".");
  } else {
    return url;
  }
};
export const rot13 = str => {
  return str
    .split("")
    .map(x => rot13.lookup[x] || x)
    .join("");
};
rot13.input = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
rot13.output = [
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m"
];
rot13.lookup = rot13.input.reduce(
  (m, k, i) => Object.assign(m, { [k]: rot13.output[i] }),
  {}
);
