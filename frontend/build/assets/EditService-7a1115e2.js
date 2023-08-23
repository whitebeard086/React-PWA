import{a as K,u as w,c as _,o as k,p,r as U,Z as ee,j as a,F as ae,v as se,w as te,x as h,y as x,I as ie,$ as H,L as re,a0 as ne,a1 as le,G as ce,a2 as ue,a3 as de,K as oe}from"./index-3595f095.js";import{s as ye,M as me,T as ge,W as ve,a as pe,F as he,S as xe,b as fe,g as je,u as Se,d as Ve,e as be,f as _e,h as Ne,i as Fe,j as Ce,k as Ee,l as Pe,m as Te,n as Me,o as qe,p as Ie,q as Le,t as We,v as $e,r as De}from"./index-7e216a2a.js";import"./formatTime-7871a97f.js";const Re=()=>{var W,$,D,R,B;const s=K(),f=w(),{profile:e}=_(t=>t.auth.user),{loadingCategories:y,categories:m,loadingSubCategories:j,subCategories:g,creatingService:N,serviceStatus:c}=_(t=>t.service.data),{mondayValue:F,mondayValue2:C,tuesdayValue:E,wednesdayValue:P,thursdayValue:T,fridayValue:M,saturdayValue:q,sundayValue:I,tuesdayValue2:S,wednesdayValue2:L,thursdayValue2:Y,fridayValue2:Z,saturdayValue2:A,sundayValue2:J}=_(t=>t.service.state),Q=k().shape({title:p().required("Please enter the title of your service or business"),category:p().required("Please select a category"),subcategory:p().required("Please select a sub category"),description:p().required("Please write a brief description of your service"),startingPrice:p().required("Please enter a minimum price for your service")}),X={title:(W=e.service)==null?void 0:W.title,category:($=e.service)==null?void 0:$.category_id,subcategory:(D=e.service)==null?void 0:D.sub_category_id,description:(R=e.service)==null?void 0:R.description,startingPrice:(B=e.service)==null?void 0:B.starting_price},V=m==null?void 0:m.map(t=>({label:t.name,value:t.id})),b=g==null?void 0:g.map(t=>({label:t.name,value:t.id})),O=t=>{var l,d;const{title:u,category:r,subcategory:z,description:G,startingPrice:i}=t,n={service_id:(l=e.service)==null?void 0:l.id,workdays_id:(d=e.service)==null?void 0:d.workdays_id,monday1:F,monday2:C,tuesday1:E,tuesday2:S,wednesday1:P,wednesday2:L,thursday1:T,thursday2:Y,friday1:M,friday2:Z,saturday1:q,saturday2:A,sunday1:I,sunday2:J,category:r,subcategory:z,title:u,description:G,starting_price:i};s(Se(n))};return U.useEffect(()=>{c!=="idle"&&(u=>{ue.push(a.jsx(de,{title:`${c==="success"?"Success":"Error"}`,type:`${c==="success"?"success":"danger"}`,duration:5e3,children:c==="success"?"Service updated successfully!":"Looks like something went wrong, please try again."}),{placement:"top-center"})})(),setTimeout(()=>{c==="success"&&(s(ee()),f(-1))},2e3),(c==="success"||c==="error")&&s(ye("idle"))},[s,f,c]),a.jsx("div",{className:"mt-8",children:a.jsx(ae,{initialValues:X,validationSchema:Q,onSubmit:(t,{resetForm:u,setSubmitting:r})=>{O(t)},children:({isSubmitting:t,touched:u,errors:r,values:z,setFieldValue:G})=>a.jsx(se,{children:a.jsxs(te,{children:[a.jsx(h,{label:"",invalid:r.title&&u.title,errorMessage:r.title,children:a.jsx(x,{type:"text",autoComplete:"off",name:"title",placeholder:"Business Name or Service Title",component:ie})}),a.jsxs("div",{className:"mt-8",children:[a.jsx("p",{className:"font-bold",children:"Set Working Hours"}),a.jsx(me,{}),a.jsx(ge,{}),a.jsx(ve,{}),a.jsx(pe,{}),a.jsx(he,{}),a.jsx(xe,{}),a.jsx(fe,{})]}),a.jsxs("div",{className:"mt-8 flex gap-4 justify-between",children:[a.jsx(h,{label:"",invalid:r.category&&u.category,className:"w-full",errorMessage:r.category,children:a.jsx(x,{name:"category",prefix:"",className:"w-full",autoComplete:"off",children:({field:i,form:n})=>{var l,d,v;return a.jsx(H,{placeholder:"Service Category",field:i,form:n,className:"w-full",isLoading:y,onInputChange:o=>{console.log(o)},options:V,defaultValue:{label:(d=(l=e.service)==null?void 0:l.category)==null?void 0:d.name,value:(v=e.service)==null?void 0:v.category_id},value:V==null?void 0:V.value,onChange:o=>{n.setFieldValue(i.name,o.value),s(je({category_id:o.value})),n.setFieldValue("subcategory","")}})}})}),a.jsx(h,{label:"",invalid:r.subcategory&&u.subcategory,className:"w-full",errorMessage:r.subcategory,children:a.jsx(x,{name:"subcategory",prefix:"",className:"w-full",autoComplete:"off",children:({field:i,form:n})=>{var l,d,v;return j||y?a.jsx("div",{className:"border-2 h-11 rounded-md",children:a.jsx(re,{size:30,loading:!0})}):a.jsx(H,{placeholder:"Sub Category",field:i,form:n,className:"w-full",isLoading:j||y,onInputChange:o=>{console.log(o)},options:b,defaultValue:{label:(d=(l=e.service)==null?void 0:l.sub_category)==null?void 0:d.name,value:(v=e.service)==null?void 0:v.category_id},value:b==null?void 0:b.value,onChange:o=>{n.setFieldValue(i.name,o.value)}})}})})]}),a.jsx(h,{label:a.jsx("p",{className:"text-gray-400",children:"Describe the nature of your services"}),labelClass:"!justify-start",invalid:r.description&&u.description,errorMessage:r.description,children:a.jsx(x,{name:"description",children:({field:i,form:n})=>a.jsx(ne,{value:i.value,onChange:l=>n.setFieldValue(i.name,l)})})}),a.jsx(h,{label:"",invalid:r.startingPrice&&u.startingPrice,errorMessage:r.startingPrice,children:a.jsx(x,{name:"startingPrice",children:({field:i,form:n})=>a.jsx(le,{thousandSeparator:!0,form:n,field:i,placeholder:"Service Starting Price",decimalScale:2,onValueChange:l=>{n.setFieldValue(i.name,l.floatValue)},value:i.value,inputPrefix:a.jsx("span",{className:"font-semibold",children:"₦"})})})}),a.jsx("div",{className:"mt-8",children:a.jsx(ce,{block:!0,variant:"solid",type:"submit",loading:N,children:"Finish"})})]})})})})};oe("service",De);const He=()=>{var S;const s=K(),{profile:f}=_(L=>L.auth.user),e=(S=f.service)==null?void 0:S.workdays,y=e==null?void 0:e.monday_start,m=e==null?void 0:e.monday_end,j=e==null?void 0:e.tuesday_start,g=e==null?void 0:e.tuesday_end,N=e==null?void 0:e.wednesday_start,c=e==null?void 0:e.wednesday_end,F=e==null?void 0:e.thursday_start,C=e==null?void 0:e.thursday_end,E=e==null?void 0:e.friday_start,P=e==null?void 0:e.friday_end,T=e==null?void 0:e.saturday_start,M=e==null?void 0:e.saturday_end,q=e==null?void 0:e.sunday_start,I=e==null?void 0:e.sunday_end;return U.useEffect(()=>{s(Ve()),s(be(y)),s(_e(m)),s(Ne(j)),s(Fe(g)),s(Ce(N)),s(Ee(c)),s(Pe(F)),s(Te(C)),s(Me(E)),s(qe(P)),s(Ie(T)),s(Le(M)),s(We(q)),s($e(I))},[]),a.jsx("div",{className:"flex h-full justify-center items-center p-8",children:a.jsxs("div",{className:"w-full h-full",children:[a.jsx("h1",{className:"font-bold text-xl text-center",children:"Your Service Details"}),a.jsx(Re,{})]})})};export{He as default};