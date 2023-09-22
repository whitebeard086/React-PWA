import{c as p,j as s,L as f,v,M as N,ap as b,aN as y,K as C}from"./index-43834327.js";const L=()=>{const{imagePath:n}=C,{history:a,loading:m}=p(e=>e.requests.data),{userType:t}=p(e=>e.auth.user);return s.jsxs("div",{className:"mt-2 p-4",children:[s.jsx("h4",{className:"mb-4",children:"Booking History"}),m?s.jsx("div",{className:"h-screen grid place-content-center",children:s.jsx(f,{loading:!0})}):(a==null?void 0:a.length)<1?s.jsx("div",{className:"min-h-[60vh] flex justify-center items-center",children:s.jsxs("p",{className:"text-3xl font-bold text-gray-400",children:["You do not have any ",s.jsx("br",{})," booking history yet"]})}):s.jsx("div",{className:"flex flex-col",children:a==null?void 0:a.map(e=>{var l,c,r,i,o,d,x,u,g,h,j;return s.jsxs(v,{children:[s.jsxs("div",{className:"flex items-center gap-4 justify-between",children:[s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(N,{size:"md",shape:"circle",icon:s.jsx(b,{}),src:t==="Client"?`${n}/${(l=e.service)==null?void 0:l.banner}`:t==="Provider"?`${n}/${(c=e.user)==null?void 0:c.image}`:null}),s.jsxs("h4",{className:"text-lg font-bold text-gray-700",children:[t==="Client"&&((r=e.service)==null?void 0:r.title),t==="Provider"&&`${(i=e.user)==null?void 0:i.first_name} ${(o=e.user)==null?void 0:o.last_name}`]})]}),t==="Provider"&&s.jsxs("p",{className:"text-lg font-semibold text-green-500",children:["+₦",(x=(d=e.invoice)==null?void 0:d.price)==null?void 0:x.toLocaleString()]}),t==="Client"&&(e.status==="completed"||e.status==="ongoing"||e.status==="pending")&&s.jsxs("p",{className:"text-lg font-semibold text-red-500",children:["-₦",(g=(u=e.invoice)==null?void 0:u.price)==null?void 0:g.toLocaleString()]}),t==="Client"&&e.status==="cancelled"&&s.jsxs("p",{className:"text-lg font-semibold text-green-500",children:["+₦",(j=(h=e.invoice)==null?void 0:h.price)==null?void 0:j.toLocaleString()]})]}),s.jsxs("div",{className:"mt-2 flex items-center gap-4 justify-between",children:[e.status==="completed"&&s.jsx("p",{className:"font-semibold text-green-500",children:e.status}),e.status==="cancelled"&&s.jsx("p",{className:"font-semibold text-red-500",children:e.status}),e.status==="ongoing"&&s.jsx("p",{className:"font-semibold text-blue-500",children:e.status}),e.status==="refunded"&&s.jsx("p",{className:"font-semibold text-orange-500",children:e.status}),s.jsx("p",{className:"font-semibold",children:y(e.created_at).format("DD MMM YYYY hh:mm a")})]})]},e.id)})})]})};export{L as default};
