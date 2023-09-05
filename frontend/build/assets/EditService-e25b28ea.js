import{a as H,u as w,c as _,k,l as p,r as X,U as ee,j as s,F as se,o as ae,p as te,q as h,t as x,I as ie,V as z,L as re,W as ne,X as le,y as ce,Y as ue,Z as de,E as oe}from"./index-cd793fee.js";import{s as ye,M as me,T as ge,W as ve,a as pe,F as he,S as xe,b as fe,g as je,u as Se,d as Ve,e as be,f as _e,h as Ne,i as Fe,j as Ee,k as Ce,l as Pe,m as Te,n as Me,o as qe,p as Ie,q as We,t as Le,v as $e,r as De}from"./index-bea7c547.js";import"./formatTime-7871a97f.js";const Re=()=>{var L,$,D,R,B;const a=H(),f=w(),{profile:e}=_(t=>t.auth.user),{loadingCategories:y,categories:m,loadingSubCategories:j,subCategories:g,creatingService:N,serviceStatus:c}=_(t=>t.service.data),{mondayValue:F,mondayValue2:E,tuesdayValue:C,wednesdayValue:P,thursdayValue:T,fridayValue:M,saturdayValue:q,sundayValue:I,tuesdayValue2:S,wednesdayValue2:W,thursdayValue2:Z,fridayValue2:A,saturdayValue2:G,sundayValue2:J}=_(t=>t.service.state),K=k().shape({title:p().required("Please enter the title of your service or business"),category:p().required("Please select a category"),subcategory:p().required("Please select a sub category"),description:p().required("Please write a brief description of your service"),startingPrice:p().required("Please enter a minimum price for your service")}),Q={title:(L=e.service)==null?void 0:L.title,category:($=e.service)==null?void 0:$.category_id,subcategory:(D=e.service)==null?void 0:D.sub_category_id,description:(R=e.service)==null?void 0:R.description,startingPrice:(B=e.service)==null?void 0:B.starting_price},V=m==null?void 0:m.map(t=>({label:t.name,value:t.id})),b=g==null?void 0:g.map(t=>({label:t.name,value:t.id})),O=t=>{var l,d;const{title:u,category:r,subcategory:U,description:Y,startingPrice:i}=t,n={service_id:(l=e.service)==null?void 0:l.id,workdays_id:(d=e.service)==null?void 0:d.workdays_id,monday1:F,monday2:E,tuesday1:C,tuesday2:S,wednesday1:P,wednesday2:W,thursday1:T,thursday2:Z,friday1:M,friday2:A,saturday1:q,saturday2:G,sunday1:I,sunday2:J,category:r,subcategory:U,title:u,description:Y,starting_price:i};a(Se(n))};return X.useEffect(()=>{c!=="idle"&&(u=>{ue.push(s.jsx(de,{title:`${c==="success"?"Success":"Error"}`,type:`${c==="success"?"success":"danger"}`,duration:5e3,children:c==="success"?"Service updated successfully!":"Looks like something went wrong, please try again."}),{placement:"top-center"})})(),setTimeout(()=>{c==="success"&&(a(ee()),f(-1))},2e3),(c==="success"||c==="error")&&a(ye("idle"))},[a,f,c]),s.jsx("div",{className:"mt-8",children:s.jsx(se,{initialValues:Q,validationSchema:K,onSubmit:(t,{resetForm:u,setSubmitting:r})=>{O(t)},children:({isSubmitting:t,touched:u,errors:r,values:U,setFieldValue:Y})=>s.jsx(ae,{children:s.jsxs(te,{children:[s.jsx(h,{label:"",invalid:r.title&&u.title,errorMessage:r.title,children:s.jsx(x,{type:"text",autoComplete:"off",name:"title",placeholder:"Business Name or Service Title",component:ie})}),s.jsxs("div",{className:"mt-8",children:[s.jsx("p",{className:"font-bold",children:"Set Working Hours"}),s.jsx(me,{}),s.jsx(ge,{}),s.jsx(ve,{}),s.jsx(pe,{}),s.jsx(he,{}),s.jsx(xe,{}),s.jsx(fe,{})]}),s.jsxs("div",{className:"mt-8 flex gap-4 justify-between",children:[s.jsx(h,{label:"",invalid:r.category&&u.category,className:"w-full",errorMessage:r.category,children:s.jsx(x,{name:"category",prefix:"",className:"w-full",autoComplete:"off",children:({field:i,form:n})=>{var l,d,v;return s.jsx(z,{placeholder:"Service Category",field:i,form:n,className:"w-full",isLoading:y,onInputChange:o=>{console.log(o)},options:V,defaultValue:{label:(d=(l=e.service)==null?void 0:l.category)==null?void 0:d.name,value:(v=e.service)==null?void 0:v.category_id},value:V==null?void 0:V.value,onChange:o=>{n.setFieldValue(i.name,o.value),a(je({category_id:o.value})),n.setFieldValue("subcategory","")}})}})}),s.jsx(h,{label:"",invalid:r.subcategory&&u.subcategory,className:"w-full",errorMessage:r.subcategory,children:s.jsx(x,{name:"subcategory",prefix:"",className:"w-full",autoComplete:"off",children:({field:i,form:n})=>{var l,d,v;return j||y?s.jsx("div",{className:"border-2 h-11 rounded-md",children:s.jsx(re,{size:30,loading:!0})}):s.jsx(z,{placeholder:"Sub Category",field:i,form:n,className:"w-full",isLoading:j||y,onInputChange:o=>{console.log(o)},options:b,defaultValue:{label:(d=(l=e.service)==null?void 0:l.sub_category)==null?void 0:d.name,value:(v=e.service)==null?void 0:v.category_id},value:b==null?void 0:b.value,onChange:o=>{n.setFieldValue(i.name,o.value)}})}})})]}),s.jsx(h,{label:s.jsx("p",{className:"text-gray-400",children:"Describe the nature of your services"}),labelClass:"!justify-start",invalid:r.description&&u.description,errorMessage:r.description,children:s.jsx(x,{name:"description",children:({field:i,form:n})=>s.jsx(ne,{value:i.value,onChange:l=>n.setFieldValue(i.name,l)})})}),s.jsx(h,{label:"",invalid:r.startingPrice&&u.startingPrice,errorMessage:r.startingPrice,children:s.jsx(x,{name:"startingPrice",children:({field:i,form:n})=>s.jsx(le,{thousandSeparator:!0,form:n,field:i,placeholder:"Service Starting Price",decimalScale:2,onValueChange:l=>{n.setFieldValue(i.name,l.floatValue)},value:i.value,inputPrefix:s.jsx("span",{className:"font-semibold",children:"₦"})})})}),s.jsx("div",{className:"mt-8",children:s.jsx(ce,{block:!0,variant:"solid",type:"submit",loading:N,children:"Finish"})})]})})})})};oe("service",De);const ze=()=>{var S;const a=H(),{profile:f}=_(W=>W.auth.user),e=(S=f.service)==null?void 0:S.workdays,y=e==null?void 0:e.monday_start,m=e==null?void 0:e.monday_end,j=e==null?void 0:e.tuesday_start,g=e==null?void 0:e.tuesday_end,N=e==null?void 0:e.wednesday_start,c=e==null?void 0:e.wednesday_end,F=e==null?void 0:e.thursday_start,E=e==null?void 0:e.thursday_end,C=e==null?void 0:e.friday_start,P=e==null?void 0:e.friday_end,T=e==null?void 0:e.saturday_start,M=e==null?void 0:e.saturday_end,q=e==null?void 0:e.sunday_start,I=e==null?void 0:e.sunday_end;return X.useEffect(()=>{a(Ve()),a(be(y)),a(_e(m)),a(Ne(j)),a(Fe(g)),a(Ee(N)),a(Ce(c)),a(Pe(F)),a(Te(E)),a(Me(C)),a(qe(P)),a(Ie(T)),a(We(M)),a(Le(q)),a($e(I))},[]),s.jsx("div",{className:"flex h-full justify-center items-center p-8",children:s.jsxs("div",{className:"w-full h-full",children:[s.jsx("h1",{className:"font-bold text-xl text-center",children:"Your Service Details"}),s.jsx(Re,{})]})})};export{ze as default};
