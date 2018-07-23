(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{610:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(1),l=h(a),o=h(n(617)),i=n(132),u=n(257),d=h(n(190)),c=h(n(757)),s=h(n(756)),f=h(n(755)),p=h(n(189)),m=h(n(192));function h(e){return e&&e.__esModule?e:{default:e}}n(191);var g=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),r(t,[{key:"componentDidMount",value:function(){var e=this;d.default.get(p.default.getUrl("frontpage?regionId="+p.default.getRegion())).withCredentials().end(function(t,n){e.setState({error:t||null,data:t?null:n.body})})}},{key:"render",value:function(){if(!this.state)return l.default.createElement("center",null,l.default.createElement(m.default,{icon:"spinner",spin:!0,size:"3x"}));if(this.state.error)return l.default.createElement("span",null,l.default.createElement("h3",null,this.state.error.status),this.state.error.toString());var e=this.state.data.fas.map(function(e,t){return l.default.createElement("p",{key:t},l.default.createElement(i.Link,{to:"/problem/"+e.idProblem},e.problem)," ",e.grade,l.default.createElement("br",null),l.default.createElement("small",{style:{color:"#777"}},l.default.createElement(i.Link,{to:"/area/"+e.idArea,style:{color:"#777"}},e.area)," / ",l.default.createElement(i.Link,{to:"/sector/"+e.idSector,style:{color:"#777"}},e.sector)," ",e.date))}),t=this.state.data.ascents.map(function(e,t){return l.default.createElement("p",{key:t},l.default.createElement(i.Link,{to:"/problem/"+e.idProblem},e.problem)," ",e.grade,l.default.createElement("br",null),l.default.createElement("small",{style:{color:"#777"}},l.default.createElement(i.Link,{to:"/user/"+e.idUser,style:{color:"#777"}},e.user)," ",e.date))}),n=this.state.data.medias.map(function(e,t){var n="image"===e.type?l.default.createElement(m.default,{icon:"camera"}):l.default.createElement(m.default,{icon:"video"});return l.default.createElement("p",{key:t},l.default.createElement(i.Link,{to:"/problem/"+e.idProblem},e.problem)," ",l.default.createElement("small",null,e.grade)," ",n)}),r=this.state.data.comments.map(function(e,t){return l.default.createElement("p",{key:t},l.default.createElement("small",null,e.date)," ",l.default.createElement(i.Link,{to:"/problem/"+e.idProblem},e.problem))});return l.default.createElement("span",null,l.default.createElement(o.default,null,l.default.createElement("title",null,p.default.getTitle()),l.default.createElement("meta",{name:"description",content:p.default.getIndexMetaDescription()})),l.default.createElement(u.Grid,null,l.default.createElement(u.Row,null,l.default.createElement(u.Well,{style:{textAlign:"center"}},"Total: ",this.state.data.numProblems," (",this.state.data.numProblemsWithCoordinates," with coordinates",this.state.data.numProblemsWithTopo>0?", "+this.state.data.numProblemsWithTopo+" on topo":"",") | Public ascents: ",this.state.data.numTicks," | Images: ",this.state.data.numImages," | Ascents on video: ",this.state.data.numMovies)),l.default.createElement(u.Row,null,l.default.createElement(u.Col,{xs:8,md:9,style:{paddingLeft:"3px",paddingRight:"3px"}},l.default.createElement(s.default,{data:this.state.data.randomMedia})),l.default.createElement(u.Col,{xs:4,md:3,style:{paddingLeft:"3px",paddingRight:"3px"}},l.default.createElement(f.default,null))),l.default.createElement(u.Row,null,l.default.createElement(u.Col,{xs:6,lg:3,style:{paddingLeft:"3px",paddingRight:"3px"}},l.default.createElement(c.default,{title:"Newest",data:e})),l.default.createElement(u.Col,{xs:6,lg:3,style:{paddingLeft:"3px",paddingRight:"3px"}},l.default.createElement(c.default,{title:"Latest ascents",data:t})),l.default.createElement(u.Clearfix,{visibleXsBlock:!0}),l.default.createElement(u.Col,{xs:6,lg:3,style:{paddingLeft:"3px",paddingRight:"3px"}},l.default.createElement(c.default,{title:"Newest media",data:n})),l.default.createElement(u.Col,{xs:6,lg:3,style:{paddingLeft:"3px",paddingRight:"3px"}},l.default.createElement(c.default,{title:"Latest comments",data:r})))))}}]),t}();t.default=g},616:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=p(n(256)),a=p(n(3)),l=p(n(100)),o=p(n(4)),i=p(n(5)),u=n(1),d=p(u),c=p(n(0)),s=p(n(15)),f=n(620);function p(e){return e&&e.__esModule?e:{default:e}}var m=function(e){function t(){return(0,a.default)(this,t),(0,o.default)(this,(t.__proto__||(0,r.default)(t)).apply(this,arguments))}return(0,i.default)(t,e),(0,l.default)(t,[{key:"extractChildren",value:function(){var e=this.context.extract;e&&e(this.props.children)}},{key:"handleChildrens",value:function(){var e=this,t=this.props.children;if(!this.context.extract){var n=d.default.createElement("div",{className:"react-head-temp"},t),r=document.createElement("div");s.default.render(n,r,function(){var t=r.innerHTML;if(e.lastChildStr!==t){e.lastChildStr=t;var n=Array.prototype.slice.call(r.querySelector(".react-head-temp").children),a=document.head,l=a.innerHTML;(n=n.filter(function(e){return-1===l.indexOf((0,f.getDomAsString)(e))})).forEach(function(e){var t=e.tagName.toLowerCase();if("title"===t){var n=(0,f.getDuplicateTitle)();n&&(0,f.removeChild)(a,n)}else if("meta"===t){var r=(0,f.getDuplicateMeta)(e);r&&(0,f.removeChild)(a,r)}else if("link"===t&&"canonical"===e.rel){var l=(0,f.getDuplicateCanonical)(e);l&&(0,f.removeChild)(a,l)}}),(0,f.appendChild)(document.head,n)}})}}},{key:"componentDidMount",value:function(){this.handleChildrens()}},{key:"componentDidUpdate",value:function(e){e.children!==this.props.children&&this.handleChildrens()}},{key:"render",value:function(){return this.extractChildren(),null}}]),t}(u.Component);m.contextTypes={extract:c.default.func},t.default=m},617:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ReactTitle=t.MetaTagsContext=t.MetaTags=void 0;var r=o(n(621)),a=o(n(616)),l=o(n(619));function o(e){return e&&e.__esModule?e:{default:e}}t.default=a.default,t.MetaTags=a.default,t.MetaTagsContext=r.default,t.ReactTitle=l.default},619:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=f(n(256)),a=f(n(3)),l=f(n(100)),o=f(n(4)),i=f(n(5)),u=n(1),d=f(u),c=f(n(0)),s=f(n(616));function f(e){return e&&e.__esModule?e:{default:e}}var p=function(e){function t(){return(0,a.default)(this,t),(0,o.default)(this,(t.__proto__||(0,r.default)(t)).apply(this,arguments))}return(0,i.default)(t,e),(0,l.default)(t,[{key:"render",value:function(){return d.default.createElement(s.default,null,d.default.createElement("title",null,this.props.title))}}]),t}(u.Component);p.propTypes={title:c.default.string},t.default=p},620:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n(2)),a=l(n(133));function l(e){return e&&e.__esModule?e:{default:e}}t.extractMetaAndTitle=function(e){var t=void 0,n=void 0,a=[];return e=(e=(e=e.replace(u,function(e){return t=e,""})).replace(i,function(e){return n=e,""})).replace(o,function(e){return a.push((0,r.default)({},function(e){var t={};if(!e)return t;for(var n=d.exec(e);null!==n;)t[n[1]]=n[3]||n[4]||n[5],n=d.exec(e);return t}(e),{_tagString:e})),""}),{title:t,metas:a,canonicalLink:n,rest:e}},t.removeDuplicateMetas=function(e){for(var t={},n={},r={},a=[],l=e.length-1;l>=0;l--){var o=e[l],i=o.id,u=o.property,d=o.name,c=!1;if(i)c=!r[i];else if(u||d){var s=t[u]||n[d];c=!s||s.id}i&&(r[i]=o),u&&(t[u]=o),d&&(n[d]=o),c&&a.push(o)}return a},t.getDuplicateTitle=function(){return document.head.querySelectorAll("title")},t.getDuplicateCanonical=function(){return document.head.querySelectorAll('link[rel="canonical"]')},t.getDuplicateMeta=function(e){var t=document.head,n=e.id,r=e.property,a=e.name;return n?n&&t.querySelector("#"+n):a?c(t.querySelectorAll('[name = "'+a+'"]')):r?c(t.querySelectorAll('[property = "'+r+'"]')):null},t.appendChild=function(e,t){void 0===t.length&&(t=[t]);for(var n=document.createDocumentFragment(),r=0,a=t.length;r<a;r++)n.appendChild(t[r]);e.appendChild(n)},t.removeChild=function(e,t){void 0===t.length&&(t=[t]);for(var n=0,r=t.length;n<r;n++)e.removeChild(t[n])},t.getDomAsString=function(e){var t=document.createElement("div");return t.appendChild(e),t.innerHTML};var o=/<meta[^<>]*?=(['"].*?['"]|[^<>]*?)*?\/?>/g,i=/<link[^<>]*?rel=['"]canonical['"].*?(\/>|<\/link>)/g,u=/<title[^<>]*?>(.*?)<\/title>/g,d=/(\S*?)=("(.*?)"|'(.*?)'|([^<>\s]*))/g;function c(e){return(e=(0,a.default)(e||[])).filter(function(e){return!e.id})}},621:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=c(n(256)),a=c(n(3)),l=c(n(100)),o=c(n(4)),i=c(n(5)),u=n(1),d=c(n(0));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(){return(0,a.default)(this,t),(0,o.default)(this,(t.__proto__||(0,r.default)(t)).apply(this,arguments))}return(0,i.default)(t,e),(0,l.default)(t,[{key:"getChildContext",value:function(){return{extract:this.props.extract}}},{key:"render",value:function(){return u.Children.only(this.props.children)}}]),t}(u.Component);s.childContextTypes={extract:d.default.func},t.default=s},755:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(1),l=i(a),o=(n(132),i(n(189)));function i(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),r(t,[{key:"render",value:function(){return l.default.createElement("div",null,o.default.isBouldering()&&l.default.createElement("a",{href:"https://play.google.com/store/apps/details?id=org.jossi.android.bouldering&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",target:"_blank"},l.default.createElement("img",{style:{maxWidth:"100%"},alt:"Get it on Google Play",src:"https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png"})),1==o.default.getRegion()&&l.default.createElement("a",{href:"http://sissportssenter.no/",target:"_blank"},l.default.createElement("img",{style:{marginBottom:"10px",borderTopLeftRadius:"8px",borderTopRightRadius:"8px",borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px",paddingLeft:"10px",paddingRight:"10px",maxWidth:"100%",backgroundColor:"#00A0E0"},src:"/png/sis-sportssenter.png",alt:"SiS Sportssenter"})),(1==o.default.getRegion()||4==o.default.getRegion())&&l.default.createElement("a",{href:"http://brv.no/",target:"_blank"},l.default.createElement("img",{style:{marginBottom:"10px",borderTopLeftRadius:"8px",borderTopRightRadius:"8px",borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px",paddingLeft:"10px",paddingRight:"10px",maxWidth:"100%",backgroundColor:"#FFFFFF"},src:"/png/brv.png",alt:"Bratte Rogalands venner"})))}}]),t}();t.default=u},756:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(1),l=d(a),o=n(132),i=n(257),u=d(n(189));function d(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),r(t,[{key:"render",value:function(){var e=null;return this.props&&this.props.data?(e=this.props.data.inPhoto?l.default.createElement("i",null,"Photographer: ",l.default.createElement(o.Link,{to:"/user/"+this.props.data.idCreator},this.props.data.creator),", in photo: ",this.props.data.inPhoto):l.default.createElement("i",null,"Photographer: ",l.default.createElement(o.Link,{to:"/user/"+this.props.data.idCreator},this.props.data.creator)),l.default.createElement(i.Well,{style:{marginBottom:"15px",textAlign:"center"}},l.default.createElement("h4",null,l.default.createElement(o.Link,{to:"/problem/"+this.props.data.idProblem},this.props.data.problem)," ",this.props.data.grade),l.default.createElement(o.Link,{to:"/problem/"+this.props.data.idProblem},l.default.createElement("img",{style:{maxWidth:"100%"},src:u.default.getUrl("images?id="+this.props.data.idMedia+"&targetHeight=480"),alt:this.props.data.problem})),l.default.createElement("br",null),e)):l.default.createElement(i.Well,{style:{marginBottom:"15px",textAlign:"center"}},"No data")}}]),t}();t.default=c},757:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(1),o=(r=l)&&r.__esModule?r:{default:r},i=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={showAll:!1,btnLabel:"More"},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),a(t,[{key:"handleOnClick",value:function(e){e.preventDefault(),!0===this.state.showAll?this.setState({showAll:!1,btnLabel:"More"}):this.setState({showAll:!0,btnLabel:"Less"})}},{key:"render",value:function(){var e=!0===this.state.showAll?this.props.data:this.props.data.map(function(e,t){if(t<10)return e});return o.default.createElement("div",{style:{backgroundColor:"#FFF",position:"relative",padding:"45px 15px 15px",borderColor:"#e3e3e3",borderStyle:"solid",borderWidth:"1px",borderTopLeftRadius:"4px",borderTopRightRadius:"4px",borderBottomLeftRadius:"4px"}},e,o.default.createElement("div",{style:{position:"absolute",top:"15px",left:"15px",fontSize:"12px",fontWeight:"700",color:"#959595",textTransform:"uppercase",letterSpacing:"1px"}},this.props.title),o.default.createElement("a",{style:{float:"right",display:"inline-block",position:"relative",right:"-16px",top:"15px",background:"#FFF",borderBottomLeftRadius:"4px",borderBottomRightRadius:"4px",border:"1px solid #e3e3e3",borderTop:"none",padding:"4px 8px",marginBottom:"20px"},href:"#",onClick:this.handleOnClick.bind(this)},this.state.btnLabel))}}]),t}();t.default=i}}]);
//# sourceMappingURL=20.index.js.map