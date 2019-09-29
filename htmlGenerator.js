const isLegacy = k => k.includes(".@legacy");
module.exports.generatePrefetch = scripts => {
  let noMod = "<script nomodule>";
  let mod = '<script type="module">';
  const modPreloadArr = [];
  const noModPreloadArr = [];
  Object.keys(scripts).forEach(x =>
    isLegacy(x)
      ? noModPreloadArr.push(normalize(scripts[x]))
      : modPreloadArr.push(normalize(scripts[x]))
  );
  modPreloadArr.forEach(x => (mod += `window.__getLink("${x}","prefetch");`));
  mod += "</script>";
  noModPreloadArr.forEach(
    x => (noMod += `window.__getLink("${x}","prefetch");`)
  );
  noMod += "</script>";
  return mod + noMod;
};

const isJS = x => {
  let c = x.split(".");
  return c[c.length - 1] !== "css";
};
function normalize(e) {
  if (typeof e === "string") {
    return e;
  }
  if (Array.isArray(e)) {
    return e.filter(isJS)[0];
  }
}
module.exports.generateScripts = files => {
  const html = [];
  for (const { entry: _entry } of Object.values(files)) {
    const entry = normalize(_entry);
    let src = '<script src="';
    const legacy = isLegacy(entry);
    const suff = legacy ? "nomodule" : 'type="module"';
    if (entry.includes("vendor")) {
      src += `${entry}" ${legacy ? "nomodule" : ""}`;
    } else {
      src += `${entry}" defer ${suff}`;
    }
    src += "></script>";
    html.push(src);
  }
  return html.join("");
};
