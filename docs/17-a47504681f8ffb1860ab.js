(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{218:function(t,n,e){"use strict";e.r(n),e.d(n,"LoadingSpinner",(function(){return k})),e.d(n,"default",(function(){return k}));e(101),e(136);var r,o=e(21),i=e.n(o),u=e(17),c=e.n(u),a=e(26),s=e.n(a),l=e(25),f=e.n(l),p=e(4),d=e.n(p),h=e(27),v=e.n(h),y=e(233),g=e.n(y),b=e(1);if(window.customElements){var m="size",w=document.createElement("template");w.innerHTML='<style>.spinner{margin:auto;height: 50px; width: 50px; animation: rotate 0.8s infinite linear; border: 6px solid var(--background-color); border-right-color: var(--primary-color); border-radius: 50%;}@keyframes rotate{from{transform: rotate(0deg);}to{transform: rotate(360deg);}}</style><div class="spinner"></div>';var x=function(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n;Object.defineProperty(t,e,{enumerable:!0,get:function(){var t=this.getAttribute(n);return null===t?"":t},set:function(t){this.setAttribute(n,t)}})};!window.customElements.get("loading-spinner")&&window.customElements.define("loading-spinner",function(t){function n(){var t;i()(this,n),t=s()(this,f()(n).call(this));var e=w.content.cloneNode(!0),r=t.attachShadow({mode:"open"});return r.appendChild(e),x(d()(t),m),t.div=r.querySelector(".spinner"),t}return v()(n,t),c()(n,[{key:"attributeChangedCallback",value:function(t,n,e){if(t===m&&e!==n){var r=this.div.style;r.height=r.width="string"==typeof e&&e.includes("px")?e:"".concat(e,"px")}}}],[{key:"observedAttributes",get:function(){return[m]}}]),n}(g()(HTMLElement))),r=Object(b.h)("loading-spinner",{size:55})}else r="Connecting to the server";function k(){return Object(b.h)(b.d,null,r)}},233:function(t,n,e){var r=e(25),o=e(140),i=e(234),u=e(235);function c(n){var e="function"==typeof Map?new Map:void 0;return t.exports=c=function(t){if(null===t||!i(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return u(t,arguments,r(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),o(n,t)},c(n)}t.exports=c},234:function(t,n){t.exports=function(t){return-1!==Function.toString.call(t).indexOf("[native code]")}},235:function(t,n,e){var r=e(140);function o(n,e,i){return!function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?t.exports=o=function(t,n,e){var o=[null];o.push.apply(o,n);var i=new(Function.bind.apply(t,o));return e&&r(i,e.prototype),i}:t.exports=o=Reflect.construct,o.apply(null,arguments)}t.exports=o}}]);