import{r as Y,a8 as ve,a9 as me,aP as ce,dx as xe,b as ie,u as Ce,d as ee,dy as ye,dz as Pe,j as o,bl as Ne,dA as ke,dB as Le,dC as je,aV as Ee,d1 as ue,dD as de,bf as Oe,dE as we,w as Re,z as ge,dF as Ae,dG as Se,dH as Be,dI as pe,dJ as Te,ca as _e,a1 as De,a2 as Ie,dK as He,G as Me,dL as qe,L as Je,dM as ze}from"./index-d4dc8e82.js";var fe={exports:{}};(function(P,_){(function(E,B){P.exports=B(Y)})(ve,E=>(()=>{var B={703:(l,d,y)=>{var a=y(414);function D(){}function I(){}I.resetWarningCache=D,l.exports=function(){function m(ae,A,W,K,f,U){if(U!==a){var te=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw te.name="Invariant Violation",te}}function N(){return m}m.isRequired=m;var H={array:m,bigint:m,bool:m,func:m,number:m,object:m,string:m,symbol:m,any:m,arrayOf:N,element:m,elementType:m,instanceOf:N,node:m,objectOf:N,oneOf:N,oneOfType:N,shape:N,exact:N,checkPropTypes:I,resetWarningCache:D};return H.PropTypes=H,H}},697:(l,d,y)=>{l.exports=y(703)()},414:l=>{l.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},98:l=>{l.exports=E}},X={};function v(l){var d=X[l];if(d!==void 0)return d.exports;var y=X[l]={exports:{}};return B[l](y,y.exports,v),y.exports}v.n=l=>{var d=l&&l.__esModule?()=>l.default:()=>l;return v.d(d,{a:d}),d},v.d=(l,d)=>{for(var y in d)v.o(d,y)&&!v.o(l,y)&&Object.defineProperty(l,y,{enumerable:!0,get:d[y]})},v.o=(l,d)=>Object.prototype.hasOwnProperty.call(l,d),v.r=l=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(l,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(l,"__esModule",{value:!0})};var C={};return(()=>{v.r(C),v.d(C,{default:()=>be});var l=v(98),d=v.n(l),y=v(697),a=v.n(y);function D(){return D=Object.assign?Object.assign.bind():function(n){for(var s=1;s<arguments.length;s++){var c=arguments[s];for(var p in c)Object.prototype.hasOwnProperty.call(c,p)&&(n[p]=c[p])}return n},D.apply(this,arguments)}var I=function(n){var s=n.pageClassName,c=n.pageLinkClassName,p=n.page,V=n.selected,$=n.activeClassName,S=n.activeLinkClassName,t=n.getEventListener,e=n.pageSelectedHandler,g=n.href,r=n.extraAriaContext,i=n.pageLabelBuilder,u=n.rel,h=n.ariaLabel||"Page "+p+(r?" "+r:""),k=null;return V&&(k="page",h=n.ariaLabel||"Page "+p+" is your current page",s=s!==void 0?s+" "+$:$,c!==void 0?S!==void 0&&(c=c+" "+S):c=S),d().createElement("li",{className:s},d().createElement("a",D({rel:u,role:g?void 0:"button",className:c,href:g,tabIndex:V?"-1":"0","aria-label":h,"aria-current":k,onKeyPress:e},t(e)),i(p)))};I.propTypes={pageSelectedHandler:a().func.isRequired,selected:a().bool.isRequired,pageClassName:a().string,pageLinkClassName:a().string,activeClassName:a().string,activeLinkClassName:a().string,extraAriaContext:a().string,href:a().string,ariaLabel:a().string,page:a().number.isRequired,getEventListener:a().func.isRequired,pageLabelBuilder:a().func.isRequired,rel:a().string};const m=I;function N(){return N=Object.assign?Object.assign.bind():function(n){for(var s=1;s<arguments.length;s++){var c=arguments[s];for(var p in c)Object.prototype.hasOwnProperty.call(c,p)&&(n[p]=c[p])}return n},N.apply(this,arguments)}var H=function(n){var s=n.breakLabel,c=n.breakAriaLabel,p=n.breakClassName,V=n.breakLinkClassName,$=n.breakHandler,S=n.getEventListener,t=p||"break";return d().createElement("li",{className:t},d().createElement("a",N({className:V,role:"button",tabIndex:"0","aria-label":c,onKeyPress:$},S($)),s))};H.propTypes={breakLabel:a().oneOfType([a().string,a().node]),breakAriaLabel:a().string,breakClassName:a().string,breakLinkClassName:a().string,breakHandler:a().func.isRequired,getEventListener:a().func.isRequired};const ae=H;function A(n){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return n??s}function W(n){return W=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},W(n)}function K(){return K=Object.assign?Object.assign.bind():function(n){for(var s=1;s<arguments.length;s++){var c=arguments[s];for(var p in c)Object.prototype.hasOwnProperty.call(c,p)&&(n[p]=c[p])}return n},K.apply(this,arguments)}function f(n,s){for(var c=0;c<s.length;c++){var p=s[c];p.enumerable=p.enumerable||!1,p.configurable=!0,"value"in p&&(p.writable=!0),Object.defineProperty(n,p.key,p)}}function U(n,s){return U=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(c,p){return c.__proto__=p,c},U(n,s)}function te(n,s){if(s&&(W(s)==="object"||typeof s=="function"))return s;if(s!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return O(n)}function O(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function ne(n){return ne=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(s){return s.__proto__||Object.getPrototypeOf(s)},ne(n)}function L(n,s,c){return s in n?Object.defineProperty(n,s,{value:c,enumerable:!0,configurable:!0,writable:!0}):n[s]=c,n}var oe=function(n){(function(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&U(t,e)})(S,n);var s,c,p,V,$=(p=S,V=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var t,e=ne(p);if(V){var g=ne(this).constructor;t=Reflect.construct(e,arguments,g)}else t=e.apply(this,arguments);return te(this,t)});function S(t){var e,g;return function(r,i){if(!(r instanceof i))throw new TypeError("Cannot call a class as a function")}(this,S),L(O(e=$.call(this,t)),"handlePreviousPage",function(r){var i=e.state.selected;e.handleClick(r,null,i>0?i-1:void 0,{isPrevious:!0})}),L(O(e),"handleNextPage",function(r){var i=e.state.selected,u=e.props.pageCount;e.handleClick(r,null,i<u-1?i+1:void 0,{isNext:!0})}),L(O(e),"handlePageSelected",function(r,i){if(e.state.selected===r)return e.callActiveCallback(r),void e.handleClick(i,null,void 0,{isActive:!0});e.handleClick(i,null,r)}),L(O(e),"handlePageChange",function(r){e.state.selected!==r&&(e.setState({selected:r}),e.callCallback(r))}),L(O(e),"getEventListener",function(r){return L({},e.props.eventListener,r)}),L(O(e),"handleClick",function(r,i,u){var h=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},k=h.isPrevious,T=k!==void 0&&k,Z=h.isNext,Q=Z!==void 0&&Z,G=h.isBreak,w=G!==void 0&&G,M=h.isActive,q=M!==void 0&&M;r.preventDefault?r.preventDefault():r.returnValue=!1;var J=e.state.selected,b=e.props.onClick,R=u;if(b){var j=b({index:i,selected:J,nextSelectedPage:u,event:r,isPrevious:T,isNext:Q,isBreak:w,isActive:q});if(j===!1)return;Number.isInteger(j)&&(R=j)}R!==void 0&&e.handlePageChange(R)}),L(O(e),"handleBreakClick",function(r,i){var u=e.state.selected;e.handleClick(i,r,u<r?e.getForwardJump():e.getBackwardJump(),{isBreak:!0})}),L(O(e),"callCallback",function(r){e.props.onPageChange!==void 0&&typeof e.props.onPageChange=="function"&&e.props.onPageChange({selected:r})}),L(O(e),"callActiveCallback",function(r){e.props.onPageActive!==void 0&&typeof e.props.onPageActive=="function"&&e.props.onPageActive({selected:r})}),L(O(e),"getElementPageRel",function(r){var i=e.state.selected,u=e.props,h=u.nextPageRel,k=u.prevPageRel,T=u.selectedPageRel;return i-1===r?k:i===r?T:i+1===r?h:void 0}),L(O(e),"pagination",function(){var r=[],i=e.props,u=i.pageRangeDisplayed,h=i.pageCount,k=i.marginPagesDisplayed,T=i.breakLabel,Z=i.breakClassName,Q=i.breakLinkClassName,G=i.breakAriaLabels,w=e.state.selected;if(h<=u)for(var M=0;M<h;M++)r.push(e.getPageElement(M));else{var q=u/2,J=u-q;w>h-u/2?q=u-(J=h-w):w<u/2&&(J=u-(q=w));var b,R,j=function(z){return e.getPageElement(z)},x=[];for(b=0;b<h;b++){var re=b+1;if(re<=k)x.push({type:"page",index:b,display:j(b)});else if(re>h-k)x.push({type:"page",index:b,display:j(b)});else if(b>=w-q&&b<=w+(w===0&&u>1?J-1:J))x.push({type:"page",index:b,display:j(b)});else if(T&&x.length>0&&x[x.length-1].display!==R&&(u>0||k>0)){var le=b<w?G.backward:G.forward;R=d().createElement(ae,{key:b,breakAriaLabel:le,breakLabel:T,breakClassName:Z,breakLinkClassName:Q,breakHandler:e.handleBreakClick.bind(null,b),getEventListener:e.getEventListener}),x.push({type:"break",index:b,display:R})}}x.forEach(function(z,F){var se=z;z.type==="break"&&x[F-1]&&x[F-1].type==="page"&&x[F+1]&&x[F+1].type==="page"&&x[F+1].index-x[F-1].index<=2&&(se={type:"page",index:z.index,display:j(z.index)}),r.push(se.display)})}return r}),t.initialPage!==void 0&&t.forcePage!==void 0&&console.warn("(react-paginate): Both initialPage (".concat(t.initialPage,") and forcePage (").concat(t.forcePage,") props are provided, which is discouraged.")+` Use exclusively forcePage prop for a controlled component.
See https://reactjs.org/docs/forms.html#controlled-components`),g=t.initialPage?t.initialPage:t.forcePage?t.forcePage:0,e.state={selected:g},e}return s=S,(c=[{key:"componentDidMount",value:function(){var t=this.props,e=t.initialPage,g=t.disableInitialCallback,r=t.extraAriaContext,i=t.pageCount,u=t.forcePage;e===void 0||g||this.callCallback(e),r&&console.warn("DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead."),Number.isInteger(i)||console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(i,"). Did you forget a Math.ceil()?")),e!==void 0&&e>i-1&&console.warn("(react-paginate): The initialPage prop provided is greater than the maximum page index from pageCount prop (".concat(e," > ").concat(i-1,").")),u!==void 0&&u>i-1&&console.warn("(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (".concat(u," > ").concat(i-1,")."))}},{key:"componentDidUpdate",value:function(t){this.props.forcePage!==void 0&&this.props.forcePage!==t.forcePage&&(this.props.forcePage>this.props.pageCount-1&&console.warn("(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (".concat(this.props.forcePage," > ").concat(this.props.pageCount-1,").")),this.setState({selected:this.props.forcePage})),Number.isInteger(t.pageCount)&&!Number.isInteger(this.props.pageCount)&&console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(this.props.pageCount,"). Did you forget a Math.ceil()?"))}},{key:"getForwardJump",value:function(){var t=this.state.selected,e=this.props,g=e.pageCount,r=t+e.pageRangeDisplayed;return r>=g?g-1:r}},{key:"getBackwardJump",value:function(){var t=this.state.selected-this.props.pageRangeDisplayed;return t<0?0:t}},{key:"getElementHref",value:function(t){var e=this.props,g=e.hrefBuilder,r=e.pageCount,i=e.hrefAllControls;if(g)return i||t>=0&&t<r?g(t+1,r,this.state.selected):void 0}},{key:"ariaLabelBuilder",value:function(t){var e=t===this.state.selected;if(this.props.ariaLabelBuilder&&t>=0&&t<this.props.pageCount){var g=this.props.ariaLabelBuilder(t+1,e);return this.props.extraAriaContext&&!e&&(g=g+" "+this.props.extraAriaContext),g}}},{key:"getPageElement",value:function(t){var e=this.state.selected,g=this.props,r=g.pageClassName,i=g.pageLinkClassName,u=g.activeClassName,h=g.activeLinkClassName,k=g.extraAriaContext,T=g.pageLabelBuilder;return d().createElement(m,{key:t,pageSelectedHandler:this.handlePageSelected.bind(null,t),selected:e===t,rel:this.getElementPageRel(t),pageClassName:r,pageLinkClassName:i,activeClassName:u,activeLinkClassName:h,extraAriaContext:k,href:this.getElementHref(t),ariaLabel:this.ariaLabelBuilder(t),page:t+1,pageLabelBuilder:T,getEventListener:this.getEventListener})}},{key:"render",value:function(){var t=this.props.renderOnZeroPageCount;if(this.props.pageCount===0&&t!==void 0)return t&&t(this.props);var e=this.props,g=e.disabledClassName,r=e.disabledLinkClassName,i=e.pageCount,u=e.className,h=e.containerClassName,k=e.previousLabel,T=e.previousClassName,Z=e.previousLinkClassName,Q=e.previousAriaLabel,G=e.prevRel,w=e.nextLabel,M=e.nextClassName,q=e.nextLinkClassName,J=e.nextAriaLabel,b=e.nextRel,R=this.state.selected,j=R===0,x=R===i-1,re="".concat(A(T)).concat(j?" ".concat(A(g)):""),le="".concat(A(M)).concat(x?" ".concat(A(g)):""),z="".concat(A(Z)).concat(j?" ".concat(A(r)):""),F="".concat(A(q)).concat(x?" ".concat(A(r)):""),se=j?"true":"false",he=x?"true":"false";return d().createElement("ul",{className:u||h,role:"navigation","aria-label":"Pagination"},d().createElement("li",{className:re},d().createElement("a",K({className:z,href:this.getElementHref(R-1),tabIndex:j?"-1":"0",role:"button",onKeyPress:this.handlePreviousPage,"aria-disabled":se,"aria-label":Q,rel:G},this.getEventListener(this.handlePreviousPage)),k)),this.pagination(),d().createElement("li",{className:le},d().createElement("a",K({className:F,href:this.getElementHref(R+1),tabIndex:x?"-1":"0",role:"button",onKeyPress:this.handleNextPage,"aria-disabled":he,"aria-label":J,rel:b},this.getEventListener(this.handleNextPage)),w)))}}])&&f(s.prototype,c),Object.defineProperty(s,"prototype",{writable:!1}),S}(l.Component);L(oe,"propTypes",{pageCount:a().number.isRequired,pageRangeDisplayed:a().number,marginPagesDisplayed:a().number,previousLabel:a().node,previousAriaLabel:a().string,prevPageRel:a().string,prevRel:a().string,nextLabel:a().node,nextAriaLabel:a().string,nextPageRel:a().string,nextRel:a().string,breakLabel:a().oneOfType([a().string,a().node]),breakAriaLabels:a().shape({forward:a().string,backward:a().string}),hrefBuilder:a().func,hrefAllControls:a().bool,onPageChange:a().func,onPageActive:a().func,onClick:a().func,initialPage:a().number,forcePage:a().number,disableInitialCallback:a().bool,containerClassName:a().string,className:a().string,pageClassName:a().string,pageLinkClassName:a().string,pageLabelBuilder:a().func,activeClassName:a().string,activeLinkClassName:a().string,previousClassName:a().string,nextClassName:a().string,previousLinkClassName:a().string,nextLinkClassName:a().string,disabledClassName:a().string,disabledLinkClassName:a().string,breakClassName:a().string,breakLinkClassName:a().string,extraAriaContext:a().string,ariaLabelBuilder:a().func,eventListener:a().string,renderOnZeroPageCount:a().func,selectedPageRel:a().string}),L(oe,"defaultProps",{pageRangeDisplayed:2,marginPagesDisplayed:3,activeClassName:"selected",previousLabel:"Previous",previousClassName:"previous",previousAriaLabel:"Previous page",prevPageRel:"prev",prevRel:"prev",nextLabel:"Next",nextClassName:"next",nextAriaLabel:"Next page",nextPageRel:"next",nextRel:"next",breakLabel:"...",breakAriaLabels:{forward:"Jump forward",backward:"Jump backward"},disabledClassName:"disabled",disableInitialCallback:!1,pageLabelBuilder:function(n){return n},eventListener:"onClick",renderOnZeroPageCount:void 0,selectedPageRel:"canonical",hrefAllControls:!1});const be=oe})(),C})())})(fe);var Fe=fe.exports;const Ke=me(Fe);ce.extend(xe);const Ue=()=>{const P=ie();Ce();const[_,E]=Y.useState(0),[B,X]=Y.useState(10),{notification:v,notifications:C,reading:l,readStatus:d,readingAll:y,clearing:a}=ee(f=>f.notifications.data),{selected:D}=ee(f=>f.notifications.state),I=_*B,m=Math.ceil((C==null?void 0:C.length)/B),N=C==null?void 0:C.slice(I,I+B),H=({selected:f})=>{E(f)},ae="pagination custom-pagination",A="custom-pagination-active text-white bg-gray-900 hover:bg-black",W="hover:bg-black rounded-md",K=Y.useCallback(f=>{P(ye(f)),P(Pe({id:f}))},[P]);return o.jsx("div",{className:"bg-white",children:(C==null?void 0:C.length)<1?o.jsxs("div",{className:"text-center min-h-[40vh] flex flex-col items-center justify-center",children:[o.jsx("h2",{className:"font-semibold text-lg",children:"No notifications!"}),o.jsx("p",{className:"mt-1 text-base",children:"Please check again later"})]}):o.jsxs("div",{className:"relative",children:[o.jsx(Ne,{children:N==null?void 0:N.map((f,U)=>o.jsx("div",{className:"relative",children:o.jsxs("div",{className:`relative flex px-4 py-4 cursor-pointer bg-white hover:bg-gray-50 active:bg-gray-100  ${ke(N,U)?"":"border-b border-gray-200"}`,onClick:()=>K(f.id),children:[o.jsx("div",{children:o.jsx(Le,{item:f})}),o.jsxs("div",{className:"ml-3",children:[o.jsx(je,{item:f}),o.jsx("span",{className:"text-xs block",children:ce().to(ce(f==null?void 0:f.created_at))})]}),o.jsx(Ee,{className:"absolute top-4 right-4 mt-1.5",innerClass:`${f!=null&&f.is_read?"bg-gray-300":"bg-primary-500"} `}),(f==null?void 0:f.id)===D&&l&&o.jsx("div",{className:"absolute top-0 w-full h-full grid place-content-center",children:o.jsx(ue,{size:30,indicator:de})})]})},f.id))}),o.jsx("div",{className:"mt-4",children:(C==null?void 0:C.length)>B&&o.jsx(o.Fragment,{children:o.jsx(Ke,{previousLabel:o.jsx(Oe,{className:"text-xl"}),nextLabel:o.jsx(we,{className:"text-xl"}),pageCount:m,onPageChange:H,containerClassName:ae,activeClassName:A,activeLinkClassName:W})})}),(y||a)&&o.jsx("div",{className:"absolute top-0 w-full h-[50vh] grid place-content-center",children:o.jsx(ue,{size:30,indicator:de})})]})})},Ve=()=>{const P=ie(),_=()=>{P(Be())},E=()=>{P(pe(!0))};return o.jsx(Re,{className:"mb-4",children:o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsx(ge,{variant:"solid",className:"!bg-gray-900 hover:!bg-black",size:"xs",icon:o.jsx(Ae,{}),onClick:_,children:"Mark all as read"}),o.jsx(ge,{variant:"solid",className:"!bg-gray-900 hover:!bg-black",size:"xs",icon:o.jsx(Se,{}),onClick:E,children:"Clear all"})]})})},$e=()=>{const P=ie(),{clearMessages:_}=ee(l=>l.notifications.state),{clearStatus:E,clearing:B}=ee(l=>l.notifications.data),X=(l,d,y,a)=>{De.push(o.jsx(Ie,{title:y||"Error",type:d||"warning",duration:a||3e3,children:l}),{placement:"top-center"})};Y.useEffect(()=>{E==="error"&&X("Oops! Something went wrong, please try again.","danger","Error",4e3),E==="success"&&P(pe(!1)),P(Te("idle"))},[E,P]);const v=()=>{P(pe(!1))},C=()=>{P(He())};return o.jsx(_e,{isOpen:_,onClose:v,onRequestClose:v,type:"warning",title:"Clear all Notifications",onCancel:v,onConfirm:C,loading:B,children:o.jsx("p",{children:"Are you sure you want to clear all notifications?"})})};Me("notifications",ze);const We=()=>{const P=ie(),{loading:_}=ee(E=>E.notifications.data);return Y.useEffect(()=>{P(qe())},[]),o.jsxs("div",{className:"mt-2 p-4",children:[_?o.jsx("div",{className:"min-h-[60vh] grid place-content-center",children:o.jsx(Je,{loading:!0})}):o.jsxs("div",{children:[o.jsx(Ve,{}),o.jsx(Ue,{})]}),o.jsx($e,{})]})};export{We as default};
