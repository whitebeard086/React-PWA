import{a as F,c as P,r as w,Z as S,o as C,p as u,j as e,F as $,v as I,w as V,x,y as f,L as E,$ as L,I as k,G as q}from"./index-2aa62b4f.js";import{u as M}from"./index-cb0f1280.js";const z=({onNext:l})=>{const t=F(),{countries:c,loading:d,phoneStatus:j,settingPhone:g,message:h}=P(s=>s.verify.data),b=s=>{const{code:a,phone:n}=s,i={phone:a.substring(1)+n};t(M(i))};w.useEffect(()=>{h==="Otp sent"&&(t(S()),l())},[t,h,l]);const v=s=>/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/.test(s),N=C().shape({phone:u().matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,"Invalid number").required(""),code:u().required("Please select your country")}),y={phone:"",code:"+234"},o=c==null?void 0:c.map(s=>({label:`+${s.phone}`,value:s.name}));return e.jsx("div",{className:"mt-4 flex justify-center",children:e.jsx($,{initialValues:y,validationSchema:N,onSubmit:(s,{setSubmitting:a})=>{a(!0),b(s)},children:({errors:s,touched:a,values:n})=>{const i=v(n.phone);return console.log(n.code+n.phone),e.jsx(I,{children:e.jsxs(V,{children:[e.jsxs("div",{className:"flex",children:[e.jsx(x,{label:"",invalid:s.code&&a.code,className:"",errorMessage:s.code,children:e.jsx(f,{name:"code",prefix:"",className:"",autoComplete:"off",children:({field:m,form:p})=>d?e.jsx("div",{className:"bg-blue-100 h-11 w-28 rounded-l-md",children:e.jsx(E,{size:30,loading:!0})}):e.jsx(L,{placeholder:"",field:m,form:p,className:"w-28 select_phone",isLoading:d,onInputChange:r=>{console.log(r)},options:o,defaultValue:o[163],value:o==null?void 0:o.value,onChange:r=>{p.setFieldValue(m.name,r.label)}})})}),e.jsx(x,{label:"",invalid:s.phone&&a.phone,errorMessage:s.phone,children:e.jsx(f,{type:"text",autoComplete:"off",name:"phone",className:"rounded-l-none border-l-0",placeholder:"Enter phone number",component:k})})]}),e.jsx(q,{block:!0,variant:"solid",disabled:!n.phone||!n.code||!i,loading:j==="loading"||g,children:"Send Code"})]})})}})})},G=({onNext:l})=>e.jsx("div",{className:"h-full flex flex-col justify-center",children:e.jsxs("div",{className:"w-full flex flex-col gap-4 justify-center",children:[e.jsx("div",{className:"w-full flex justify-center items-center",children:e.jsx("img",{className:"w-72",src:"/img/signup.png",alt:""})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-center mt-4 text-2xl font-bold",children:"Phone Verification"}),e.jsx("p",{className:"font-semibold text-center text-gray-400",children:"We will send you an OTP code on this phone number."})]}),e.jsx(z,{onNext:l})]})});export{G as default};
