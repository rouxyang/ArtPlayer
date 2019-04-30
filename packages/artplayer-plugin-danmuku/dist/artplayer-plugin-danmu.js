/*!
 * artplayer-plugin-danmu.js v3.1.7
 * Github: https://github.com/zhw2590582/ArtPlayer#readme
 * (c) 2017-2019 Harvey Zack
 * Released under the MIT License.
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self)["artplayer-plugin-danmu"]=e()}(this,function(){"use strict";var n=function(t){if(Array.isArray(t))return t};var i=function(t,e){var n=[],i=!0,r=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(i=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){r=!0,o=t}finally{try{i||null==s.return||s.return()}finally{if(r)throw o}}return n};var r=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")};var p=function(t,e){return n(t)||i(t,e)||r()};function e(t){if("string"!=typeof t)return[];var e=t.match(/<d([\S ]*?>[\S ]*?)<\/d>/gi);return e.length?e.map(function(t){var e=t.match(/<d p="(.+)">(.+)<\/d>/),n=p(e,3),i=n[1],r=n[2],o=i.split(",");return 8===o.length&&r.trim()?{text:r,time:Number(o[0]),mode:Number(o[1]),size:Number(o[2]),color:"#".concat(Number(o[3]).toString(16)),timestamp:Number(o[4]),pool:Number(o[5]),userID:o[6],rowID:Number(o[7])}:null}):[]}function o(t){return fetch(t).then(function(t){return t.text()}).then(function(t){return e(t)})}var a=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t};var s=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(t){a(e,t,n[t])})}return e};var u=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};function l(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var t=function(t,e,n){return e&&l(t.prototype,e),n&&l(t,n),t};function c(t){var e=function(t){for(var e=0,n=0,i=1;i<t.length;i+=1){var r=t[i],o=t[i-1],a=o.top+o.height,s=r.top-a;n<s&&(e=a,n=s)}return e}(t);return 0===e&&(e=function(t){for(var e={},n=0;n<t.length;n+=1){var i=t[n];e[i.top]?e[i.top].push(i):e[i.top]=[i]}for(var r=0,o=0,a=Object.keys(e),s=0;s<a.length;s+=1){for(var u=t[0].width,l=e[a[s]],h=0;h<l.length;h+=1){var c=l[h];c.right<u&&(u=c.right)}r<u&&(r=u,o=p(l,1)[0].top)}return 0===o&&(o=a[Math.floor(Math.random()*(2-a.length)+a.length-1)]),o}(t)),e}var h=function(){function h(e,t){var n=this;u(this,h),this.art=e,this.queue=[],this.layer=null,this.isStop=!1,this.animationFrameTimer=null,e.on("video:play",this.start.bind(this)),e.on("video:playing",this.start.bind(this)),e.on("video:pause",this.stop.bind(this)),e.on("video:waiting",this.stop.bind(this)),e.on("destroy",this.stop.bind(this)),this.config(t),"function"==typeof this.option.danmus?this.option.danmus().then(function(t){t.forEach(n.addToQueue.bind(n)),n.init(),e.emit("artplayerPluginDanmu:loaded",t)}):"string"==typeof this.option.danmus?o(this.option.danmus).then(function(t){t.forEach(n.addToQueue.bind(n)),n.init(),e.emit("artplayerPluginDanmu:loaded",t)}):(this.option.danmus.forEach(this.addToQueue.bind(this)),this.init())}return t(h,[{key:"config",value:function(t){var e=this.art.constructor,n=e.utils.clamp,i=e.validator;this.option=Object.assign({},h.option,t),i(this.option,h.scheme),this.option.speed=n(this.option.speed,1,10),this.option.opacity=n(this.option.opacity,0,1),this.option.size=n(this.option.size,12,30),this.option.maxlength=n(this.option.maxlength,10,100),this.option.margin[0]=n(this.option.margin[0],0,100),this.option.margin[1]=n(this.option.margin[1],0,100)}},{key:"init",value:function(){this.layer=this.art.layers.add({name:"danmu",style:{position:"absolute",left:0,top:0,right:0,bottom:0,width:"100%",height:"100%",overflow:"hidden",pointerEvents:"none",opacity:this.option.opacity}})}},{key:"emit",value:function(t){var e=this.art.template.$player;t.$ref=this.getDanmuRef(),t.$ref.innerText=t.text,t.$ref.style.fontSize="".concat(t.size||this.option.size,"px");var n=h.getRect(e,"width"),i=h.getRect(t.$ref,"width");t.$restWidth=n+i+5,t.$restTime=this.option.speed,t.$lastStartTime=Date.now(),t.$ref.style.color=t.color||this.option.color,t.$ref.style.left="".concat(n,"px"),t.$ref.style.top="".concat(this.getDanmuTop(),"px"),t.$ref.style.transform="translateX(".concat(-t.$restWidth,"px) translateY(0px) translateZ(0px)"),t.$ref.style.transition="-webkit-transform ".concat(t.$restTime,"s linear 0s"),t.border&&(t.$ref.style.border="1px solid ".concat(t.border)),t.$state="emit"}},{key:"suspend",value:function(t){var e=this.art.template.$player,n=h.getRect(e),i=n.left,r=n.width,o=h.getRect(t.$ref).left;t.$restTime-=(Date.now()-t.$lastStartTime)/1e3;var a=r-(o-i)+5;t.$ref.style.transform="translateX(".concat(-a,"px) translateY(0px) translateZ(0px)"),t.$ref.style.transition="-webkit-transform 0s linear 0s",t.$state="stop"}},{key:"addToQueue",value:function(t){var e=this.art,n=e.notice,i=e.player;t.text.trim()?t.text.length>this.option.maxlength?n("The length of the danmu does not exceed ".concat(this.option.maxlength)):("number"!=typeof t.time&&(t.time=i.currentTime),this.queue.push(s({},t,{$state:"wait",$ref:null,$restTime:0}))):n("Danmu text cannot be empty")}},{key:"getDanmuRef",value:function(){var t=this.art.template.$player,e=this.art.constructor.utils,n=e.setStyles,i=e.append,r=h.getRect(t,"left"),o=this.queue.find(function(t){if(t.$ref){var e=h.getRect(t.$ref),n=e.left,i=e.width;return"emit"===t.$state&&n+i<r}return!1});if(o)return o.$state="wait",o.$ref.style.transform="translateX(0px) translateY(0px) translateZ(0px)",o.$ref.style.transition="-webkit-transform 0s linear 0s",o.$ref;var a=document.createElement("div");return n(a,{userSelect:"none",position:"absolute",whiteSpace:"pre",pointerEvents:"none",perspective:"500px",display:"inline-block",willChange:"transform",fontFamily:'SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif',fontWeight:"normal",lineHeight:"1.125",textShadow:"rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px"}),i(this.layer.$ref,a),a}},{key:"getDanmuTop",value:function(){var t=this.art.template.$player,e=h.getRect(t),s=e.left,u=e.top,n=e.height,l=e.width,i=this.queue.filter(function(t){return"emit"===t.$state});if(0===i.length)return this.option.margin[0];var r=i.map(function(t){var e=h.getRect(t.$ref),n=e.left,i=e.top,r=e.width,o=e.height,a=n-s;return{top:i-u,left:a,right:l-a-r,height:o,width:r}}).sort(function(t,e){return t.top-e.top});return r.unshift({top:0,left:0,right:0,height:this.option.margin[0],width:l}),r.push({top:n-this.option.margin[1],left:0,right:0,height:this.option.margin[1],width:l}),c(r)}},{key:"update",value:function(){var e=this,n=this.art.player;this.animationFrameTimer=window.requestAnimationFrame(function(){e.layer&&n.playing&&e.queue.filter(function(t){return n.currentTime+.25>=t.time&&t.time>=n.currentTime-.25&&"wait"===t.$state}).forEach(function(t){e.emit(t)}),e.isStop||e.update()})}},{key:"stop",value:function(){var e=this;this.isStop=!0,this.queue.filter(function(t){return"emit"===t.$state}).forEach(function(t){e.suspend(t)}),window.cancelAnimationFrame(this.animationFrameTimer),this.art.emit("artplayerPluginDanmu:stop")}},{key:"start",value:function(){this.isStop=!1,this.queue.filter(function(t){return"stop"===t.$state}).forEach(function(t){h.continue(t)}),this.update(),this.art.emit("artplayerPluginDanmu:start")}},{key:"show",value:function(){this.layer.$ref.style="none",this.art.emit("artplayerPluginDanmu:show")}},{key:"hide",value:function(){this.layer.$ref.style="block",this.art.emit("artplayerPluginDanmu:hide")}}],[{key:"getRect",value:function(t,e){var n=t.getBoundingClientRect();return e?n[e]:n}},{key:"continue",value:function(t){t.$lastStartTime=Date.now(),t.$ref.style.transform="translateX(".concat(-t.$restWidth,"px) translateY(0px) translateZ(0px)"),t.$ref.style.transition="-webkit-transform ".concat(t.$restTime,"s linear 0s"),t.$state="emit"}},{key:"option",get:function(){return{danmus:[],speed:5,opacity:1,color:"#fff",size:25,maxlength:50,margin:[10,20]}}},{key:"scheme",get:function(){return{danmus:"array|function|string",speed:"number",opacity:"number",color:"string",size:"number",maxlength:"number",margin:"array"}}}]),h}();function f(n){return function(t){var e=new h(t,n);return{name:"artplayerPluginDanmu",emit:e.addToQueue.bind(e),config:e.config.bind(e),start:e.start.bind(e),stop:e.stop.bind(e),hide:e.hide.bind(e),show:e.show.bind(e)}}}return f.bilibiliDanmuParseFromXml=e,f.bilibiliDanmuParseFromAv=function(t){var e="https://cors-anywhere.herokuapp.com/";return fetch("".concat(e,"https://api.bilibili.com/x/web-interface/view?aid=").concat(t)).then(function(t){return t.json()}).then(function(t){if(0===t.code&&t.data&&t.data.cid)return o("".concat(e,"https://api.bilibili.com/x/v1/dm/list.so?oid=").concat(t.data.cid));throw new Error("Unable to get data: ".concat(JSON.stringify(t)))})},f.bilibiliDanmuParseFromUrl=o,window.artplayerPluginDanmu=f});