(window.webpackJsonp=window.webpackJsonp||[]).push([[10,17,19,23],{147:function(t,e,n){"use strict";n.r(e);var r=n(28);e.default="assign"in r.a?r.a.assign:function(t){for(let e=1;e<arguments.length;e++){const n=arguments[e];for(const e in n)r.c.call(n,e)&&(t[e]=n[e])}return t}},234:function(t,e,n){"use strict";n.r(e),n.d(e,"Requests",(function(){return p}));var r,o,i=n(149),s=n.n(i),a=n(41),c=n.n(a),u=(n(112),n(77)),l=n.n(u),h=n(111),p={get:(o=l()(c.a.mark((function t(e){var n,r,o,i=arguments;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=!(i.length>1&&void 0!==i[1])||i[1],r=i.length>2&&void 0!==i[2]?i[2]:{},o=n?"".concat(h.a).concat(e):e,t.next=5,fetch(o,{headers:r,credentials:"include"});case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)}))),function(t){return o.apply(this,arguments)}),post:(r=l()(c.a.mark((function t(e){var n,r,o,i,a,u=arguments;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=!(u.length>1&&void 0!==u[1])||u[1],r=u.length>2?u[2]:void 0,o=u.length>3&&void 0!==u[3]?u[3]:{"content-type":"application/x-www-form-urlencoded"},a="application/json"===o["content-type"].toLowerCase()&&"object"===s()(r)?JSON.stringify(r):r,i=n?"".concat(h.a).concat(e):e,t.next=7,fetch(i,{method:"post",body:a,headers:o,credentials:"include"});case 7:return t.abrupt("return",t.sent);case 8:case"end":return t.stop()}}),t)}))),function(t){return r.apply(this,arguments)})}},236:function(t,e,n){"use strict";n.d(e,"a",(function(){return g}));var r=n(15),o=n.n(r),i=n(12),s=n.n(i),a=n(20),c=n.n(a),u=n(19),l=n.n(u),h=n(3),p=n.n(h),f=n(21),d=n.n(f),v=n(5),b=n.n(v),m=n(1),g=function(t){function e(){var t,n;o()(this,e);for(var r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return n=c()(this,(t=l()(e)).call.apply(t,[this].concat(i))),b()(p()(n),"state",{isFocused:!1,value:""}),b()(p()(n),"onFocus",(function(){return!n.state.value&&n.setState({isFocused:!0})})),b()(p()(n),"onBlur",(function(){return!n.state.value&&n.setState({isFocused:!1})})),b()(p()(n),"onInput",(function(t){return n.setState({value:t.target.value})})),b()(p()(n),"onSubmit",(function(){return n.props.onSubmit(n.state.value)})),n}return d()(e,t),s()(e,[{key:"render",value:function(t,e){var n=this,r=t.id,o=t.buttonText,i=void 0===o?"search":o,s=t.labelText,a=void 0===s?"search for shows":s,c=t.onInput,u=t.wssResponse,l=["_animate",e.isFocused?"moveup":"movedown"];return Object(m.h)("div",{class:"search-component"},Object(m.h)("form",{action:"javascript:",onSubmit:this.onSubmit},Object(m.h)("label",{class:l,for:r},a),Object(m.h)(y,{onFocus:this.onFocus,onBlur:this.onBlur,id:r,onInput:function(t){n.onInput(t),null!=c&&c(t)}}),u,Object(m.h)("button",{class:"search-button"},i)))}}]),e}(m.i);function y(t){var e=t.onFocus,n=t.onBlur,r=t.onInput,o=t.id;return Object(m.h)("input",{onFocus:e,onBlur:n,onInput:r,id:o,class:"paper-input"})}},239:function(t,e,n){"use strict";var r,o,i=n(15),s=n.n(i),a=n(12),c=n.n(a),u=n(20),l=n.n(u),h=n(19),p=n.n(h),f=n(3),d=n.n(f),v=n(21),b=n.n(v),m=n(5),g=n.n(m),y=n(1),k=n(236),S=n(111),w=n(41),O=n.n(w),j=(n(112),n(77)),x=n.n(j),W=(n(115),n(78),n(113),n(146),function(){function t(){s()(this,t)}return c()(t,[{key:"__defaultOnMessage",value:function(t){if(!["ping","pong"].includes(t.data)){var e=JSON.parse(t.data);this._socketID=e.socket_id}}},{key:"startConn",value:function(t){var e=this;return this.socket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(this.socket.readyState)?this.socket:new Promise((function(n,r){e.socket=new WebSocket(Object(S.h)(t)),e.socket.onopen=function(){e.socket.onmessage=e.__defaultOnMessage,n(e.socket)},e.socket.onerror=function(t){return r(t)}}))}},{key:"close",value:function(){try{this.socket.close()}catch(t){console.warn(t)}}},{key:"send",value:function(t){return this.socket.send(JSON.stringify(t))}},{key:"sendString",value:function(t){return this.socket.send(t)}},{key:"onmessage",set:function(t){var e=this;t!==this._onmessage&&(this._onmessage=t,this.socket.onmessage=function(t){var n=JSON.parse(t.data||"{}");return"ping"===n.type||"pong"===n.type?void 0:e._onmessage(n)})}},{key:"readyState",get:function(){return this.socket.readyState}},{key:"isUsable",get:function(){return!this.socket||[WebSocket.OPEN,WebSocket.CONNECTING].includes(this.socket.readyState)}},{key:"isConnected",get:function(){return!!this.socket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(this.socket.readyState)}}]),t}()),E=function(){return(r||{}).isUsable?r:r=new W},I=function(t){function e(){var t,n;s()(this,e);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return n=l()(this,(t=p()(e)).call.apply(t,[this].concat(o))),g()(d()(n),"state",{resp:[],prevVal:""}),g()(d()(n),"onMessage",(function(t){t.data?n.setState({resp:t.data.map((function(t){return{movie:t.movie,href:Object(S.e)(t.id,t.movie)}}))}):n.setState({resp:[]})})),g()(d()(n),"componentWillUpdate",Object(S.b)(n.fetchResponses,100,!1,d()(n))),g()(d()(n),"componentWillMount",n.componentWillUpdate),n}var n;return b()(e,t),c()(e,[{key:"fetchResponses",value:(n=x()(O.a.mark((function t(){var e,n;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=this.props.val,n=this.state.prevVal,e!=n&&e){t.next=5;break}return this.state.resp.length&&!e&&this.setState({resp:[],prevVal:""}),t.abrupt("return");case 5:return console.log("fetching"),this.setState({prevVal:e}),o=E(),t.next=10,o.startConn("suggestqueries");case 10:o.onmessage=this.onMessage,o.sendString(e);case 12:case"end":return t.stop()}}),t,this)}))),function(){return n.apply(this,arguments)})},{key:"render",value:function(){var t=["response-parent"];return this.state.resp.length&&t.push("has-data"),Object(y.h)("div",{class:t},this.state.resp.map((function(t){return Object(y.h)(y.a,{class:["movie-link","query-response"],href:t.href},Object(S.c)(t.movie))})))}}]),e}(y.i);n.d(e,"a",(function(){return N}));var N=function(t){function e(){var t,n;s()(this,e);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return n=l()(this,(t=p()(e)).call.apply(t,[this].concat(o))),g()(d()(n),"state",{value:""}),g()(d()(n),"onInput",(function(t){var e=(t.target.value||"").trim();document.title=e?"Search for ".concat(e):S.d,n.setState({value:e})})),g()(d()(n),"loadSearchResults",(function(){var t=(n.state.value||"").trim();t&&Object(S.g)(t),n.setState({value:""})})),n}return b()(e,t),c()(e,[{key:"componentWillMount",value:function(){E().startConn("suggestqueries")}},{key:"render",value:function(){return Object(y.h)(y.d,null,Object(y.h)(k.a,{id:"landing-search-component",onSubmit:this.loadSearchResults,wssResponse:Object(y.h)(I,{val:this.state.value}),onInput:this.onInput}))}}]),e}(y.i)},242:function(t,e,n){"use strict";var r=n(152)(!0);n(153)(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})}))},243:function(t,e,n){"use strict";var r=n(43),o=n(16),i=n(35),s=n(154),a=n(155),c=n(42),u=n(151),l=n(156);o(o.S+o.F*!n(157)((function(t){Array.from(t)})),"Array",{from:function(t){var e,n,o,h,p=i(t),f="function"==typeof this?this:Array,d=arguments.length,v=d>1?arguments[1]:void 0,b=void 0!==v,m=0,g=l(p);if(b&&(v=r(v,d>2?arguments[2]:void 0,2)),null==g||f==Array&&a(g))for(n=new f(e=c(p.length));e>m;m++)u(n,m,b?v(p[m],m):p[m]);else for(h=g.call(p),n=new f;!(o=h.next()).done;m++)u(n,m,b?s(h,v,[o.value,m],!0):o.value);return n.length=m,n}})},244:function(t,e,n){var r=n(19),o=n(150),i=n(245),s=n(246);function a(e){var n="function"==typeof Map?new Map:void 0;return t.exports=a=function(t){if(null===t||!i(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(t))return n.get(t);n.set(t,e)}function e(){return s(t,arguments,r(this).constructor)}return e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),o(e,t)},a(e)}t.exports=a},245:function(t,e){t.exports=function(t){return-1!==Function.toString.call(t).indexOf("[native code]")}},246:function(t,e,n){var r=n(150);function o(e,n,i){return!function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?t.exports=o=function(t,e,n){var o=[null];o.push.apply(o,e);var i=new(Function.bind.apply(t,o));return n&&r(i,n.prototype),i}:t.exports=o=Reflect.construct,o.apply(null,arguments)}t.exports=o},248:function(t,e,n){"use strict";var r=n(28);let o=Object(r.e)();const i=Object(r.b)("Map",o),s=(Object(r.b)("Set",o),Object(r.b)("WeakMap",o)&&Object(r.b)("WeakSet",o),"__@@map"),a=t=>t!=t,c=(t,e)=>t===e||a(t)&&a(e),u=t=>0===t?0:t;let l,h,p;if("undefined"!=typeof Symbol){function f(t,e){const n=t[s];let r=0;const o=n.length,i=e?0:1;return{[Symbol.iterator]:function(){return this},next:function(){return r<o?{value:n[r++][i],done:!1}:{value:void 0,done:!0}}}}l=function(){return this[s][Symbol.iterator]()},h=function(){return f(this,!1)},p=function(){return f(this,!0)}}else l=p=h=function(){console.warn("no symbol support")};var d={keys:p,values:h,entries:l},v=n(147);function b(t,e){const n=t[s],r=n.length;for(let t=0;t<r;t++){const r=n[t];if(c(r[0],e))return r}return null}function m(t,e){if(n=t,!(null!=(r=e)&&"undefined"!=typeof Symbol&&r[Symbol.hasInstance]?r[Symbol.hasInstance](n):n instanceof r))throw new TypeError("Cannot call a class as a function");var n,r}const g=function t(e,n){return m(this,t),!n&&i?new Map(e):(this[s]=[],function(t,e){if(null==e)return;if(!Object(r.d)(e))throw new Error("value:"+String(e)+" is not iterable");const n=e.length;for(let r=0;r<n;r++){const n=e[r];if(!n||2!==n.length)throw new Error("invalid arg");t.set(n[0],n[1])}}(this,e),this)};var y;(y=g).prototype.set=function(t,e){const n=b(this,t);return n?n[1]=e:this[s].push([u(t),e]),this},y.prototype.has=function(t){return!!b(this,t)},y.prototype.delete=function(t){let e=!1;return this[s]=this[s].filter(n=>{const r=!c(n[0],t);return r||(e=!0),r}),e},y.prototype.get=function(t){const e=b(this,t);return e?e[1]:void 0},y.prototype.forEach=function(t,e){const n=this[s],r=n.length;for(let o=0;o<r;o++){const r=n[o],i=r[1],s=r[0],a=this;e?t.call(e,i,s,a):t(i,s,a)}},y.prototype.clear=function(){this[s].length=0},Object.defineProperty(y.prototype,"size",{enumerable:!1,configurable:!0,get:function(){return this[s].length}}),"undefined"!=typeof Symbol&&(y.prototype[Symbol.iterator]=d.entries,y.prototype[Symbol.toStringTag]="Map"),Object(v.default)(y.prototype,d),g[Symbol.species]=g;e.a=g},250:function(t,e,n){"use strict";n.r(e),n.d(e,"LoadingSpinner",(function(){return w})),n.d(e,"default",(function(){return w}));n(113),n(146);var r,o=n(15),i=n.n(o),s=n(12),a=n.n(s),c=n(20),u=n.n(c),l=n(19),h=n.n(l),p=n(3),f=n.n(p),d=n(21),v=n.n(d),b=n(244),m=n.n(b),g=n(1);if(window.customElements){var y="size",k=document.createElement("template");k.innerHTML='<style>.spinner{margin:auto;height: 50px; width: 50px; animation: rotate 0.8s infinite linear; border: 6px solid var(--background-color); border-right-color: var(--primary-color); border-radius: 50%;}@keyframes rotate{from{transform: rotate(0deg);}to{transform: rotate(360deg);}}</style><div class="spinner"></div>';var S=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e;Object.defineProperty(t,n,{enumerable:!0,get:function(){var t=this.getAttribute(e);return null===t?"":t},set:function(t){this.setAttribute(e,t)}})};!window.customElements.get("loading-spinner")&&window.customElements.define("loading-spinner",function(t){function e(){var t;i()(this,e),t=u()(this,h()(e).call(this));var n=k.content.cloneNode(!0),r=t.attachShadow({mode:"open"});return r.appendChild(n),S(f()(t),y),t.div=r.querySelector(".spinner"),t}return v()(e,t),a()(e,[{key:"attributeChangedCallback",value:function(t,e,n){if(t===y&&n!==e){var r=this.div.style;r.height=r.width="string"==typeof n&&n.includes("px")?n:"".concat(n,"px")}}}],[{key:"observedAttributes",get:function(){return[y]}}]),e}(m()(HTMLElement))),r=Object(g.h)("loading-spinner",{size:55})}else r="Connecting to the server";function w(){return Object(g.h)(g.d,null,r)}},251:function(t,e,n){"use strict";var r=n(16),o=n(42),i=n(160),s="".startsWith;r(r.P+r.F*n(161)("startsWith"),"String",{startsWith:function(t){var e=i(this,t,"startsWith"),n=o(Math.min(arguments.length>1?arguments[1]:void 0,e.length)),r=String(t);return s?s.call(e,r,n):e.slice(n,n+r.length)===r}})},265:function(t,e,n){"use strict";n.r(e);var r=n(114),o=n.n(r),i=n(15),s=n.n(i),a=n(12),c=n.n(a),u=n(20),l=n.n(u),h=n(19),p=n.n(h),f=n(3),d=n.n(f),v=n(21),b=n.n(v),m=n(5),g=n.n(m),y=n(1),k=n(239),S=n(250),w=n(41),O=n.n(w),j=(n(112),n(77)),x=n.n(j),W=(n(251),n(116),n(78),n(234)),E=n(248),I="data:text/html;base64,PGh0bWw+PGhlYWQ+PC9oZWFkPjxib2R5IHN0eWxlPSJtYXJnaW46YXV0bztjb2xvcjogI2ZmZjt0ZXh0LWFsaWduOmNlbnRlcjtmb250LWZhbWlseTpzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OmJvbGQ7YmFja2dyb3VuZC1jb2xvcjogIzAwMDsiPkxvYWRpbmcuLi48L2JvZHk+PC9odG1sPg==",N=new E.a;console.log("video player cache:",N);var C=function(t){if(!t||"none"===t.toLowerCase())return null;var e;try{(e=new URL(t,"".concat(location.protocol,"//").concat(location.hostname))).protocol="https:",e=e.toString()}catch(n){e=t,t.startsWith("//")&&(e="https:".concat(e))}return e},R=function(){var t=x()(O.a.mark((function t(e){var n,r;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,W.Requests.post("/api/get-show-metadata/",!0,{id:e},{"content-type":"application/json"});case 2:return n=t.sent,t.next=5,n.json();case 5:if((r=t.sent).movie_name&&!r.error){t.next=8;break}throw new Error;case 8:return t.abrupt("return",{movie:r.movie_name,episode_meta:r.episode_meta});case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),M=Object(y.h)("div",null,"No show exists with the given ID"),_=function(){var t=x()(O.a.mark((function t(e){var n,r;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n=N.get(e))){t.next=7;break}return console.log("refreshing cache in background"),R(e).then((function(t){return N.set(e,t)})),t.abrupt("return",n);case 7:return t.next=9,R(e);case 9:return r=t.sent,N.set(e,r),t.abrupt("return",r);case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();function L(t){return new URL(t).hostname}n(242),n(243),n(113),n(146);var D=n(111),P=function(t){function e(){var t,n;s()(this,e);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return n=l()(this,(t=p()(e)).call.apply(t,[this].concat(o))),g()(d()(n),"state",{src:I,URLs:[],currentEp:0,previousEp:0}),g()(d()(n),"componentDidUpdate",n.componentDidMount),g()(d()(n),"setSrc",(function(t){return n.setState({src:t})})),g()(d()(n),"_update",(function(){return n.setState({src:I})})),g()(d()(n),"setEpisode",(function(t,e){n.setState((function(n){return{currentEp:t,previousEp:n.currentEp,URLs:e}}))})),n}return b()(e,t),c()(e,[{key:"componentDidMount",value:function(){var t=this.props.movieName;if(t&&(document.title="Watch "+t),this.state.currentEp===this.state.previousEp&&0==this.state.currentEp)return T(1,this.setEpisode,this.props.id)();this.state.src!==I&&this.state.URLs.includes(this.state.src)||this.state.URLs.length&&this.setState({src:this.state.URLs[0]})}},{key:"render",value:function(t,e){var n=this,r=t.movieName,o=t.episodeMeta,i=t.id,s=e.URLs,a=e.currentEp;return Object(y.h)(y.d,null,Object(y.h)("h2",{style:{fontWeight:"bold"}},Object(D.c)(r)),Object(y.h)("h2",{style:{fontWeight:"bold"}},"Now Playing Episode: ",a),s&&s.map((function(t){return Object(y.h)(F,{url:t,onClick:n.setSrc})})),Object(y.h)("iframe",{class:"frame-src",src:this.state.src}),Object(y.h)(U,{data:o,updater:this.setEpisode,id:i,up:this._update}),s&&s.map((function(t){return Object(y.h)(A,{href:t})})))}}]),e}(y.i);function F(t){var e=t.url,n=t.onClick;return e?Object(y.h)("button",{onClick:function(){n(e)},class:"url-selector-button",style:{cursor:"pointer"}},L(e)):null}function A(t){var e=t.href;if(!e)return null;var n="/out?".concat(Object(D.k)({u:e}));return Object(y.h)(y.a,{href:n,class:["download-url-component","search-button"]},"Download from: ",L(e))}function U(t){var e=t.data,n=t.updater,r=t.id,o=t.up;return Object(y.h)("div",null,Array.from({length:e}).map((function(t,e){return Object(y.h)("button",{class:"selector-button",onClick:T(e+1,n,r,o)},"Episode:",e+1)})))}function T(t,e,n,r){return x()(O.a.mark((function o(){var i,s;return O.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return r&&r(),o.next=3,W.Requests.post("/api/build-player/ep/",!0,{mid:n,eid:t},{"content-type":"application/json"});case 3:return i=o.sent,o.next=6,i.json();case 6:return s=o.sent,o.abrupt("return",e(t,[s.url,s.alt1,s.alt2].map(C)));case 8:case"end":return o.stop()}}),o)})))}var J=function(t){function e(){var t,n;s()(this,e);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return n=l()(this,(t=p()(e)).call.apply(t,[this].concat(o))),g()(d()(n),"state",{badId:!1,fetchingDetails:!1,movieName:"",episodeMeta:0}),g()(d()(n),"componentDidUpdate",n.componentDidMount),n}return b()(e,t),c()(e,[{key:"render",value:function(t,e){var n=t.id,r=e.badId,o=e.fetchingDetails,i=e.movieName,s=e.episodeMeta;return r||!i&&!o?M:o?Object(y.h)("div",{"data-fetch":JSON.stringify(this.props)},"Loading TV Data",Object(y.h)("div",null,Object(y.h)(S.LoadingSpinner))):Object(y.h)(P,{movieName:i,id:n,episodeMeta:s})}},{key:"componentDidMount",value:function(t){var e=this,n=this.props.id;if(n||this.setState({badId:!0}),!(this.state.fetchingDetails||t&&t.id===this.props.id))return this.setState({badId:!1,fetchingDetails:!0}),_(n).then((function(t){return e.setState({episodeMeta:t.episode_meta,badId:!1,fetchingDetails:!1,movieName:t.movie})})).catch((function(t){return console.log(t)||e.setState({badId:!0,fetchingDetails:!1})}))}}]),e}(y.i);n.d(e,"default",(function(){return Z}));var Z=function(t){function e(){var t,n;s()(this,e);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return n=l()(this,(t=p()(e)).call.apply(t,[this].concat(o))),g()(d()(n),"state",{badId:!1}),n}return b()(e,t),c()(e,[{key:"getChildren",value:function(t,e){o()(t);var n=e.badId,r=this.movieId;return n||!r?M:Object(y.h)(J,{id:r})}},{key:"render",value:function(t,e){return Object(y.h)(y.d,null,Object(y.h)(k.a),Object(y.h)("section",{data:"player-component"},this.getChildren(t,e)))}},{key:"movieId",get:function(){return new URLSearchParams(y.e.getQs).get("id")}}]),e}(y.i)}}]);