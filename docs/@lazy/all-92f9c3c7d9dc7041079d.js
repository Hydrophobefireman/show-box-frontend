(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{186:function(t,n,e){"use strict";e.r(n),e.d(n,"default",(function(){return S}));e(28),e(179),e(56);var s=e(83),o=e.n(s),r=e(10),a=e.n(r),c=e(14),i=e.n(c),u=e(15),h=e.n(u),l=e(11),d=e.n(l),f=e(5),b=e.n(f),p=e(16),v=e.n(p),w=e(6),j=e.n(w),O=e(0),g=e(81),m=e(181),y=e(178),k=e(174),G=[],A=function(t){function n(){var t,e;a()(this,n);for(var s=arguments.length,o=new Array(s),r=0;r<s;r++)o[r]=arguments[r];return e=h()(this,(t=d()(n)).call.apply(t,[this].concat(o))),j()(b()(e),"state",{hasResults:!1,showGhost:!0,data:[]}),e}return v()(n,t),i()(n,[{key:"componentDidMount",value:function(){var t=this;if(document.title="All TV Shows",G.length)return this.setState({resp:G,showGhost:!1});g.a.post("/api/get-all/",!0,{}).then((function(t){return t.json()})).then((function(n){G=n.movies,t.setState({resp:n.movies,showGhost:!1})}))}},{key:"getChildNodes",value:function(t){var n=t.showGhost,e=t.resp;return n?Object(O.h)("div",{class:"rec-box"},Array.from({length:5},(function(){return Object(O.h)(y.b,m.b)}))):Object(O.h)("div",{class:"rec-box"},e.map((function(t){return Object(O.h)(y.b,{data:t})})))}},{key:"render",value:function(t,n){return o()(t),Object(O.h)("section",{data:"all-results"},this.getChildNodes(n))}}]),n}(O.i);function S(){return Object(O.h)(O.d,null,Object(O.h)(k.a),Object(O.h)(A))}}}]);