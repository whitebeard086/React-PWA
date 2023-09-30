import{dH as A,a as C,c as d,k as I,l as F,j as e,L as z,w as H,F as T,o as V,p as q,q as M,t as P,I as B,de as G,Z as Y,y as R,$ as L,a0 as _,u as W,r as $,n as U,O as h,ap as g}from"./index-402e8dd0.js";import{s as Z,a as D,b as J,c as K,d as Q,g as X}from"./index-f6b0c1cc.js";function ee(n){return A({tag:"svg",attr:{viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}},{tag:"path",attr:{d:"M7 18v-10.948a1.05 1.05 0 0 1 1.968 -.51l6.064 10.916a1.05 1.05 0 0 0 1.968 -.51v-10.948"}},{tag:"path",attr:{d:"M5 10h14"}},{tag:"path",attr:{d:"M5 14h14"}}]})(n)}const te=({onNext:n})=>{const o=C(),{airtime:t,gettingProducts:m,productStatus:u}=d(s=>s.airtime.data),{operator:x,selectedOperator:j,formData:i}=d(s=>s.airtime.state),{profile:c}=d(s=>s.auth.user),a=I().shape({phone:F().matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,"Phone number is not valid").required("Please enter your phone number"),amount:F().required("Please enter an amount")}),b={phone:(i==null?void 0:i.phone)||"",amount:(i==null?void 0:i.amount)||""},v=(s,r,l,p)=>{L.push(e.jsx(_,{title:l||"Error",type:r||"warning",duration:p||3e3,children:s}),{placement:"top-center"})},N=({phone:s,amount:r})=>{if(r>(c==null?void 0:c.account_balance)){v("You do not have enough balance to complete this transaction, please top-up and try again.","danger","Error",5e3);return}o(Z({oid:x,operator:j,product:t==null?void 0:t.id,phone:s,amount:r})),n()};return e.jsx("div",{children:m?e.jsx("div",{className:"h-[10vh]",children:e.jsx(z,{size:32,loading:!0})}):u==="success"&&e.jsx(H.div,{initial:{opacity:0,visibility:"hidden"},animate:{opacity:1,visibility:"visible"},transition:{duration:.3,type:"tween"},exit:{opacity:0,visibility:"hidden"},children:e.jsx(T,{initialValues:b,validationSchema:a,onSubmit:s=>N(s),children:({touched:s,errors:r,values:l})=>{var p,w;return e.jsx(V,{children:e.jsxs(q,{children:[e.jsx(M,{label:"Enter Your Phone Number",invalid:r.phone&&s.phone,errorMessage:r.phone,children:e.jsx(P,{type:"text",autoComplete:"off",name:"phone",placeholder:"Phone number",component:B,prefix:e.jsx(G,{className:"text-xl"})})}),e.jsx(M,{label:"How Much Do You Want To Recharge?",invalid:r.amount&&s.amount,errorMessage:r.amount,children:e.jsx(P,{name:"amount",children:({field:f,form:S})=>{var O,k;return e.jsx(Y,{thousandSeparator:!0,form:S,field:f,isAllowed:y=>{var E;return y.value<=Number((E=t==null?void 0:t.meta)==null?void 0:E.maximum_fee)},placeholder:`Amount between ₦${Number((O=t==null?void 0:t.meta)==null?void 0:O.minimum_fee).toLocaleString()} - ₦${Number((k=t==null?void 0:t.meta)==null?void 0:k.maximum_fee).toLocaleString()}`,decimalScale:0,value:f.value,inputPrefix:e.jsx(ee,{className:"text-2xl"}),onValueChange:y=>S.setFieldValue(f.name,y.floatValue)})}})}),e.jsx(R,{variant:"solid",type:"submit",block:!0,className:"!bg-gray-900 hover:!bg-black",disabled:!l.amount||!l.phone||l.amount<Number((p=t==null?void 0:t.meta)==null?void 0:p.minimum_fee)||l.amount>Number((w=t==null?void 0:t.meta)==null?void 0:w.maximum_fee),children:"Continue"})]})})}})})})},ae=()=>{const n=W(),o=C(),{operators:t,operatorStatus:m,productStatus:u,gettingOperators:x}=d(a=>a.airtime.data),{selectedOperator:j}=d(a=>a.airtime.state),i=a=>{o(K(a.name)),o(Q(a.id)),o(X({category:a.id}))},c=(a,b,v,N)=>{L.push(e.jsx(_,{title:v||"Error",type:b||"warning",duration:N||3e3,children:a}),{placement:"top-center"})};return $.useEffect(()=>{m==="error"&&(c("Oops! Something went wrong, please try again later.","danger","Error",5e3),o(D("idle")),n(-1))},[o,n,m]),$.useEffect(()=>{u==="error"&&(c("Oops! Something went wrong, please try again.","danger","Error",5e3),o(J("idle")))},[o,n,u]),e.jsx("div",{className:"mb-8",children:x?e.jsx("div",{className:"h-[10vh]",children:e.jsx(z,{size:32,loading:!0})}):e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold mb-4",children:"Choose a Network Operator"}),e.jsx("div",{className:"flex items-center gap-4 justify-around flex-wrap",children:t==null?void 0:t.map(a=>e.jsxs("div",{className:U("flex flex-col gap-1 items-center cursor-pointer",u==="success"&&j===a.name&&"shadow-md px-4 py-2 bg-white rounded-lg border-b-2 border-primary-500"),onClick:()=>i(a),children:[a.name==="Airtel"&&e.jsx(h,{size:"lg",src:"/img/airtel.jpg",icon:e.jsx(g,{})}),a.name==="9Mobile"&&e.jsx(h,{className:"bg-white",size:"lg",src:"/img/9mobile.png",icon:e.jsx(g,{})}),a.name==="Glo"&&e.jsx(h,{className:"bg-white",size:"lg",src:"/img/Glo.png",icon:e.jsx(g,{})}),a.name==="MTN"&&e.jsx(h,{className:"bg-white",size:"lg",src:"/img/MTN.png",icon:e.jsx(g,{})}),e.jsx("p",{className:"text-sm",children:a.name})]},a.id))})]})})},oe=({onNext:n})=>e.jsxs("div",{children:[e.jsx(ae,{onNext:n}),e.jsx(te,{onNext:n})]});export{oe as default};