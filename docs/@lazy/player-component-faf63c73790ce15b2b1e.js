(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{172:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},173:function(t,e,n){"use strict";n.d(e,"a",(function(){return g}));n(28);var r=n(11),o=n.n(r),s=n(9),a=n.n(s),i=n(15),c=n.n(i),u=n(12),l=n.n(u),h=n(3),p=n.n(h),f=n(16),d=n.n(f),v=n(6),b=n.n(v),m=n(0),g=function(t){function e(){var t,n;o()(this,e);for(var r=arguments.length,s=new Array(r),a=0;a<r;a++)s[a]=arguments[a];return n=c()(this,(t=l()(e)).call.apply(t,[this].concat(s))),b()(p()(n),"state",{isFocused:!1,value:""}),b()(p()(n),"onFocus",(function(){return!n.state.value&&n.setState({isFocused:!0})})),b()(p()(n),"onBlur",(function(){return!n.state.value&&n.setState({isFocused:!1})})),b()(p()(n),"onInput",(function(t){return n.setState({value:t.target.value})})),b()(p()(n),"onSubmit",(function(){return n.props.onSubmit(n.state.value)})),n}return d()(e,t),a()(e,[{key:"render",value:function(t,e){var n=this,r=t.id,o=t.buttonText,s=void 0===o?"search":o,a=t.labelText,i=void 0===a?"search for shows":a,c=t.onInput,u=t.wssResponse,l=["_animate",e.isFocused?"moveup":"movedown"];return Object(m.h)("div",{class:"search-component"},Object(m.h)("form",{action:"javascript:",onSubmit:this.onSubmit},Object(m.h)("label",{class:l,for:r},i),Object(m.h)(y,{onFocus:this.onFocus,onBlur:this.onBlur,id:r,onInput:function(t){n.onInput(t),null!=c&&c(t)}}),u,Object(m.h)("button",{class:"search-button"},s)))}}]),e}(m.i);function y(t){var e=t.onFocus,n=t.onBlur,r=t.onInput,o=t.id;return Object(m.h)("input",{onFocus:e,onBlur:n,onInput:r,id:o,class:"paper-input"})}},174:function(t,e,n){"use strict";n(28),n(175);var r,o,s=n(11),a=n.n(s),i=n(9),c=n.n(i),u=n(15),l=n.n(u),h=n(12),p=n.n(h),f=n(3),d=n.n(f),v=n(16),b=n.n(v),m=n(6),g=n.n(m),y=n(0),k=n(173),S=n(33),O=(n(57),n(14)),j=n.n(O),w=(n(58),n(25)),W=n.n(w),I=(n(59),n(34),n(44),n(84),function(){function t(){a()(this,t)}return c()(t,[{key:"__defaultOnMessage",value:function(t){if(!["ping","pong"].includes(t.data)){var e=JSON.parse(t.data);this._socketID=e.socket_id}}},{key:"startConn",value:function(t){var e=this;return this.socket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(this.socket.readyState)?this.socket:new Promise((function(n,r){e.socket=new WebSocket(Object(S.g)(t)),e.socket.onopen=function(){e.socket.onmessage=e.__defaultOnMessage,n(e.socket)},e.socket.onerror=function(t){return r(t)}}))}},{key:"close",value:function(){try{this.socket.close()}catch(t){console.warn(t)}}},{key:"send",value:function(t){return this.socket.send(JSON.stringify(t))}},{key:"sendString",value:function(t){return this.socket.send(t)}},{key:"onmessage",set:function(t){var e=this;t!==this._onmessage&&(this._onmessage=t,this.socket.onmessage=function(t){var n=JSON.parse(t.data||"{}");return"ping"===n.type||"pong"===n.type?void 0:e._onmessage(n)})}},{key:"readyState",get:function(){return this.socket.readyState}},{key:"isUsable",get:function(){return!this.socket||[WebSocket.OPEN,WebSocket.CONNECTING].includes(this.socket.readyState)}},{key:"isConnected",get:function(){return!!this.socket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(this.socket.readyState)}}]),t}()),x=function(){return(r||{}).isUsable?r:r=new I},E=function(t){function e(){var t,n;a()(this,e);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return n=l()(this,(t=p()(e)).call.apply(t,[this].concat(o))),g()(d()(n),"state",{resp:[],prevVal:""}),g()(d()(n),"onMessage",(function(t){t.data?n.setState({resp:t.data.map((function(t){return{movie:t.movie,href:Object(S.d)(t.id,t.movie)}}))}):n.setState({resp:[]})})),g()(d()(n),"componentWillUpdate",n.fetchResponses),g()(d()(n),"componentWillMount",n.fetchResponses),n}var n;return b()(e,t),c()(e,[{key:"fetchResponses",value:(n=W()(j.a.mark((function t(){var e,n;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=this.props.val,n=this.state.prevVal,e!=n&&e){t.next=5;break}return this.state.resp.length&&!e&&this.setState({resp:[],prevVal:""}),t.abrupt("return");case 5:return console.log("fetching"),this.setState({prevVal:e}),o=x(),t.next=10,o.startConn("suggestqueries");case 10:o.onmessage=this.onMessage,o.sendString(e);case 12:case"end":return t.stop()}}),t,this)}))),function(){return n.apply(this,arguments)})},{key:"render",value:function(){var t=["response-parent"];return this.state.resp.length&&t.push("has-data"),Object(y.h)("div",{class:t},this.state.resp.map((function(t){return Object(y.h)(y.a,{class:["movie-link","query-response"],href:t.href},decodeHTML(t.movie))})))}}]),e}(y.i);n.d(e,"a",(function(){return N}));var N=function(t){function e(){var t,n;a()(this,e);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return n=l()(this,(t=p()(e)).call.apply(t,[this].concat(o))),g()(d()(n),"state",{value:""}),g()(d()(n),"onInput",(function(t){var e=(t.target.value||"").trim();document.title=e?"Search for ".concat(e):S.c,n.setState({value:e})})),g()(d()(n),"loadSearchResults",(function(){var t=(n.state.value||"").trim();t&&Object(S.f)(t),n.setState({value:""})})),n}return b()(e,t),c()(e,[{key:"componentWillMount",value:function(){x().startConn("suggestqueries")}},{key:"render",value:function(){return Object(y.h)(y.d,null,Object(y.h)(k.a,{id:"landing-search-component",onSubmit:this.loadSearchResults,wssResponse:Object(y.h)(E,{val:this.state.value}),onInput:this.onInput}))}}]),e}(y.i)},175:function(t,e,n){"use strict";var r=n(7),o=n(176).trim;r({target:"String",proto:!0,forced:n(177)("trim")},{trim:function(){return o(this)}})},176:function(t,e,n){var r=n(23),o="["+n(172)+"]",s=RegExp("^"+o+o+"*"),a=RegExp(o+o+"*$"),i=function(t){return function(e){var n=String(r(e));return 1&t&&(n=n.replace(s,"")),2&t&&(n=n.replace(a,"")),n}};t.exports={start:i(1),end:i(2),trim:i(3)}},177:function(t,e,n){var r=n(4),o=n(172);t.exports=function(t){return r((function(){return!!o[t]()||"​᠎"!="​᠎"[t]()||o[t].name!==t}))}},179:function(t,e,n){var r=n(7),o=n(123);r({target:"Array",stat:!0,forced:!n(122)((function(t){Array.from(t)}))},{from:o})},180:function(t,e,n){"use strict";var r=n(19);let o=Object(r.e)();const s=Object(r.b)("Map",o),a=(Object(r.b)("Set",o),Object(r.b)("WeakMap",o)&&Object(r.b)("WeakSet",o),"__@@map"),i=t=>t!=t,c=(t,e)=>t===e||i(t)&&i(e),u=t=>0===t?0:t;let l,h,p;if("undefined"!=typeof Symbol){function f(t,e){const n=t[a];let r=0;const o=n.length,s=e?0:1;return{[Symbol.iterator]:function(){return this},next:function(){return r<o?{value:n[r++][s],done:!1}:{value:void 0,done:!0}}}}l=function(){return this[a][Symbol.iterator]()},h=function(){return f(this,!1)},p=function(){return f(this,!0)}}else l=p=h=function(){console.warn("no symbol support")};var d={keys:p,values:h,entries:l},v=n(45);function b(t,e){for(const n of t[a])if(c(n[0],e))return n;return null}function m(t,e){if(n=t,!(null!=(r=e)&&"undefined"!=typeof Symbol&&r[Symbol.hasInstance]?r[Symbol.hasInstance](n):n instanceof r))throw new TypeError("Cannot call a class as a function");var n,r}const g=function t(e,n){return!n&&s?new Map(e):(m(this,t),this[a]=[],function(t,e){if(null!=e){if(!Object(r.d)(e))throw new Error("value:"+String(e)+" is not iterable");for(const n of e){if(!n||2!==n.length)throw new Error("invalid arg");t.set(n[0],n[1])}}}(this,e),this)};var y;(y=g).prototype.set=function(t,e){const n=b(this,t);return n?n[1]=e:this[a].push([u(t),e]),this},y.prototype.has=function(t){return!!b(this,t)},y.prototype.delete=function(t){let e=!1;return this[a]=this[a].filter(n=>{const r=!c(n[0],t);return r||(e=!0),r}),e},y.prototype.get=function(t){const e=b(this,t);return e?e[1]:void 0},y.prototype.forEach=function(t,e){for(const n of this[a]){const r=n[1],o=n[0],s=this;e?t.call(e,r,o,s):t(r,o,s)}},y.prototype.clear=function(){this[a].length=0},Object.defineProperty(y.prototype,"size",{enumerable:!1,configurable:!0,get:function(){return this[a].length}}),"undefined"!=typeof Symbol&&(y.prototype[Symbol.iterator]=d.entries,y.prototype[Symbol.toStringTag]="Map"),Object(v.a)(y.prototype,d),g[Symbol.species]=g;e.a=g},182:function(t,e,n){"use strict";var r=n(7),o=n(21),s=n(125),a=n(23),i=n(126),c="".startsWith,u=Math.min;r({target:"String",proto:!0,forced:!i("startsWith")},{startsWith:function(t){var e=String(a(this));s(t);var n=o(u(arguments.length>1?arguments[1]:void 0,e.length)),r=String(t);return c?c.call(e,r,n):e.slice(n,n+r.length)===r}})},188:function(t,e,n){"use strict";n.r(e);n(28),n(29),n(34),n(43),n(60);var r=n(83),o=n.n(r),s=n(11),a=n.n(s),i=n(9),c=n.n(i),u=n(15),l=n.n(u),h=n(12),p=n.n(h),f=n(3),d=n.n(f),v=n(16),b=n.n(v),m=n(6),g=n.n(m),y=n(0),k=n(174),S=n(119),O=(n(85),n(182),n(14)),j=n.n(O),w=(n(58),n(25)),W=n.n(w),I=n(82),x=n(180),E="data:text/html;base64,PGh0bWw+PGhlYWQ+PC9oZWFkPjxib2R5IHN0eWxlPSJtYXJnaW46YXV0bztjb2xvcjogI2ZmZjt0ZXh0LWFsaWduOmNlbnRlcjtmb250LWZhbWlseTpzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OmJvbGQ7YmFja2dyb3VuZC1jb2xvcjogIzAwMDsiPkxvYWRpbmcuLi48L2JvZHk+PC9odG1sPg==",N=new x.a;console.log("video player cache:",N);var M=function(t){if(!t||"none"===t.toLowerCase())return null;var e;try{(e=new URL(t,"".concat(location.protocol,"//").concat(location.hostname))).protocol="https:",e=e.toString()}catch(n){e=t,t.startsWith("//")&&(e="https:".concat(e))}return e},C=function(){var t=W()(j.a.mark((function t(e){var n,r;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,I.a.post("/api/get-show-metadata/",!0,{id:e},{"content-type":"application/json"});case 2:return n=t.sent,t.next=5,n.json();case 5:if((r=t.sent).movie_name&&!r.error){t.next=8;break}throw new Error;case 8:return t.abrupt("return",{movie:r.movie_name,episode_meta:r.episode_meta});case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),R=Object(y.h)("div",null,"No show exists with the given ID"),_=function(){var t=W()(j.a.mark((function t(e){var n,r;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n=N.get(e))){t.next=7;break}return console.log("refreshing cache in background"),C(e).then((function(t){return N.set(e,t)})),t.abrupt("return",n);case 7:return t.next=9,C(e);case 9:return r=t.sent,N.set(e,r),t.abrupt("return",r);case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();function D(t){return new URL(t).hostname}n(179),n(59),n(57),n(84);var L=n(33),P=function(t){function e(){var t,n;a()(this,e);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return n=l()(this,(t=p()(e)).call.apply(t,[this].concat(o))),g()(d()(n),"state",{src:E,URLs:[],currentEp:0,previousEp:0}),g()(d()(n),"componentDidUpdate",n.componentDidMount),g()(d()(n),"setSrc",(function(t){return n.setState({src:t})})),g()(d()(n),"_update",(function(){return n.setState({src:E})})),g()(d()(n),"setEpisode",(function(t,e){n.setState((function(n){return{currentEp:t,previousEp:n.currentEp,URLs:e}}))})),n}return b()(e,t),c()(e,[{key:"componentDidMount",value:function(){var t=this.props.movieName;if(t&&(document.title="Watch "+t),this.state.currentEp===this.state.previousEp&&0==this.state.currentEp)return J(1,this.setEpisode,this.props.id)();this.state.src!==E&&this.state.URLs.includes(this.state.src)||this.state.URLs.length&&this.setState({src:this.state.URLs[0]})}},{key:"render",value:function(t,e){var n=this,r=t.movieName,o=t.episodeMeta,s=t.id,a=e.URLs,i=e.currentEp;return Object(y.h)(y.d,null,Object(y.h)("h2",{style:{fontWeight:"bold"}},Object(L.b)(r)),Object(y.h)("h2",{style:{fontWeight:"bold"}},"Now Playing Episode: ",i),a&&a.map((function(t){return Object(y.h)(U,{url:t,onClick:n.setSrc})})),Object(y.h)("iframe",{class:"frame-src",src:this.state.src}),Object(y.h)(A,{data:o,updater:this.setEpisode,id:s,up:this._update}),a&&a.map((function(t){return Object(y.h)(F,{href:t})})))}}]),e}(y.i);function U(t){var e=t.url,n=t.onClick;return e?Object(y.h)("button",{onClick(){n(e)},class:"url-selector-button",style:{cursor:"pointer"}},D(e)):null}function F(t){var e=t.href;if(!e)return null;var n="/out?".concat(Object(L.j)({u:e}));return Object(y.h)(y.a,{href:n,class:["download-url-component","search-button"]},"Download from: ",D(e))}function A(t){var e=t.data,n=t.updater,r=t.id,o=t.up;return Object(y.h)("div",null,Array.from({length:e}).map((function(t,e){return Object(y.h)("button",{class:"selector-button",onClick:J(e+1,n,r,o)},"Episode:",e+1)})))}function J(t,e,n,r){return W()(j.a.mark((function o(){var s,a;return j.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return r&&r(),o.next=3,I.a.post("/api/build-player/ep/",!0,{mid:n,eid:t},{"content-type":"application/json"});case 3:return s=o.sent,o.next=6,s.json();case 6:return a=o.sent,o.abrupt("return",e(t,[a.url,a.alt1,a.alt2].map(M)));case 8:case"end":return o.stop()}}),o)})))}var T=function(t){function e(){var t,n;a()(this,e);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return n=l()(this,(t=p()(e)).call.apply(t,[this].concat(o))),g()(d()(n),"state",{badId:!1,fetchingDetails:!1,movieName:"",episodeMeta:0}),g()(d()(n),"componentDidUpdate",n.componentDidMount),n}return b()(e,t),c()(e,[{key:"render",value:function(t,e){var n=t.id,r=e.badId,o=e.fetchingDetails,s=e.movieName,a=e.episodeMeta;return r||!s&&!o?R:o?Object(y.h)("div",{"data-fetch":JSON.stringify(this.props)},"Loading TV Data",Object(y.h)("div",null,Object(y.h)(S.a))):Object(y.h)(P,{movieName:s,id:n,episodeMeta:a})}},{key:"componentDidMount",value:function(t){var e=this,n=this.props.id;if(n||this.setState({badId:!0}),!(this.state.fetchingDetails||t&&t.id===this.props.id))return this.setState({badId:!1,fetchingDetails:!0}),_(n).then((function(t){return e.setState({episodeMeta:t.episode_meta,badId:!1,fetchingDetails:!1,movieName:t.movie})})).catch((function(t){return console.log(t)||e.setState({badId:!0,fetchingDetails:!1})}))}}]),e}(y.i);n.d(e,"default",(function(){return Z}));var Z=function(t){function e(){var t,n;a()(this,e);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return n=l()(this,(t=p()(e)).call.apply(t,[this].concat(o))),g()(d()(n),"state",{badId:!1}),n}return b()(e,t),c()(e,[{key:"getChildren",value:function(t,e){o()(t);var n=e.badId,r=this.movieId;return n||!r?R:Object(y.h)(T,{id:r})}},{key:"render",value:function(t,e){return Object(y.h)(y.d,null,Object(y.h)(k.a),Object(y.h)("section",{data:"player-component"},this.getChildren(t,e)))}},{key:"movieId",get:function(){return new URLSearchParams(y.e.getQs).get("id")}}]),e}(y.i)}}]);