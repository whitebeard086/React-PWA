import{j as e,z as p,S as i,b9 as f,a as N,c as w,aL as T,B as Z,bW as B,bX as k,o as J,p as D,r as j,bY as K,bZ as R,Z as W,b_ as O,b$ as U,c0 as P,c1 as X,F as H,v as Q,w as ee,x as _,y as F,$ as se,c2 as V,a1 as ae,c3 as te,c4 as re,t as ne,P as le,G as z,c5 as ie,a2 as I,a3 as q,c6 as ce,c7 as oe,c8 as $,J as de,c9 as ue,bz as he,ca as xe,K as me,cb as ge}from"./index-2aa62b4f.js";import{g as pe}from"./index.esm-46c9d8cb.js";const fe=()=>e.jsxs("div",{className:"flex flex-col",children:[e.jsx(p,{bodyClass:"w-full",children:e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsxs("div",{className:"flex flex-col gap-1 w-full",children:[e.jsx(i,{height:"20px",width:"30%"}),e.jsx(i,{height:"14px",width:"25%"}),e.jsx(i,{height:"14px",width:"35%"})]}),e.jsx("div",{className:"bg-gray-100 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer",children:e.jsx(f,{className:"text-2xl text-red-500 hover:text-red-600 transition duration-300"})})]})}),e.jsx(p,{bodyClass:"w-full",children:e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsxs("div",{className:"flex flex-col gap-1 w-full",children:[e.jsx(i,{height:"20px",width:"30%"}),e.jsx(i,{height:"14px",width:"25%"}),e.jsx(i,{height:"14px",width:"35%"})]}),e.jsx("div",{className:"bg-gray-100 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer",children:e.jsx(f,{className:"text-2xl text-red-500 hover:text-red-600 transition duration-300"})})]})}),e.jsx(p,{bodyClass:"w-full",children:e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsxs("div",{className:"flex flex-col gap-1 w-full",children:[e.jsx(i,{height:"20px",width:"30%"}),e.jsx(i,{height:"14px",width:"25%"}),e.jsx(i,{height:"14px",width:"35%"})]}),e.jsx("div",{className:"bg-gray-100 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer",children:e.jsx(f,{className:"text-2xl text-red-500 hover:text-red-600 transition duration-300"})})]})}),e.jsx(p,{bodyClass:"w-full",children:e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsxs("div",{className:"flex flex-col gap-1 w-full",children:[e.jsx(i,{height:"20px",width:"30%"}),e.jsx(i,{height:"14px",width:"25%"}),e.jsx(i,{height:"14px",width:"35%"})]}),e.jsx("div",{className:"bg-gray-100 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer",children:e.jsx(f,{className:"text-2xl text-red-500 hover:text-red-600 transition duration-300"})})]})}),e.jsx(p,{bodyClass:"w-full",children:e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsxs("div",{className:"flex flex-col gap-1 w-full",children:[e.jsx(i,{height:"20px",width:"30%"}),e.jsx(i,{height:"14px",width:"25%"}),e.jsx(i,{height:"14px",width:"35%"})]}),e.jsx("div",{className:"bg-gray-100 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer",children:e.jsx(f,{className:"text-2xl text-red-500 hover:text-red-600 transition duration-300"})})]})}),e.jsx(p,{bodyClass:"w-full",children:e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsxs("div",{className:"flex flex-col gap-1 w-full",children:[e.jsx(i,{height:"20px",width:"30%"}),e.jsx(i,{height:"14px",width:"25%"}),e.jsx(i,{height:"14px",width:"35%"})]}),e.jsx("div",{className:"bg-gray-100 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer",children:e.jsx(f,{className:"text-2xl text-red-500 hover:text-red-600 transition duration-300"})})]})})]}),we=()=>{const s=N(),{profile:r}=w(c=>c.auth.user),d=r==null?void 0:r.withdrawal_accounts,t=c=>{s(B(c.id)),s(k(!0)),console.log(c)};return e.jsx("div",{children:(d==null?void 0:d.length)<1?e.jsx("div",{className:"min-h-[30vh] grid place-content-center",children:e.jsxs("p",{className:"text-center text-gray-400 font-bold text-2xl",children:["You have not added ",e.jsx("br",{})," any withdrawal accounts..."]})}):e.jsx(T,{children:e.jsx("div",{className:"flex flex-col",children:d==null?void 0:d.map(c=>e.jsx(Z.div,{layoutId:c.id,initial:{opacity:0,visibility:"hidden"},animate:{opacity:1,visibility:"visible"},transition:{duration:.2,type:"tween"},exit:{opacity:0,visibility:"hidden"},children:e.jsx(p,{clickable:!0,className:"z-10",bodyClass:"w-full",children:e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("h4",{className:"text-base",children:c.bank_name}),e.jsx("p",{className:"text-base",children:c.account_number}),e.jsx("p",{className:"text-base",children:c.account_name})]}),e.jsx("div",{onClick:()=>t(c),className:"bg-gray-100 z-20 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer hover:shadow-md",children:e.jsx(f,{className:"text-2xl text-red-500 hover:text-red-600 transition duration-300"})})]})})},c.id))})})})},be=()=>{const s=N(),{banks:r,resolvingAccount:d,resolvedAccount:t,resolveStatus:c,resolveError:x,accountStatus:u,recipientStatus:m,recipient:n,creatingRecipient:S,addingAccount:A}=w(a=>a.withdraw.data),{isValidAccountNumber:g,formData:E}=w(a=>a.withdraw.state),M=J().shape({bank:D().required("Please select a bank"),accNumber:D().required("Please enter your account number"),password:D().required("Please enter your password")}),Y={bank:"",accNumber:"",password:""},v=r==null?void 0:r.map(a=>({label:a.name,value:a.code})),y=(a,l,o,h)=>{I.push(e.jsx(q,{title:o||"Error",type:l||"warning",duration:h||3e3,children:a}),{placement:"top-center"})};j.useEffect(()=>{x!==""&&s(K("idle"))},[x,c]),j.useEffect(()=>{(u==="error"||m==="error")&&y("Oops! Something went wrong, please try again.","danger","Error",5e3),u==="password error"&&y("The password entered does not match your account password, please try again.","danger","Error",5e3),u==="duplicate error"&&y("Account already added or in use by another user","danger","Error",5e3),u==="success"&&(s(R(!1)),s(W()),s(O()),y("Withdrawal account added successfully.","success","Success",5e3)),(u==="error"||u==="password error"||u==="duplicate error"||u==="success")&&(s(U("idle")),s(P("idle"))),m==="error"&&s(P("idle"))},[u,s,m]),j.useEffect(()=>{var a,l,o;m==="success"&&s(X({bankName:(a=n==null?void 0:n.details)==null?void 0:a.bank_name,accountNumber:(l=n==null?void 0:n.details)==null?void 0:l.account_number,accountName:(o=n==null?void 0:n.details)==null?void 0:o.account_name,recipientCode:n==null?void 0:n.recipient_code,password:E==null?void 0:E.password}))},[m]);const G=a=>{const{bank:l,accNumber:o,password:h}=a;s(ce({bankCode:l,accountNumber:o,password:h})),s(oe({accountName:t==null?void 0:t.account_name,accountNumber:o,bankCode:l}))},L=(a,l,o,h)=>{o.setFieldValue(h.name,a.floatValue),a.value.length>=10?g||s($(!0)):g&&s($(!1)),a.value.length===10&&l.bank&&s(V({accountNumber:a.floatValue,bankCode:l.bank}))};return e.jsx("div",{className:"mt-10",children:e.jsx(H,{initialValues:Y,validationSchema:M,onSubmit:(a,{setSubmitting:l})=>{G(a)},children:({touched:a,errors:l,values:o})=>e.jsx(Q,{children:e.jsxs(ee,{children:[e.jsx(_,{label:"",invalid:l.bank&&a.bank,className:"w-full",errorMessage:l.bank,children:e.jsx(F,{name:"bank",prefix:"",className:"w-full",autoComplete:"off",children:({field:h,form:b})=>e.jsx(se,{placeholder:"Select a Bank",field:h,form:b,className:"w-full",options:v,value:v==null?void 0:v.value,onChange:C=>{b.setFieldValue(h.name,C.value),o.accNumber>=10&&s(V({accountNumber:o.accNumber,bankCode:C.value}))}})})}),e.jsx(_,{label:"",invalid:l.accNumber&&a.accNumber,errorMessage:l.accNumber,children:e.jsx(F,{name:"accNumber",children:({field:h,form:b})=>e.jsx(ae,{thousandSeparator:!1,form:b,field:h,maxLength:10,placeholder:"Enter Account Number",decimalScale:0,value:h.value,onValueChange:C=>{L(C,o,b,h)}})})}),o.bank&&g&&d?e.jsx("div",{className:"p-2 mb-4 grid place-content-center",children:e.jsx(te,{indicator:re,color:"primary-500",size:24})}):o.bank&&g&&(t!=null&&t.account_name||x)?e.jsx("div",{className:ne("p-2 border-2 mb-4 rounded-lg",x&&"border-red-500",c==="success"&&"border-primary-500"),children:e.jsxs("p",{className:"text-sm font-semibold text-gray-500",children:[x&&"Invalid account details",c==="success"&&(t==null?void 0:t.account_name)]})}):null,e.jsx(_,{label:"",invalid:l.password&&a.password,errorMessage:l.password,children:e.jsx(F,{autoComplete:"off",name:"password",placeholder:"Enter Your Password",component:le})}),e.jsx(z,{block:!0,loading:S||A,disabled:!g||!(t!=null&&t.account_name)||!o.password,variant:"solid",type:"submit",icon:e.jsx(ie,{}),className:"!bg-gray-900 hover:!bg-black",children:"Save"})]})})})})},je=()=>{const s=N(),{accountDialog:r}=w(t=>t.withdraw.state),d=()=>{s(R(!1))};return e.jsxs(de,{isOpen:r,onClose:d,shouldCloseOnOverlayClick:!1,shouldCloseOnEsc:!1,scrollable:!0,className:"overflow-y-auto",bodyOpenClassName:"overflow-hidden",contentClassName:"mt-[20vh]",title:"Add New Account",children:[e.jsx("h4",{className:"text-lg font-bold text-gray-700",children:"Add a New Bank Account"}),e.jsx("div",{className:"mt-4 min-h-[40vh]",children:e.jsx(be,{})})]})},Ne=()=>{const s=N(),{deleteStatus:r,deleting:d}=w(n=>n.withdraw.data),{deleteDialog:t,selectedAccount:c}=w(n=>n.withdraw.state),x=()=>{s(B(null)),s(k(!1))},u=(n,S,A,g)=>{I.push(e.jsx(q,{title:A||"Error",type:S||"warning",duration:g||3e3,children:n}),{placement:"top-center"})};j.useEffect(()=>{r==="error"&&(s(k(!1)),u("Oops! Something went wrong, please try again.","danger","Error",5e3)),r==="success"&&(s(k(!1)),s(W()),s(O()),u("Withdrawal account removed successfully","success","Success",5e3)),(r==="error"||r==="success")&&s(ue("idle"))},[r,s]);const m=()=>{s(xe({id:c}))};return e.jsx(he,{isOpen:t,onClose:x,onRequestClose:x,type:"danger",title:"Remove Withdrawal Account?",buttonColor:"red-500",loading:d,onCancel:x,onConfirm:m,children:e.jsx("p",{children:"Do you confirm that you want to remove this withdrawal account?"})})};me("withdraw",ge);const Ce=()=>{const s=N(),{loading:r}=w(t=>t.withdraw.data);j.useEffect(()=>{s(O())},[]);const d=()=>{s(R(!0))};return e.jsxs("div",{className:"mt-2 p-4",children:[e.jsxs("div",{className:"flex items-center gap-4 justify-between flex-wrap",children:[e.jsx("h4",{className:"text-lg font-bold text-gray-700",children:"Withdrawal Banks"}),e.jsx(z,{size:"sm",variant:"solid",disabled:r,icon:e.jsx(pe,{}),onClick:d,className:"!bg-gray-900 hover:!bg-black",children:"Add Account"})]}),e.jsx("div",{className:"mt-4",children:r?e.jsx(fe,{}):e.jsx(we,{})}),e.jsx(je,{}),e.jsx(Ne,{})]})};export{Ce as default};