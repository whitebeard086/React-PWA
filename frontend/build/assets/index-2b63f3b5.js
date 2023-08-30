import{a as U,r as u,c as g,Y as S,j as e,F as y,v as B,w as E,x as O,y as P,ae as $,G as C,af as I,a1 as z,a2 as T,L as D,z as R,ag as N,Q as H,ah as M,t as d,ab as m,K as Q,u as V,ai as W}from"./index-a992da42.js";import{u as G,s as K,_ as Y,r as q}from"./index-689f5ec5.js";import{C as J}from"./CropImage-b141767f.js";import{f as l}from"./formatTime-7871a97f.js";const L=()=>{var f;const t=U(),[s,c]=u.useState(!1),[o,r]=u.useState(null),[i,b]=u.useState(null);console.log(i);const{profile:h}=g(a=>a.auth.user),{uploadStatus:n}=g(a=>a.profile.data),x=u.useCallback(()=>{var a;t(G({service_id:(a=h.service)==null?void 0:a.id,banner:i})),t(S())},[t,i,(f=h.service)==null?void 0:f.id]),j=(a,_,p)=>{a.setFieldValue(_.name,URL.createObjectURL(p[0])),r(URL.createObjectURL(p[0])),c(!0)};return u.useEffect(()=>{i!==null&&x()},[i,x]),u.useEffect(()=>{n!=="idle"&&(()=>{z.push(e.jsx(T,{title:`${n==="success"?"Success":"Error"}`,type:`${n==="success"?"success":"danger"}`,duration:5e3,children:n==="success"?"Banner uploaded successfully!":"Looks like something went wrong, please try again."}),{placement:"top-center"})})(),n==="success"&&t(S()),(n==="success"||n==="error")&&t(K("idle"))},[t,n]),e.jsx(y,{initialValues:{banner:""},onSubmit:x,children:({touched:a,errors:_,values:p})=>e.jsxs(B,{className:"absolute top-4 right-4",children:[e.jsx(E,{children:e.jsx(O,{children:e.jsx(P,{name:"banner",children:({field:F,form:A})=>e.jsx($,{showList:!1,uploadLimit:1,onChange:v=>j(A,F,v),onFileRemove:v=>j(A,F,v),children:e.jsx(C,{type:"button",size:"xs",className:"!bg-blue-500 hover:!bg-blue-600",variant:"solid",icon:e.jsx(I,{}),children:"Replace Photo"})})})})}),e.jsx(J,{photoURL:o,setOpenCrop:c,openCrop:s,aspect:16/9,setPhotoURL:r,setFile:b,onCropImage:x,maxSizeMB:.15})]})})},X=()=>{var i,b,h,n,x,j,f;const{profile:t,gettingUser:s}=g(a=>a.auth.user),{uploading:c}=g(a=>a.profile.data),{imagePath:o}=H,r=(b=(i=t.service)==null?void 0:i.starting_price)==null?void 0:b.toLocaleString();return e.jsx("div",{children:e.jsxs("div",{className:"relative",children:[!((h=t.service)!=null&&h.banner)&&e.jsxs("div",{className:"h-48 w-full bg-gray-300 rounded-2xl grid place-content-center relative",children:[e.jsx(L,{}),e.jsx("img",{className:"w-14",src:"/img/gallery.png",alt:""})]}),((n=t.service)==null?void 0:n.banner)&&e.jsxs("div",{className:"h-56 w-full bg-gray-300 rounded-2xl relative",children:[(s||c)&&e.jsx("div",{className:"w-full h-56 rounded-2xl bg-black/60 absolute",children:e.jsx(D,{loading:!0})}),e.jsx(L,{}),e.jsx("img",{className:"w-full rounded-2xl h-56 object-cover",src:`${o}/${(x=t.service)==null?void 0:x.banner}`,alt:`${(j=t.service)==null?void 0:j.title} Banner`})]}),e.jsx("div",{className:"absolute w-full -bottom-10",children:e.jsxs(R,{bordered:!0,className:"bg-black w-[80%] mx-auto",children:[e.jsxs("div",{className:"flex items-center gap-4 justify-between",children:[e.jsx("h4",{className:"text-white font-bold text-lg",children:(f=t.service)==null?void 0:f.title}),e.jsxs("h5",{className:"text-primary-500 text-lg font-bold",children:["₦",r,"+"]})]}),e.jsxs("div",{className:"flex items-center gap-4 justify-between mt-2",children:[e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{className:"flex items center",children:[e.jsx(N,{className:"text-amber-200 text-md"}),e.jsx(N,{className:"text-amber-200 text-md"}),e.jsx(N,{className:"text-amber-200 text-md"}),e.jsx(N,{className:"text-amber-200 text-md"}),e.jsx(N,{className:"text-amber-200 text-md"})]})}),e.jsxs("p",{className:"text-gray-300 font-semibold",children:[Y(2300)," Orders"]})]})]})})]})})},Z=()=>{var c,o,r,i;const{profile:t}=g(b=>b.auth.user),s=(c=t.service)==null?void 0:c.workdays;return e.jsx(R,{className:"mt-14",children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("h4",{className:"py-1 px-3 font-semibold text-base rounded-md text-white bg-blue-500 w-fit",children:(r=(o=t.service)==null?void 0:o.category)==null?void 0:r.name}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-bold text-base mb-2",children:"About"}),e.jsx(M,{value:(i=t.service)==null?void 0:i.description,readOnly:!0,theme:"bubble",className:"p-0 ",style:{marginRight:"",marginLeft:"",marginBottom:"-2rem"}})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-bold text-base mb-2",children:"Working Hours"}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h4",{className:"text-blue-500 text-base font-semibold",children:"Monday"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:d((s==null?void 0:s.monday_start)==="Not Available"&&"text-red-500","text-base font-semibold"),children:l(s==null?void 0:s.monday_start)}),(s==null?void 0:s.monday_start)!=="Not Available"&&e.jsxs(e.Fragment,{children:[e.jsx(m,{className:"text-lg text-gray-500"}),e.jsx("p",{className:"text-base  font-semibold",children:l(s==null?void 0:s.monday_end)})]})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h4",{className:"text-blue-500 text-base font-semibold",children:"Tuesday"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:d((s==null?void 0:s.tuesday_start)==="Not Available"&&"text-red-500","text-base font-semibold"),children:l(s==null?void 0:s.tuesday_start)}),(s==null?void 0:s.tuesday_start)!=="Not Available"&&e.jsxs(e.Fragment,{children:[e.jsx(m,{className:"text-lg text-gray-500"}),e.jsx("p",{className:"text-base  font-semibold",children:l(s==null?void 0:s.tuesday_end)})]})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h4",{className:"text-blue-500 text-base font-semibold",children:"Wednesday"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:d((s==null?void 0:s.wednesday_start)==="Not Available"&&"text-red-500","text-base font-semibold"),children:l(s==null?void 0:s.wednesday_start)}),(s==null?void 0:s.wednesday_start)!=="Not Available"&&e.jsxs(e.Fragment,{children:[e.jsx(m,{className:"text-lg text-gray-500"}),e.jsx("p",{className:"text-base  font-semibold",children:l(s==null?void 0:s.wednesday_end)})]})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h4",{className:"text-blue-500 text-base font-semibold",children:"Thursday"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:d((s==null?void 0:s.thursday_start)==="Not Available"&&"text-red-500","text-base font-semibold"),children:l(s==null?void 0:s.thursday_start)}),(s==null?void 0:s.thursday_start)!=="Not Available"&&e.jsxs(e.Fragment,{children:[e.jsx(m,{className:"text-lg text-gray-500"}),e.jsx("p",{className:"text-base  font-semibold",children:l(s==null?void 0:s.thursday_end)})]})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h4",{className:"text-blue-500 text-base font-semibold",children:"Friday"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:d((s==null?void 0:s.friday_start)==="Not Available"&&"text-red-500","text-base font-semibold"),children:l(s==null?void 0:s.friday_start)}),(s==null?void 0:s.friday_start)!=="Not Available"&&e.jsxs(e.Fragment,{children:[e.jsx(m,{className:"text-lg text-gray-500"}),e.jsx("p",{className:"text-base  font-semibold",children:l(s==null?void 0:s.friday_end)})]})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h4",{className:"text-blue-500 text-base font-semibold",children:"Saturday"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:d((s==null?void 0:s.saturday_start)==="Not Available"&&"text-red-500","text-base font-semibold"),children:l(s==null?void 0:s.saturday_start)}),(s==null?void 0:s.saturday_start)!=="Not Available"&&e.jsxs(e.Fragment,{children:[e.jsx(m,{className:"text-lg text-gray-500"}),e.jsx("p",{className:"text-base  font-semibold",children:l(s==null?void 0:s.saturday_end)})]})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h4",{className:"text-blue-500 text-base font-semibold",children:"Sunday"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:d((s==null?void 0:s.sunday_start)==="Not Available"&&"text-red-500","text-base font-semibold"),children:l(s==null?void 0:s.sunday_start)}),(s==null?void 0:s.sunday_start)!=="Not Available"&&e.jsxs(e.Fragment,{children:[e.jsx(m,{className:"text-lg text-gray-500"}),e.jsx("p",{className:"text-base  font-semibold",children:l(s==null?void 0:s.sunday_end)})]})]})]})]})]})]})})};Q("profile",q);const te=()=>{const t=V();return e.jsxs("div",{className:"mt-4 mb-8",children:[e.jsx(X,{}),e.jsx(Z,{}),e.jsx("div",{className:"mt-4",children:e.jsx(C,{variant:"solid",block:!0,icon:e.jsx(W,{}),onClick:()=>t("/service/edit"),children:"Edit Service Information"})})]})};export{te as default};
