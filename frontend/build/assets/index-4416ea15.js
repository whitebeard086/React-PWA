import{d as v,ak as O,al as F,am as A,h as _,i as R}from"./index-3595f095.js";var l={},c={};Object.defineProperty(c,"__esModule",{value:!0});c.defaultOptions=void 0;c.defaultOptions={lowercase:!1,precision:1,space:!1,units:["","K","M","B","T","P","E"]};var a={};Object.defineProperty(a,"__esModule",{value:!0});a.getLocales=a.getFractionDigits=a.roundTo=a.parseValue=void 0;function T(r){const e=parseFloat(r==null?void 0:r.toString());if(isNaN(e))throw new Error("Input value is not a number");if(e>Number.MAX_SAFE_INTEGER||e<Number.MIN_SAFE_INTEGER)throw new RangeError("Input value is outside of safe integer range");return e}a.parseValue=T;function x(r,e){if(!Number.isFinite(r))throw new Error("Input value is not a finite number");if(!Number.isInteger(e)||e<0)throw new Error("Precision is not a positive integer");return Number.isInteger(r)?r:parseFloat(r.toFixed(e))}a.roundTo=x;function C(r){var e;if(Number.isInteger(r))return 0;const t=r.toString().split(".")[1];return(e=t==null?void 0:t.length)!==null&&e!==void 0?e:0}a.getFractionDigits=C;function M(){var r;return typeof navigator>"u"?[]:Array.from((r=navigator.languages)!==null&&r!==void 0?r:[])}a.getLocales=M;Object.defineProperty(l,"__esModule",{value:!0});l.millify=void 0;const m=c,u=a,S=1e3;function*w(r){let e=S;for(;;){const t=r/e;if(t<1)return;yield t,e*=S}}function P(r,e){var t,p;const o=e?{...m.defaultOptions,...e}:m.defaultOptions;if(!Array.isArray(o.units)||!o.units.length)throw new Error("Option `units` must be a non-empty array");let i;try{i=u.parseValue(r)}catch(n){return n instanceof Error&&console.warn(`WARN: ${n.message} (millify)`),String(r)}const b=i<0?"-":"";i=Math.abs(i);let s=0;for(const n of w(i))i=n,s+=1;if(s>=o.units.length)return r.toString();let d=u.roundTo(i,o.precision);for(const n of w(d))d=n,s+=1;const y=(t=o.units[s])!==null&&t!==void 0?t:"",I=o.lowercase?y.toLowerCase():y,E=o.space?" ":"",N=d.toLocaleString((p=o.locales)!==null&&p!==void 0?p:u.getLocales(),{minimumFractionDigits:u.getFractionDigits(d)});return`${b}${N}${E}${I}`}l.millify=P;var j=l.default=P;const f=v("profile/data/uploadBanner",async(r,{rejectWithValue:e})=>{try{return(await O(r)).data}catch(t){return e(t.response.data)}}),g=v("profile/data/getProvider",async(r,{rejectWithValue:e})=>{try{return(await F(r)).data}catch(t){return e(t.response.data)}}),k=v("profile/data/updateProfileView",async(r,{rejectWithValue:e})=>{try{return(await A(r)).data}catch(t){return e(t.response.data)}}),h=_({name:"profile/data",initialState:{uploadStatus:"idle",uploading:!1,gettingProvider:!1,provider:{},service:{},workdays:{},providerStatus:"idle"},reducers:{setUploadStatus:(r,e)=>{r.uploadStatus=e.payload},setProviderStatus:(r,e)=>{r.providerStatus=e.payload}},extraReducers:r=>{r.addCase(f.pending,e=>{e.uploading=!0}).addCase(f.fulfilled,(e,t)=>{e.uploading=!1,e.uploadStatus=t.payload.status}).addCase(f.rejected,e=>{e.uploading=!1,e.uploadStatus="error"}).addCase(g.pending,e=>{e.gettingProvider=!0}).addCase(g.fulfilled,(e,t)=>{e.gettingProvider=!1,e.providerStatus=t.payload.status,e.provider=t.payload.provider,e.service=t.payload.provider.service,e.workdays=t.payload.provider.service.workdays}).addCase(g.rejected,e=>{e.gettingProvider=!1,e.providerStatus="error"})}}),{setUploadStatus:B,setProviderStatus:U}=h.actions,V=h.reducer,D=_({name:"profile/state",initialState:{},reducers:{}}),G=D.reducer,K=R({state:G,data:V});export{j as _,k as a,g,K as r,B as s,f as u};
