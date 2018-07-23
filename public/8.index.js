(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{598:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(1),l=h(r),s=h(n(617)),o=n(132),u=n(258),i=h(n(190)),d=n(257),c=h(n(259)),f=h(n(189)),m=h(n(192));function h(e){return e&&e.__esModule?e:{default:e}}n(191);var p=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),a(t,[{key:"componentWillMount",value:function(){c.default.loggedIn()||this.setState({pushUrl:"/login"})}},{key:"componentDidMount",value:function(){var e=this;i.default.get(f.default.getUrl("users/edit?regionId="+f.default.getRegion()+"&id="+this.props.match.params.userId)).withCredentials().end(function(t,n){t?e.setState({message:l.default.createElement(d.Panel,{bsStyle:"danger"},t.toString())}):e.setState({id:n.body.id,username:n.body.username,firstname:n.body.firstname,lastname:n.body.lastname,currentPassword:null,newPassword:null,newPassword2:null,message:null})})}},{key:"save",value:function(e){var t=this;e.preventDefault(),"error"===this.validateFirstname(null)?this.setState({message:l.default.createElement(d.Panel,{bsStyle:"danger"},"Invalid firstname.")}):"error"===this.validateLastname(null)?this.setState({message:l.default.createElement(d.Panel,{bsStyle:"danger"},"Invalid lastname.")}):"error"===this.validateUsername(null)?this.setState({message:l.default.createElement(d.Panel,{bsStyle:"danger"},"Invalid username.")}):"error"===this.validateCurrentPassword(null)||"error"===this.validateNewPassword(null)||"error"===this.validateNewPassword2(null)?this.setState({message:l.default.createElement(d.Panel,{bsStyle:"danger"},"Invalid password.")}):i.default.post(f.default.getUrl("users/edit")).withCredentials().send({regionId:f.default.getRegion(),id:this.state.id,username:this.state.username,firstname:this.state.firstname,lastname:this.state.lastname,currentPassword:this.state.currentPassword,newPassword:this.state.newPassword}).set("Accept","application/json").end(function(e,n){e?t.setState({message:l.default.createElement(d.Panel,{bsStyle:"danger"},e.toString())}):t.setState({pushUrl:"/user"})})}},{key:"onCancel",value:function(){window.history.back()}},{key:"onFirstnameChanged",value:function(e){this.setState({firstname:e.target.value})}},{key:"onLastnameChanged",value:function(e){this.setState({lastname:e.target.value})}},{key:"onUsernameChanged",value:function(e){this.setState({username:e.target.value})}},{key:"onCurrentPasswordChanged",value:function(e){this.setState({currentPassword:e.target.value})}},{key:"onNewPasswordChanged",value:function(e){this.setState({newPassword:e.target.value})}},{key:"onConfirmNewPasswordChanged",value:function(e){this.setState({newPassword2:e.target.value})}},{key:"validateFirstname",value:function(){return this.state.firstname.length<1?"error":"success"}},{key:"validateLastname",value:function(){return this.state.lastname.length<1?"error":"success"}},{key:"validateUsername",value:function(){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.username)?"success":"error"}},{key:"validateCurrentPassword",value:function(){return"success"}},{key:"validateNewPassword",value:function(){return!this.state.currentPassword&&!this.state.newPassword2||this.state.newPassword?this.state.newPassword&&this.state.newPassword.length<8?"error":"success":"error"}},{key:"validateNewPassword2",value:function(){return!this.state.currentPassword&&!this.state.newPassword||this.state.newPassword2?this.state.newPassword2&&this.state.newPassword2.length<8?"error":this.state.newPassword2&&this.state.newPassword!=this.state.newPassword2?"error":"success":"error"}},{key:"render",value:function(){return this.state?this.state.pushUrl?l.default.createElement(u.Redirect,{to:this.state.pushUrl,push:!0}):l.default.createElement("span",null,l.default.createElement(s.default,null,l.default.createElement("title",null,f.default.getTitle("Edit "+res.body.firstname+" "+res.body.lastname)),l.default.createElement("meta",{name:"description",content:"Edit user"})),l.default.createElement(d.Breadcrumb,null,l.default.createElement(o.Link,{to:"/"},"Home")," / ",l.default.createElement("font",{color:"#777"},"User edit")),l.default.createElement(d.Well,null,this.state.message,l.default.createElement("form",{onSubmit:this.save.bind(this)},l.default.createElement(d.FormGroup,{controlId:"formControlsFirstname",validationState:this.validateFirstname()},l.default.createElement(d.ControlLabel,null,"Firstname"),l.default.createElement(d.FormControl,{type:"text",value:this.state.firstname,placeholder:"Enter firstname",onChange:this.onFirstnameChanged.bind(this)}),l.default.createElement(d.FormControl.Feedback,null)),l.default.createElement(d.FormGroup,{controlId:"formControlsLastname",validationState:this.validateLastname()},l.default.createElement(d.ControlLabel,null,"Lastname"),l.default.createElement(d.FormControl,{type:"text",value:this.state.lastname,placeholder:"Enter lastname",onChange:this.onLastnameChanged.bind(this)}),l.default.createElement(d.FormControl.Feedback,null)),l.default.createElement(d.FormGroup,{controlId:"formControlsUsername",validationState:this.validateUsername()},l.default.createElement(d.ControlLabel,null,"Username"),l.default.createElement(d.FormControl,{type:"email",value:this.state.username,placeholder:"Enter username",onChange:this.onUsernameChanged.bind(this)}),l.default.createElement(d.FormControl.Feedback,null),l.default.createElement(d.HelpBlock,null,"You must enter a valid email address.")),l.default.createElement("hr",null),l.default.createElement("h4",null,"Only fill following fields if you want to change your password"),l.default.createElement(d.FormGroup,{controlId:"formControlsCurrentPassword",validationState:this.validateCurrentPassword()},l.default.createElement(d.ControlLabel,null,"Current password"),l.default.createElement(d.FormControl,{type:"password",placeholder:"Enter current password",onChange:this.onCurrentPasswordChanged.bind(this)})),l.default.createElement(d.FormGroup,{controlId:"formControlsNewPassword",validationState:this.validateNewPassword()},l.default.createElement(d.ControlLabel,null,"New password"),l.default.createElement(d.FormControl,{type:"password",placeholder:"Enter new password",onChange:this.onNewPasswordChanged.bind(this)}),l.default.createElement(d.FormControl.Feedback,null),l.default.createElement(d.HelpBlock,null,"At least 8 characters.")),l.default.createElement(d.FormGroup,{controlId:"formControlsNewPassword2",validationState:this.validateNewPassword2()},l.default.createElement(d.ControlLabel,null,"Confirm new password"),l.default.createElement(d.FormControl,{type:"password",placeholder:"Confirm new password",onChange:this.onConfirmNewPasswordChanged.bind(this)}),l.default.createElement(d.FormControl.Feedback,null),l.default.createElement(d.HelpBlock,null,"Must match new password.")),l.default.createElement(d.ButtonGroup,null,l.default.createElement(d.Button,{bsStyle:"danger",onClick:this.onCancel.bind(this)},"Cancel"),l.default.createElement(d.Button,{type:"submit",bsStyle:"success"},"Save"))))):l.default.createElement("center",null,l.default.createElement(m.default,{icon:"spinner",spin:!0,size:"3x"}))}}]),t}();t.default=p},616:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=m(n(256)),r=m(n(3)),l=m(n(100)),s=m(n(4)),o=m(n(5)),u=n(1),i=m(u),d=m(n(0)),c=m(n(15)),f=n(620);function m(e){return e&&e.__esModule?e:{default:e}}var h=function(e){function t(){return(0,r.default)(this,t),(0,s.default)(this,(t.__proto__||(0,a.default)(t)).apply(this,arguments))}return(0,o.default)(t,e),(0,l.default)(t,[{key:"extractChildren",value:function(){var e=this.context.extract;e&&e(this.props.children)}},{key:"handleChildrens",value:function(){var e=this,t=this.props.children;if(!this.context.extract){var n=i.default.createElement("div",{className:"react-head-temp"},t),a=document.createElement("div");c.default.render(n,a,function(){var t=a.innerHTML;if(e.lastChildStr!==t){e.lastChildStr=t;var n=Array.prototype.slice.call(a.querySelector(".react-head-temp").children),r=document.head,l=r.innerHTML;(n=n.filter(function(e){return-1===l.indexOf((0,f.getDomAsString)(e))})).forEach(function(e){var t=e.tagName.toLowerCase();if("title"===t){var n=(0,f.getDuplicateTitle)();n&&(0,f.removeChild)(r,n)}else if("meta"===t){var a=(0,f.getDuplicateMeta)(e);a&&(0,f.removeChild)(r,a)}else if("link"===t&&"canonical"===e.rel){var l=(0,f.getDuplicateCanonical)(e);l&&(0,f.removeChild)(r,l)}}),(0,f.appendChild)(document.head,n)}})}}},{key:"componentDidMount",value:function(){this.handleChildrens()}},{key:"componentDidUpdate",value:function(e){e.children!==this.props.children&&this.handleChildrens()}},{key:"render",value:function(){return this.extractChildren(),null}}]),t}(u.Component);h.contextTypes={extract:d.default.func},t.default=h},617:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ReactTitle=t.MetaTagsContext=t.MetaTags=void 0;var a=s(n(621)),r=s(n(616)),l=s(n(619));function s(e){return e&&e.__esModule?e:{default:e}}t.default=r.default,t.MetaTags=r.default,t.MetaTagsContext=a.default,t.ReactTitle=l.default},619:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=f(n(256)),r=f(n(3)),l=f(n(100)),s=f(n(4)),o=f(n(5)),u=n(1),i=f(u),d=f(n(0)),c=f(n(616));function f(e){return e&&e.__esModule?e:{default:e}}var m=function(e){function t(){return(0,r.default)(this,t),(0,s.default)(this,(t.__proto__||(0,a.default)(t)).apply(this,arguments))}return(0,o.default)(t,e),(0,l.default)(t,[{key:"render",value:function(){return i.default.createElement(c.default,null,i.default.createElement("title",null,this.props.title))}}]),t}(u.Component);m.propTypes={title:d.default.string},t.default=m},620:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l(n(2)),r=l(n(133));function l(e){return e&&e.__esModule?e:{default:e}}t.extractMetaAndTitle=function(e){var t=void 0,n=void 0,r=[];return e=(e=(e=e.replace(u,function(e){return t=e,""})).replace(o,function(e){return n=e,""})).replace(s,function(e){return r.push((0,a.default)({},function(e){var t={};if(!e)return t;for(var n=i.exec(e);null!==n;)t[n[1]]=n[3]||n[4]||n[5],n=i.exec(e);return t}(e),{_tagString:e})),""}),{title:t,metas:r,canonicalLink:n,rest:e}},t.removeDuplicateMetas=function(e){for(var t={},n={},a={},r=[],l=e.length-1;l>=0;l--){var s=e[l],o=s.id,u=s.property,i=s.name,d=!1;if(o)d=!a[o];else if(u||i){var c=t[u]||n[i];d=!c||c.id}o&&(a[o]=s),u&&(t[u]=s),i&&(n[i]=s),d&&r.push(s)}return r},t.getDuplicateTitle=function(){return document.head.querySelectorAll("title")},t.getDuplicateCanonical=function(){return document.head.querySelectorAll('link[rel="canonical"]')},t.getDuplicateMeta=function(e){var t=document.head,n=e.id,a=e.property,r=e.name;return n?n&&t.querySelector("#"+n):r?d(t.querySelectorAll('[name = "'+r+'"]')):a?d(t.querySelectorAll('[property = "'+a+'"]')):null},t.appendChild=function(e,t){void 0===t.length&&(t=[t]);for(var n=document.createDocumentFragment(),a=0,r=t.length;a<r;a++)n.appendChild(t[a]);e.appendChild(n)},t.removeChild=function(e,t){void 0===t.length&&(t=[t]);for(var n=0,a=t.length;n<a;n++)e.removeChild(t[n])},t.getDomAsString=function(e){var t=document.createElement("div");return t.appendChild(e),t.innerHTML};var s=/<meta[^<>]*?=(['"].*?['"]|[^<>]*?)*?\/?>/g,o=/<link[^<>]*?rel=['"]canonical['"].*?(\/>|<\/link>)/g,u=/<title[^<>]*?>(.*?)<\/title>/g,i=/(\S*?)=("(.*?)"|'(.*?)'|([^<>\s]*))/g;function d(e){return(e=(0,r.default)(e||[])).filter(function(e){return!e.id})}},621:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=d(n(256)),r=d(n(3)),l=d(n(100)),s=d(n(4)),o=d(n(5)),u=n(1),i=d(n(0));function d(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){return(0,r.default)(this,t),(0,s.default)(this,(t.__proto__||(0,a.default)(t)).apply(this,arguments))}return(0,o.default)(t,e),(0,l.default)(t,[{key:"getChildContext",value:function(){return{extract:this.props.extract}}},{key:"render",value:function(){return u.Children.only(this.props.children)}}]),t}(u.Component);c.childContextTypes={extract:i.default.func},t.default=c}}]);
//# sourceMappingURL=8.index.js.map