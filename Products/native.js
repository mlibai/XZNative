!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=g,l("ready","ready");const n=Object.freeze({default:0,warning:1,error:2}),r=Object.freeze({url:"url",json:"json",object:"object",javascript:"javascript"}),o=new f;function i(e,t){"number"!=typeof t||t===n.default?console.log("%c[Native]%c %s","color: #0b78d7; font-weight: bold;","color: #333333",e):t===n.warning?console.log("%c[Native]%c %s","color: #0b78d7; font-weight: bold;","color: #fe7e3c",e):t===n.error&&console.log("%c[Native]%c %s","color: #0b78d7; font-weight: bold;","color: #d8463c",e)}function u(e,t,n){return void 0===e?i("Define property error: Can not define properties for an undefined value.",2):"string"!=typeof t||0===t.length?i("Define property error: The name for "+e.constructor.name+"'s property must be a nonempty string.",2):e.hasOwnProperty(t)?i("Define property warning: The property "+t+" to be defined for "+e.constructor.name+" is already exist.",1):(Object.defineProperty(e,t,n),e)}function c(e,t){if(void 0===e)return i("Define properties error: Can not define properties for an undefined value.",2);if("object"!=typeof t)return i("Define properties error: The property descriptors for "+e.constructor.name+" at second parameter must be an Object.",2);for(let n in t)t.hasOwnProperty(n)&&u(e,n,t[n]);return e}function s(e){if(!e)return"";switch(typeof e){case"string":return encodeURIComponent(e);case"undefined":return"";default:return encodeURIComponent(JSON.stringify(e))}}function a(e){if(!e)return"";if(Array.isArray(e)){let t=[];for(let n=0;n<e.length;n++)t.push(s(e[n]));return t.join("&")}switch(typeof e){case"string":return encodeURIComponent(e);case"object":let t="";for(let n in e)e.hasOwnProperty(n)&&(t.length>0?t+="&"+encodeURIComponent(n):t=encodeURIComponent(n),e[n]&&(t+="="+s(e[n])));return t;case"undefined":return"";default:return encodeURIComponent(JSON.stringify(e))}}function f(){let e=null;function t(t,n){if(void 0===n)return function(){if(e)return;e={},window.setTimeout(function(){e=null});let t=document.cookie;if(!t)return;let n=t.split("; ");for(;n.length>0;){let t=n.pop().split("=");if(!Array.isArray(t)||0===t.length)continue;let r=decodeURIComponent(t[0]);t.length>1?e[r]=decodeURIComponent(t[1]):e[r]=null}}(),e.hasOwnProperty(t)?e[t]:void 0;let r=new Date;return n?(r.setTime(r.getTime()+2592e6),"string"!=typeof n&&(n=JSON.stringify(n)),document.cookie=encodeURIComponent(t)+"="+encodeURIComponent(n)+"; expires="+r.toUTCString()):(r.setTime(r.getTime()-1),document.cookie=encodeURIComponent(t)+"; expires="+r.toUTCString()),e&&(e[t]=n),this}function n(){return e=null,this}Object.defineProperties(this,{value:{get:function(){return t}},synchronize:{get:function(){return n}}})}function l(e,t){return"string"!=typeof e||0===e.length?i("The name of NativeMethod must be a nonempty string.",n.error):l.hasOwnProperty(e)?i("Native Method "+e+" has been registered already.",n.error):(u(l,e,{get:function(){return t}}),t)}function d(e,t){return"string"!=typeof e||0===e.length?i("The name of NativeMethod must be a nonempty string.",n.error):d.hasOwnProperty(e)?i("Native Method "+e+" has been registered already.",n.error):(u(d,e,{get:function(){return t}}),t)}function p(e){let t=1e7,o={},u=r.url,c=null,a="native";function f(e,r){switch(typeof e){case"function":let u="NT"+t++;return o[u]=e,u;case"string":if(!o.hasOwnProperty(e))return;let c=o[e];return(r||void 0===r)&&delete o[e],c;default:return i("Parameters error: Only function or string is allowed for Native.callback()'s first argument.",n.error)}}function l(e){switch(u){case r.url:return function(e){let t=[];for(let e=1;e<arguments.length;e+=1){let n=arguments[e];"function"==typeof n?t.push(f(n)):t.push(n)}let n=a+"://"+e+"?parameters="+s(t),r=document.createElement("iframe");r.style.display="none",r.setAttribute("src",n),document.body.appendChild(r),window.setTimeout(function(){document.body.removeChild(r)},2e3),"function"==typeof c&&c(n)}.apply(this,arguments);case r.json:return function(e){let t=[e];for(let e=1;e<arguments.length;e+=1){let n=arguments[e];switch(typeof n){case"number":case"string":case"boolean":t.push(n);break;case"function":t.push(f(n));break;default:t.push(JSON.stringify(n))}}d.apply(this,t)}.apply(this,arguments);case r.object:return d.apply(this,arguments);case r.javascript:return function(e){let t=[];for(let e=1;e<arguments.length;e++)"function"==typeof arguments[e]?t.push(f(arguments[e])):t.push(arguments[e]);window.setTimeout(function(){c.apply(window,[e,t])})}.apply(this,arguments);default:return i("Not supported interaction mode `"+u+"`, see more in NativeMode enum.",n.error)}}function d(e){let t=[];for(let e=1;e<arguments.length;e+=1)t.push(arguments[e]);window.setTimeout(function(){let n=e.split("/"),r=c;for(let e=0;e<n.length;e++)r=r[n[e]];r.apply(window,t)})}let p=!1,g=null;function h(t,n){if(c=t,u=n,p)return this;function r(){g=l(window.NativeMethod.ready,function(t){p=!0,g=null,e(t)})}if(g&&f(g,!0),"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll)window.setTimeout(function(){r()});else{function o(){document.removeEventListener("DOMContentLoaded",o),window.removeEventListener("load",o),r()}document.addEventListener("DOMContentLoaded",o),window.addEventListener("load",o)}return this}Object.defineProperties(this,{callback:{get:function(){return f}},perform:{get:function(){return l}},scheme:{get:function(){return a},set:function(e){a=e}},isReady:{get:function(){return p}},register:{get:function(){return h}},delegate:{get:function(){return c}},mode:{get:function(){return u}}})}function g(){let e=null;const t=[],n=[],r=this,o=new p(function(o){for(e=o;t.length>0;){let n=t.shift();c(r,n.apply(r,[e]))}for(;n.length>0;)n.shift().apply(window)});function i(e){return o.isReady?(window.setTimeout(e),this):(n.push(e),this)}function u(n){return"function"!=typeof n?this:(o.isReady?c(this,n.apply(this,[e])):t.push(n),this)}Object.defineProperties(this,{core:{get:function(){return o}},ready:{get:function(){return i}},extend:{get:function(){return u}}})}c(g,{version:{get:function(){return"2.0.0"}},LogStyle:{get:function(){return n}},log:{get:function(){return i}},defineProperty:{get:function(){return u}},defineProperties:{get:function(){return c}},parseURLQueryValue:{get:function(){return s}},parseURLQuery:{get:function(){return a}},cookie:{get:function(){return o}},Mode:{get:function(){return r}},Method:{get:function(){return l}},CookieKey:{get:function(){return d}}}),u(window,"Native",{get:function(){return g}}),u(window,"NativeMode",{get:function(){return r}}),u(window,"NativeType",{get:function(){return i("NativeType was deprecated, please use NativeMode instead.",n.warning),r}}),u(window,"NativeLogStyle",{get:function(){return n}}),u(window,"NativeLog",{get:function(){return i}}),u(window,"NativeDefineProperty",{get:function(){return u}}),u(window,"NativeDefineProperties",{get:function(){return c}}),u(window,"NativeParseURLQueryValue",{get:function(){return s}}),u(window,"NativeParseURLQuery",{get:function(){return a}}),u(window,"NativeCookie",{get:function(){return f}}),u(window,"NativeMethod",{get:function(){return l}}),u(window,"NativeCookieKey",{get:function(){return d}})},function(e,t,n){const r=n(0),o=new r;r.defineProperty(window,"native",{get:function(){return o}}),e.exports=o},function(e,t,n){const r=n(0);r.CookieKey("currentUser","com.mlibai.native.cookie.currentUser"),e.exports=n(1).extend(function(e){const t=[];function n(e){if("function"==typeof e)return t.push(e),this;for(let e=0;e<t.length;e++)t[e].call(window);return this}function o(e,t,n,r){Object.defineProperties(this,{id:{get:function(){return e}},name:{get:function(){return t}},info:{get:function(){return n}},version:{get:function(){return r}}})}let i=new o(e.currentUser.id,e.currentUser.name,e.currentUser.info,e.currentUser.version);function u(e){i=new o(e.id,e.name,e.info,e.version),n()}return r.cookie.value(r.CookieKey.currentUser,JSON.stringify(i)),function(e){function t(){let t=JSON.parse(r.cookie.value(r.CookieKey.currentUser));t.id===e.currentUser.id&&t.version===e.currentUser.version||e.setCurrentUser(t)}window.addEventListener("pagehide",function e(){window.addEventListener("pageshow",t),window.removeEventListener("pagehide",e)})}(this),{setCurrentUser:{get:function(){return u}},currentUserChange:{get:function(){return n}},currentUser:{get:function(){return i}}}})},function(e,t,n){n(0),e.exports=n(1),n(4),n(5),n(6),n(7),n(8),n(9),n(10),n(11),n(12),n(2)},function(e,t,n){const r=n(0);r.Method("alert","alert"),e.exports=n(1).extend(function(){function e(e,t){return e&&"object"==typeof e?this.core.perform(r.Method.alert,e,t):(r.log("Method `alert` first parameter must be an message object.",r.LogStyle.error),null)}return{alert:{get:function(){return e}}}})},function(e,t,n){const r=n(0);r.Method("dataService",Object.freeze({cachedResourceForURL:"dataService/cachedResourceForURL",numberOfRowsInList:"dataService/numberOfRowsInList",dataForRowAtIndex:"dataService/dataForRowAtIndex"}));const o=Object.freeze({image:"image"});r.defineProperty(window,"NativeCachedResourceType",{get:function(){return o}}),e.exports=n(1).extend(function(){let e=new function(e){function t(t,n,o){return"string"!=typeof t||"string"!=typeof n?(r.log("Method `numberOfRowsInList` first/second parameter must be a string value.",r.LogStyle.error),null):e.core.perform(r.Method.dataService.numberOfRowsInList,t,n,o)}function n(t,n,o,i){return"string"!=typeof t||"string"!=typeof n||"number"!=typeof o?(r.log("Method `dataForRowAtIndex` first/second/third parameter must be a string/string/number value.",r.LogStyle.error),null):e.core.perform(r.Method.dataService.dataForRowAtIndex,t,n,o,i)}function i(t,n,i){if("string"!=typeof t)return r.log("Method `cachedResourceForURL` url parameter must be a string value.",r.LogStyle.error),null;switch(typeof n){case"function":i=n,n=o.image;break;case"string":break;default:n=o.image}return"function"!=typeof i?(r.log("Method `cachedResourceForURL` must have a callback handler.",r.LogStyle.error),null):e.core.perform(r.Method.dataService.cachedResourceForURL,t,n,i)}r.defineProperties(this,{numberOfRowsInList:{get:function(){return t}},dataForRowAtIndex:{get:function(){return n}},cachedResourceForURL:{get:function(){return i}}})}(this);return{dataService:{get:function(){return e}}}})},function(e,t,n){const r=n(0);r.Method("eventService",Object.freeze({track:"eventService/track",documentElementWasClicked:"eventService/documentElementWasClicked",documentElementDidSelect:"eventService/documentElementDidSelect"})),e.exports=n(1).extend(function(){let e=new function(e){function t(t,n,o,i){return"string"!=typeof t||"string"!=typeof n||void 0!==o?(r.log("Method `documentElementDidSelect` first/second/third parameter must be a string/string/number value.",r.LogStyle.error),null):e.core.perform(r.Method.eventService.documentElementDidSelect,t,n,o,i)}function n(t,n,o,i){return"string"!=typeof t||"string"!=typeof n?(r.log("Method `elementWasClicked` first/second parameter must be a string value.",r.LogStyle.error),null):("function"==typeof o&&(i=o,o=null),e.core.perform(r.Method.eventService.documentElementWasClicked,t,n,o,i))}function o(t,n){return"string"!=typeof t?(r.log("Method `track` first parameter must be a string value.",r.LogStyle.error),null):e.core.perform(r.Method.eventService.track,t,n)}r.defineProperties(this,{documentElementDidSelect:{get:function(){return t}},documentElementWasClicked:{get:function(){return n}},track:{get:function(){return o}}})}(this);return{eventService:{get:function(){return e}}}})},function(e,t,n){const r=n(0);r.Method("login","login"),e.exports=n(2).extend(function(){function e(e){if(!e)return r.log("Method `login` called without a callback is not allowed.",r.LogStyle.error),this;let t=this;this.core.perform(r.Method.login,function(n){t.setCurrentUser(n),e()})}return{login:{get:function(){return e}}}})},function(e,t,n){const r=n(0);r.Method("navigation",Object.freeze({push:"navigation/push",pop:"navigation/pop",popTo:"navigation/popTo",bar:Object.freeze({setHidden:"navigation/bar/setHidden",setTitle:"navigation/bar/setTitle",setTitleColor:"navigation/bar/setTitleColor",setBackgroundColor:"navigation/bar/setBackgroundColor"})})),e.exports=n(1).extend(function(e){function t(e,t){let n=t.title,o=t.titleColor,i=t.backgroundColor,u=t.isHidden;function c(t,o){return"string"!=typeof t?(r.log("The navigation.bar.title must be a string value.",r.LogStyle.error),this):(n=t,o&&e.core.perform(r.Method.navigation.bar.setTitle,t),this)}function s(t,n){return"string"!=typeof t?(r.log("The navigation.bar.titleColor must be a string value.",r.LogStyle.error),this):(o=t,n&&e.core.perform(r.Method.navigation.bar.setTitleColor,t),this)}function a(t,n,o){return"boolean"!=typeof t?(r.log("The navigation.bar.isHidden must be a boolean value.",r.LogStyle.error),this):(u=t,o&&e.core.perform(r.Method.navigation.bar.setHidden,t,n),this)}function f(e){return a(!0,e,!0),this}function l(e){return a(!1,e,!0),this}function d(t,n){return"string"!=typeof t?(r.log("The navigation.bar.backgroundColor must be a string value.",r.LogStyle.error),this):(i=t,n?(e.core.perform(r.Method.navigation.bar.setBackgroundColor,t),this):this)}r.defineProperties(this,{title:{get:function(){return n},set:function(e){c(e,!0)}},titleColor:{get:function(){return o},set:function(e){s(e,!0)}},backgroundColor:{get:function(){return i},set:function(e){d(e,!0)}},isHidden:{get:function(){return u},set:function(e){a(e,!1,!0)}},setTitle:{get:function(){return c}},setTitleColor:{get:function(){return s}},setBackgroundColor:{get:function(){return d}},setHidden:{get:function(){return a}},hide:{get:function(){return f}},show:{get:function(){return l}}})}let n=new function(e,n){let o=function(t,n){if("string"!=typeof t)return r.log("Method `push` can not be called without a url parameter.",r.LogStyle.error),null;if(!/^([a-z]+):\/\//i.test(t))if(/^(\/)/i.test(t))t=window.location.protocol+"//"+window.location.host+t;else{let e=window.location.href.split("/");e.pop(),t=e.join("/")+"/"+t}return"boolean"!=typeof n&&(n=!0),e.core.perform(r.Method.navigation.push,t,n)},i=function(t){return"boolean"!=typeof t&&(t=!0),e.core.perform(r.Method.navigation.pop,t)},u=function(t,n){if("number"==typeof t)return"boolean"!=typeof n&&(n=!0),e.core.perform(r.Method.navigation.popTo,t,n);r.log("Method `popTo` can not be called without a index parameter.",r.LogStyle.error)},c=new t(e,n.bar);r.defineProperties(this,{push:{get:function(){return o}},pop:{get:function(){return i}},popTo:{get:function(){return u}},bar:{get:function(){return c}}})}(this,e.navigation);return{navigation:{get:function(){return n}}}})},function(e,t,n){const r=n(0);r.Method("networking",Object.freeze({http:"networking/http"}));const o=Object.freeze({WiFi:"WiFi"});r.defineProperty(window,"NativeNetworkStatus",{get:function(){return o}}),e.exports=n(1).extend(function(e){let t=new function(e,t){let n=t.status,i=[];function u(t,n){return t&&"object"==typeof t?e.core.perform(r.Method.networking.http,t,n):(r.log("Method `http` first parameter must be an request object.",r.LogStyle.error),null)}function c(e){if("function"==typeof e)return i.push(e),this;for(let e=0;e<i.length;e++)i[e].call(window)}function s(e){n=e,c()}r.defineProperties(this,{isViaWiFi:{get:function(){return n===o.WiFi}},status:{get:function(){return n}},isReachable:{get:function(){return!!n}},statusChange:{get:function(){return c}},http:{get:function(){return u}},setStatus:{get:function(){return s}}})}(this,e.networking);return{networking:{get:function(){return t}},http:{get:function(){return t.http}}}})},function(e,t,n){const r=n(0);r.Method("open","open"),e.exports=n(1).extend(function(){function e(e){return"string"!=typeof e?(r.log("Method `open`'s page parameter must be a string value.",r.LogStyle.error),null):this.core.perform(r.Method.open,e)}return{open:{get:function(){return e}}}})},function(e,t,n){const r=n(0);r.Method("present","present"),r.Method("dismiss","dismiss"),e.exports=n(1).extend(function(){function e(e,t,n){if("string"!=typeof e)return r.log("Method `present` first parameter must be a string value.",r.LogStyle.error),null;let o=t,i=n;return"function"==typeof t&&(o=!0,i=t),"boolean"!=typeof o&&(o=!0),this.core.perform(r.Method.present,e,o,i)}function t(e,t){let n=e,o=t;return"function"==typeof e&&(n=!0,o=e),"boolean"!=typeof n&&(n=!0),this.core.perform(r.Method.dismiss,n,o)}return{present:{get:function(){return e}},dismiss:{get:function(){return t}}}})},function(e,t,n){const r=n(0);r.Method("setCurrentTheme","setCurrentTheme"),r.CookieKey("currentTheme","com.mlibai.native.cookie.currentTheme"),e.exports=n(1).extend(function(e){let t=e.currentTheme,n=[];function o(e,n,o){t=e,r.cookie.value(r.CookieKey.currentTheme,e),o||void 0===o?this.core.perform(r.Method.setCurrentTheme,e,n):i()}function i(e,t){if("function"==typeof e)return n.push({callback:e,animated:t}),this;for(let e=0;e<n.length;e++){let t=n[e];t.callback.call(window,t.animated)}return this}return function(e){function t(){let t=r.cookie.value(r.CookieKey.currentTheme);t&&t!==e.currentTheme&&(e.setCurrentTheme(t,!1,!1),e.currentThemeChange())}window.addEventListener("pagehide",function e(){window.removeEventListener("pagehide",e),window.addEventListener("pageshow",t)})}(this),{currentTheme:{get:function(){return t},set:function(e){o(e,!1,!0)}},currentThemeChange:{get:function(){return i}},setCurrentTheme:{get:function(){return o}}}})}]);