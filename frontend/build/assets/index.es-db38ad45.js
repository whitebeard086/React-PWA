import{cl as i,r as v}from"./index-3595f095.js";function b(n,r){if(!(n instanceof r))throw new TypeError("Cannot call a class as a function")}function P(n,r){for(var o=0;o<r.length;o++){var e=r[o];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}function O(n,r,o){return r&&P(n.prototype,r),o&&P(n,o),n}function w(n,r){if(typeof r!="function"&&r!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(r&&r.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),r&&S(n,r)}function T(n){return T=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)},T(n)}function S(n,r){return S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},S(n,r)}function I(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function R(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function z(n,r){return r&&(typeof r=="object"||typeof r=="function")?r:R(n)}function _(n){var r=I();return function(){var e=T(n),t;if(r){var s=T(this).constructor;t=Reflect.construct(e,arguments,s)}else t=e.apply(this,arguments);return z(this,t)}}function $(n){return x(n)||H(n)||N(n)||U()}function x(n){if(Array.isArray(n))return D(n)}function H(n){if(typeof Symbol<"u"&&Symbol.iterator in Object(n))return Array.from(n)}function N(n,r){if(n){if(typeof n=="string")return D(n,r);var o=Object.prototype.toString.call(n).slice(8,-1);if(o==="Object"&&n.constructor&&(o=n.constructor.name),o==="Map"||o==="Set")return Array.from(n);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return D(n,r)}}function D(n,r){(r==null||r>n.length)&&(r=n.length);for(var o=0,e=new Array(r);o<r;o++)e[o]=n[o];return e}function U(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function y(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2,o=String(n);if(r===0)return o;var e=o.match(/(.*?)([0-9]+)(.*)/),t=e?e[1]:"",s=e?e[3]:"",a=e?e[2]:o,u=a.length>=r?a:($(Array(r)).map(function(){return"0"}).join("")+a).slice(r*-1);return"".concat(t).concat(u).concat(s)}var C={daysInHours:!1,zeroPadTime:2};function L(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},o=r.now,e=o===void 0?Date.now:o,t=r.precision,s=t===void 0?0:t,a=r.controlled,u=r.offsetTime,c=u===void 0?0:u,p=r.overtime,l;typeof n=="string"?l=new Date(n).getTime():n instanceof Date?l=n.getTime():l=n,a||(l+=c);var f=a?l:l-e(),m=Math.min(20,Math.max(0,s)),h=Math.round(parseFloat(((p?f:Math.max(0,f))/1e3).toFixed(m))*1e3),d=Math.abs(h)/1e3;return{total:h,days:Math.floor(d/(3600*24)),hours:Math.floor(d/3600%24),minutes:Math.floor(d/60%60),seconds:Math.floor(d%60),milliseconds:Number((d%1*1e3).toFixed()),completed:h<=0}}function W(n,r){var o=n.days,e=n.hours,t=n.minutes,s=n.seconds,a=Object.assign(Object.assign({},C),r),u=a.daysInHours,c=a.zeroPadTime,p=a.zeroPadDays,l=p===void 0?c:p,f=Math.min(2,c),m=u?y(e+o*24,c):y(e,f);return{days:u?"":y(o,l),hours:m,minutes:y(t,f),seconds:y(s,f)}}var M=function(n){w(o,n);var r=_(o);function o(){var e;return b(this,o),e=r.apply(this,arguments),e.state={count:e.props.count||3},e.startCountdown=function(){e.interval=window.setInterval(function(){var t=e.state.count-1;t===0?(e.stopCountdown(),e.props.onComplete&&e.props.onComplete()):e.setState(function(s){return{count:s.count-1}})},1e3)},e.stopCountdown=function(){clearInterval(e.interval)},e.addTime=function(t){e.stopCountdown(),e.setState(function(s){return{count:s.count+t}},e.startCountdown)},e}return O(o,[{key:"componentDidMount",value:function(){this.startCountdown()}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){return this.props.children?v.cloneElement(this.props.children,{count:this.state.count}):null}}]),o}(v.Component);M.propTypes={count:i.number,children:i.element,onComplete:i.func};var E=function(n){w(o,n);var r=_(o);function o(e){var t;if(b(this,o),t=r.call(this,e),t.mounted=!1,t.initialTimestamp=t.calcOffsetStartTimestamp(),t.offsetStartTimestamp=t.props.autoStart?0:t.initialTimestamp,t.offsetTime=0,t.legacyMode=!1,t.legacyCountdownRef=v.createRef(),t.tick=function(){var a=t.calcTimeDelta(),u=a.completed&&!t.props.overtime?void 0:t.props.onTick;t.setTimeDeltaState(a,void 0,u)},t.start=function(){if(!t.isStarted()){var a=t.offsetStartTimestamp;t.offsetStartTimestamp=0,t.offsetTime+=a?t.calcOffsetStartTimestamp()-a:0;var u=t.calcTimeDelta();t.setTimeDeltaState(u,"STARTED",t.props.onStart),!t.props.controlled&&(!u.completed||t.props.overtime)&&(t.clearTimer(),t.interval=window.setInterval(t.tick,t.props.intervalDelay))}},t.pause=function(){t.isPaused()||(t.clearTimer(),t.offsetStartTimestamp=t.calcOffsetStartTimestamp(),t.setTimeDeltaState(t.state.timeDelta,"PAUSED",t.props.onPause))},t.stop=function(){t.isStopped()||(t.clearTimer(),t.offsetStartTimestamp=t.calcOffsetStartTimestamp(),t.offsetTime=t.offsetStartTimestamp-t.initialTimestamp,t.setTimeDeltaState(t.calcTimeDelta(),"STOPPED",t.props.onStop))},t.isStarted=function(){return t.isStatus("STARTED")},t.isPaused=function(){return t.isStatus("PAUSED")},t.isStopped=function(){return t.isStatus("STOPPED")},t.isCompleted=function(){return t.isStatus("COMPLETED")},e.date){var s=t.calcTimeDelta();t.state={timeDelta:s,status:s.completed?"COMPLETED":"STOPPED"}}else t.legacyMode=!0;return t}return O(o,[{key:"componentDidMount",value:function(){this.legacyMode||(this.mounted=!0,this.props.onMount&&this.props.onMount(this.calcTimeDelta()),this.props.autoStart&&this.start())}},{key:"componentDidUpdate",value:function(t){this.legacyMode||this.props.date!==t.date&&(this.initialTimestamp=this.calcOffsetStartTimestamp(),this.offsetStartTimestamp=this.initialTimestamp,this.offsetTime=0,this.setTimeDeltaState(this.calcTimeDelta()))}},{key:"componentWillUnmount",value:function(){this.legacyMode||(this.mounted=!1,this.clearTimer())}},{key:"calcTimeDelta",value:function(){var t=this.props,s=t.date,a=t.now,u=t.precision,c=t.controlled,p=t.overtime;return L(s,{now:a,precision:u,controlled:c,offsetTime:this.offsetTime,overtime:p})}},{key:"calcOffsetStartTimestamp",value:function(){return Date.now()}},{key:"addTime",value:function(t){this.legacyCountdownRef.current.addTime(t)}},{key:"clearTimer",value:function(){window.clearInterval(this.interval)}},{key:"isStatus",value:function(t){return this.state.status===t}},{key:"setTimeDeltaState",value:function(t,s,a){var u=this;if(this.mounted){var c=t.completed&&!this.state.timeDelta.completed,p=t.completed&&s==="STARTED";c&&!this.props.overtime&&this.clearTimer();var l=function(){a&&a(u.state.timeDelta),u.props.onComplete&&(c||p)&&u.props.onComplete(t,p)};return this.setState(function(f){var m=s||f.status;return t.completed&&!u.props.overtime?m="COMPLETED":!s&&m==="COMPLETED"&&(m="STOPPED"),{timeDelta:t,status:m}},l)}}},{key:"getApi",value:function(){return this.api=this.api||{start:this.start,pause:this.pause,stop:this.stop,isStarted:this.isStarted,isPaused:this.isPaused,isStopped:this.isStopped,isCompleted:this.isCompleted}}},{key:"getRenderProps",value:function(){var t=this.props,s=t.daysInHours,a=t.zeroPadTime,u=t.zeroPadDays,c=this.state.timeDelta;return Object.assign(Object.assign({},c),{api:this.getApi(),props:this.props,formatted:W(c,{daysInHours:s,zeroPadTime:a,zeroPadDays:u})})}},{key:"render",value:function(){if(this.legacyMode){var t=this.props,s=t.count,a=t.children,u=t.onComplete;return v.createElement(M,{ref:this.legacyCountdownRef,count:s,onComplete:u},a)}var c=this.props,p=c.className,l=c.overtime,f=c.children,m=c.renderer,h=this.getRenderProps();if(m)return m(h);if(f&&this.state.timeDelta.completed&&!l)return v.cloneElement(f,{countdown:h});var d=h.formatted,g=d.days,k=d.hours,j=d.minutes,A=d.seconds;return v.createElement("span",{className:p},h.total<0?"-":"",g,g?":":"",k,":",j,":",A)}}]),o}(v.Component);E.defaultProps=Object.assign(Object.assign({},C),{controlled:!1,intervalDelay:1e3,precision:0,autoStart:!0});E.propTypes={date:i.oneOfType([i.instanceOf(Date),i.string,i.number]),daysInHours:i.bool,zeroPadTime:i.number,zeroPadDays:i.number,controlled:i.bool,intervalDelay:i.number,precision:i.number,autoStart:i.bool,overtime:i.bool,className:i.string,children:i.element,renderer:i.func,now:i.func,onMount:i.func,onStart:i.func,onPause:i.func,onStop:i.func,onTick:i.func,onComplete:i.func};export{E as C};
