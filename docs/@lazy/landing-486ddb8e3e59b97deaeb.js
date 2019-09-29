(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{224:function(t,e,s){"use strict";s.d(e,"a",(function(){return c}));var n=s(5),o=s.n(n),i=s(0);class c extends i.i{constructor(){super(...arguments),o()(this,"state",{isFocused:!1,value:""}),o()(this,"onFocus",()=>!this.state.value&&this.setState({isFocused:!0})),o()(this,"onBlur",()=>!this.state.value&&this.setState({isFocused:!1})),o()(this,"onInput",t=>this.setState({value:t.target.value})),o()(this,"onSubmit",()=>this.props.onSubmit(this.state.value))}render(t,e){let{id:s,buttonText:n="search",labelText:o="search for shows",onInput:c,wssResponse:r}=t,{isFocused:h}=e;const u=["_animate",h?"moveup":"movedown"];return Object(i.h)("div",{class:"search-component"},Object(i.h)("form",{action:"javascript:",onSubmit:this.onSubmit},Object(i.h)("label",{class:u,for:s},o),Object(i.h)(a,{onFocus:this.onFocus,onBlur:this.onBlur,id:s,onInput:t=>{this.onInput(t),null!=c&&c(t)}}),r,Object(i.h)("button",{class:"search-button"},n)))}}function a(t){let{onFocus:e,onBlur:s,onInput:n,id:o}=t;return Object(i.h)("input",{onFocus:e,onBlur:s,onInput:n,id:o,class:"paper-input"})}},226:function(t,e,s){"use strict";var n=s(5),o=s.n(n),i=s(0),c=s(224),a=s(42);class r{__defaultOnMessage(t){if(["ping","pong"].includes(t.data))return;const e=JSON.parse(t.data);this._socketID=e.socket_id}startConn(t){return this.socket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(this.socket.readyState)?this.socket:new Promise((e,s)=>{this.socket=new WebSocket(Object(a.h)(t)),this.socket.onopen=()=>{this.socket.onmessage=this.__defaultOnMessage,e(this.socket)},this.socket.onerror=t=>s(t)})}close(){try{this.socket.close()}catch(t){console.warn(t)}}send(t){return this.socket.send(JSON.stringify(t))}sendString(t){return this.socket.send(t)}set onmessage(t){t!==this._onmessage&&(this._onmessage=t,this.socket.onmessage=t=>{const e=JSON.parse(t.data||"{}");return"ping"===e.type||"pong"===e.type?void 0:this._onmessage(e)})}get readyState(){return this.socket.readyState}get isUsable(){return!this.socket||[WebSocket.OPEN,WebSocket.CONNECTING].includes(this.socket.readyState)}get isConnected(){return!!this.socket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(this.socket.readyState)}}let h;const u=()=>(h||{}).isUsable?h:h=new r;let l;class d extends i.i{constructor(){super(...arguments),o()(this,"state",{resp:[],prevVal:""}),o()(this,"onMessage",t=>{t.data?this.setState({resp:t.data.map(t=>({movie:t.movie,href:Object(a.e)(t.id,t.movie)}))}):this.setState({resp:[]})}),o()(this,"componentWillUpdate",Object(a.b)(this.fetchResponses,100,!1,this)),o()(this,"componentWillMount",this.componentWillUpdate)}async fetchResponses(){const t=this.props.val;t!=this.state.prevVal&&t?(console.log("fetching"),this.setState({prevVal:t}),l=u(),await l.startConn("suggestqueries"),l.onmessage=this.onMessage,l.sendString(t)):this.state.resp.length&&!t&&this.setState({resp:[],prevVal:""})}render(){const t=["response-parent"];return this.state.resp.length&&t.push("has-data"),Object(i.h)("div",{class:t},this.state.resp.map(t=>Object(i.h)(i.a,{class:["movie-link","query-response"],href:t.href},Object(a.c)(t.movie))))}}s.d(e,"a",(function(){return p}));class p extends i.i{constructor(){super(...arguments),o()(this,"state",{value:""}),o()(this,"onInput",t=>{const e=(t.target.value||"").trim();document.title=e?"Search for ".concat(e):a.d,this.setState({value:e})}),o()(this,"loadSearchResults",()=>{const t=(this.state.value||"").trim();t&&Object(a.g)(t),this.setState({value:""})})}componentWillMount(){u().startConn("suggestqueries")}render(){return Object(i.h)(i.d,null,Object(i.h)(c.a,{id:"landing-search-component",onSubmit:this.loadSearchResults,wssResponse:Object(i.h)(d,{val:this.state.value}),onInput:this.onInput}))}}},227:function(t,e,s){"use strict";s.d(e,"a",(function(){return r})),s.d(e,"b",(function(){return u}));var n=s(5),o=s.n(n),i=s(0),c=s(105),a=s(42);function r(){return Object(i.h)(i.d,null,Object(i.h)("div",{style:{display:"block",marginTop:"50px"}},"Check some of these shows out!"),Object(i.h)(h))}class h extends i.i{constructor(){super(...arguments),o()(this,"state",{resp:[]})}componentWillMount(){c.a.get("/i/rec/").then(t=>t.json()).then(t=>{this.setState({resp:t.recommendations})})}render(t,e){let{resp:s=[]}=e;return Object(i.h)("div",{class:"rec-box"},s.map(t=>Object(i.h)(u,{data:t})))}}class u extends i.i{render(t){let{data:e={},customOnClick:s}=t;const n=Object(i.h)(i.d,null,Object(i.h)(l,{thumb:e.thumb?Object(a.f)(e.thumb).then(a.i):null}),Object(i.h)("span",{class:"rec-title"},Object(a.c)(e.movie)));return s?Object(i.h)("div",{class:"rec-wrapper",onClick:()=>s(e.id)},n):Object(i.h)(i.a,{class:"rec-wrapper",href:e.id?Object(a.e)(e.id,e.movie):null},n)}}class l extends i.i{constructor(){super(...arguments),o()(this,"state",{thumb:""}),o()(this,"componentDidUpdate",this.componentDidMount)}componentDidMount(t){if(null==this.props.thumb)return this.setState(t=>null!=t&&t.thumb?{thumb:""}:null);this.props.thumb&&this.props.thumb.then&&(!this.state.thumb||t&&t.thumb!==this.props.thumb)&&this.props.thumb.then(t=>t&&this.setState({thumb:t}))}render(t,e){let{}=t,{thumb:s=""}=e;return Object(i.h)("div",{style:{backgroundImage:s?"url(".concat(s,")"):"none"},class:"rec-image"})}}},242:function(t,e,s){"use strict";s.r(e),s.d(e,"default",(function(){return r}));var n=s(0),o=(s(72),s(42)),i=s(226),c=s(227);function a(){return Object(n.h)("div",null,"NEW! Add a new show to our databases by yourself",Object(n.h)(n.a,{href:"/media/add/",class:["banner-button","database-linker"]},"Here!"))}class r extends n.i{componentDidMount(){document.title=o.d}render(){return Object(n.h)("section",{data:"index"},Object(n.h)(a),Object(n.h)(i.a),Object(n.h)(c.a))}}}}]);