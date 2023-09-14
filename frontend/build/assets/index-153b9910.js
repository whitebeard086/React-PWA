import{h as f,d as g,da as P,db as h,dc as j,i as A,E as C,a as D,r as o,_ as m,c as S,j as d,L as E}from"./index-2cc994c4.js";const b=f({name:"airtime/state",initialState:{pin:"",pinDialog:!1,selectedOperator:null,operator:null,formData:{}},reducers:{setPin:(t,e)=>{t.pin=e.payload},setFormData:(t,e)=>{t.formData=e.payload},setOperator:(t,e)=>{t.operator=e.payload},togglePinDialog:(t,e)=>{t.pinDialog=e.payload},setSelectedOperator:(t,e)=>{t.selectedOperator=e.payload}}}),{setPin:B,setFormData:L,setOperator:T,togglePinDialog:w,setSelectedOperator:z}=b.actions,M=b.reducer,c=g("airtime/data/getOperators",async(t,{rejectWithValue:e})=>{try{return(await P(t)).data}catch(a){return e(a.response.data)}}),l=g("airtime/data/getProducts",async(t,{rejectWithValue:e})=>{try{return(await h(t)).data}catch(a){return e(a.response.data)}}),p=g("airtime/data/buyAirtime",async(t,{rejectWithValue:e})=>{try{return(await j(t)).data}catch(a){return e(a.response.data)}}),O=f({name:"airtime/data",initialState:{gettingOperators:!1,operators:[],operatorStatus:"idle",operatorMessage:"",gettingProducts:!1,products:[],airtime:{},productStatus:"idle",productMessage:"",buyingAirtime:!1,buyStatus:"idle",buyMessage:""},reducers:{setOperatorStatus:(t,e)=>{t.operatorStatus=e.payload},setProductStatus:(t,e)=>{t.productStatus=e.payload},setBuyStatus:(t,e)=>{t.buyStatus=e.payload}},extraReducers:t=>{t.addCase(c.pending,e=>{e.gettingOperators=!0}).addCase(c.fulfilled,(e,a)=>{var i;e.gettingOperators=!1;const{operators:s,status:r}=a.payload;e.operatorStatus=r,e.operators=(i=s==null?void 0:s.data)==null?void 0:i.filter(n=>n.name!=="Smile"&&n.name!=="Visafone"),e.operatorMessage=""}).addCase(c.rejected,(e,a)=>{e.gettingOperators=!1;const{status:s,message:r}=a.payload;e.operatorMessage=r,e.operatorStatus=s||"error",e.operators=[]}).addCase(l.pending,e=>{e.gettingProducts=!0}).addCase(l.fulfilled,(e,a)=>{var i;e.gettingProducts=!1;const{products:s,status:r}=a.payload;e.productStatus=r,e.products=s==null?void 0:s.data,e.productMessage="",e.airtime=(i=e.products)==null?void 0:i.filter(n=>n.fee_type==="RANGE")[0]}).addCase(l.rejected,(e,a)=>{e.gettingProducts=!1;const{status:s,message:r}=a.payload;e.productMessage=r,e.productStatus=s||"error",e.products=[]}).addCase(p.pending,e=>{e.buyingAirtime=!0}).addCase(p.fulfilled,(e,a)=>{e.buyingAirtime=!1;const{status:s}=a.payload;e.buyStatus=s}).addCase(p.rejected,(e,a)=>{e.buyingAirtime=!1;const{status:s,message:r}=a.payload;e.buyStatus=s||"error",e.buyMessage=r})}}),{setBuyStatus:G,setProductStatus:V,setOperatorStatus:F}=O.actions,v=O.reducer,R=A({state:M,data:v});C("airtime",R);const k=()=>{const t=D(),[e,a]=o.useState(1),s=o.lazy(()=>m(()=>import("./index-964ed926.js"),["assets/index-964ed926.js","assets/index-2cc994c4.js","assets/index-adcc7fb0.css"])),r=o.lazy(()=>m(()=>import("./index-e788188c.js"),["assets/index-e788188c.js","assets/index-2cc994c4.js","assets/index-adcc7fb0.css","assets/bundle-d6c1a986.js"]));S(u=>u.airtime.state);const{buyStatus:i,buyingAirtime:n,operators:x}=S(u=>u.airtime.data);o.useEffect(()=>{t(c())},[]);const y=o.useCallback(()=>{a(e+1)},[e]),_=o.useCallback(()=>{a(e-1)},[e]);return console.log("operators: "+x),d.jsx("div",{className:"mt-2 p-4",children:d.jsxs(o.Suspense,{fallback:d.jsx("div",{className:"flex flex-auto flex-col h-[100vh]",children:d.jsx(E,{loading:!0})}),children:[e===1&&d.jsx(s,{onNext:y}),e===2&&d.jsx(r,{onNext:y,onBack:_})]})})},I=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"}));export{F as a,V as b,z as c,T as d,G as e,p as f,l as g,I as i,L as s,w as t};