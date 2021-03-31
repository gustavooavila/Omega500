!function i(r,o,s){function a(e,t){if(!o[e]){if(!r[e]){var n="function"==typeof require&&require;if(!t&&n)return n(e,!0);if(c)return c(e,!0);throw(n=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",n}n=o[e]={exports:{}},r[e][0].call(n.exports,function(t){return a(r[e][1][t]||t)},n,n.exports,i,r,o,s)}return o[e].exports}for(var c="function"==typeof require&&require,t=0;t<s.length;t++)a(s[t]);return a}({1:[function(t,e,n){!function(h){!function(){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var o=t("./screens/Screen"),s=t("./gfx/gfx"),a=t("./input/input"),c=t("./utils/Stats"),u=t("./utils/Timer"),l=t("./utils/utils");e.exports=function(){function i(t,e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),this.canvas="body",this.running=!1,this.time=0,this.preset_dt=1/60,this.currentTime=Date.now(),this.accumulator=0,this.screen=new o,this._screenPrev=null,this._fade=function(){return{ratio:0}()},this.dialog=null,this.fps=!0;e=function(t){var e,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:400,i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:225,r=document.querySelector(t);null===r&&(console.error("Canvas DOM container not found:",t),function(t){throw new TypeError('"'+t+'" is read-only')}("selCanvas"),r=document.querySelector("body"));{var o;e="CANVAS"===r.nodeName.toUpperCase()?(o=r.getAttribute("width"),t=r.getAttribute("height"),null===o&&r.setAttribute("width",n),null===t&&r.setAttribute("height",i),r.getContext("2d")):((e=document.createElement("canvas")).setAttribute("width",n),e.setAttribute("height",i),r.appendChild(e),e.getContext("2d"))}e.imageSmoothingEnabled=!1,e.mozImageSmoothingEnabled=!1,e.webkitImageSmoothingEnabled=!1,e||console.error("Could not get 2D context.");return e}(this.canvas,t,e);h.Ω.env.w=e.canvas.width,h.Ω.env.h=e.canvas.height,s.init(e),a.init(e.canvas),h.Ω.evt.onload(function(){n.load(),n.run(Date.now())}),window.addEventListener("load",function(){h.Ω.pageLoad()},!1),this.running=!0,l.now=function(){return n.now()},this.stats=c()}var t,e,n;return t=i,(e=[{key:"reset",value:function(){this.time=0}},{key:"now",value:function(){return 1e3*this.time}},{key:"load",value:function(){}},{key:"run",value:function(){var t,e=this,n=Date.now(),i=Math.min((n-this.currentTime)/1e3,this.preset_dt);if(this.currentTime=n,this.accumulator+=i,this.running){for(t=0;this.accumulator>=this.preset_dt;)t++,this.tick(this.preset_dt),this.accumulator-=this.preset_dt;1<t&&console.log("ran "+t+" ticks"),this.render(s)}window.requestAnimationFrame(function(){e.run(Date.now())})}},{key:"stop",value:function(){}},{key:"tick",value:function(t){this.stats.start(),this.dialog?this.dialog.tick(t):(this.time+=t,this.screen.loaded&&this.screen._tick(),h.Ω.timers.tick()),a.tick(),this.stats.stop()}},{key:"render",value:function(t){var e,n=t.ctx;if(this.screen.loaded){if(this._fade.ratio<=0)this.screen._render(t);else switch(this._fade.type){case"inout":.5<this._fade.ratio?(this.screenPrev._render(t),t.clear(this._fade.color,1-2*(this._fade.ratio-.5))):(this.screen._render(t),t.clear(this._fade.color,2*this._fade.ratio));break;case"out":this.screenPrev._render(t),t.clear(this._fade.color,1-this._fade.ratio);break;default:this.screen._render(t),n.globalAlpha=this._fade.ratio,this.screenPrev._render(t),n.globalAlpha=1}this.dialog&&this.dialog.render(t),this.fps&&(e=this.stats.fps(),t.ctx.fillStyle="rgba(0,0,0,0.3)",t.ctx.fillRect(this.stats.pos[0],this.stats.pos[1],50,20),t.ctx.fillStyle="#fff",t.ctx.font="6pt monospace",t.ctx.fillText(e[0]+" "+e[1]+"/"+e[2],this.stats.pos[0]+5,this.stats.pos[1]+13))}}},{key:"setScreen",value:function(t,e){var n=this;e=e||{},this.screenPrev=this.screen,this.screen=t,this.screenPrev&&(this._fade={ratio:1,type:e.type||"inout",color:e.color||"#000"},u(e.time||20,function(t){n._fade.ratio=1-t},function(){n._fade.ratio=0,n.screenPref=null}))}},{key:"setDialog",value:function(t){this.dialog=t}},{key:"clearDialog",value:function(){this.setDialog(null)}}])&&r(t.prototype,e),n&&r(t,n),i}()}.call(this)}.call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./gfx/gfx":14,"./input/input":18,"./screens/Screen":22,"./utils/Stats":26,"./utils/Timer":27,"./utils/utils":30}],2:[function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var r=t("../utils/utils");e.exports=function(){function o(t,e,n,i,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),this.name=t,this.sheet=e,this.frames=i,this.speed=n,this.cb=r,this.scale=1,this.changed=!1,this.rewound=!1,this.reset()}var t,e,n;return t=o,(e=[{key:"tick",value:function(){var t=r.now()-this.frameTime;this.changed=!1,this.rewound=!1,t>this.speed&&(this.frameTime=r.now()+Math.min(this.speed,t-this.speed),++this.curFrame>this.frames.length-1&&(this.curFrame=0,this.rewound=!0,this.cb&&this.cb()),this.changed=!0)}},{key:"reset",value:function(){this.curFrame=0,this.frameTime=r.now()}},{key:"render",value:function(t,e,n){this.sheet.render(t,this.frames[this.curFrame][0],this.frames[this.curFrame][1],e,n,1,1,this.scale)}}])&&i(t.prototype,e),n&&i(t,n),o}()},{"../utils/utils":30}],3:[function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}e.exports=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.current=null,this.all=null,t.length&&(this.all=t,this.current=t[0])}var t,n,i;return t=e,(n=[{key:"tick",value:function(){this.current.tick()}},{key:"add",value:function(t){this.all||(this.all=[],this.current=t),this.all.push(t)}},{key:"each",value:function(t){this.all.forEach(t)}},{key:"get",value:function(){return this.current.name}},{key:"set",value:function(e){var t=this.all.filter(function(t){return t.name===e});t.length&&(this.current=t[0],this.current.reset())}},{key:"setTo",value:function(t){this.get()!==t&&this.set(t)}},{key:"changed",value:function(){return this.current.changed}},{key:"rewound",value:function(){return this.current.rewound}},{key:"render",value:function(t,e,n){this.current.render(t,e,n)}}])&&r(t.prototype,n),i&&r(t,i),e}()},{}],4:[function(t,e,n){"use strict";var i=t("./Anim"),t=t("./Anims");e.exports={Anim:i,Anims:t}},{"./Anim":2,"./Anims":3}],5:[function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var o=t("../assets/SpriteSheet");e.exports=function(){function r(t,e,n){var i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:" !\"#$%&'()*+,-./0123456789:;<=>?@abcdefghijklmnopqrstuvwxyz[/]^_`abcdefghijklmnopqrstuvwxyz{|}~";!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),this.sheet=new o(t,e,n),this.map=i.split("").map(function(t){return t.charCodeAt(0)}),this.w=e,this.h=n}var t,e,n;return t=r,(e=[{key:"render",value:function(t,e,n,i){if(e){e=e.toString();for(var r=this.sheet.cellW,o=0;o<e.length;o++){var s=e.charCodeAt(o),a=this.map.indexOf(s);32!==s&&-1!==a&&this.sheet.render(t,a%r|0,a/r|0,n+o*this.w,i)}}}}])&&i(t.prototype,e),n&&i(t,n),r}()},{"../assets/SpriteSheet":7}],6:[function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var o=t("../gfx/gfx");e.exports=function(){function i(t,e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),this.w=0,this.h=0,this.path=t,o.loadImage(t,function(t){self.img=t,self.w=t.width*self.scale,self.h=t.height*self.scale},e),this.scale=n||1}var t,e,n;return t=i,(e=[{key:"render",value:function(t,e,n){t.ctx.drawImage(this.img,e,n,this.img.width*this.scale,this.img.height*this.scale)}}])&&r(t.prototype,e),n&&r(t,n),i}()},{"../gfx/gfx":14}],7:[function(t,e,n){"use strict";function o(e,t){var n,i=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,n)),i}function s(i){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach(function(t){var e,n;e=i,t=r[n=t],n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach(function(t){Object.defineProperty(i,t,Object.getOwnPropertyDescriptor(r,t))})}return i}function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var a=t("../gfx/gfx");e.exports=function(){function o(t,e,n){var i=this,r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o);this.w=e,this.h=n||e,this.cellW=0,this.cellH=0,isNaN(r)||(r={flipFlags:r}),r=s(s({},{flipFlags:null,margin:[0,0],padding:[0,0]}),r),this.flipFlags=r.flipFlags,this.margin=r.margin,this.padding=r.padding,"string"!=typeof t?this.populate(t,this.flipFlags):a.loadImage(t,function(t){i.populate(t,self.flipFlags)})}var t,e,n;return t=o,(e=[{key:"populate",value:function(t,e){this.sheet=t,0<=e&&(this.sheet=this.flipImage(t.canvas||t,e)),this.cellW=Math.ceil((t.width-this.margin[0])/(this.w+this.padding[0])),this.cellH=Math.ceil((t.height-this.margin[1])/(this.h+this.padding[1]))}},{key:"flipImage",value:function(t,e){var n,i,r=Ω.gfx.createCanvas(t.width*(1&e?2:1),t.height*(2&e?2:1)),o=t.width/this.w|0,s=t.height/this.h|0;if(r.drawImage(t,0,0),1&e)for(i=0;i<s;i++)for(n=0;n<o;n++)r.save(),r.translate(n*this.w*.5,i*this.h),r.scale(-1,1),this.render({ctx:r},n,i,-(n*this.w)*.5-t.width-this.w,0),r.restore();if(2&e)for(i=0;i<s;i++)for(n=0;n<o;n++)r.save(),r.translate(n*this.w,i*this.h*.5),r.scale(1,-1),this.render({ctx:r},n,i,0,-(i*this.h)*.5-t.height-this.h),r.restore();if(3&e)for(i=0;i<s;i++)for(n=0;n<o;n++)r.save(),r.translate(n*this.w*.5,i*this.h*.5),r.scale(-1,-1),this.render({ctx:r},n,i,-(n*this.w)*.5-t.width-this.w,-(i*this.h)*.5-t.height-this.h),r.restore();return r.canvas}},{key:"render",value:function(t,e,n,i,r){var o=5<arguments.length&&void 0!==arguments[5]?arguments[5]:1,s=6<arguments.length&&void 0!==arguments[6]?arguments[6]:1,a=7<arguments.length&&void 0!==arguments[7]?arguments[7]:1;-1!==e&&t.ctx.drawImage(this.sheet,e*(this.w+this.padding[0])+this.margin[0],n*(this.h+this.padding[1])+this.margin[1],o*this.w,s*this.h,i,r,o*this.w*a,s*this.h*a)}}])&&i(t.prototype,e),n&&i(t,n),o}()},{"../gfx/gfx":14}],8:[function(t,e,n){"use strict";var i=t("./Image"),r=t("./SpriteSheet"),t=t("./BitmapFont");e.exports={Image:i,SpriteSheet:r,BitmapFont:t}},{"./BitmapFont":5,"./Image":6,"./SpriteSheet":7}],9:[function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}e.exports=function(){function r(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:0;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),this.x=t,this.y=e,this.w=n,this.h=i,this.zoom=1,this.debug=!1}var t,e,n;return t=r,(e=[{key:"tick",value:function(){}},{key:"moveTo",value:function(t,e){this.x=t,this.y=e}},{key:"moveBy",value:function(t,e){this.x+=t,this.y+=e}},{key:"renderPre",value:function(t){t=t.ctx;t.save(),t.scale(this.zoom,this.zoom),t.translate(-Math.round(this.x),-Math.round(this.y))}},{key:"renderPost",value:function(t){t=t.ctx;this.debug&&(t.strokeStyle="red",t.strokeRect(this.x,this.y,this.w/this.zoom,this.h/this.zoom)),t.restore()}},{key:"render",value:function(e,t){var n=this,i=!(2<arguments.length&&void 0!==arguments[2])||arguments[2];i&&this.renderPre(e),t.reduce(function(t,e){return Array.isArray(e)?t.concat(e):(t.push(e),t)},[]).filter(function(t){return t.repeat||!(t.x+t.w<n.x||t.y+t.h<n.y||t.x>n.x+n.w/n.zoom||t.y>n.y+n.h/n.zoom)}).forEach(function(t){t.render(e,n)}),i&&this.renderPost(e)}}])&&i(t.prototype,e),n&&i(t,n),r}()},{}],10:[function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,e,n){return(s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){t=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=u(t)););return t}(t,e);if(t){e=Object.getOwnPropertyDescriptor(t,e);return e.get?e.get.call(n):e.value}})(t,e,n||t)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(n){var i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e=u(n);return t=i?(t=u(this).constructor,Reflect.construct(e,arguments,t)):e.apply(this,arguments),e=this,!(t=t)||"object"!==r(t)&&"function"!=typeof t?function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var l=t("./Camera"),h=t("../utils/math");e.exports=function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(o,l);var t,e,n,r=c(o);function o(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,i=3<arguments.length?arguments[3]:void 0;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),(n=r.call(this,0,0,e,n)).xRange=t.w,n.yRange=t.h,n.zoom=1,n.bounds=i,n.track(t),n}return t=o,(e=[{key:"track",value:function(t){this.entity=t,this.x=t.x-this.w/this.zoom/2+t.w/this.zoom/2,this.y=t.y-this.h/this.zoom/2+t.h/this.zoom/2,this.constrainToBounds()}},{key:"constrainToBounds",value:function(){this.x<=0?this.x=0:this.bounds&&this.x+this.w/this.zoom>this.bounds[0]&&(this.x=this.bounds[0]-this.w/this.zoom),this.y<=0?this.y=0:this.bounds&&this.y+this.h/this.zoom>this.bounds[1]&&(this.y=this.bounds[1]-this.h/this.zoom)}},{key:"tick",value:function(){var t=h.center(this,this.zoom),e=this.entity,n=this.xRange,i=this.yRange;e.x<t.x-n&&(this.x=e.x-this.w/this.zoom/2+n),e.x+e.w>t.x+n&&(this.x=e.x+e.w-this.w/this.zoom/2-n),e.y<t.y-i&&(this.y=e.y-this.h/this.zoom/2+i),e.y+e.h>t.y+i&&(this.y=e.y+e.h-this.h/this.zoom/2-i),this.constrainToBounds()}},{key:"debugOutline",value:function(){return{render:function(t,e){var n=h.center(e,e.zoom);t.ctx.strokeStyle="rgba(200, 255, 255, 1)",t.ctx.strokeRect(n.x-e.xRange,n.y-e.yRange,2*e.xRange,2*e.yRange)}}}},{key:"render",value:function(t,e){var n=!(2<arguments.length&&void 0!==arguments[2])||arguments[2];this.debug&&(e=e.concat([this.debugOutline()])),s(u(o.prototype),"render",this).call(this,t,e,n)}}])&&i(t.prototype,e),n&&i(t,n),o}()},{"../utils/math":29,"./Camera":9}],11:[function(t,e,n){"use strict";var i=t("./Camera"),t=t("./TrackingCamera");e.exports={Camera:i,TrackingCamera:t}},{"./Camera":9,"./TrackingCamera":10}],12:[function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}e.exports=function(){function r(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:32,i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:32;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),this.xo=0,this.yo=0,this.gravity=0,this.falling=!1,this.wasFalling=!1,this.remove=!1,this.traits=null,this.bodies=null,this.x=t,this.y=e,this.w=n,this.h=i;i=this.traits||[];this.traits=[],this.mixin(i)}var t,e,n;return t=r,(e=[{key:"tick",value:function(){var e=this;return this.traits=this.traits.filter(function(t){return t.tick.call(e,t)}),!this.remove}},{key:"add",value:function(t,e,n){return this.bodies||(this.bodies=[]),this.bodies.push([t,e,n]),t}},{key:"mixin",value:function(t){t.forEach(function(t){var e;t.trait&&((e=new t.trait).init_trait.apply(this,[e].concat(e.makeArgs(t))),this.traits.push(e))},this)}},{key:"hit",value:function(t){}},{key:"hitBlocks",value:function(t,e){}},{key:"moveBy",value:function(t,e){this.xo=t,this.yo=e}},{key:"move",value:function(t,e,n){var i,r,o,s,a,c=!1,u=!1;return this.falling&&(e+=this.gravity),o=this.x+(i=t),s=this.y+(r=e),a=n.getBlocks([[this.x,s],[this.x,s+(this.h-1)],[this.x+(this.w-1),s],[this.x+(this.w-1),s+(this.h-1)]]),e<0&&(a[0]>n.walkable||a[2]>n.walkable)&&(r=n.getBlockEdge((0|s)+n.sheet.h,"VERT")-this.y,u=!0),0<e&&(a[1]>n.walkable||a[3]>n.walkable)&&(r=n.getBlockEdge(s+this.h,"VERT")-this.y-this.h,u=!0),this.y+=r,s=n.getBlocks([[o,this.y],[o,this.y+(this.h-1)],[o+(this.w-1),this.y],[o+(this.w-1),this.y+(this.h-1)]]),t<0&&(s[0]>n.walkable||s[1]>n.walkable)&&(i=n.getBlockEdge(o+n.sheet.w)-this.x,c=!0),0<t&&(s[2]>n.walkable||s[3]>n.walkable)&&(i=n.getBlockEdge(o+this.w)-this.x-this.w,c=!0),(c||u)&&this.hitBlocks(c?s:null,u?a:null),this.x+=i,a=n.getBlocks([[this.x,this.y+this.h],[this.x+(this.w-1),this.y+this.h]]),this.wasFalling=this.falling,a[0]<=n.walkable&&a[1]<=n.walkable?this.falling=!0:this.falling=!1,this.xo=0,this.yo=0,[i,r]}},{key:"render",value:function(t){t=t.ctx;t.fillStyle="#c00",t.fillRect(this.x,this.y,this.w,this.h)}}])&&i(t.prototype,e),n&&i(t,n),r}()},{}],13:[function(t,e,n){"use strict";t=t("./Entity");e.exports={Entity:t}},{"./Entity":12}],14:[function(t,e,n){!function(u){!function(){"use strict";var c={},s={init:function(t){this.ctx=t,this.canvas=t.canvas,this.w=this.canvas.width,this.h=this.canvas.height},loadImage:function(t,e,n){var i,r,o,s=this,a=c[t+(n?":"+n:"")];a?a._loaded?e&&e(a):(a.addEventListener("load",function(){e&&e(a)},!1),a.addEventListener("load",function(){e&&e(a)},!1)):(i=u.Ω.preload(t),(r=new Image)._loaded=!(o=function(){var t;0<=n&&(t=s.flipImage(r,n)),s._loaded=!0,e&&e(t||r),i()}),r.src=t,r.addEventListener("load",o,!1),r.addEventListener("error",function(){console.error("Error loading image",t),o.call(this)},!1),c[t+(n?":"+n:"")]=r)},drawImage:function(t,e,n,i,r){this.ctx.drawImage(t,e,n,t.width*i?i:1,t.height*r?r:1)},flipImage:function(t,e){var n=this.createCanvas(t.width,t.height);return n.save(),n.translate(1&e?t.width:0,2&e?t.height:0),n.scale(1&e?-1:1,2&e?-1:1),n.drawImage(t,0,0),n.restore(),n.canvas},clear:function(t,e){var n,i=this.ctx;1!==(e=void 0===e?1:e)&&(n=i.globalAlpha,i.globalAlpha=e),i.fillStyle=t,i.fillRect(0,0,this.w,this.h),n&&(i.globalAlpha=n)},createCanvas:function(t,e){var n=document.createElement("canvas"),i=n.getContext("2d");return n.setAttribute("width",t),n.setAttribute("height",e),i.imageSmoothingEnabled=!1,i.mozImageSmoothingEnabled=!1,i.webkitImageSmoothingEnabled=!1,i},text:{drawShadowed:function(t,e,n,i,r){var o=s.ctx;i=i||2,r&&(o.font=r),o.fillStyle="#000",o.fillText(t,e+i,n+i),o.fillStyle="#fff",o.fillText(t,e,n)},getWidth:function(t){return s.ctx.measureText(t).width},getHalfWidth:function(t){return this.getWidth(t)/2},getHeight:function(t){return s.ctx.measureText(t).height},getHalfHeight:function(t){return this.getHeight(t)/2}}};e.exports=s}.call(this)}.call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],15:[function(t,e,n){"use strict";t("./gfx")},{"./gfx":14}],16:[function(y,v,t){!function(p){!function(){"use strict";function e(e,t){var n,i=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,n)),i}function t(i){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?e(Object(r),!0).forEach(function(t){var e,n;e=i,t=r[n=t],n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(r)):e(Object(r)).forEach(function(t){Object.defineProperty(i,t,Object.getOwnPropertyDescriptor(r,t))})}return i}var n=y("./Ω"),i=y("./anim/index"),r=y("./assets/index"),o=y("./entities/index"),s=y("./gfx/index"),a=y("./input/index"),c=y("./screens/index"),u=y("./utils/index"),l=y("./Game"),h=y("./cameras/index"),f=y("./text/index"),d=y("./maps/index"),l=t(t(t(t(t(t(t(t(t(t(t(t({},n),i),r),o),s),a),c),u),h),f),d),{},{Game:l});p.Ω=l,v.exports=l}.call(this)}.call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./Game":1,"./anim/index":4,"./assets/index":8,"./cameras/index":11,"./entities/index":13,"./gfx/index":15,"./input/index":17,"./maps/index":20,"./screens/index":23,"./text/index":25,"./utils/index":28,"./Ω":31}],17:[function(t,e,n){"use strict";t=t("./input");e.exports={input:t}},{"./input":18}],18:[function(t,e,n){"use strict";function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var s,a={},c={x:null,y:null},u={x:null,y:null},l={},h={KEYS:{enter:13,space:32,escape:27,up:38,down:40,left:37,right:39,w:87,a:65,s:83,d:68,az_w:90,az_a:81,az_s:83,az_d:68,mouse1:-1,mouse2:-2,mouse3:-3,wheelUp:-4,wheelDown:-5,touch:-6,touchMove:-7},mouse:c,touch:u,lastKey:null,lastKeyTime:Date.now(),init:function(t,e){var n;function i(t){var e=t.clientX-s.offsetLeft,t=t.clientY-s.offsetTop;c.diff={x:c.x-e,y:c.y-t},c.prev={x:c.x,y:c.y},c.x=e,c.y=t}function r(t){t=Math.max(-1,Math.min(1,t.wheelDelta||-t.detail));-1===t&&f(h.KEYS.wheelUp,!0),1===t&&f(h.KEYS.wheelDown,!0)}function o(t){var e="touchend"===t.type?t.changedTouches?t.changedTouches[0]:t:t.touches?t.touches[0]:t,t=e.clientX-s.offsetLeft,e=e.clientY-s.offsetTop;u.diff={x:u.x-t,y:u.y-e},u.prev={x:u.x,y:u.y},u.x=t,u.y=e}s=t,e=e||Ω.urlParams.icade,n=e?d:f,document.addEventListener("keydown",function(t){n(t.keyCode,!0)},!1),document.addEventListener("keyup",function(t){n(t.keyCode,!1)},!1),document.addEventListener("mousedown",function(t){1===t.which&&(i(t),f(-1,!0))}),document.addEventListener("mousemove",function(t){i(t)}),document.addEventListener("mouseup",function(t){1===t.which&&(i(t),f(-1,!1))}),document.addEventListener("mousewheel",r,!1),document.addEventListener("DOMMouseScroll",r,!1),document.addEventListener("touchstart",function(t){o(t),f(h.KEYS.touch,!0)},!1),document.addEventListener("touchmove",function(t){t.preventDefault(),o(t),f(h.KEYS.touchMove,!0)},!1),document.addEventListener("touchend",function(t){o(t),f(h.KEYS.touch,!1),f(h.KEYS.touchMove,!1)},!1)},reset:function(){for(var t in a)a[t].isDown=!1,a[t].wasDown=!1},tick:function(){for(var t in a)a[t].wasDown=a[t].isDown;a[h.KEYS.wheelUp]&&f(h.KEYS.wheelUp,!1),a[h.KEYS.wheelDown]&&f(h.KEYS.wheelDown,!1)},bind:function(e,t){var n,i=this;if("object"!==o(e))"number"==typeof t||(t=this.KEYS[t])?(a[t]={action:e,isDown:!1,wasDown:!1},l[e]||(l[e]=[]),l[e].push(t)):console.error("Could not bind input: ",t);else for(e in n=e){var r=n[e];Array.isArray(r)?r.forEach(function(t){i.bind(e,t)}):this.bind(e,r)}},pressed:function(t){return this.isDown(t)&&!this.wasDown(t)},released:function(t){return this.wasDown(t)&&!this.isDown(t)},isDown:function(t){return(l[t]||[]).some(function(t){return a[t].isDown})},wasDown:function(t){return(l[t]||[]).some(function(t){return a[t].wasDown})},release:function(t){(l[t]||[]).forEach(function(t){f(t,!1)})}};function f(t,e){a[t]&&(a[t].wasDown=a[t].isDown,a[t].isDown=e),e&&(h.lastKey=t,h.lastKeyTime=Date.now())}function d(t,e){var n=h.KEYS;if(-1<[87,69,88,90,68,67,65,81,89,84].indexOf(t)){if(!e)return;switch(t){case 87:t=n.up,e=!0;break;case 69:t=n.up,e=!1;break;case 88:t=n.down,e=!0;break;case 90:t=n.down,e=!1;break;case 68:t=n.right,e=!0;break;case 67:t=n.right,e=!1;break;case 65:t=n.left,e=!0;break;case 81:t=n.left,e=!1;break;case 89:t=n.space,e=!0;break;case 84:t=n.space,e=!1}}f(t,e)}e.exports=h},{}],19:[function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var o=t("../utils/math");e.exports=function(){function i(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:[[]],n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),this.x=0,this.y=0,this.walkable=0,this.repeat=!1,this.parallax=0,this.sheet=t,this.walkable=n,this.populate(e)}var t,e,n;return t=i,(e=[{key:"tick",value:function(){return!0}},{key:"populate",value:function(t){this.cells=t,this.cellH=this.cells.length,this.cellW=this.cells[0].length,this.h=this.cellH*this.sheet.h,this.w=this.cellW*this.sheet.w}},{key:"render",value:function(t,e){e=e||{x:0,y:0,w:t.w,h:t.h,zoom:1};var n,i,r,o=this.sheet.w,s=this.sheet.h,a=this.sheet.cellW,c=(this.sheet.cellH,(e.x-e.x*this.parallax)/o|0),u=(e.y-e.y*this.parallax)/s|0,l=c+(e.w/e.zoom/o|0)+1,h=u+(e.h/e.zoom/s|0)+1;for(this.parallax&&(t.ctx.save(),t.ctx.translate(e.x*this.parallax|0,e.y*this.parallax|0)),n=u;n<=h;n++)if(!(n<0||!this.repeat&&n>this.cellH-1))for(i=c;i<=l;i++)i<0||!this.repeat&&i>this.cellW-1||0!==(r=this.cells[n%this.cellH][i%this.cellW])&&this.sheet.render(t,(r-1)%a|0,(r-1)/a|0,i*o,n*s);this.parallax&&t.ctx.restore()}},{key:"getBlockCell",value:function(t){var e=t[1]/this.sheet.h|0,t=t[0]/this.sheet.w|0;return(e<0||e>this.cellH-1)&&(e=-1),[t=t<0||t>this.cellW-1?-1:t,e]}},{key:"getCellPixels",value:function(t){var e=t[1]*this.sheet.h;return[t[0]*this.sheet.w,e]}},{key:"getBlock",value:function(t){var e=t[1]/this.sheet.h|0,t=t[0]/this.sheet.w|0;if(!(e<0||e>this.cellH-1))return this.cells[e][t]}},{key:"getBlocks",value:function(t){return t.map(this.getBlock,this)}},{key:"getBlockEdge",value:function(t,e){e=e?this.sheet.h:this.sheet.w;return o.snap(t,e)}},{key:"setBlock",value:function(t,e){var n=t[1]/this.sheet.h|0,t=t[0]/this.sheet.w|0;n<0||n>this.cellH-1||t<0||t>this.cellW-1||(this.cells[n][t]=e)}},{key:"setBlockCell",value:function(t,e){var n=t[1],t=t[0];n<0||n>this.cellH-1||t<0||t>this.cellW-1||(this.cells[n][t]=e)}}])&&r(t.prototype,e),n&&r(t,n),i}()},{"../utils/math":29}],20:[function(t,e,n){"use strict";t=t("./Map");e.exports={Map:t}},{"./Map":19}],21:[function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var o=t("../input/input");e.exports=function(){function n(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.killKey="escape",this.time=0,"function"==typeof t&&(e=t,t=null),t&&(this.killKey=t),this.cb=e}var t,e,i;return t=n,(e=[{key:"tick",value:function(t){this.time+=t,this.killKey&&Ω.input.pressed(this.killKey)&&(o.release(this.killKey),this.done())}},{key:"done",value:function(){window.game.clearDialog(),this.cb&&this.cb()}},{key:"render",value:function(t){var e=t.ctx;e.fillStyle="rgba(0, 0, 0, 0.7)",e.fillRect(.15*t.w,.25*t.h,.7*t.w,.5*t.h)}}])&&r(t.prototype,e),i&&r(t,i),n}()},{"../input/input":18}],22:[function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}e.exports=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.loaded=!0,this.frame=0}var e,n,i;return e=t,(n=[{key:"tick",value:function(){}},{key:"_tick",value:function(){this.frame++,this.tick()}},{key:"clear",value:function(t){t.clear(1<arguments.length&&void 0!==arguments[1]?arguments[1]:"hsl(195, 40%, 40%)")}},{key:"render",value:function(t){var e=t.ctx;e.fillStyle="hsl(0, 0%, 0%)",e.fillRect(0,0,t.w,t.h)}},{key:"_render",value:function(t){this.renderBG&&this.renderBG(t),this.render(t),this.renderFG&&this.renderFG(t)}}])&&r(e.prototype,n),i&&r(e,i),t}()},{}],23:[function(t,e,n){"use strict";var i=t("./Dialog"),t=t("./Screen");e.exports={Dialog:i,Screen:t}},{"./Dialog":21,"./Screen":22}],24:[function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}e.exports=function(){function r(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"",n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:0;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),this.x=n,this.y=i,this.font=t,this.text=e,this.updateSize()}var t,e,n;return t=r,(e=[{key:"setText",value:function(t){this.text="".concat(t),this.updateSize()}},{key:"setFont",value:function(t){this.font=t,this.updateSize()}},{key:"updateSize",value:function(){this.w=this.font.w*this.text.length,this.h=this.font.h}},{key:"render",value:function(t){this.font.render(t,this.text,this.x,this.y)}}])&&i(t.prototype,e),n&&i(t,n),r}()},{}],25:[function(t,e,n){"use strict";t=t("./Text");e.exports={Text:t}},{"./Text":24}],26:[function(t,e,n){"use strict";e.exports=function(){var t=Date.now(),e=t,n=0,i=100,r=0,o=0;return{pos:[Ω.env.w-53,3],start:function(){Date.now()},fps:function(){return[n,i,r]},stop:function(){var t=Date.now();o++,e+1e3<t&&(n=Math.round(1e3*o/(t-e)),i=Math.min(i,n),r=Math.max(r,n),e=t,o=0)}}}},{}],27:[function(t,e,n){!function(o){!function(){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var i=function(){function i(t,e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),o.Ω.timers.add(this),this.time=t,n||(n=e,e=null),this.max=t,this.cb=e,this.done=n}var t,e,n;return t=i,(e=[{key:"tick",value:function(){return--this.time,this.time<0?(this.done&&this.done(),!1):(this.cb&&this.cb(1-this.time/this.max),!0)}}])&&r(t.prototype,e),n&&r(t,n),i}();e.exports=function(t,e,n){return new i(t,e,n)}}.call(this)}.call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],28:[function(t,e,n){"use strict";var i=t("./Timer"),r=t("./Stats"),o=t("./utils"),t=t("./math");e.exports={timer:i,Stats:r,utils:o,math:t}},{"./Stats":26,"./Timer":27,"./math":29,"./utils":30}],29:[function(t,e,n){"use strict";var i=void 0;e.exports={dist:function(t,e){var n=t.x?t.x-e.x:t[0]-e[0],e=t.y?t.y-e.y:t[1]-e[1];return Math.sqrt(n*n+e*e)},distCenter:function(t,e){var n=t.x+t.w/2-(e.x+e.w/2),e=t.y+t.h/2-(e.y+e.h/2);return Math.sqrt(n*n+e*e)},center:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1;return{x:t.x+t.w/e/2,y:t.y+t.h/e/2}},rotate:function(t,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:[0,0];return[Math.cos(t)*(e[0]-n[0])-Math.sin(t)*(e[1]-n[1])+n[0],Math.sin(t)*(e[0]-n[0])+Math.cos(t)*(e[1]-n[1])+n[1]]},degToRad:function(t){return t*Math.PI/180},radToDeg:function(t){return 180*t/Math.PI},angleBetween:function(t,e){var n=t.x-e.x,e=t.y-e.y;return Math.atan2(e,n)},snap:function(t,e){return Math.floor(t/e)*e},snapRound:function(t,e){return(e/2<t-(t/e|0)*e?Math.ceil:Math.floor)(t/e)*e},clamp:function(t,e,n){return Math.max(e,Math.min(n,t))},ratio:function(t,e,n){return i.clamp((n-t)/(e-t),0,1)},lerp:function(t,e,n){return n*i.ratio(t,e,n)},lerpPerc:function(t,e,n){return(e-t)*n+t},smoothstep:function(t,e,n){e=i.ratio(t,e,n);return n*(e*e*e*(e*(6*e-15)+10))},ease:{linear:function(t,e,n){return(e-t)*n+t},inOutQuad:function(t,e,n){return t+(e-t)/2*(n<.5?2*n*n:-2*n*(n-2)-1)},bounce:function(t,e,n){var i=n*n,r=i*n;return t+(e-t)*(33*r*i+-106*i*i+126*r+-67*i+15*n)}}}},{}],30:[function(t,e,n){"use strict";e.exports={rand:function(t,e){return t=t||1,e=e||0,Math.floor(Math.random()*(t-e))+e},oneIn:function(t){return 1===this.rand(t)},rnd:{seed:42,rand:function(t,e){return t=t||1,e=e||0,this.seed=(9301*this.seed+49297)%233280,this.seed/233280*(t-e)+e|0}},now:function(){return Date.now()},since:function(t){return this.now()-t},toggle:function(t,e,n){return(this.now()+(n||0))/t%e>>0},neighbours:function(t,e,n){for(var i,r=-t;r<=t;r++)for(i=-t;i<=t;i++)n&&Math.abs(i)!==t&&Math.abs(r)!==t||e&&e(i,r)},constrain:function(t,e,n){var i=t[0],t=t[1];return i<0&&(i=n?e.w:0),t<0&&(t=n?e.h:0),[i=i>e.w?n?0:e.w:i,t=t>e.h?n?0:e.h:t]},formatTime:function(t){var e=~~((t/=1e3)/60),t=~~(t-60*e);return(e=1===e.toString().length?""+e:e)+":"+(t=1===t.toString().length?"0"+t:t)},formatScore:function(t,e){return(t+Math.pow(10,e)+"").slice(1)},loadScripts:function(i,r){var o=0;i.forEach(function(t){var e=document.createElement("script"),n=window.env.desktop?"?"+(new Date).getTime():"";e.src="scripts/"+t+".js"+n,e.onload=function(){o++==i.length-1&&r&&r()},document.body.appendChild(e)})},getByKeyValue:function(t,e,n){return this.getAllByKeyValue(t,e,n)[0]},getAllByKeyValue:function(t,e,n){return t.filter(function(t){if(t[e]&&t[e]===n)return!0})},ajax:function(t,e){var n=new XMLHttpRequest;n.addEventListener("readystatechange",function(){this.readyState<4||4==n.readyState&&e(n)},!1),n.open("GET",t,!0),n.send("")},fullscreen:{toggle:function(t){document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement?this.cancel():this.request(t)},request:function(t){(t="string"==typeof t?document.querySelector(t):t).requestFullscreen?t.requestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.webkitRequestFullscreen&&t.webkitRequestFullscreen()},cancel:function(){document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen&&document.webkitCancelFullScreen()}}}},{}],31:[function(t,e,n){"use strict";var i=!0,r=!1,o=0,s=0,a=[],c={evt:{onloads:[],progress:[],onload:function(t){r?t():this.onloads.push(t)}},env:{x:0,y:0,w:0,h:0},preload:function(t){var e=this;return i?(s=Math.max(++o,s),function(){--o,e.evt.progress.map(function(t){return t(o,s)}),0===o&&r&&(i||console.error("Preloading finished (onload called) multiple times!"),i=!1,e.evt.onloads.map(function(t){t()}))}):function(){console.log("preloading finished!",t)}},pageLoad:function(){r=!0,0!==s&&0!==o||(i=!1,this.evt.onloads.map(function(t){t()}))},timers:{add:function(t){a.push(t)},tick:function(){a=a.filter(function(t){return t.tick()})}},urlParams:function(){if(!window.location&&!window.location.search)return{};for(var t,e={},n=/\+/g,i=/([^&=]+)=?([^&]*)/g,r=function(t){return decodeURIComponent(t.replace(n," "))},o=window.location.search.substring(1);t=i.exec(o);)e[r(t[1])]=r(t[2]);return e}()};e.exports=c},{}]},{},[16]);
//# sourceMappingURL=omega500.js.map