import{aD as Q,aE as X,aF as ee,h as q,dm as se,aI as te,i as ae,c as ne,k as ce,l as I,aJ as S,r as A,de as ie,j as e,L as B,dn as re,F as oe,o as le,p as de,q as T,t as E,dg as P,dh as M,Z as V,c_ as me,A as ue,y as D,aL as N,u as z,bw as xe,di as he,b as pe,dj as ge,D as be,dk as je,W as ye,E as fe,dl as ve}from"./index-2cc994c4.js";import{d as Ne}from"./debounce-5e45d45e.js";import{P as Se}from"./bundle-d6c1a986.js";const u="disco",_e=Q(),Y=X(se,`${u}/data/verifyCustomer`),$=_e.getInitialState({customer:{...ee},store:{},product:null}),U=q({name:`${u}/data`,initialState:$,reducers:{setStore:(t,a)=>{t.store=a.payload===0?{}:a.payload},setProduct:(t,a)=>{t.product=a.payload===0?null:a.payload},resetState:(t,a)=>{const n={user:()=>{t.user=$.user}}[a.payload];n&&n()}},extraReducers:t=>{te(t,Y,"customer","customer")}}),{setStore:G,resetState:Me,setProduct:Ce}=U.actions,ke=U.reducer,Fe={state:{state:!1,steps:0},kycDialog:!1,pinDialog:!1,query:{search:""}},K=q({name:`${u}/state`,initialState:Fe,reducers:{setState:(t,{payload:a})=>{t.state.state=a!==0,t.state.steps=a===0?0:a},setSearch:(t,{payload:a})=>{t.query.search=a},toggleKycDialog:(t,{payload:a})=>{t.kycDialog=a},togglePinDialog:(t,{payload:a})=>{t.pinDialog=a}}}),{setState:v,setSearch:ze,toggleKycDialog:Ye,togglePinDialog:F}=K.actions,Pe=K.reducer,De=ae({state:Pe,data:ke}),b=ne,Ie=ce().shape({meter_type:I().required("Please select meter type"),device_number:I().required("Please enter meter number"),amount:I().required("Please enter amount")}),Ee={meter_type:"",device_number:"",amount:""},Ae=()=>{var k;const t=S(),{store:a,customer:s}=b(i=>i[u].data),n=i=>{t(Y(i))},m=A.useRef(Ne(n,1e3)).current;A.useEffect(()=>()=>{m.cancel()},[]);const{isFetching:l,data:x}=ie(a),{products:o}=x||{},{profile:h}=b(i=>i.auth.user);console.log("Products: ",o),console.log("customer: ",s);const y=[{value:"prepaid",name:"prepaid"},{value:"postpaid",name:"postpaid"}],_=i=>{m(i)},C=i=>{var r,c;if((i==null?void 0:i.amount)>(h==null?void 0:h.account_balance)){N("Error","You do not have sufficient fund to complete this transaction, please top-up and try again.","danger",5e3);return}const p={...a,...i,productID:(r=o==null?void 0:o.data[0])==null?void 0:r.id,disco:(c=o==null?void 0:o.data[0])==null?void 0:c.name};t(Ce(p)),t(v(2))};return e.jsxs(B,{loading:l,children:[e.jsxs("div",{className:"inline-flex items-center cursor-pointer py-2 pr-2 mb-2",onClick:()=>{t(v(0))},children:[e.jsx(re,{})," Back"]}),o!=null&&o.success&&((k=o==null?void 0:o.data)==null?void 0:k.length)>0?e.jsx(oe,{initialValues:Ee,validationSchema:Ie,onSubmit:i=>C(i),children:({touched:i,errors:p,values:r})=>{var c,O,w,L,R;return e.jsx(le,{children:e.jsxs(de,{children:[e.jsxs("div",{className:"flex flex-col xx:flex-row xx:gap-2",children:[e.jsx(T,{label:"Meter type",invalid:p.meter_type&&i.meter_type,errorMessage:p.meter_type,children:e.jsx(E,{name:"meter_type",children:({field:g,form:j})=>e.jsx(P,{className:"flex flex-col gap-2 xx:flex-row",value:[g.value],onChange:d=>{if(j.setFieldValue(g.name,d[0]),d[0]&&r.device_number.length>=11){const f={...a,meter_type:d[0],device_number:r.device_number};console.log("data from meter:",f),_(f)}},children:e.jsx(e.Fragment,{children:y.map((d,f)=>e.jsx(P.Item,{value:d.value,children:({ref:Z,active:H,onSegmentItemClick:J,disabled:W})=>e.jsx(M,{ref:Z,active:H,disabled:W,className:"bg-slate-50",onSegmentItemClick:J,variant:"plain",children:e.jsx("div",{className:"text-center",children:e.jsx("p",{className:"text-base",children:d.value})})})},d.value))})})})}),e.jsx(T,{label:"Meter number",invalid:p.device_number&&i.device_number,errorMessage:p.device_number,className:"xx:flex-1 xx:justify-between",children:e.jsx(E,{name:"device_number",children:({field:g,form:j})=>e.jsx(V,{className:"xx:h-12",form:j,field:g,placeholder:"Meter number",format:"###",onValueChange:d=>{if(j.setFieldValue(g.name,d.value),d.value.length>=11&&r.meter_type){const f={...a,meter_type:r.meter_type,device_number:d.value};console.log("data from device:",f),_(f)}}})})})]}),((c=r==null?void 0:r.device_number)==null?void 0:c.length)>=11&&(r==null?void 0:r.meter_type)&&e.jsx(e.Fragment,{children:(s==null?void 0:s.status)==="pending"?e.jsx(me,{size:35,className:"mx-auto mb-3"}):e.jsx(e.Fragment,{children:((s==null?void 0:s.status)==="success"||(s==null?void 0:s.status)==="error")&&e.jsx(ue,{className:"mb-4",type:(O=s==null?void 0:s.data)!=null&&O.success&&(s==null?void 0:s.status)==="success"?"success":"danger",showIcon:!0,children:(s==null?void 0:s.status)==="success"?((L=(w=s==null?void 0:s.data)==null?void 0:w.data)==null?void 0:L.name)??(s==null?void 0:s.message):s==null?void 0:s.message})})}),e.jsx(E,{name:"amount",children:({field:g,form:j})=>e.jsx(V,{className:"xx:h-12 mb-4",thousandSeparator:!0,form:j,field:g,placeholder:"Enter amount",decimalScale:2,onValueChange:d=>{j.setFieldValue(g.name,d.floatValue)},value:g.value,inputSuffix:e.jsx("span",{className:"font-semibold",children:"NGN"})})}),e.jsx(D,{variant:"solid",type:"submit",block:!0,className:"!bg-gray-900 hover:!bg-black",disabled:!((R=s==null?void 0:s.data)!=null&&R.success)||(s==null?void 0:s.status)!=="success"||!r.amount||!r.device_number||!r.meter_type,children:"Continue"})]})})}}):e.jsx("p",{className:"mb-4",children:"Sorry this distro is currently unavailable."})]})},Oe=({operators:t})=>{var s;const a=S();return e.jsx(P,{className:"grid grid-cols-pow gap-3",onChange:n=>{a(G({operatorID:n[0],bill:"electricity"})),a(v(1))},children:(s=t==null?void 0:t.data)==null?void 0:s.map((n,m)=>e.jsx(P.Item,{value:n.id,children:({ref:l,active:x,value:o,onSegmentItemClick:h,disabled:y})=>e.jsx(M,{ref:l,active:x,disabled:y,className:"bg-slate-50",onSegmentItemClick:h,variant:"plain",children:e.jsxs("div",{className:"space-y-1 text-center",children:[e.jsx("p",{className:"text-xs",children:n==null?void 0:n.desc}),e.jsx("h6",{children:n==null?void 0:n.name})]})})},n.id))})},we=()=>{var l;const t=S(),a=z(),{product:s}=b(x=>x[u].data),{hasPin:n}=b(x=>x.auth.user),m=()=>{n?t(F(!0)):a("/transaction-pin")};return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("h4",{className:"text-base mb-2",children:"Your Order"}),e.jsxs("div",{className:"flex items-center gap-2 justify-between",children:[e.jsx("p",{className:"text-sm",children:"Disco:"}),e.jsx("p",{className:"text-sm font-semibold",children:s==null?void 0:s.disco})]}),e.jsxs("div",{className:"flex items-center gap-2 justify-between",children:[e.jsx("p",{className:"text-sm",children:"Meter Number:"}),e.jsx("p",{className:"text-sm font-semibold",children:s==null?void 0:s.device_number})]}),e.jsxs("div",{className:"flex items-center gap-2 justify-between",children:[e.jsx("p",{className:"text-sm",children:"Bill Cost:"}),e.jsx("p",{className:"text-sm font-semibold",children:`₦${(l=Number(s==null?void 0:s.amount))==null?void 0:l.toLocaleString()}`})]}),e.jsxs("div",{className:"flex items-center gap-4 mt-8",children:[e.jsx(D,{block:!0,variant:"solid",color:"red-500",icon:e.jsx(xe,{}),className:"",onClick:()=>t(v(1)),children:"Back"}),e.jsx(D,{block:!0,variant:"solid",icon:e.jsx(he,{}),className:"!bg-gray-900 hover:!bg-black",onClick:m,children:"Confirm"})]})]}),e.jsx(Te,{})]})},Le={padding:void 0,margin:void 0,textAlign:void 0,border:void 0,background:void 0,width:void 0,height:void 0},Re={outline:void 0,boxShadow:void 0},Te=()=>{const t=S(),a=z(),s=pe(),[n,m]=A.useState("");let l;const{product:x}=b(c=>c[u].data),{pinDialog:o}=b(c=>c[u].state),h=()=>{t(F(!1))},y=()=>{t(F(!1)),t(v(1))},_=()=>{s.pathname!=="/profile/kyb"&&a("/profile/kyb")},C=()=>{l==null||l.clear(),m("")},k=()=>{const c={pin:n,...x};i(c)},{mutate:i,isLoading:p,error:r}=ge(c=>{console.log("error block",c),c.response.data.status==="pin error"?N(c.response.data.message,"The PIN entered does not match your transaction PIN, please try again.","danger",5e3):c.response.status===422?(N(c.response.data.status,c.response.data.message,"danger",5e3),y(),_()):(N("Error",c.response.data.message??"Oops! Something went wrong, please try again.","danger",5e3),y()),C(),h()},c=>{console.log("Success block",c),N("Success",c.message??"Transaction completed successfully.","success",5e3),C(),t(F(!1)),t(ye()),t(v(0)),t(G(0))});return e.jsxs(be,{isOpen:o,onClose:h,onRequestClose:h,shouldCloseOnOverlayClick:!1,shouldCloseOnEsc:!1,contentClassName:"mt-[30vh]",title:"Require PIN",children:[e.jsx("h4",{className:"text-lg font-bold text-gray-700",children:"Authorize Transaction"}),e.jsxs("div",{className:"mt-4",children:[e.jsx("p",{className:"text-sm mb-2",children:"Please enter your transaction pin to authorize this transaction"}),e.jsx("div",{children:e.jsx(Se,{length:6,initialValue:"",secretDelay:200,ref:c=>l=c,onChange:c=>{m(c)},type:"numeric",inputMode:"number",inputStyle:Le,inputFocusStyle:Re,autoSelect:!0,regexCriteria:/^[ A-Za-z0-9_@./#&+-]*$/})}),e.jsx(D,{block:!0,variant:"solid",className:"!bg-gray-900 hover:!bg-black mt-6",icon:e.jsx(je,{}),loading:p,disabled:!n||(n==null?void 0:n.length)<6||p,onClick:k,children:"Authorize"})]})]})};fe(`${u}`,De);const Ve=()=>{S();const{data:t,isFetching:a}=ve("electricity"),{operators:s}=t||{},{state:n}=b(l=>l[u].state),{store:m}=b(l=>l[u].data);return console.log("Operators: ",s),console.log("State: ",n),console.log("Store: ",m),e.jsx("div",{className:"p-4 mt-2",children:e.jsx(B,{loading:a,children:n.state?e.jsxs(e.Fragment,{children:[n.steps===1&&e.jsx(Ae,{data:m}),n.steps===2&&e.jsx(we,{})]}):e.jsx(e.Fragment,{children:e.jsx(Oe,{operators:s})})})})},Ue=Ve;export{Ue as default};