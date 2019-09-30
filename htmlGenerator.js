const { minify } = require("terser");
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
const push = [].push;
const getModuleArr = (v, vm, m) => (v ? vm : m);
const iswebPackDevModule = e => {
  const c = e.split("~");
  let mainCount = 0;
  for (const i of c) {
    if (i.includes("main")) {
      mainCount++;
    }
  }
  return isLegacy(e) && mainCount > 1;
};
const getImport = (src, type) =>
  `__import("${src}"${type ? `,"${type}"` : ""});`;

function wrapWithScriptTags({ arr, type, id, isLegacy }) {
  if (!arr || !arr.length) return "";
  const start = `<script${type ? ' type="module"' : ""}${
    id ? ' id="' + id + '"' : ""
  }${isLegacy ? " nomodule" : ""}>`;
  const end = "</script>";
  return start + arr.map(src => getImport(src)).join("") + end;
}
module.exports.generateScripts = files => {
  const modules = [];
  const vendorModules = [];
  const noModules = [];
  const vendorNomodules = [];
  const webPackDevServerScripts = [];
  for (const { entry: _entry } of Object.values(files)) {
    const entry = normalize(_entry);
    const isWP = iswebPackDevModule(entry);
    const legacy = isLegacy(entry) && !isWP;
    let vendor = entry.includes("vendor");
    if (isWP) {
      webPackDevServerScripts.push(entry);
    } else {
      push.call(
        legacy
          ? getModuleArr(vendor, vendorNomodules, noModules)
          : getModuleArr(vendor, vendorModules, modules),
        entry
      );
    }
  }
  return [
    { arr: webPackDevServerScripts, id: "webpack-dev-server" },
    { arr: vendorModules, type: "module", id: "vendor-module" },
    { arr: modules, type: "module", id: "main-module" },
    { arr: vendorNomodules, id: "vendor-nomodules", isLegacy: true },
    { arr: noModules, id: "main-nomodule", isLegacy: true }
  ]
    .map(wrapWithScriptTags)
    .join("\n");
};

module.exports.importPolyFill = minify(
  String(function __getImport() {
    function getGlobal() {
      if (typeof globalThis === "object") return globalThis;
      Object.defineProperty(Object.prototype, "___this", {
        get: function get() {
          return this;
        },
        configurable: !0
      }),
        (___this.globalThis = ___this);
      var e = ___this;
      return delete Object.prototype.___this, e;
    }

    var t = getGlobal(),
      _obj = {},
      _Object = _obj.constructor,
      hasOwnProp = _obj.hasOwnProperty,
      isDocument =
        "undefined" != typeof window &&
        ((window.navigator && !!window.navigator.userAgent) ||
          (window.document && !!document.createElement)),
      isWorkerContext =
        "undefined" != typeof self &&
        !!self.postMessage &&
        "function" == typeof t.importScripts,
      isBrowser = isDocument || isWorkerContext,
      assign =
        "assign" in _Object
          ? _Object.assign
          : function(e) {
              for (var _t = arguments, _n = 1; _n < arguments.length; _n++) {
                var _r = _t[_n];

                for (var _i in _r) {
                  hasOwnProp.call(_r, _i) && (e[_i] = _r[_i]);
                }
              }

              return e;
            },
      c = "@@__ScriptsLOADED",
      d = t;
    function f(e, t) {
      if (!isBrowser) return null;
      if (isDocument) {
        var script = assign(document.createElement("script"), {
          type: t || "text/javascript",
          charset: "utf-8"
        });

        return "module" === t
          ? (function(e, t) {
              var n = d[c];
              if (n) return Promise.resolve(n[t]);
              var r = "loaded__" + t;
              return (
                assign(e, {
                  text:
                    'import * as Obj from "' +
                    t +
                    '";\n    window["' +
                    c +
                    '"]["' +
                    t +
                    '"]=Obj;\n    dispatchEvent(new Event("' +
                    r +
                    '"))'
                }),
                new Promise(function(n, o) {
                  window.addEventListener(
                    r,
                    function() {
                      var e = d[c];
                      e && n(e[t]);
                    },
                    {
                      once: !0
                    }
                  ),
                    document.head.appendChild(e);
                })
              );
            })(script, e)
          : (function(e, t) {
              return new Promise(function(n, r) {
                assign(e, {
                  src: t
                });

                var o = function o() {
                    s(), n(e);
                  },
                  i = function i() {
                    s(), r(e);
                  };

                function s() {
                  e.removeEventListener("load", o),
                    e.removeEventListener("error", i);
                }

                e.addEventListener("load", o),
                  e.addEventListener("error", i),
                  document.head.appendChild(e);
              });
            })(script, e);
      }

      return isWorkerContext ? self.importScripts(e) : void 0;
    }

    d[c] = {};
    return f;
  })
).code;
