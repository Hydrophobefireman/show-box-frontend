(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{294:function(e,t,s){"use strict";s.d(t,"a",function(){return d});var n=s(7),a=s(51),r=s(20),o=s(33);const i=(e,t)=>{t.forEach((t,s)=>{const r=e[s],o=t.children[0],i=t.getState.id,c=n.b.find(i,o.$element)[0],d=r.id,h=r.movie;if(i===d)return;const u=`/watch?${Object(a.d)({id:d,show:h})}`;o.setDomAttrs({href:`#${u}`},!1),t.setState({id:d,showName:h},!1),c.data=h,c.tag=d})},c=new r.b("div",{},[],{class:["response-parent"]}),d=e=>{if(!e)return c.removeClassName("has-data"),c.destroyChildComponents(!1,!0),c;c.addClassName("has-data");const t=(e=>{let t;if("string"==typeof e&&(n.e&&console.warn("return response as an object!"),t=JSON.parse(e)),(t=e)["no-res"])return[];return t.data||[]})(e),s=t.length;s||c.removeClassName("has-data");const h=c.children.length;if(s===h)i(t,c.children);else if(s>h){const e=t.splice(h,s);i(t,c.children);const v=(e=>{const t=[];var s=!0,i=!1,c=void 0;try{for(var h,u=e[Symbol.iterator]();!(s=(h=u.next()).done);s=!0){const e=h.value,s=e.id,i=e.movie,c=`/watch?${Object(a.d)({id:s,show:Object(o.h)(i)})}`,u=new r.b("div",{id:s,showName:i},[],{className:"query-response"}),l=new r.b("a",{},[new n.b(i,s)],{href:`#${c}`,className:"show-link"}).attachEventListener("click",()=>{d(),Object(a.a)(`/watch?${Object(a.d)({id:u.getState.id,show:Object(o.h)(u.getState.showName)})}`)});u.addChild(l),t.push(u)}}catch(e){i=!0,c=e}finally{try{s||null==u.return||u.return()}finally{if(i)throw c}}return t})(e);var u=!0,l=!1,p=void 0;try{for(var b,m=v[Symbol.iterator]();!(u=(b=m.next()).done);u=!0){const e=b.value;c.addChild(e)}}catch(e){l=!0,p=e}finally{try{u||null==m.return||m.return()}finally{if(l)throw p}}}else{const e=c.children.splice(s,h);i(t,c.children),e.forEach(e=>e.destroyComponent())}c.update()}},295:function(e,t,s){"use strict";var n=s(5),a=s.n(n),r=s(12),o=s.n(r),i=s(20),c=s(7),d=s(33);class h{__defaultOnMessage(e){if(["ping","pong"].includes(e.data))return;const t=JSON.parse(e.data);this._socketID=t.socket_id}startConn(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return new Promise((s,n)=>{this.socket=new WebSocket(Object(d.e)(e)),this.socket.onopen=(()=>{this.socket.onmessage=this.__defaultOnMessage,t&&this._pingPongs(),s(this.socket)}),this.socket.onerror=(e=>n(e))})}close(){try{this.socket.close()}catch(e){console.warn(e)}}send(e){return this.socket.send(JSON.stringify(e))}sendString(e){return this.socket.send(e)}set onmessage(e){this.socket.onmessage=(t=>{const s=JSON.parse(t.data||"{}");return"ping"===s.type||"pong"===s.type?void 0:e(s)})}get readyState(){return this.socket.readyState}get isUsable(){return!this.socket||[WebSocket.OPEN,WebSocket.CONNECTING].includes(this.socket.readyState)}get isConnected(){return!!this.socket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(this.socket.readyState)}_pingPongs(){this.pingtimer=setTimeout(()=>{this.socket.readyState===this.socket.OPEN?(this.send({type:"ping"}),this._pingPongs()):clearTimeout(this.pingtimer)},2e4)}constructor(){}}let u;const l=()=>(u||{}).isUsable?u:u=new h;var p=s(51),b=s(294);s.d(t,"b",function(){return m}),s.d(t,"a",function(){return k});const m=e=>void(document.title=e);class v extends i.b{update(){const e=this.getState.value;m(e?`Search for ${e}`:window.oldTitle),this.setDomAttrs({value:e},!1).updateDOMAttrs()}appendComponentOnResponse(e){this.socket.onmessage=this.onResponse=e.bind(this)}handleInput(e){var t=this;return o()(a.a.mark(function s(){var n,r;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:n=e.target.value,t.setState({value:n}),"/search/"===Object(p.b)(window.location.href).route&&Object(p.c)("q",n),!t.socket.isConnected&&t.socket.isUsable&&t.useSocket&&t.socket.startConn("suggestqueries",!1),(r=n.trim())&&t.useSocket&&t.socket.sendString(r);case 7:case"end":return s.stop()}},s,this)}))()}handleFocus(){this.setState({isFocused:!0})}handleBlur(){this.setState({isFocused:!1});try{Object(b.a)()}catch(e){}}constructor(e){super("input",{value:""},[],{className:["paper-input"]}),this.useSocket=!!e,this.onResponse=(()=>void 0),this.socket={},e&&(this.socket=l(),this.beforeRender=(()=>{this.onResponse()}),this.onAttached=(()=>{!this.socket.isConnected&&this.socket.isUsable&&this.socket.startConn("suggestqueries",!1)})),this.attachEventListener("input",this.handleInput.bind(this)).attachEventListener("focus",this.handleFocus.bind(this)).attachEventListener("blur",this.handleBlur.bind(this))}}class f extends i.b{constructor(e){super("div",{},[new c.b(e)],{className:"_animate"})}update(){this.updateChildren(),(this.getState.value||"").trim()||this.getState.isFocused?this.addClassName("moveup").removeClassName("movedown"):this.removeClassName("moveup").addClassName("movedown"),this.updateDOMAttrs()}}const k=function(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];const s=new f(e),n=new v(t).bindData("value",s,"value",!1).bindData("isFocused",s,"isFocused",!1);return{component:new i.b("div",{},[s,n],{className:["search-component"]}),inputComponent:n,animatedInputComponent:s}}},301:function(e,t,s){"use strict";s.r(t);var n=s(5),a=s.n(n),r=s(12),o=s.n(r),i=s(20),c=s(7),d=s(295),h=s(88),u=s(51),l=s(33);const p=e=>{const t=btoa(e);return Object(l.g)(t).split("").reverse().join("")},b=Object(d.a)("Press enter to search",!1),m=b.inputComponent,v=new i.b("div",{},[b.component]),f=(e,t)=>{e.attachEventListener("click",o()(a.a.mark(function e(){var s,n,r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.get(`/api/add/tv-show/lookup?${Object(u.d)({s:p(this.getState.url),t:this.getState.title})}`);case 2:return s=e.sent,e.next=5,s.text();case 5:n=e.sent,v.destroyChildComponents(!1,!0),v.$element.appendChild(new c.b(n)),(r=document.createElement("a")).href=`#/search?${Object(u.d)({q:t})}`,r.style.margin="auto",r.style.display="block",r.innerHTML=`Search for ${t}`,v.$element.appendChild(r);case 14:case"end":return e.stop()}},e,this)})).bind(e))};function k(){return(k=o()(a.a.mark(function e(t){var s,n,r,o,d,l,p,b,m,k,w,g,S,y,C;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(13!==t.keyCode){e.next=46;break}if((s=c.b.find("$$",v.$element)[0])&&s.remove(),!(n=(t.target.value||"").trim())){e.next=46;break}return e.prev=5,e.next=8,h.a.get(`/media/add-shows/fetch/?${Object(u.d)({s:n})}`,!0);case 8:return o=e.sent,e.next=11,o.json();case 11:if(e.t0=e.sent,e.t0){e.next=14;break}e.t0={};case 14:d=e.t0,r=d.shows,e.next=20;break;case 18:e.prev=18,e.t1=e.catch(5);case 20:if(!r||!r.length){e.next=45;break}for(l=[],p=!0,b=!1,m=void 0,e.prev=25,k=r[Symbol.iterator]();!(p=(w=k.next()).done);p=!0)g=w.value,S=g.title,y=g.url,C=new i.b("div",{url:y,title:S},[new c.b(S)],{style:"width:65%;margin:auto;text-decoration:underline;cursor:pointer"}),f(C,S),l.push(C);e.next=33;break;case 29:e.prev=29,e.t2=e.catch(25),b=!0,m=e.t2;case 33:e.prev=33,e.prev=34,p||null==k.return||k.return();case 36:if(e.prev=36,!b){e.next=39;break}throw m;case 39:return e.finish(36);case 40:return e.finish(33);case 41:v.addChild(new i.b("div",{},l),!1),v.update(),e.next=46;break;case 45:return e.abrupt("return",v.$element.appendChild(new c.b("No Results found","$$")));case 46:case"end":return e.stop()}},e,this,[[5,18],[25,29,33,41],[34,,36,40]])}))).apply(this,arguments)}m.attachEventListener("keydown",function(e){return k.apply(this,arguments)}.bind(m)),t.default=v}}]);