(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{665:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),n=a(1),l=p(n),o=p(a(681)),i=a(141),s=a(285),c=p(a(201)),u=p(a(695)),d=a(282),m=a(742),f=p(a(200)),h=a(142);function p(e){return e&&e.__esModule?e:{default:e}}var g=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={tabIndex:1,currLat:0,currLng:0},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),r(t,[{key:"toRad",value:function(e){return e*Math.PI/180}},{key:"calcCrow",value:function(e,t,a,r){var n=this.toRad(a-e),l=this.toRad(r-t),o=(e=this.toRad(e),a=this.toRad(a),Math.sin(n/2)*Math.sin(n/2)+Math.sin(l/2)*Math.sin(l/2)*Math.cos(e)*Math.cos(a));return 2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))*6371}},{key:"refresh",value:function(e){var t=this;c.default.get(f.default.getUrl("problems?regionId="+f.default.getRegion()+"&grade="+e)).withCredentials().end(function(e,a){e?t.setState({error:e}):t.setState({problems:a.body})})}},{key:"componentDidMount",value:function(){var e=this;this.refresh(this.props.match.params.grade),navigator.geolocation.getCurrentPosition(function(t){e.setState({currLat:t.coords.latitude,currLng:t.coords.longitude})})}},{key:"componentWillReceiveProps",value:function(e){this.refresh(e.match.params.grade)}},{key:"handleTabsSelection",value:function(e){this.setState({tabIndex:e})}},{key:"trClassFormat",value:function(e,t){return e.ticked?"success":""}},{key:"formatAreaName",value:function(e,t){return l.default.createElement("span",null,l.default.createElement(i.Link,{to:"/area/"+t.areaId},t.areaName)," ",1===t.areaVisibility&&l.default.createElement(h.FontAwesomeIcon,{icon:"lock"}),2===t.areaVisibility&&l.default.createElement(h.FontAwesomeIcon,{icon:"user-secret"}))}},{key:"formatSectorName",value:function(e,t){return l.default.createElement("span",null,l.default.createElement(i.Link,{to:"/sector/"+t.sectorId},t.sectorName)," ",1===t.sectorVisibility&&l.default.createElement(h.FontAwesomeIcon,{icon:"lock"}),2===t.sectorVisibility&&l.default.createElement(h.FontAwesomeIcon,{icon:"user-secret"}))}},{key:"formatName",value:function(e,t){return l.default.createElement("span",null,l.default.createElement(i.Link,{to:"/problem/"+t.id},t.name)," ",1===t.visibility&&l.default.createElement(h.FontAwesomeIcon,{icon:"lock"}),2===t.visibility&&l.default.createElement(h.FontAwesomeIcon,{icon:"user-secret"}))}},{key:"formatType",value:function(e,t){var a;switch(t.t.id){case 2:a=l.default.createElement("img",{height:"20",src:"/jpg/bolt.jpg",alt:"Bolt"});break;case 3:a=l.default.createElement("img",{height:"20",src:"/jpg/trad.jpg",alt:"Trad"});break;case 4:a=l.default.createElement("img",{height:"20",src:"/jpg/mixed.jpg",alt:"Mixed"})}return l.default.createElement(d.OverlayTrigger,{placement:"top",overlay:l.default.createElement(d.Popover,{id:t.t.id,title:"Type"}," ",t.t.type+" - "+t.t.subType)},a)}},{key:"formatFa",value:function(e,t){var a=t.fa?t.fa.map(function(e,t){var a=l.default.createElement(d.Tooltip,{id:t},e.firstname," ",e.surname);return l.default.createElement(d.OverlayTrigger,{key:t,placement:"top",overlay:a},l.default.createElement(s.LinkContainer,{key:t,to:"/user/"+e.id},l.default.createElement(d.Button,{key:t,bsStyle:"default"},e.initials)))}):[];return l.default.createElement(d.ButtonToolbar,null,l.default.createElement(d.ButtonGroup,{bsSize:"xsmall"},a))}},{key:"formatStars",value:function(e,t){var a=null;if(.5===t.stars)a=l.default.createElement(h.FontAwesomeIcon,{icon:"star-half"});else if(1===t.stars)a=l.default.createElement("div",{style:{whiteSpace:"nowrap"},id:2},l.default.createElement(h.FontAwesomeIcon,{icon:"star"}));else if(1.5===t.stars)a=l.default.createElement("div",{style:{whiteSpace:"nowrap"},id:3},l.default.createElement(h.FontAwesomeIcon,{icon:"star"}),l.default.createElement(h.FontAwesomeIcon,{icon:"star-half"}));else if(2===t.stars)a=l.default.createElement("div",{style:{whiteSpace:"nowrap"},id:4},l.default.createElement(h.FontAwesomeIcon,{icon:"star"}),l.default.createElement(h.FontAwesomeIcon,{icon:"star"}));else if(2.5===t.stars)a=l.default.createElement("div",{style:{whiteSpace:"nowrap"},id:5},l.default.createElement(h.FontAwesomeIcon,{icon:"star"}),l.default.createElement(h.FontAwesomeIcon,{icon:"star"}),l.default.createElement(h.FontAwesomeIcon,{icon:"star-half"}));else{if(3!==t.stars)return"";a=l.default.createElement("div",{style:{whiteSpace:"nowrap"},id:6},l.default.createElement(h.FontAwesomeIcon,{icon:"star"}),l.default.createElement(h.FontAwesomeIcon,{icon:"star"}),l.default.createElement(h.FontAwesomeIcon,{icon:"star"}))}return l.default.createElement(d.OverlayTrigger,{placement:"top",overlay:l.default.createElement(d.Popover,{id:0,title:"Guidelines"},l.default.createElement(h.FontAwesomeIcon,{icon:"star"})," Nice",l.default.createElement("br",null),l.default.createElement(h.FontAwesomeIcon,{icon:"star"}),l.default.createElement(h.FontAwesomeIcon,{icon:"star"})," Very nice",l.default.createElement("br",null),l.default.createElement(h.FontAwesomeIcon,{icon:"star"}),l.default.createElement(h.FontAwesomeIcon,{icon:"star"}),l.default.createElement(h.FontAwesomeIcon,{icon:"star"})," Fantastic!")},a)}},{key:"formatNumImages",value:function(e,t){return t.media?t.media.filter(function(e){return 1===e.idType}).length:0}},{key:"formatNumMovies",value:function(e,t){return t.media?t.media.filter(function(e){return 2===e.idType}).length:0}},{key:"formatDistance",value:function(e,t){return this.state.currLat>0&&this.state.currLng>0&&t.lat>0&&t.lng>0?this.calcCrow(this.state.currLat,this.state.currLng,t.lat,t.lng).toFixed(1)+" km":""}},{key:"sortFa",value:function(e,t,a){var r=e.fa?e.fa[0].initials:"",n=t.fa?t.fa[0].initials:"";return"asc"===a?r.localeCompare(n):n.localeCompare(r)}},{key:"sortNumImages",value:function(e,t,a){var r=e.media?e.media.filter(function(e){return 1===e.idType}).length:0,n=t.media?t.media.filter(function(e){return 1===e.idType}).length:0;return"asc"===a?r<n?-1:r>n?1:0:r<n?1:r>n?-1:0}},{key:"sortNumMovies",value:function(e,t,a){var r=e.media?e.media.filter(function(e){return 2===e.idType}).length:0,n=t.media?t.media.filter(function(e){return 2===e.idType}).length:0;return"asc"===a?r<n?-1:r>n?1:0:r<n?1:r>n?-1:0}},{key:"sortDistance",value:function(e,t,a){var r=this.state.currLat>0&&this.state.currLng>0&&e.lat>0&&e.lng>0?this.calcCrow(this.state.currLat,this.state.currLng,e.lat,e.lng):0,n=this.state.currLat>0&&this.state.currLng>0&&t.lat>0&&t.lng>0?this.calcCrow(this.state.currLat,this.state.currLng,t.lat,t.lng):0;return"asc"===a?r<n?-1:r>n?1:0:r<n?1:r>n?-1:0}},{key:"render",value:function(){if(!this.state.problems)return l.default.createElement("center",null,l.default.createElement(h.FontAwesomeIcon,{icon:"spinner",spin:!0,size:"3x"}));if(this.state.error)return l.default.createElement("span",null,l.default.createElement("h3",null,this.state.error.status),this.state.error.toString());var e,t=this.state.problems.filter(function(e){return 0!=e.lat&&0!=e.lng}).map(function(e){return{lat:e.lat,lng:e.lng,title:e.nr+" - "+e.name+" ["+e.grade+"]",label:e.name.charAt(0),url:"/problem/"+e.id,icon:{url:e.ticked?"https://mt.google.com/vt/icon?name=icons/spotlight/spotlight-waypoint-a.png":"https://mt.google.com/vt/icon?name=icons/spotlight/spotlight-waypoint-b.png",labelOriginX:11,labelOriginY:13}}}),a=t.length>0?l.default.createElement(u.default,{markers:t,defaultCenter:f.default.getDefaultCenter(),defaultZoom:7}):null;return e=f.default.isBouldering()?l.default.createElement(m.BootstrapTable,{data:this.state.problems,trClassName:this.trClassFormat.bind(this),condensed:!0,hover:!0,columnFilter:!1},l.default.createElement(m.TableHeaderColumn,{dataField:"id",isKey:!0,hidden:!0},"id"),l.default.createElement(m.TableHeaderColumn,{dataField:"areaName",dataSort:!0,dataFormat:this.formatAreaName.bind(this),width:"150",filter:{type:"TextFilter",placeholder:"Filter"}},"Area"),l.default.createElement(m.TableHeaderColumn,{dataField:"sectorName",dataSort:!0,dataFormat:this.formatSectorName.bind(this),width:"150",filter:{type:"TextFilter",placeholder:"Filter"}},"Sector"),l.default.createElement(m.TableHeaderColumn,{dataField:"name",dataSort:!0,dataFormat:this.formatName.bind(this),width:"150",filter:{type:"TextFilter",placeholder:"Filter"}},"Name"),l.default.createElement(m.TableHeaderColumn,{dataField:"grade",dataSort:!0,dataAlign:"center",width:"70"},"Grade"),l.default.createElement(m.TableHeaderColumn,{dataField:"fa",dataSort:!0,dataFormat:this.formatFa.bind(this),sortFunc:this.sortFa.bind(this),dataAlign:"center",width:"70"},"FA"),l.default.createElement(m.TableHeaderColumn,{dataField:"numTicks",dataSort:!0,dataAlign:"center",width:"50"},"Ticks"),l.default.createElement(m.TableHeaderColumn,{dataField:"stars",dataSort:!0,dataFormat:this.formatStars.bind(this),dataAlign:"center",width:"70"},"Stars"),l.default.createElement(m.TableHeaderColumn,{dataField:"numImages",dataSort:!0,dataFormat:this.formatNumImages.bind(this),sortFunc:this.sortNumImages.bind(this),dataAlign:"center",width:"50"},l.default.createElement(h.FontAwesomeIcon,{icon:"camera"})),l.default.createElement(m.TableHeaderColumn,{dataField:"numMovies",dataSort:!0,dataFormat:this.formatNumMovies.bind(this),sortFunc:this.sortNumMovies.bind(this),dataAlign:"center",width:"50"},l.default.createElement(h.FontAwesomeIcon,{icon:"video"})),l.default.createElement(m.TableHeaderColumn,{dataField:"distance",dataSort:!0,dataFormat:this.formatDistance.bind(this),sortFunc:this.sortDistance.bind(this),dataAlign:"center",width:"60"},l.default.createElement(h.FontAwesomeIcon,{icon:"plane"}))):l.default.createElement(m.BootstrapTable,{data:this.state.problems,trClassName:this.trClassFormat.bind(this),condensed:!0,hover:!0,columnFilter:!1},l.default.createElement(m.TableHeaderColumn,{dataField:"id",isKey:!0,hidden:!0},"id"),l.default.createElement(m.TableHeaderColumn,{dataField:"areaName",dataSort:!0,dataFormat:this.formatAreaName.bind(this),width:"150",filter:{type:"TextFilter",placeholder:"Filter"}},"Area"),l.default.createElement(m.TableHeaderColumn,{dataField:"sectorName",dataSort:!0,dataFormat:this.formatSectorName.bind(this),width:"150",filter:{type:"TextFilter",placeholder:"Filter"}},"Sector"),l.default.createElement(m.TableHeaderColumn,{dataField:"name",dataSort:!0,dataFormat:this.formatName.bind(this),width:"150",filter:{type:"TextFilter",placeholder:"Filter"}},"Name"),l.default.createElement(m.TableHeaderColumn,{dataField:"type",dataFormat:this.formatType.bind(this),dataAlign:"center",width:"70"},"Type"),l.default.createElement(m.TableHeaderColumn,{dataField:"grade",dataSort:!0,dataAlign:"center",width:"70"},"Grade"),l.default.createElement(m.TableHeaderColumn,{dataField:"fa",dataSort:!0,dataFormat:this.formatFa.bind(this),sortFunc:this.sortFa.bind(this),dataAlign:"center",width:"70"},"FA"),l.default.createElement(m.TableHeaderColumn,{dataField:"numTicks",dataSort:!0,dataAlign:"center",width:"50"},"Ticks"),l.default.createElement(m.TableHeaderColumn,{dataField:"stars",dataSort:!0,dataFormat:this.formatStars.bind(this),dataAlign:"center",width:"70"},"Stars"),l.default.createElement(m.TableHeaderColumn,{dataField:"numImages",dataSort:!0,dataFormat:this.formatNumImages.bind(this),sortFunc:this.sortNumImages.bind(this),dataAlign:"center",width:"50"},l.default.createElement(h.FontAwesomeIcon,{icon:"camera"})),l.default.createElement(m.TableHeaderColumn,{dataField:"numMovies",dataSort:!0,dataFormat:this.formatNumMovies.bind(this),sortFunc:this.sortNumMovies.bind(this),dataAlign:"center",width:"50"},l.default.createElement(h.FontAwesomeIcon,{icon:"video"}))),l.default.createElement("span",null,l.default.createElement(o.default,null,l.default.createElement("title",null,f.default.getTitle("Finder")),l.default.createElement("meta",{name:"description",content:"Search by difficulty"})),l.default.createElement(d.Breadcrumb,null,l.default.createElement(i.Link,{to:"/"},"Home")," / ",l.default.createElement("font",{color:"#777"},"Finder (problems: ",this.state.problems.length,")")),a,e)}}]),t}();t.default=g},695:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),n=a(1),l=c(n),o=a(284),i=a(696),s=c(a(708));function c(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),r(t,[{key:"componentDidMount",value:function(){var e=this;navigator.geolocation.getCurrentPosition(function(t){e.setState({currLat:t.coords.latitude,currLng:t.coords.longitude})})}},{key:"handleOnClick",value:function(e){this.setState({pushUrl:e})}},{key:"render",value:function(){var e=this;if(this.state&&this.state.pushUrl)return l.default.createElement(o.Redirect,{to:this.state.pushUrl,push:!0});var t=(0,i.withScriptjs)((0,i.withGoogleMap)(function(t){var a=null;e.props.markers&&(a=e.props.markers.map(function(t,a){var r=null;return t.icon&&(r={},t.icon.url&&(r.url=t.icon.url),t.icon.scaledSizeW&&t.icon.scaledSizeH&&(r.scaledSize=new google.maps.Size(t.icon.scaledSizeW,t.icon.scaledSizeH)),t.icon.labelOriginX&&t.icon.labelOriginY&&(r.labelOrigin=new google.maps.Point(t.icon.labelOriginX,t.icon.labelOriginY))),l.default.createElement(i.Marker,{icon:r,key:a,position:{lat:t.lat,lng:t.lng},label:t.label,title:t.title,clickable:!0,onClick:e.handleOnClick.bind(e,t.url)})})),e.state&&e.state.currLat&&e.state.currLng&&e.state.currLat>0&&e.state.currLng>0&&a.push(l.default.createElement(i.Marker,{key:-1,icon:"https://maps.gstatic.com/mapfiles/markers2/measle_blue.png",position:{lat:e.state.currLat,lng:e.state.currLng}}));var r=null;return e.props.polygons&&(r=e.props.polygons.map(function(t,a){return l.default.createElement(i.Polygon,{key:a,paths:t.triangleCoords,options:{strokeColor:"#FF3300",strokeOpacity:"0.5",strokeWeight:"2",fillColor:"#FF3300",fillOpacity:"0.15"},onClick:e.handleOnClick.bind(e,t.url)})})),l.default.createElement(i.GoogleMap,{defaultZoom:e.props.defaultZoom,defaultCenter:e.props.defaultCenter,defaultMapTypeId:google.maps.MapTypeId.TERRAIN},l.default.createElement(s.default,{averageCenter:!1,minimumClusterSize:60,enableRetinaIcons:!1,imagePath:"https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m",gridSize:60},a,r))}));return l.default.createElement("section",{style:{height:"600px"}},l.default.createElement(t,{googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyCpaVd5518yMB-oiIyP5JnTVWMfrOv4sAI&v=3.exp",loadingElement:l.default.createElement("div",{style:{height:"100%"}}),containerElement:l.default.createElement("div",{style:{height:"100%"}}),mapElement:l.default.createElement("div",{style:{height:"100%"}})}))}}]),t}();t.default=u}}]);
//# sourceMappingURL=11.index.js.map