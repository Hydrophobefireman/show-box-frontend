const { minify } = require("terser");
module.exports = minify(
  "(" +
    function() {
      var e = document.createElement("script");
      if ("onbeforeload" in e) {
        var t = !1;
        document.addEventListener(
          "beforeload",
          function(n) {
            if (n.target === e) t = !0;
            else if (!n.target.hasAttribute("nomodule") || !t) return;
            n.preventDefault();
          },
          !0
        ),
          (e.type = "module"),
          (e.src = "."),
          document.head.appendChild(e),
          e.remove();
      }
    }.toString() +
    ")()"
).code;
