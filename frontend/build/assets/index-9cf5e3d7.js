import{r as m,j as e,S as s,z as d,R as i,c as g,O as f,H as u,Q as h,T as p,K as N,a as b,aj as w}from"./index-2aa62b4f.js";import{a as v,r as C}from"./index-a98a0150.js";import"./BrowseService-2c296ccd.js";const y=()=>{const[x,c]=m.useState("All"),n=r=>{c(r)};return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex items-center gap-4 justify-between",children:[e.jsx(s,{height:"24px",width:"60%"}),e.jsx(s,{height:"14px",width:"20%"})]}),e.jsxs("div",{children:[e.jsx(d,{bodyClass:"p-0",children:e.jsx(s,{height:"200px",width:"100%"})}),e.jsx("div",{className:"mt-4",children:e.jsx("div",{className:"flex items-center",children:e.jsxs(i.Group,{className:"w-full flex items-center justify-between",value:x,onChange:n,children:[e.jsx(i,{customLabelClass:"font-bold text-base",value:"All",children:"All"}),e.jsx(i,{customLabelClass:"font-bold text-base",value:"Online Now",children:"Online Now"}),e.jsx(i,{customLabelClass:"font-bold text-base",value:"Online 24hrs ago",children:"Online 24hrs ago"})]})})}),e.jsxs("div",{className:"mt-4 flex flex-col gap-4",children:[e.jsx(d,{children:e.jsxs("div",{className:"flex gap-4 justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4 w-3/4",children:[e.jsx("div",{className:"w-full",children:e.jsx(s,{height:"160px",width:"100%"})}),e.jsxs("div",{className:"w-full",children:[e.jsx(s,{height:"25px",width:"70%"}),e.jsx(s,{className:"mt-8",height:"25px",width:"60%"}),e.jsx(s,{className:"mt-2",height:"15px",width:"60%"})]})]}),e.jsx(s,{height:"15px",width:"10%"})]})}),e.jsx(d,{children:e.jsxs("div",{className:"flex gap-4 justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4 w-3/4",children:[e.jsx("div",{className:"w-full",children:e.jsx(s,{height:"160px",width:"100%"})}),e.jsxs("div",{className:"w-full",children:[e.jsx(s,{height:"25px",width:"70%"}),e.jsx(s,{className:"mt-8",height:"25px",width:"60%"}),e.jsx(s,{className:"mt-2",height:"15px",width:"60%"})]})]}),e.jsx(s,{height:"15px",width:"10%"})]})}),e.jsx(d,{children:e.jsxs("div",{className:"flex gap-4 justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4 w-3/4",children:[e.jsx("div",{className:"w-full",children:e.jsx(s,{height:"160px",width:"100%"})}),e.jsxs("div",{className:"w-full",children:[e.jsx(s,{height:"25px",width:"70%"}),e.jsx(s,{className:"mt-8",height:"25px",width:"60%"}),e.jsx(s,{className:"mt-2",height:"15px",width:"60%"})]})]}),e.jsx(s,{height:"15px",width:"10%"})]})})]})]})]})},S=()=>{const{imagePath:x}=p,[c,n]=m.useState("All"),r=a=>{n(a)},{category:t,services:l}=g(a=>a.browse.data);return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex items-center gap-4 justify-between",children:[e.jsx("h4",{className:"font-bold text-lg",children:t==null?void 0:t.name}),e.jsxs("p",{className:"font-semibold text-base text-primary-500",children:["(",(l==null?void 0:l.length)===1?`${l==null?void 0:l.length} Provider`:`${l==null?void 0:l.length} Providers`,")"]})]}),e.jsx(d,{bordered:!0,bodyClass:"p-0",children:e.jsx(f,{src:`${x}/${t==null?void 0:t.banner}`,alt:`${t==null?void 0:t.name}`,className:"rounded-lg h-52 w-full object-cover"})}),e.jsx("div",{className:"flex items-center",children:e.jsxs(i.Group,{className:"w-full flex items-center justify-between",value:c,onChange:r,children:[e.jsx(i,{customLabelClass:"font-bold text-base",value:"All",children:"All"}),e.jsx(i,{customLabelClass:"font-bold text-base",value:"Online",children:"Online"}),e.jsx(i,{customLabelClass:"font-bold text-base",value:"24hrs ago",children:"24hrs ago"})]})}),l.length<1?e.jsx("div",{className:"min-h-[15rem] flex justify-center items-center",children:e.jsxs("p",{className:"text-center text-lg font-bold text-gray-400",children:["No service providers available,",e.jsx("br",{})," please check back later."]})}):e.jsx("div",{className:"flex flex-col gap-4",children:l==null?void 0:l.map(a=>{var j,o;return e.jsx(u,{to:`/browse/profile/${(j=a.user)==null?void 0:j.slug}`,children:e.jsx(d,{children:e.jsxs("div",{className:"flex gap-4 justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4 w-3/4",children:[e.jsx("div",{className:"w-full",children:e.jsx(f,{src:`${x}/${(o=a.user)==null?void 0:o.image}`,alt:`${a.user.username}`,wrapperClassName:"rounded-lg",className:"rounded-lg h-48 w-full object-cover"})}),e.jsxs("div",{className:"w-full",children:[e.jsx("h4",{className:"font-bold text-lg text-gray-800 mb-4",children:a.title}),e.jsxs("h4",{className:"font-bold text-base",children:["From"," ",e.jsxs("span",{className:"text-lg text-primary-500",children:["₦",a.starting_price.toLocaleString()]})]}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{className:"flex items center",children:[e.jsx(h,{className:"text-amber-200 text-md"}),e.jsx(h,{className:"text-amber-200 text-md"}),e.jsx(h,{className:"text-amber-200 text-md"}),e.jsx(h,{className:"text-amber-200 text-md"}),e.jsx(h,{className:"text-amber-200 text-md"})]})})]})]}),e.jsx("p",{className:"font-semibold text-base text-primary-500",children:"1.2km"})]})})},a.id)})})]})};N("browse",C);const O=()=>{const x=b(),{categorySlug:c}=w(),{gettingCategory:n}=g(r=>r.browse.data);return m.useEffect(()=>{x(v({slug:c}))},[c,x]),e.jsx("div",{className:"mt-2 p-4",children:n?e.jsx("div",{children:e.jsx(y,{})}):e.jsx("div",{children:e.jsx(S,{})})})};export{O as default};