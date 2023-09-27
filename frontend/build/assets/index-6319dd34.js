import{b as N,u as V,d as h,l as G,m as u,r as C,Y as b,j as e,F as H,p as U,q as Z,t as d,v as m,I as A,Z as S,L as J,$ as K,a0 as Q,z as X,a1 as O,a2 as ee,G as ae,C as se}from"./index-d4dc8e82.js";import{s as te,M as ie,T as re,W as le,a as ne,F as ce,S as oe,b as ue,g as de,c as me,d as ye,r as ge}from"./index-2001774c.js";import"./formatTime-7871a97f.js";const he=()=>{const l=N(),c=V(),{verifiedPhone:o}=h(a=>a.auth.user),{loadingCategories:x,categories:p,loadingSubCategories:f,subCategories:v,creatingService:w,serviceStatus:n}=h(a=>a.service.data),{mondayValue:F,mondayValue2:P,tuesdayValue:M,wednesdayValue:q,thursdayValue:E,fridayValue:I,saturdayValue:T,sundayValue:k,tuesdayValue2:L,wednesdayValue2:$,thursdayValue2:D,fridayValue2:R,saturdayValue2:W,sundayValue2:z}=h(a=>a.service.state),B=G().shape({title:u().required("Please enter the title of your service or business"),category:u().required("Please select a category"),subcategory:u().required("Please select a sub category"),description:u().required("Please write a brief description of your service"),startingPrice:u().required("Please enter a minimum price for your service")}),Y={title:"",category:"",subcategory:"",description:"",startingPrice:""},y=p==null?void 0:p.map(a=>({label:a.name,value:a.id})),g=v==null?void 0:v.map(a=>({label:a.name,value:a.id})),_=a=>{const{title:i,category:j,subcategory:s,description:r,startingPrice:t}=a;l(me({monday1:F,monday2:P,tuesday1:M,tuesday2:L,wednesday1:q,wednesday2:$,thursday1:E,thursday2:D,friday1:I,friday2:R,saturday1:T,saturday2:W,sunday1:k,sunday2:z,category:j,subcategory:s,title:i,description:r,starting_price:t}))};return C.useEffect(()=>{n!=="idle"&&(()=>{O.push(e.jsx(ee,{title:`${n==="success"?"Success":"Error"}`,type:`${n==="success"?"success":"danger"}`,duration:5e3,children:n==="success"?"Service added successfully!":"Looks like something went wrong, please try again."}),{placement:"top-center"})})(),setTimeout(()=>{n==="success"&&o?(l(b()),c("/home")):n==="success"&&!o&&(l(b()),c("/verify"))},2e3),(n==="success"||n==="error")&&l(te("idle"))},[l,c,n,o]),e.jsx("div",{className:"mt-8",children:e.jsx(H,{initialValues:Y,validationSchema:B,onSubmit:(a,{setSubmitting:i})=>{_(a)},children:({touched:a,errors:i,values:j})=>(console.log(j),e.jsx(U,{children:e.jsxs(Z,{children:[e.jsx(d,{label:"",invalid:i.title&&a.title,errorMessage:i.title,children:e.jsx(m,{type:"text",autoComplete:"off",name:"title",placeholder:"Business Name or Service Title",component:A})}),e.jsxs("div",{className:"mt-8",children:[e.jsx("p",{className:"font-bold",children:"Set Working Hours"}),e.jsx(ie,{}),e.jsx(re,{}),e.jsx(le,{}),e.jsx(ne,{}),e.jsx(ce,{}),e.jsx(oe,{}),e.jsx(ue,{})]}),e.jsxs("div",{className:"mt-8 flex gap-4 justify-between",children:[e.jsx(d,{label:"",invalid:i.category&&a.category,className:"w-full",errorMessage:i.category,children:e.jsx(m,{name:"category",prefix:"",className:"w-full",autoComplete:"off",children:({field:s,form:r})=>e.jsx(S,{placeholder:"Service Category",field:s,form:r,className:"w-full",isLoading:x,onInputChange:t=>{console.log(t)},options:y,value:y==null?void 0:y.value,onChange:t=>{r.setFieldValue(s.name,t.value),l(de({category_id:t.value})),r.setFieldValue("subcategory","")}})})}),e.jsx(d,{label:"",invalid:i.subcategory&&a.subcategory,className:"w-full",errorMessage:i.subcategory,children:e.jsx(m,{name:"subcategory",prefix:"",className:"w-full",autoComplete:"off",children:({field:s,form:r})=>f?e.jsx("div",{className:"border-2 h-11 rounded-md",children:e.jsx(J,{size:30,loading:!0})}):e.jsx(S,{placeholder:"Sub Category",field:s,form:r,className:"w-full",isLoading:f,onInputChange:t=>{console.log(t)},options:g,value:g==null?void 0:g.value,onChange:t=>{r.setFieldValue(s.name,t.value)}})})})]}),e.jsx(d,{label:e.jsx("p",{className:"text-gray-400",children:"Describe the nature of your services"}),labelClass:"!justify-start",invalid:i.description&&a.description,errorMessage:i.description,children:e.jsx(m,{name:"description",children:({field:s,form:r})=>e.jsx(K,{value:s.value,onChange:t=>r.setFieldValue(s.name,t)})})}),e.jsx(d,{label:"",invalid:i.startingPrice&&a.startingPrice,errorMessage:i.startingPrice,children:e.jsx(m,{name:"startingPrice",children:({field:s,form:r})=>e.jsx(Q,{thousandSeparator:!0,form:r,field:s,placeholder:"Service Starting Price",decimalScale:2,onValueChange:t=>{r.setFieldValue(s.name,t.floatValue)},value:s.value,inputPrefix:e.jsx("span",{className:"font-semibold",children:"₦"})})})}),e.jsx("div",{className:"mt-8",children:e.jsx(X,{block:!0,variant:"solid",type:"submit",loading:w,children:"Finish"})})]})}))})})};ae("service",ge);const fe=()=>{const l=N(),c=V(),{hasService:o}=h(x=>x.auth.user);return C.useEffect(()=>{o&&c(-1),l(ye())},[l,o,c]),e.jsx(se,{className:"max-w-xl",children:e.jsx("div",{className:"flex h-full justify-center items-center p-8",children:e.jsxs("div",{className:"w-full h-full",children:[e.jsx("h1",{className:"font-bold text-xl text-center",children:"Your Service Details"}),e.jsx(he,{})]})})})};export{fe as default};