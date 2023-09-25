import{df as _,e as I,dg as U,dh as H,di as W,i as G,k as K,d as b,l as Z,m as B,aL as $,dj as J,j as a,x as Q,F as X,p as ee,q as ae,t as L,v as T,I as te,dk as se,a0 as ne,z as N,aN as x,dl as R,dm as oe,o as ie,O as re,ar as le,b as q,r as j,u as z,c as ce,dn as de,E as ue,dp as me,bA as pe,dq as ge,G as he,dr as xe,L as be}from"./index-d4dc8e82.js";import{P as ye}from"./bundle-857a9bbb.js";function fe(t){return _({tag:"svg",attr:{viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}},{tag:"path",attr:{d:"M7 18v-10.948a1.05 1.05 0 0 1 1.968 -.51l6.064 10.916a1.05 1.05 0 0 0 1.968 -.51v-10.948"}},{tag:"path",attr:{d:"M5 10h14"}},{tag:"path",attr:{d:"M5 14h14"}}]})(t)}const C=I("airtime/data/getOperators",async(t,{rejectWithValue:e})=>{try{return(await U(t)).data}catch(s){return e(s.response.data)}}),k=I("airtime/data/getProducts",async(t,{rejectWithValue:e})=>{try{return(await H(t)).data}catch(s){return e(s.response.data)}}),O=I("airtime/data/buyAirtime",async(t,{rejectWithValue:e})=>{try{return(await W(t)).data}catch(s){return e(s.response.data)}}),V=G({name:"airtime/data",initialState:{gettingOperators:!1,operators:[],operatorStatus:"idle",operatorMessage:"",gettingProducts:!1,products:[],airtime:{},productStatus:"idle",productMessage:"",buyingAirtime:!1,buyStatus:"idle",buyMessage:"",product:null,store:null},reducers:{setOperatorStatus:(t,e)=>{t.operatorStatus=e.payload},setProductStatus:(t,e)=>{t.productStatus=e.payload},setBuyStatus:(t,e)=>{t.buyStatus=e.payload},setProduct:(t,e)=>{t.product=e.payload===0?null:e.payload},setStore:(t,e)=>{t.store=e.payload===0?null:e.payload}},extraReducers:t=>{t.addCase(C.pending,e=>{e.gettingOperators=!0}).addCase(C.fulfilled,(e,s)=>{var c;e.gettingOperators=!1;const{operators:o,status:n}=s.payload;e.operatorStatus=n,e.operators=(c=o==null?void 0:o.data)==null?void 0:c.filter(l=>l.name!=="Smile"&&l.name!=="Visafone"),e.operatorMessage=""}).addCase(C.rejected,(e,s)=>{e.gettingOperators=!1;const{status:o,message:n}=s.payload;e.operatorMessage=n,e.operatorStatus=o||"error",e.operators=[]}).addCase(k.pending,e=>{e.gettingProducts=!0}).addCase(k.fulfilled,(e,s)=>{var c;e.gettingProducts=!1;const{products:o,status:n}=s.payload;e.productStatus=n,e.products=o==null?void 0:o.data,e.productMessage="",e.airtime=(c=e.products)==null?void 0:c.filter(l=>l.fee_type==="RANGE")[0]}).addCase(k.rejected,(e,s)=>{e.gettingProducts=!1;const{status:o,message:n}=s.payload;e.productMessage=n,e.productStatus=o||"error",e.products=[]}).addCase(O.pending,e=>{e.buyingAirtime=!0}).addCase(O.fulfilled,(e,s)=>{e.buyingAirtime=!1;const{status:o}=s.payload;e.buyStatus=o}).addCase(O.rejected,(e,s)=>{e.buyingAirtime=!1;const{status:o,message:n}=s.payload;e.buyStatus=o||"error",e.buyMessage=n})}}),{setBuyStatus:Be,setProductStatus:Le,setOperatorStatus:Te,setStore:je,setProduct:Se}=V.actions,Ne=V.reducer,Y=G({name:"airtime/state",initialState:{pin:"",pinDialog:!1,selectedOperator:null,operator:null,formData:{}},reducers:{setPin:(t,e)=>{t.pin=e.payload},setFormData:(t,e)=>{t.formData=e.payload},setOperator:(t,e)=>{t.operator=e.payload},togglePinDialog:(t,e)=>{t.pinDialog=e.payload},setSelectedOperator:(t,e)=>{t.selectedOperator=e.payload}}}),{setPin:Re,setFormData:Ge,setOperator:$e,togglePinDialog:S,setSelectedOperator:qe}=Y.actions,ve=Y.reducer,Pe=K({state:ve,data:Ne}),A=b,M="airtime",Ce=Z().shape({phone:B().matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,"Phone number is not valid").required("Please enter your phone number"),amount:B().required("Please enter an amount")}),ke=({onNext:t})=>{var y;const e=$(),{product:s,store:o}=A(d=>d[M].data),{profile:n}=A(d=>d.auth.user),{isFetching:c,data:l}=J(o),{products:u}=l||{},i=(y=u==null?void 0:u.data)==null?void 0:y.find(d=>d.fee_type==="RANGE"),m={phone:(s==null?void 0:s.phone)||"",amount:(s==null?void 0:s.amount)||""},h=({phone:d,amount:p})=>{if(p>(n==null?void 0:n.balance)){x("Error","You do not have enough balance to complete this transaction, please top-up and try again.","danger",5e3);return}e(Se({productID:i==null?void 0:i.id,bill:o==null?void 0:o.bill,operatorID:o==null?void 0:o.operatorID,device_number:d,amount:p,package:i==null?void 0:i.name})),t()};return a.jsx("div",{className:"mt-5",children:a.jsx(Q.div,{initial:{opacity:0,visibility:"hidden"},animate:{opacity:1,visibility:"visible"},transition:{duration:.3,type:"tween"},exit:{opacity:0,visibility:"hidden"},children:a.jsx(X,{initialValues:m,validationSchema:Ce,onSubmit:d=>h(d),children:({touched:d,errors:p,values:g})=>{var v,f;return a.jsx(ee,{children:a.jsxs(ae,{children:[a.jsx(L,{label:"Enter Your Phone Number",invalid:p.phone&&d.phone,errorMessage:p.phone,children:a.jsx(T,{type:"text",autoComplete:"off",name:"phone",placeholder:"Phone number",component:te,prefix:a.jsx(se,{className:"text-xl"})})}),a.jsx(L,{label:"How Much Do You Want To Recharge?",invalid:p.amount&&d.amount,errorMessage:p.amount,children:a.jsx(T,{name:"amount",children:({field:r,form:D})=>{var E,F;return a.jsx(ne,{thousandSeparator:!0,form:D,field:r,isAllowed:P=>{var w;return P.value<=Number((w=i==null?void 0:i.meta)==null?void 0:w.maximum_fee)},placeholder:`Amount between ₦${Number((E=i==null?void 0:i.meta)==null?void 0:E.minimum_fee).toLocaleString()} - ₦${Number((F=i==null?void 0:i.meta)==null?void 0:F.maximum_fee).toLocaleString()}`,decimalScale:0,value:r.value,inputPrefix:a.jsx(fe,{className:"text-2xl"}),onValueChange:P=>D.setFieldValue(r.name,P.floatValue)})}})}),a.jsx(N,{variant:"solid",type:"submit",block:!0,className:"!bg-gray-900 hover:!bg-black",disabled:!g.amount||c||!g.phone||g.amount<Number((v=i==null?void 0:i.meta)==null?void 0:v.minimum_fee)||g.amount>Number((f=i==null?void 0:i.meta)==null?void 0:f.maximum_fee),children:"Continue"})]})})}})})})},Oe=({operators:t})=>{var o;const e=$(),s={Airtel:"/img/airtel.jpg","9Mobile":"/img/9mobile.png",Glo:"/img/Glo.png",MTN:"/img/MTN.png"};return a.jsx(R,{className:"flex flex-col xx:grid xx:grid-cols-4 gap-3",onChange:n=>{e(je({operatorID:n[0],bill:"telco"}))},children:(o=t==null?void 0:t.data)==null?void 0:o.filter(n=>n.name!=="Visafone").map(n=>a.jsx(R.Item,{value:n.id,children:({ref:c,active:l,value:u,onSegmentItemClick:i,disabled:m})=>a.jsx(oe,{ref:c,active:l,disabled:m,className:ie("bg-slate-50",l&&"bg-sky-100 shadow-sm"),onSegmentItemClick:i,variant:"plain",children:a.jsxs("div",{className:"space-y-1 text-center",children:[a.jsx(re,{size:"lg",src:s[n.name],icon:a.jsx(le,{})}),a.jsx("h6",{children:n==null?void 0:n.name})]})})},n.id))})},Ae={padding:void 0,margin:void 0,textAlign:void 0,border:void 0,background:void 0,width:void 0,height:void 0},Ie={outline:void 0,boxShadow:void 0},Me=({onComplete:t})=>{const e=q(),[s,o]=j.useState(""),n=z(),c=ce();let l;const{pinDialog:u}=b(r=>r.airtime.state),{product:i}=b(r=>r.airtime.data),m=()=>{e(S(!1))},h=()=>{e(S(!1)),t()},y=()=>{c.pathname!=="/profile/kyb"&&n("/profile/kyb")},d=()=>{l==null||l.clear(),o("")},{mutate:p,isLoading:g,error:v}=de(r=>{r.response.data.status==="pin error"?x(r.response.data.message,"The PIN entered does not match your transaction PIN, please try again.","danger",5e3):r.response.status===422?(x(r.response.data.status,r.response.data.message,"danger",5e3),h(),y()):(x("Error",r.response.data.message??"Oops! Something went wrong, please try again.","danger",5e3),h()),d(),m()},r=>{x("Success",r.message??"Transaction completed successfully.","success",5e3),d(),e(S(!1)),e(getUser()),t(),e(setStore(0))}),f=()=>{const r={pin:s,...i};p(r)};return a.jsxs(ue,{isOpen:u,onClose:m,onRequestClose:m,shouldCloseOnOverlayClick:!1,shouldCloseOnEsc:!1,contentClassName:"mt-[30vh]",title:"Require PIN",children:[a.jsx("h4",{className:"text-lg font-bold text-gray-700",children:"Authorize Transaction"}),a.jsxs("div",{className:"mt-4",children:[a.jsx("p",{className:"text-sm mb-2",children:"Please enter your transaction pin to authorize this transaction"}),a.jsx("div",{children:a.jsx(ye,{length:4,initialValue:"",secretDelay:200,ref:r=>l=r,onChange:r=>{o(r)},type:"numeric",inputMode:"number",inputStyle:Ae,inputFocusStyle:Ie,autoSelect:!0,regexCriteria:/^[ A-Za-z0-9_@./#&+-]*$/})}),a.jsx(N,{block:!0,variant:"solid",className:"!bg-gray-900 hover:!bg-black mt-6",icon:a.jsx(me,{}),loading:g,disabled:!s||(s==null?void 0:s.length)<4||g||s[0]==="0",onClick:f,children:"Authorize"})]})]})},De=({onBack:t,complete:e})=>{var u;const s=q(),o=z(),{product:n}=b(i=>i.airtime.data),{hasPin:c}=b(i=>i.auth.user),l=()=>{c?s(S(!0)):o("/transaction-pin")};return a.jsxs("div",{children:[a.jsxs("div",{children:[a.jsx("h4",{className:"text-base mb-2",children:"Your Order"}),a.jsxs("div",{className:"flex items-center gap-2 justify-between",children:[a.jsx("p",{className:"text-sm",children:"Operator:"}),a.jsx("p",{className:"text-sm font-semibold",children:n==null?void 0:n.package})]}),a.jsxs("div",{className:"flex items-center gap-2 justify-between",children:[a.jsx("p",{className:"text-sm",children:"Phone Number:"}),a.jsx("p",{className:"text-sm font-semibold",children:n==null?void 0:n.device_number})]}),a.jsxs("div",{className:"flex items-center gap-2 justify-between",children:[a.jsx("p",{className:"text-sm",children:"Recharge Amount:"}),a.jsx("p",{className:"text-sm font-semibold",children:`₦${(u=n==null?void 0:n.amount)==null?void 0:u.toLocaleString()}`})]}),a.jsxs("div",{className:"flex items-center gap-4 mt-8",children:[a.jsx(N,{block:!0,variant:"solid",color:"red-500",icon:a.jsx(pe,{}),onClick:()=>t(),children:"Back"}),a.jsx(N,{block:!0,variant:"solid",icon:a.jsx(ge,{}),className:"!bg-gray-900 hover:!bg-black",onClick:l,children:"Confirm"})]})]}),a.jsx(Me,{onComplete:e})]})};he(`${M}`,Pe);const Ee=()=>{const[t,e]=j.useState(1),{product:s,store:o}=A(h=>h[M].data),{data:n,isFetching:c}=xe("telco"),{operators:l}=n||{};console.log("Product: ",s),console.log("Store: ",o),console.log("Step: ",t);const u=j.useCallback(()=>{e(t+1)},[t]),i=j.useCallback(()=>{e(t-1)},[t]),m=()=>{e(1)};return a.jsxs("div",{className:"p-4 mt-2",children:[a.jsx("h1",{className:"text-base font-bold pb-4",children:"Airtime"}),a.jsxs(be,{loading:c,children:[t===1&&a.jsxs(a.Fragment,{children:[a.jsx(Oe,{operators:l}),o&&a.jsx(ke,{onNext:u})]}),t===2&&a.jsx(De,{onNext:u,complete:m,onBack:i,store:o})]})]})},ze=Ee;export{ze as default};
