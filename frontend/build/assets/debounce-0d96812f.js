import{dd as C,de as O,df as j,a5 as A}from"./index-cd793fee.js";var L=C,M=function(){return L.Date.now()},B=M,F=/\s/;function R(e){for(var r=e.length;r--&&F.test(e.charAt(r)););return r}var D=R,H=D,P=/^\s+/;function U(e){return e&&e.slice(0,H(e)+1).replace(P,"")}var X=U,q=X,y=O,w=j,_=0/0,z=/^[-+]0x[0-9a-f]+$/i,G=/^0b[01]+$/i,J=/^0o[0-7]+$/i,K=parseInt;function Q(e){if(typeof e=="number")return e;if(w(e))return _;if(y(e)){var r=typeof e.valueOf=="function"?e.valueOf():e;e=y(r)?r+"":r}if(typeof e!="string")return e===0?e:+e;e=q(e);var i=G.test(e);return i||J.test(e)?K(e.slice(2),i?2:8):z.test(e)?_:+e}var V=Q,Y=O,T=B,$=V,Z="Expected a function",ee=Math.max,ne=Math.min;function re(e,r,i){var u,o,l,d,t,f,s=0,I=!1,c=!1,b=!0;if(typeof e!="function")throw new TypeError(Z);r=$(r)||0,Y(i)&&(I=!!i.leading,c="maxWait"in i,l=c?ee($(i.maxWait)||0,r):l,b="trailing"in i?!!i.trailing:b);function g(n){var a=u,m=o;return u=o=void 0,s=n,d=e.apply(m,a),d}function S(n){return s=n,t=setTimeout(v,r),I?g(n):d}function k(n){var a=n-f,m=n-s,p=r-a;return c?ne(p,l-m):p}function h(n){var a=n-f,m=n-s;return f===void 0||a>=r||a<0||c&&m>=l}function v(){var n=T();if(h(n))return E(n);t=setTimeout(v,k(n))}function E(n){return t=void 0,b&&u?g(n):(u=o=void 0,d)}function N(){t!==void 0&&clearTimeout(t),s=0,u=f=o=t=void 0}function W(){return t===void 0?d:E(T())}function x(){var n=T(),a=h(n);if(u=arguments,o=this,f=n,a){if(t===void 0)return S(f);if(c)return clearTimeout(t),t=setTimeout(v,r),g(f)}return t===void 0&&(t=setTimeout(v,r)),d}return x.cancel=N,x.flush=W,x}var te=re;const ae=A(te);export{ae as d};
