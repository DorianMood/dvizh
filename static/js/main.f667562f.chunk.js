(this.webpackJsonpdvizh=this.webpackJsonpdvizh||[]).push([[0],{174:function(e,t,n){},299:function(e,t,n){e.exports=n(583)},452:function(e,t){},454:function(e,t){},466:function(e,t){},468:function(e,t){},583:function(e,t,n){"use strict";n.r(t);n(300),n(326),n(328),n(329),n(331),n(332),n(333),n(334),n(335),n(336),n(337),n(338),n(340),n(341),n(342),n(343),n(344),n(345),n(346),n(347),n(348),n(349),n(351),n(352),n(353),n(354),n(355),n(356),n(357),n(358),n(359),n(360),n(361),n(362),n(363),n(364),n(365),n(366),n(367),n(368);var a=n(21),r=n.n(a),c=n(32),o=n(0),l=n.n(o),i=n(234),u=n.n(i),s=n(39),f=n(25),m=n.n(f),d=n(49),p=n.n(d),b=(n(376),n(585)),v=(n(168),n(235)),E=n.n(v),h=function(){return l.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"})},g=n(13),j=n(140),O=n.n(j),y=n(4),k=n(243),x=n.n(k),w=n(244),S=n.n(w),C=n(76),I=n(42),A=(n(172),n(174),n(100)),z=n(245),R=n.n(z),_=n(101),N=n.n(_),G=n(246),F=n.n(G),K=n(102),U=n.n(K),V=function(e){var t,n=e.event,a=Object(s.b)().router;return l.a.createElement(y.c,{size:"l",onClick:function(){a.navigate("event",{id:n.id,event:n})}},l.a.createElement(y.e,{before:l.a.createElement(y.a,{size:32,src:null!==(t=n.user.photo)&&void 0!==t?t:null},n.user.photo?null:l.a.createElement(N.a,null)),size:"l",description:l.a.createElement("div",{style:{display:"flex"}},l.a.createElement(F.a,null),n.location.name),asideContent:l.a.createElement(l.a.Fragment,null,n.price&&0!==n.price?l.a.createElement("div",{style:{textAlign:"center",color:"green"}},l.a.createElement(U.a,{style:{margin:"0 auto"}}),Math.round(n.price)):l.a.createElement(l.a.Fragment,null),l.a.createElement("div",null,new Date(n.date).toLocaleDateString())),bottomContent:l.a.createElement(l.a.Fragment,null,l.a.createElement("div",null,n.description))},n.name))},D=function(e){var t=e.filterValues,n=e.onUpdate;return l.a.createElement(y.j,{style:{zIndex:1e3}},l.a.createElement(y.x,{min:500,max:5e4,step:500,value:null===t.location?1:t.location,onChange:function(e){n({key:"location",value:e>=5e4?null:e})},top:"\u0412 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 ".concat(null===t.location?"\u221e":t.location," \u043c")}),l.a.createElement(y.e,null),l.a.createElement(y.e,null))},T=function(e){var t=e.events,n=e.filter,a=e.setFilter,r=Object(o.useState)(null),c=Object(g.a)(r,2),i=c[0],u=c[1],s=Object(o.useState)(n),f=Object(g.a)(s,2),m=f[0],d=f[1];Object(o.useEffect)((function(){d(n)}),[n]);var p=t.filter((function(e){return e})),b=l.a.createElement(y.q,{activeModal:i,onClose:function(){a(m),u(null)}},l.a.createElement(y.o,{id:"main-modal",header:l.a.createElement(y.p,null,l.a.createElement(y.E,{level:"2"},"\u0424\u0438\u043b\u044c\u0442\u0440\u044b")),dynamicContentHeight:!0},l.a.createElement(D,{filterValues:m,onUpdate:function(e){var t=e.key,n=e.value;d(Object(I.a)(Object(I.a)({},m),{},Object(A.a)({},t,n)))}})));return l.a.createElement(y.G,{modal:b},l.a.createElement(y.l,{separator:"hide",header:l.a.createElement(y.f,{before:l.a.createElement(R.a,null),onClick:function(){u("main-modal")}},"\u0424\u0438\u043b\u044c\u0442\u0440\u043e\u0432\u0430\u0442\u044c")},l.a.createElement(y.d,null,p.map((function(e,t){return l.a.createElement(V,{key:t,event:e})})))))},W=function(e){var t=e.user;return l.a.createElement(y.v,{className:"user-profile-header",disabled:!0,multiline:!0,before:l.a.createElement(y.a,{size:72,src:null!==t?t.photo_200:null},null===t?l.a.createElement(N.a,null):null),text:"Rating here soon"},l.a.createElement(y.E,{level:"2",weight:"regular"},null!==t?"".concat(t.first_name," ").concat(t.last_name):"\u041d\u0438\u043a\u0438\u0442\u0430 \u0414\u043e\u043b\u0433\u043e\u0448\u0435\u0438\u043d"))},B=n(247),M=n.n(B),H=function(){var e=Object(s.b)().router;return l.a.createElement("div",{style:{position:"fixed",left:24,bottom:64,zIndex:1},onClick:function(){return e.navigate("create")}},l.a.createElement(y.a,{style:{background:"var(--button_primary_background)",boxShadow:"0px 0px 10px black"}},l.a.createElement(M.a,{fill:"var(--button_primary_foreground)"})))},P=n(248),L=n(249),q=n(250),J=function(){function e(t,n,a){Object(P.a)(this,e),this.location=t,this.date=n,this.update=this.update,this.filter=this.filter}return Object(L.a)(e,[{key:"update",value:function(e){this[e.key]=e.value}},{key:"filter",value:function(e,t){var n=this;return console.log("filtering ",t,this.location),e.filter((function(e){return!n.location||null===n.location||Object(q.getDistance)({latitude:e.location.lat,longitude:e.location.lng},{latitude:t[0],longitude:t[1]})<=n.location}))}}]),e}(),Q=n(103),X=n.n(Q),Y=n(251),Z=n.n(Y),$=function(){var e=Object(s.b)().router;return l.a.createElement("div",{style:{position:"fixed",left:24,bottom:128,zIndex:1},onClick:function(){m.a.send("VKWebAppOpenCodeReader").then((function(t){console.log("Scanned",t),e.navigate("event",{id:t.code_data})})).catch((function(e){console.log(e)}))}},l.a.createElement(y.a,{style:{background:"var(--button_primary_background)",boxShadow:"0px 0px 10px black"}},l.a.createElement(Z.a,{fill:"var(--button_primary_foreground)"})))},ee=function(e){var t=p.a.database(),n=Object(o.useState)(!0),a=Object(g.a)(n,2),i=a[0],u=a[1],s=Object(o.useState)(null),f=Object(g.a)(s,2),d=f[0],b=f[1],v=Object(o.useState)([]),E=Object(g.a)(v,2),h=E[0],j=E[1],O=Object(o.useState)(new J(null,null)),k=Object(g.a)(O,2),x=k[0],w=k[1],S=Object(o.useState)([56.85,60.6]),A=Object(g.a)(S,2),z=A[0],R=A[1];Object(o.useEffect)((function(){function e(){return(e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.send("VKWebAppGetUserInfo");case 2:t=e.sent,b(t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(o.useEffect)((function(){function e(){return(e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.send("VKWebAppGetGeodata");case 2:t=e.sent,R([t.lat,t.long]);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[x]);var _=function(){var e=h[h.length-1],n=t.ref("events").orderByKey();h.length>0&&(n=n.startAt(e.id)),n.limitToFirst(10).on("value",(function(e){var t=e.val()?Object.entries(e.val()).map((function(e){return Object(I.a)({id:e[0]},e[1])})):[];h.length>0&&t.splice(0,1),t.length>0?j([].concat(Object(C.a)(h),Object(C.a)(t))):i&&u(!1)}))};Object(o.useEffect)((function(){_()}),[t]);var N=x.filter(h,z);return l.a.createElement(y.r,null,l.a.createElement(W,{user:d}),l.a.createElement(X.a,{threshold:0,loadMore:_,hasMore:i,loader:l.a.createElement(y.y,{key:0})},l.a.createElement(T,{events:N,filter:x,setFilter:w})),l.a.createElement(H,null),l.a.createElement($,null))},te=n(252),ne=n(35),ae=function(e){var t=p.a.database(),n=Object(o.useState)(!0),a=Object(g.a)(n,2),i=a[0],u=a[1],s=Object(o.useState)([]),f=Object(g.a)(s,2),d=f[0],b=f[1],v=Object(o.useState)([56.85,60.6]),E=Object(g.a)(v,2),h=E[0],j=E[1],O=Object(o.useState)(new J(null,null)),k=Object(g.a)(O,2),x=k[0],w=k[1];Object(o.useEffect)((function(){function e(){return(e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.send("VKWebAppGetGeodata");case 2:t=e.sent,j([t.lat,t.long]);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var S=function(){var e=d[d.length-1],n=t.ref("events").orderByKey();d.length>0&&(n=n.startAt(e.id)),n.limitToFirst(3).on("value",(function(e){var t=e.val()?Object.entries(e.val()).map((function(e){return Object(I.a)({id:e[0]},e[1])})):[];d.length>0&&t.splice(0,1),t.length>0?b([].concat(Object(C.a)(d),Object(C.a)(t))):i&&u(!1)}))};Object(o.useEffect)((function(){S()}),[]);var A=x.filter(d,h);return l.a.createElement(y.r,null,l.a.createElement(y.g,{style:{height:"240px",padding:0}},l.a.createElement(ne.d,null,l.a.createElement(ne.b,{defaultState:{center:h,zoom:10},width:"100%"},l.a.createElement(ne.c,{geometry:h,options:{preset:"islands#redCircleDotIcon"},properties:{hintContent:"this is hint",balloonContent:"this is balloon"},modules:["geoObject.addon.balloon","geoObject.addon.hint"]}),A.map((function(e,t){var n=[e.location.lat,e.location.lng];return l.a.createElement(ne.c,{key:t,geometry:n,modules:["geoObject.addon.balloon"],properties:{balloonContent:Object(te.renderToString)(l.a.createElement("a",{href:"#/event/".concat(e.id)},e.name))}})})),l.a.createElement(ne.a,{geometry:[h,0|x.location]})))),l.a.createElement(X.a,{threshold:0,loadMore:S,hasMore:i,loader:l.a.createElement(y.y,{key:0})},l.a.createElement(T,{events:A,filter:x,setFilter:w})))},re=n(104),ce=n.n(re),oe=n(253),le=n.n(oe),ie=n(68),ue=n.n(ie),se=(n(184),function(e){var t=e.user;return l.a.createElement(y.l,null,l.a.createElement(y.m,{mode:"secondary"},"\u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0442\u043e\u0440"),l.a.createElement("a",{href:"https://vk.com/id".concat(t.vkId)},l.a.createElement(y.w,{before:l.a.createElement(y.a,{size:40,src:t.photo,after:"textz"})},"".concat(t.firstName," ").concat(t.lastName))))}),fe=[{key:"\ud83d\ude0a",value:[]},{key:"\ud83d\ude34",value:[]},{key:"\ud83d\ude0d",value:[]},{key:"\ud83e\udd2c",value:[]}],me=function(e){var t=e.eventId,n=e.userId,a=ue.a.database(),i=Object(o.useState)([]),u=Object(g.a)(i,2),s=u[0],f=u[1];Object(o.useEffect)((function(){(function(){var e=Object(c.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.ref("rating/".concat(t,"/rating")).on("value",(function(e){var r=e.val();null!==r&&typeof r===typeof[]||(a.ref("rating/".concat(t,"/rating")).set(fe.map((function(e,t){return{key:e.key,ids:[]}}))),window.location.reload());var c=r?r.map((function(e){return{key:e.key,value:e.ids?Object.values(e.ids).length:0,set:!!e.ids&&-1!==Object.keys(e.ids).indexOf("".concat(n))}})):fe;f(c)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[n]);return t?l.a.createElement(y.B,null,(s||fe).map((function(e,r){return l.a.createElement(y.C,{selected:e.set,key:r,onClick:function(){!function(e){s.forEach((function(r,c){r.key===e?a.ref("rating/".concat(t,"/rating/").concat(c,"/ids/").concat(n)).set(!0):a.ref("rating/".concat(t,"/rating/").concat(c,"/ids/").concat(n)).remove()}))}(e.key)}},l.a.createElement(y.E,null,e.key),l.a.createElement(y.E,null,e.value))}))):(a.ref("rating").orderByChild("user/vkId").equalTo(null!==n&&void 0!==n?n:0).on("value",(function(e){console.log(e.val()?Object.keys(e.val()):"NO EVENTS FOR ".concat(n))})),l.a.createElement(l.a.Fragment,null))},de=n(254),pe=n.n(de),be=function(){var e=Object(s.c)("event").route.params,t=e.id,n=e.event,a=Object(o.useState)(n),i=Object(g.a)(a,2),u=i[0],f=i[1],d=Object(o.useState)({id:"dorianmood"}),p=Object(g.a)(d,2),b=p[0],v=p[1],E=Object(o.useState)({}),h=Object(g.a)(E,2),j=h[0],O=h[1],k=Object(o.useState)(""),x=Object(g.a)(k,2),w=x[0],S=x[1],C=Object(o.useState)(""),I=Object(g.a)(C,2),A=I[0],z=I[1],R=ue.a.database(),_=ue.a.storage();if(Object(o.useEffect)((function(){n||R.ref("events/".concat(t)).on("value",(function(e){f(e.val())})),R.ref("subscriptions/".concat(t)).on("value",(function(e){O(e.val())})),_.ref("events_pictures/".concat(t)).getDownloadURL().then((function(e){S(e)})).catch((function(){}))}),[R,t,n]),Object(o.useEffect)((function(){(function(){var e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.send("VKWebAppGetUserInfo");case 2:t=e.sent,v(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(o.useEffect)((function(){pe.a.toString(t,(function(e,t){z(t)}))}),[]),!u)return l.a.createElement(y.y,{size:"large"});var N=new Date(u.date)<new Date?l.a.createElement(me,{eventId:t,userId:b.id}):l.a.createElement(y.g,null,"\u041d\u0435 \u0437\u0430\u0431\u0443\u0434\u0442\u0435 \u043f\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0440\u0435\u0439\u0442\u0438\u043d\u0433 \u043f\u043e\u0441\u043b\u0435 \u043e\u043a\u043e\u043d\u0447\u0430\u043d\u0438\u044f \u0441\u043e\u0431\u044b\u0442\u0438\u044f ",l.a.createElement("span",{role:"img","aria-label":"down"},"\ud83d\ude0a"));return l.a.createElement(y.r,{id:t},l.a.createElement(y.s,{left:l.a.createElement(y.t,{onClick:function(){window.history.back()}},l.a.createElement(ce.a,null))},l.a.createElement(y.u,null,u.name)),N,l.a.createElement(y.g,{style:{height:"240px",padding:0}},l.a.createElement(ne.d,null,l.a.createElement(ne.b,{defaultState:{center:[u.location.lat,u.location.lng],zoom:10},width:"100%"},l.a.createElement(ne.c,{geometry:[u.location.lat,u.location.lng],options:{preset:"islands#geolocationIcon"}})))),l.a.createElement(y.l,{header:l.a.createElement(y.m,{mode:"secondary"},"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435")},l.a.createElement(y.e,{multiline:!0,size:"l"},u.description)),l.a.createElement(se,{user:u.user}),l.a.createElement(y.l,{header:l.a.createElement(y.m,{mode:"secondary"},"\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f")},l.a.createElement(y.g,null,l.a.createElement("div",{style:{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(".concat(w,")"),backgroundSize:"cover",height:"200px",display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:"6px",borderRadius:12}},j?l.a.createElement(y.F,{photos:Object.keys(j).map((function(e){return j[e].photo})),size:"m",layout:"vertical",style:{color:"#fff"}},Object.keys(j).length," \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432"):l.a.createElement(l.a.Fragment,null))),l.a.createElement(y.g,{style:{display:"flex"}},l.a.createElement(y.g,{style:{flex:"1 1 auto",display:"flex",justifyContent:"center"}},l.a.createElement(U.a,{style:{margin:"-2px 10px 0 0"},fill:"green"})," ",u.price),l.a.createElement(y.g,{style:{flex:"1 1 auto",display:"flex",justifyContent:"center"}},l.a.createElement(le.a,{style:{margin:"-2px 10px 0 0"}}),new Date(u.date).toLocaleString())),l.a.createElement("h3",{style:{textAlign:"center",margin:"10px 0 0 0"}},l.a.createElement("span",{role:"img","aria-label":"down"},"\ud83d\udc47\ud83c\udffb")," \u0421\u043a\u0430\u043d\u0438\u0440\u0443\u0439 \u0441\u043e\u0431\u044b\u0442\u0438\u0435 \u0442\u0443\u0442! ",l.a.createElement("span",{role:"img","aria-label":"down"},"\ud83d\udc47\ud83c\udffb")),l.a.createElement(y.g,{id:"event-qr-code",dangerouslySetInnerHTML:{__html:A}}),b&&u.user.vkId===b.id?l.a.createElement(l.a.Fragment,null):b&&j&&-1!==Object.keys(j).indexOf("".concat(b.id))?l.a.createElement(y.g,null,l.a.createElement(y.b,{stretched:!0,mode:"outline",style:{padding:"10px"},onClick:function(){R.ref("subscriptions/".concat(t,"/").concat(b.id)).remove()}},"\u041d\u0435 \u043f\u043e\u0439\u0434\u0443")):l.a.createElement(y.g,null,l.a.createElement(y.b,{stretched:!0,mode:"commerce",style:{padding:"10px"},onClick:function(){var e={firstName:b.first_name,lastName:b.last_name,photo:b.photo_200};R.ref("subscriptions/".concat(t,"/").concat(b.id)).set(e)}},"\u041f\u043e\u0439\u0434\u0443")),b&&b.id===u.user.vkId?l.a.createElement(y.g,null,l.a.createElement(y.b,{stretched:!0,mode:"destructive",style:{padding:"10px"},onClick:function(){R.ref("events/".concat(t)).remove().then((function(){console.log("Event removed"),R.ref("subscriptions/".concat(t)).remove().then((function(){console.log("Subscriptions removed"),window.history.back()}))}))}},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c")):l.a.createElement(l.a.Fragment,null)))},ve=n(255),Ee=n.n(ve),he=n(105),ge=n.n(he),je=function(){var e=Object(o.useState)({vkId:"dorianmood",photo:"",firstName:"Developer",lastName:"Developer"}),t=Object(g.a)(e,2),n=t[0],a=t[1],i=Object(o.useState)(""),u=Object(g.a)(i,2),s=u[0],f=u[1],d=p.a.database(),b=p.a.storage(),v=Object(o.useRef)(),E=Object(o.useRef)(),h=Object(o.useRef)(),j=Object(o.useRef)(),O=Object(o.useState)({name:!1,picture:!1,price:!1,description:!1,location:!1}),k=Object(g.a)(O,2),x=k[0],w=k[1],S=(new Date).toISOString().split(".")[0];S=S.substr(0,S.length-3);var C=Object(o.useRef)(S),A=Object(o.useState)({name:"\u041c\u0435\u0441\u0442\u043e",coordinates:[56.8389,60.605192]}),z=Object(g.a)(A,2),R=z[0],_=z[1],N=Object(o.useState)([56.8389,60.605192]),G=Object(g.a)(N,2),F=G[0],K=G[1];Object(o.useEffect)((function(){function e(){return(e=Object(c.a)(r.a.mark((function e(){var t,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.send("VKWebAppGetGeodata");case 2:return t=e.sent,K([t.lat,t.long]),e.next=6,m.a.send("VKWebAppGetUserInfo");case 6:n=e.sent,a({vkId:n.id,photo:n.photo_200,firstName:n.first_name,lastName:n.last_name});case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(o.useEffect)((function(){var e="https://geocode-maps.yandex.ru/1.x/?apikey=".concat("0660ba4c-e52e-4ada-a9fa-9ce9df0ea9f8","&geocode=").concat([R.coordinates[1],R.coordinates[0]].join(","),"&format=json");fetch(e).then((function(e){return e.json()})).then((function(e){_(Object(I.a)(Object(I.a)({},R),{},{name:e.response.GeoObjectCollection.featureMember[0].GeoObject.name}))}))}),[R.coordinates]);var U=function(){var e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.ref("events").push({name:v.current.value,price:E.current.value,date:C.current.valueAsNumber,description:j.current.value,location:{name:R.name,lat:R.coordinates[0],lng:R.coordinates[1]},user:n});case 2:t=e.sent,b.ref("events_pictures").child(t.key).put(h.current.files[0]),d.ref("subscriptions/".concat(t.key,"/").concat(n.vkId)).set({firstName:n.firstName,lastName:n.lastName,photo:n.photo}).then((function(){return console.log("SUBSCRIBTION CREATED")})),d.ref("rating/".concat(t.key)).set({rating:fe.map((function(e){return{key:e.key}})),owner:n.vkId}).then((function(){return console.log("RATING CREATED")}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),V=function(){var e=!0,t={name:v.current.value.length>0||(e=!1),picture:h.current.files.length>0||(e=!1),date:null!==C.current.value||(e=!1),price:null!==E.current.value||(e=!1),description:j.current.value.length>0||(e=!1)};return w(t),e};return l.a.createElement(y.r,null,l.a.createElement(y.s,{left:l.a.createElement(y.t,{onClick:function(){window.history.back()}},l.a.createElement(ce.a,null))},"\u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u0441\u043e\u0431\u044b\u0442\u0438\u0435"),l.a.createElement(y.j,null,l.a.createElement(y.k,{top:R.name},l.a.createElement(y.g,{style:{height:"150px"}},l.a.createElement(ne.d,null,l.a.createElement(ne.b,{defaultState:{center:R.coordinates,zoom:10},height:"150px",width:"100%",onClick:function(e){_(Object(I.a)(Object(I.a)({},R),{},{coordinates:e.get("coords")}))}},l.a.createElement(ne.c,{geometry:F,options:{preset:"islands#redCircleDotIcon"}}),l.a.createElement(ne.c,{geometry:R.coordinates}))))),l.a.createElement(y.n,{top:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",getRef:v,status:x.name?"default":"error",onChange:V}),l.a.createElement(y.g,null,""!==s?l.a.createElement("img",{src:s,style:{height:"200px",width:"90%",display:"block",margin:"0 auto",objectFit:"cover"}}):l.a.createElement(l.a.Fragment,null)),l.a.createElement(y.i,{accept:"image/jpeg,image/x-png",top:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043e\u0442\u043e",getRef:h,before:l.a.createElement(Ee.a,null),controlSize:"l",onChange:function(){var e,t=null===h||void 0===h||null===(e=h.current)||void 0===e?void 0:e.files[0];if(t){var n=new FileReader;n.onloadend=function(){ge.a.read(n.result).then((function(e){e.resize(ge.a.AUTO,1080),e.getBase64Async(ge.a.MIME_PNG).then((function(e){f(e)}))}))},n.readAsArrayBuffer(t)}},status:x.picture?"default":"error"},"\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0433\u0430\u043b\u0435\u0440\u0435\u044e"),l.a.createElement(y.n,{top:"\u0414\u0430\u0442\u0430",getRef:C,min:S,defaultValue:S,type:"datetime-local",status:x.date?"default":"error",onChange:V}),l.a.createElement(y.n,{top:"\u0426\u0435\u043d\u0430",getRef:E,type:"number",defaultValue:0,status:x.price?"default":"error",onChange:V}),l.a.createElement(y.D,{top:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",getRef:j,defaultValue:0,status:x.description?"default":"error",onChange:V}),l.a.createElement(y.b,{type:"submit",size:"xl",onClick:function(){if(!V())return!1;U().then((function(){window.history.back()}))}},"\u0421\u043e\u0437\u0434\u0430\u0442\u044c")))},Oe=[{id:"me",text:"\u041c\u043e\u0438",icon:l.a.createElement(x.a,null)},{id:"location",text:"\u0420\u044f\u0434\u043e\u043c",icon:l.a.createElement(S.a,null)}],ye=function(){var e=Object(s.b)().route,t=Object(o.useState)(null),n=Object(g.a)(t,2),a=n[0],r=n[1],c=Object(s.d)(),i=Oe.filter((function(t){return t.id===e.name}))[0],u=i?i.id:Oe[0].id;if(Object(o.useEffect)((function(){r(u)}),[u]),"event"===e.name)return l.a.createElement(be,null);if("create"===e.name)return l.a.createElement(je,null);var f=function(e){var t=e.currentTarget.dataset.story;c.navigate(t),r(t)},m=l.a.createElement(y.z,null,Oe.map((function(e,t){return l.a.createElement(y.A,{onClick:f,selected:a===e.id,"data-story":e.id,text:e.text,key:t},e.icon)})));return l.a.createElement(y.h,{activeStory:a,tabbar:m},l.a.createElement(O.a,{id:"me",key:"0"},l.a.createElement(ee,null)),l.a.createElement(O.a,{id:"location",key:"1"},l.a.createElement(ae,null)))};E.a.config();var ke=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(h,null),l.a.createElement(ye,null))},xe=n(82),we=n(257),Se=[{name:"main",path:"/"},{name:"me",path:"/me"},{name:"friends",path:"/friends"},{name:"location",path:"/location"},{name:"event",path:"/event/:id"},{name:"user",path:"/user/:id"},{name:"create",path:"/create"}];var Ce=Object(o.createContext)(),Ie=function(e){var t=e.children,n=Object(o.useState)(),a=Object(g.a)(n,2),i=a[0],u=a[1],s=Object(o.useState)(),f=Object(g.a)(s,2),d=f[0],p=f[1];return Object(o.useEffect)((function(){(function(){var e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.send("VKWebAppGetUserInfo");case 2:t=e.sent,console.log("USER AUTH : ",t),p(t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(o.useEffect)((function(){ue.a.app().auth().onAuthStateChanged((function(e){u(e)}))}),[]),console.log("USER AUTH : ",d),l.a.createElement(Ce.Provider,{value:i},t)};m.a.send("VKWebAppInit");var Ae=function(){var e=Object(xe.b)(Se,{defaultRoute:"me"});return e.usePlugin(Object(we.a)({useHash:!0})),e}();p.a.initializeApp({apiKey:"AIzaSyAx35YiAGmieyNOqdsHerhj3CeQQGkIKX4",projectId:"dvizh-94592",databaseURL:"https://dvizh-94592.firebaseio.com",authDomain:"dvizh-94592.firebaseapp.com",storageBucket:"gs://dvizh-94592.appspot.com"}),function(){var e=Object(c.a)(r.a.mark((function e(){var t,n,a,c,o,l;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.send("VKWebAppStorageGet",{keys:["userUuid"]});case 2:return t=e.sent,e.next=5,m.a.send("VKWebAppGetUserInfo");case 5:if(n=e.sent,a=n.id,c=t.keys[0].value){e.next=13;break}return o=Object(b.a)(),c=o,e.next=13,m.a.send("VKWebAppStorageSet",{key:"userUuid",value:o}).catch((function(e){return console.log(e)}));case 13:(l=p.a.auth()).createUserWithEmailAndPassword("".concat(a,"@vk.com"),c).then((function(e){console.log("create user : OK")})).catch((function(e){console.error(e.code)})).then((function(){l.signInWithEmailAndPassword("".concat(a,"@vk.com"),c).then((function(e){console.log("login : OK")})).catch((function(e){console.log(e.code)}))}));case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),Ae.start((function(){u.a.render(l.a.createElement(Ie,null,l.a.createElement(s.a,{router:Ae},l.a.createElement(ke,{router:Ae}))),document.getElementById("root"))})),Promise.all([n.e(3),n.e(4)]).then(n.bind(null,589)).then((function(e){}))}},[[299,1,2]]]);
//# sourceMappingURL=main.f667562f.chunk.js.map