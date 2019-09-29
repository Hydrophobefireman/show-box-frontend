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
  modPreloadArr.forEach(x => (mod += `window.__getLink("/${x}","prefetch");`));
  mod += "</script>";
  noModPreloadArr.forEach(
    x => (noMod += `window.__getLink("/${x}","prefetch");`)
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
const getModuleArr = (v, vm, m) => (v ? vm : m);
const iswebPackDevModule = e => {
  const c = e.split("~");
  let mainCount = 0;
  for (const i of c) {
    if (i.includes("main")) {
      mainCount++;
    }
  }
  return e.includes("@legacy") && mainCount > 1;
};
module.exports.generateScripts = files => {
  const modules = [];
  const vendorModules = [];
  const noModules = [];
  const vendorNomodules = [];
  for (const { entry: _entry } of Object.values(files)) {
    const entry = normalize(_entry);
    let src = '<script src="';
    const legacy = isLegacy(entry);
    let vendor = false;
    const suff = legacy ? "nomodule" : 'type="module"';
    if (entry.includes("vendor")) {
      vendor = true;
      src += `/${entry}" ${
        legacy && !iswebPackDevModule(entry) ? "nomodule" : ""
      }`;
    } else {
      src += `/${entry}" defer ${suff}`;
    }
    src += "></script>";
    [].push.call(
      legacy
        ? getModuleArr(vendor, vendorNomodules, noModules)
        : getModuleArr(vendor, vendorModules, modules),
      src
    );
  }
  return (
    vendorModules.join("") +
    "\n" +
    vendorNomodules.join("") +
    "\n" +
    modules.join("") +
    "\n" +
    noModules.join("")
  );
};
