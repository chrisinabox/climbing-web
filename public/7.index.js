(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{661:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(1),r=g(l),i=g(a(681)),o=a(141),s=g(a(201)),u=a(282),c=a(285),d=g(a(695)),h=g(a(709)),f=g(a(283)),m=g(a(200)),p=a(142);function g(e){return e&&e.__esModule?e:{default:e}}function y(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function v(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var E=function(e){function t(){return y(this,t),b(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return v(t,l.Component),n(t,[{key:"render",value:function(){var e="";if(this.props.sector.comment)if(this.props.sector.comment.length>100){var t=r.default.createElement(u.Tooltip,{id:this.props.sector.id},this.props.sector.comment);e=r.default.createElement(u.OverlayTrigger,{key:this.props.sector.id,placement:"top",overlay:t},r.default.createElement("span",null,this.props.sector.comment.substring(0,100)+"..."))}else e=this.props.sector.comment;return r.default.createElement("tr",null,r.default.createElement("td",null,r.default.createElement(o.Link,{to:"/sector/"+this.props.sector.id},this.props.sector.name)," ",1===this.props.sector.visibility&&r.default.createElement(p.FontAwesomeIcon,{icon:"lock"}),2===this.props.sector.visibility&&r.default.createElement(p.FontAwesomeIcon,{icon:"user-secret"})),r.default.createElement("td",null,e),r.default.createElement("td",null,this.props.sector.numProblems))}}]),t}(),w=function(e){function t(e){y(this,t);var a=b(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={tabIndex:1},a}return v(t,l.Component),n(t,[{key:"refresh",value:function(e){var t=this;s.default.get(m.default.getUrl("areas?regionId="+m.default.getRegion()+"&id="+e)).withCredentials().end(function(e,a){e?t.setState({error:e}):t.setState({id:a.body.id,visibility:a.body.visibility,name:a.body.name,media:a.body.media,comment:a.body.comment,lat:a.body.lat,lng:a.body.lng,sectors:a.body.sectors,metadata:a.body.metadata})})}},{key:"componentDidMount",value:function(){this.refresh(this.props.match.params.areaId)}},{key:"componentWillReceiveProps",value:function(e){this.refresh(e.match.params.areaId)}},{key:"handleTabsSelection",value:function(e){this.setState({tabIndex:e})}},{key:"onRemoveMedia",value:function(e){var t=this.state.media.filter(function(t){return t.id!=e});this.setState({media:t})}},{key:"render",value:function(){if(!this.state.id)return r.default.createElement("center",null,r.default.createElement(p.FontAwesomeIcon,{icon:"spinner",spin:!0,size:"3x"}));if(this.state.error)return r.default.createElement("span",null,r.default.createElement("h3",null,this.state.error.status),this.state.error.toString());var e=this.state.sectors.map(function(e,t){return r.default.createElement(E,{sector:e,key:t})}),t=this.state.sectors.filter(function(e){return 0!=e.lat&&0!=e.lng}).map(function(e){return{lat:e.lat,lng:e.lng,title:e.name,icon:{url:"https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png",scaledSizeW:32,scaledSizeH:32},url:"/sector/"+e.id}}),a=this.state.sectors.filter(function(e){return e.polygonCoords}).map(function(e){return{triangleCoords:e.polygonCoords.split(";").map(function(e,t){var a=e.split(",");return{lat:parseFloat(a[0]),lng:parseFloat(a[1])}}),url:"/sector/"+e.id}}),n=this.state.lat&&this.state.lat>0?{lat:this.state.lat,lng:this.state.lng}:m.default.getDefaultCenter(),l=this.state.lat&&this.state.lat>0?14:m.default.getDefaultZoom(),s=t.length>0||a.length>0?r.default.createElement(d.default,{markers:t,polygons:a,defaultCenter:n,defaultZoom:l}):null,g=this.state.media&&this.state.media.length>0?r.default.createElement(h.default,{alt:this.state.name,media:this.state.media,showThumbnails:this.state.media.length>1,removeMedia:this.onRemoveMedia.bind(this)}):null,y=null;return s&&g?y=r.default.createElement(u.Tabs,{activeKey:this.state.tabIndex,animation:!1,onSelect:this.handleTabsSelection.bind(this),id:"area_tab",unmountOnExit:!0},r.default.createElement(u.Tab,{eventKey:1,title:"Topo"},1==this.state.tabIndex&&g),r.default.createElement(u.Tab,{eventKey:2,title:"Map"},2==this.state.tabIndex&&s)):s?y=s:g&&(y=g),r.default.createElement("span",null,r.default.createElement(i.default,null,r.default.createElement("script",{type:"application/ld+json"},JSON.stringify(this.state.metadata.jsonLd)),r.default.createElement("title",null,this.state.metadata.title),r.default.createElement("meta",{name:"description",content:this.state.metadata.description})),r.default.createElement(u.Breadcrumb,null,f.default.isAdmin()?r.default.createElement("div",{style:{float:"right"}},r.default.createElement(u.ButtonGroup,null,r.default.createElement(u.OverlayTrigger,{placement:"top",overlay:r.default.createElement(u.Tooltip,{id:-1},"Add sector")},r.default.createElement(c.LinkContainer,{to:{pathname:"/sector/edit/-1",query:{idArea:this.state.id,lat:this.state.lat,lng:this.state.lng}}},r.default.createElement(u.Button,{bsStyle:"primary",bsSize:"xsmall"},r.default.createElement(p.FontAwesomeIcon,{icon:"plus-square",inverse:!0})))),r.default.createElement(u.OverlayTrigger,{placement:"top",overlay:r.default.createElement(u.Tooltip,{id:this.state.id},"Edit area")},r.default.createElement(c.LinkContainer,{to:{pathname:"/area/edit/"+this.state.id,query:{lat:this.state.lat,lng:this.state.lng}}},r.default.createElement(u.Button,{bsStyle:"primary",bsSize:"xsmall"},r.default.createElement(p.FontAwesomeIcon,{icon:"edit",inverse:!0})))))):null,r.default.createElement(o.Link,{to:"/"},"Home")," / ",r.default.createElement(o.Link,{to:"/browse"},"Browse")," / ",r.default.createElement("font",{color:"#777"},this.state.name)," ",1===this.state.visibility&&r.default.createElement(p.FontAwesomeIcon,{icon:"lock"}),2===this.state.visibility&&r.default.createElement(p.FontAwesomeIcon,{icon:"user-secret"})),y,this.state.comment?r.default.createElement(u.Well,null,r.default.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.comment}})):null,r.default.createElement(u.Table,{striped:!0,condensed:!0,hover:!0},r.default.createElement("thead",null,r.default.createElement("tr",null,r.default.createElement("th",null,"Name"),r.default.createElement("th",null,"Description"),r.default.createElement("th",null,"#problems"))),r.default.createElement("tbody",null,e)))}}]),t}();t.default=w},695:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(1),r=u(l),i=a(284),o=a(696),s=u(a(708));function u(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),n(t,[{key:"componentDidMount",value:function(){var e=this;navigator.geolocation.getCurrentPosition(function(t){e.setState({currLat:t.coords.latitude,currLng:t.coords.longitude})})}},{key:"handleOnClick",value:function(e){this.setState({pushUrl:e})}},{key:"render",value:function(){var e=this;if(this.state&&this.state.pushUrl)return r.default.createElement(i.Redirect,{to:this.state.pushUrl,push:!0});var t=(0,o.withScriptjs)((0,o.withGoogleMap)(function(t){var a=null;e.props.markers&&(a=e.props.markers.map(function(t,a){var n=null;return t.icon&&(n={},t.icon.url&&(n.url=t.icon.url),t.icon.scaledSizeW&&t.icon.scaledSizeH&&(n.scaledSize=new google.maps.Size(t.icon.scaledSizeW,t.icon.scaledSizeH)),t.icon.labelOriginX&&t.icon.labelOriginY&&(n.labelOrigin=new google.maps.Point(t.icon.labelOriginX,t.icon.labelOriginY))),r.default.createElement(o.Marker,{icon:n,key:a,position:{lat:t.lat,lng:t.lng},label:t.label,title:t.title,clickable:!0,onClick:e.handleOnClick.bind(e,t.url)})})),e.state&&e.state.currLat&&e.state.currLng&&e.state.currLat>0&&e.state.currLng>0&&a.push(r.default.createElement(o.Marker,{key:-1,icon:"https://maps.gstatic.com/mapfiles/markers2/measle_blue.png",position:{lat:e.state.currLat,lng:e.state.currLng}}));var n=null;return e.props.polygons&&(n=e.props.polygons.map(function(t,a){return r.default.createElement(o.Polygon,{key:a,paths:t.triangleCoords,options:{strokeColor:"#FF3300",strokeOpacity:"0.5",strokeWeight:"2",fillColor:"#FF3300",fillOpacity:"0.15"},onClick:e.handleOnClick.bind(e,t.url)})})),r.default.createElement(o.GoogleMap,{defaultZoom:e.props.defaultZoom,defaultCenter:e.props.defaultCenter,defaultMapTypeId:google.maps.MapTypeId.TERRAIN},r.default.createElement(s.default,{averageCenter:!1,minimumClusterSize:60,enableRetinaIcons:!1,imagePath:"https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m",gridSize:60},a,n))}));return r.default.createElement("section",{style:{height:"600px"}},r.default.createElement(t,{googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyCpaVd5518yMB-oiIyP5JnTVWMfrOv4sAI&v=3.exp",loadingElement:r.default.createElement("div",{style:{height:"100%"}}),containerElement:r.default.createElement("div",{style:{height:"100%"}}),mapElement:r.default.createElement("div",{style:{height:"100%"}})}))}}]),t}();t.default=c},709:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(1),r=y(l),i=y(a(738)),o=a(282),s=y(a(739)),u=y(a(283)),c=y(a(201)),d=a(726),h=a(141),f=y(a(200)),m=a(284),p=y(a(741)),g=a(142);function y(e){return e&&e.__esModule?e:{default:e}}var b=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={mediaIndex:0,hoverTrash:!1,hoverEdit:!1,showFullscreenButton:!0,showGalleryFullscreenButton:!0,showPlayButton:!0,showGalleryPlayButton:!1,showVideo:{},isFullscreen:!1,pushUrl:null},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),n(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({mediaIndex:0,hoverTrash:!1,hoverEdit:!1,showFullscreenButton:!0,showGalleryFullscreenButton:!0,showPlayButton:!0,showGalleryPlayButton:!1,showVideo:{},isFullscreen:!1,pushUrl:null}),this.imageGallery&&this.imageGallery.slideToIndex(0)}},{key:"toggleHoverTrash",value:function(){this.setState({hoverTrash:!this.state.hoverTrash})}},{key:"toggleHoverEdit",value:function(){this.setState({hoverEdit:!this.state.hoverEdit})}},{key:"onDeleteImage",value:function(e){var t=this;if(confirm("Are you sure you want to delete this image?")){var a=this.props.media[this.state.mediaIndex].id;c.default.delete(f.default.getUrl("media?id="+a)).withCredentials().end(function(e,n){if(e)alert(e.toString());else{if(t.props.media.length>1&&t.state.mediaIndex>=t.props.media.length-1){var l=t.state.mediaIndex-1;t.setState({mediaIndex:l}),t.imageGallery.slideToIndex(l)}t.props.removeMedia(a)}})}}},{key:"onSlide",value:function(e){this.resetVideo(),this.setState({mediaIndex:e})}},{key:"onScreenChange",value:function(e){this.setState({isFullscreen:e})}},{key:"resetVideo",value:function(){this.setState({showVideo:{}}),this.state.showPlayButton&&this.setState({showGalleryPlayButton:!0}),this.state.showFullscreenButton&&this.setState({showGalleryFullscreenButton:!0})}},{key:"toggleShowVideo",value:function(e){this.state.showVideo[e]=!Boolean(this.state.showVideo[e]),this.setState({showVideo:this.state.showVideo}),this.state.showVideo[e]&&(this.state.showPlayButton&&this.setState({showGalleryPlayButton:!1}),this.state.showFullscreenButton&&this.setState({showGalleryFullscreenButton:!1}))}},{key:"renderVideo",value:function(e){var t=this;return r.default.createElement("div",{className:"image-gallery-image"},this.state.showVideo[e.embedUrl]?r.default.createElement("span",null,r.default.createElement("a",{className:"gallery-close-video",onClick:this.toggleShowVideo.bind(this,e.embedUrl)}),r.default.createElement(s.default,{ref:function(e){t.player=e},className:"react-player",width:"100%",height:"100%",url:e.embedUrl,onDuration:function(e){return t.setState({duration:e})},onStart:function(){return t.player.seekTo(parseFloat(e.seekTo/t.state.duration))},controls:!0,playing:!0})):r.default.createElement("a",{onClick:this.toggleShowVideo.bind(this,e.embedUrl)},r.default.createElement("div",{className:"gallery-play-button"}),r.default.createElement("img",{src:e.original,alt:this.props.alt})))}},{key:"pushUrl",value:function(e){this.setState({pushUrl:e})}},{key:"generateShapes",value:function(e,t,a,n){var l=this;return e.map(function(e,i){var o,s=(0,d.parseSVG)(e.path);(0,d.makeAbsolute)(s);for(var u,c=0,h=99999999,f=0,m=s.length;f<m;f++)s[f].y>c&&(o=f,c=s[f].y),s[f].y<h&&(u=f,h=s[f].y);var p=s[o].x,g=s[o].y,y=.012*a;p<y&&(p=y),p>a-y&&(p=a-y),g<y&&(g=y),g>n-y&&(g=n-y);var b=null;return e.hasAnchor&&(b=r.default.createElement("circle",{className:"buldreinfo-svg-ring",cx:s[u].x,cy:s[u].y,r:.006*a})),r.default.createElement("g",{className:"buldreinfo-svg-pointer buldreinfo-svg-hover"+(0===t||e.problemId===t?"":" buldreinfo-svg-opacity"),key:i,onClick:l.pushUrl.bind(l,"/problem/"+e.problemId)},r.default.createElement("path",{d:e.path,className:"buldreinfo-svg-route",strokeWidth:.003*a,strokeDasharray:.006*a}),r.default.createElement("circle",{className:"buldreinfo-svg-ring",cx:p,cy:g,r:y}),r.default.createElement("text",{className:"buldreinfo-svg-routenr",x:p,y:g,fontSize:.02*a,dy:".3em"},e.nr),b)})}},{key:"renderImage",value:function(e){return e.svgs?r.default.createElement("div",{className:"image-gallery-image"},r.default.createElement("canvas",{className:"buldreinfo-svg-canvas-ie-hack",width:e.width,height:e.height}),r.default.createElement("svg",{className:"buldreinfo-svg",viewBox:"0 0 "+e.width+" "+e.height,preserveAspectRatio:"xMidYMid meet"},r.default.createElement("image",{xlinkHref:f.default.getUrl("images?id="+e.id),width:"100%",height:"100%"}),this.generateShapes(e.svgs,e.svgProblemId,e.width,e.height))):r.default.createElement("div",{className:"image-gallery-image"},r.default.createElement("img",{src:f.default.getUrl("images?id="+e.id),className:"buldreinfo-scale-img",alt:this.props.alt}))}},{key:"render",value:function(){var e=this;if((0,p.default)(null,{watchMQ:!0}),this.state&&this.state.pushUrl)return r.default.createElement(m.Redirect,{to:this.state.pushUrl,push:!0});var t=this.props.media.map(function(t,a){return 1==t.idType?{original:f.default.getUrl("images?id="+t.id),thumbnail:f.default.getUrl("images?id="+t.id),originalClass:"featured-slide",thumbnailClass:"featured-thumb",originalAlt:"original-alt",thumbnailAlt:"thumbnail-alt",renderItem:e.renderImage.bind(e,t)}:{original:f.default.getUrl("images?id="+t.id),thumbnail:f.default.getUrl("images?id="+t.id),originalClass:"featured-slide",thumbnailClass:"featured-thumb",originalAlt:"original-alt",thumbnailAlt:"thumbnail-alt",embedUrl:"https://buldreinfo.com/buldreinfo_media/mp4/"+100*Math.floor(t.id/100)+"/"+t.id+".mp4",seekTo:t.t,renderItem:e.renderVideo.bind(e)}}),a="",n=this.props.media[this.state.mediaIndex];return!this.state.isFullscreen&&1==n.idType&&u.default.isAdmin()&&(n.svgProblemId>0?a=r.default.createElement("span",{style:{position:"absolute",zIndex:"4",background:"rgba(0, 0, 0, 0.4)",padding:"8px 20px"}},r.default.createElement(h.Link,{to:"/problem/svg-edit/"+n.svgProblemId+"/"+n.id,onMouseEnter:this.toggleHoverEdit.bind(this),onMouseLeave:this.toggleHoverEdit.bind(this)},r.default.createElement(g.FontAwesomeIcon,{icon:"edit",style:this.state.hoverEdit?{transform:"scale(1.1)",color:"#fff"}:{color:"#fff"}}))):n.svgs||(a=r.default.createElement("span",{style:{position:"absolute",zIndex:"4",background:"rgba(0, 0, 0, 0.4)",padding:"8px 20px"}},r.default.createElement("a",{href:"#",onMouseEnter:this.toggleHoverTrash.bind(this),onMouseLeave:this.toggleHoverTrash.bind(this)},r.default.createElement(g.FontAwesomeIcon,{icon:"trash",style:this.state.hoverTrash?{transform:"scale(1.1)",color:"#fff"}:{color:"#fff"},onClick:this.onDeleteImage.bind(this)}))))),r.default.createElement(o.Well,{className:"app"},a,r.default.createElement(i.default,{ref:function(t){return e.imageGallery=t},items:t,onSlide:this.onSlide.bind(this),onScreenChange:this.onScreenChange.bind(this),showThumbnails:this.props.showThumbnails,showBullets:this.state.showFullscreenButton&&this.state.showGalleryFullscreenButton&&this.props.media.length>1,showIndex:this.state.showFullscreenButton&&this.state.showGalleryFullscreenButton,showPlayButton:!1,showFullscreenButton:this.state.showFullscreenButton&&this.state.showGalleryFullscreenButton}))}}]),t}();t.default=b}}]);
//# sourceMappingURL=7.index.js.map