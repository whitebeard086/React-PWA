import{j as e,z as v,U as w,ao as g,S as n,bv as N,c as m,H as R,bw as P,aV as U,T as E,a as z,r as b,bx as O,by as D,b7 as y,bz as k,a2 as A,a3 as H,bA as G,bB as T,bC as $,bD as _,bE as I,bF as V,K as W,bG as F,bH as K,G as Y,bI as J}from"./index-2aa62b4f.js";import{E as M}from"./EllipsisButton-65d7900e.js";import{s as L}from"./sendPushNotification-2a35c3f5.js";import{B as Q}from"./index-93237b3d.js";const X=()=>e.jsxs("div",{children:[e.jsx("h4",{children:"Active Bookings"}),e.jsxs("div",{className:"mt-4 mb-4 flex gap-4 overflow-auto pb-4",children:[e.jsxs(v,{className:"min-w-[10rem] w-40",bodyClass:"flex w-full flex-col justify-center items-center",children:[e.jsx(w,{size:"lg",shape:"circle",icon:e.jsx(g,{})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center items-center w-full",children:[e.jsx(n,{width:"80%"}),e.jsx(n,{width:"100%"})]})]}),e.jsxs(v,{className:"min-w-[10rem] w-40",bodyClass:"flex w-full flex-col justify-center items-center",children:[e.jsx(w,{size:"lg",shape:"circle",icon:e.jsx(g,{})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center items-center w-full",children:[e.jsx(n,{width:"80%"}),e.jsx(n,{width:"100%"})]})]}),e.jsx(v,{className:"min-w-[18rem] w-80",bodyClass:"flex w-full flex-col justify-center items-center",children:e.jsxs("div",{className:"w-full flex items-center gap-4",children:[e.jsxs("div",{className:"w-1/2 flex flex-col items-center",children:[e.jsx(w,{size:"lg",shape:"circle",icon:e.jsx(g,{})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center items-center w-full",children:[e.jsx(n,{width:"80%"}),e.jsx(n,{width:"100%"})]})]}),e.jsx(n,{width:"50%",height:"30px"})]})})]}),e.jsx("h4",{children:"Enquiries"}),e.jsxs("div",{className:"mt-4",children:[e.jsx(v,{className:"rounded-none",children:e.jsxs("div",{className:"w-full flex items-center justify-between",children:[e.jsxs("div",{className:"w-full flex gap-4 items-center",children:[e.jsx("div",{children:e.jsx(w,{size:"lg",shape:"circle",icon:e.jsx(g,{})})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center w-full",children:[e.jsx(n,{width:"40%"}),e.jsx(n,{width:"60%"})]})]}),e.jsx(N,{className:"text-xl"})]})}),e.jsx(v,{className:"rounded-none",children:e.jsxs("div",{className:"w-full flex items-center justify-between",children:[e.jsxs("div",{className:"w-full flex gap-4 items-center",children:[e.jsx("div",{children:e.jsx(w,{size:"lg",shape:"circle",icon:e.jsx(g,{})})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center w-full",children:[e.jsx(n,{width:"40%"}),e.jsx(n,{width:"60%"})]})]}),e.jsx(N,{className:"text-xl"})]})}),e.jsx(v,{className:"rounded-none",children:e.jsxs("div",{className:"w-full flex items-center justify-between",children:[e.jsxs("div",{className:"w-full flex gap-4 items-center",children:[e.jsx("div",{children:e.jsx(w,{size:"lg",shape:"circle",icon:e.jsx(g,{})})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center w-full",children:[e.jsx(n,{width:"40%"}),e.jsx(n,{width:"60%"})]})]}),e.jsx(N,{className:"text-xl"})]})}),e.jsx(v,{className:"rounded-none",children:e.jsxs("div",{className:"w-full flex items-center justify-between",children:[e.jsxs("div",{className:"w-full flex gap-4 items-center",children:[e.jsx("div",{children:e.jsx(w,{size:"lg",shape:"circle",icon:e.jsx(g,{})})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center w-full",children:[e.jsx(n,{width:"40%"}),e.jsx(n,{width:"60%"})]})]}),e.jsx(N,{className:"text-xl"})]})}),e.jsx(v,{className:"rounded-none",children:e.jsxs("div",{className:"w-full flex items-center justify-between",children:[e.jsxs("div",{className:"w-full flex gap-4 items-center",children:[e.jsx("div",{children:e.jsx(w,{size:"lg",shape:"circle",icon:e.jsx(g,{})})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center w-full",children:[e.jsx(n,{width:"40%"}),e.jsx(n,{width:"60%"})]})]}),e.jsx(N,{className:"text-xl"})]})})]})]}),Z=()=>{const{imagePath:t}=E,{enquiries:u}=m(i=>i.requests.data),{profile:o}=m(i=>i.auth.user),s=u==null?void 0:u.filter(i=>{var l;return((l=i==null?void 0:i.messages)==null?void 0:l.length)>0});return e.jsx("div",{className:"mt-4 mb-4",children:(s==null?void 0:s.length)<1?e.jsx("div",{className:"min-h-[20vh] flex flex-col justify-center",children:e.jsxs("p",{className:"text-center text-gray-400 font-bold text-2xl",children:["No enquiries, ",e.jsx("br",{})," check back later..."]})}):e.jsx("div",{children:s==null?void 0:s.map(i=>{var a,f,j,h,c,r;const l=(o==null?void 0:o.id)===((a=i==null?void 0:i.receiver)==null?void 0:a.id)?i==null?void 0:i.user:i==null?void 0:i.receiver;return e.jsx(R,{to:`/chat/${l==null?void 0:l.slug}`,state:{chat:i.id},children:e.jsx(v,{className:"rounded-none",children:e.jsxs("div",{className:"w-full flex items-center justify-between",children:[e.jsxs("div",{className:"w-full flex gap-4 items-center",children:[e.jsx("div",{children:e.jsx(w,{size:"lg",shape:"circle",src:`${t}/${((f=l.service)==null?void 0:f.banner)||(l==null?void 0:l.image)}`,icon:e.jsx(g,{})})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center w-full",children:[e.jsx("h4",{className:"text-base",children:((j=l.service)==null?void 0:j.title)||l.username}),e.jsx("p",{className:"text-gray-4b00 font-semibold",children:e.jsx(P,{text:(r=(c=i.messages[((h=i.messages)==null?void 0:h.length)-1])==null?void 0:c.message)==null?void 0:r.replace(/<[^>]*>?/gm,""),maxTextCount:60})})]})]}),e.jsx(U,{customToggleClass:"flex",placement:"top-end",renderTitle:e.jsx(M,{icon:e.jsx(N,{className:"text-xl text-gray-600"}),variant:"twoTone",shape:"round"})})]})})},i.id)})})})},q=()=>{const t=z(),{completingService:u,serviceStatus:o,booking:s}=m(c=>c.requests.data),{completeServiceDialog:i,bookingID:l}=m(c=>c.requests.state),{profile:a}=m(c=>c.auth.user),f=(c,r,x,p)=>{A.push(e.jsx(H,{title:x||"Error",type:r||"warning",duration:p||3e3,children:c}),{placement:"top-center"})};b.useEffect(()=>{o==="error"&&f("Oops! Something went wrong, please try again.","danger","Error",4e3),t(O("idle"))},[o,t]),b.useEffect(()=>{var c,r,x;o==="success"&&(L({app_id:"9749386f-0c3b-417c-b986-3447a73296cd",channel_for_external_user_ids:"push",include_external_user_ids:[`${(c=s==null?void 0:s.user)==null?void 0:c.id}`],url:`${E.appURL}/chat/${a==null?void 0:a.username.toLowerCase()}`,contents:{en:`Hello ${(r=s==null?void 0:s.user)==null?void 0:r.username}, ${a==null?void 0:a.username} has completed your service, please inspect the work and confirm if you are satisfied.`},content_available:!0}),f("We have notified the user that booked this service that it has been completed, please wait a moment for them to confirm.","success","Success",8e3)),t(D(!1)),t(O("idle")),y.emit("completedService",(x=s==null?void 0:s.user)==null?void 0:x.id,console.log("Emit Service Completed, Bookings: ",!0))},[o]);const j=()=>{t(D(!1))},h=()=>{t(G({booking_id:l}))};return e.jsx(k,{isOpen:i,onClose:j,onRequestClose:j,type:"success",title:"Service Completed?",onCancel:j,onConfirm:h,loading:u,children:e.jsx("p",{children:"Confirm that you have successfully completed this service?"})})},ee=()=>{const t=z(),{confirmingService:u,confirmStatus:o,booking:s}=m(c=>c.requests.data),{confirmServiceDialog:i,bookingID:l}=m(c=>c.requests.state),{profile:a}=m(c=>c.auth.user),f=(c,r,x,p)=>{A.push(e.jsx(H,{title:x||"Error",type:r||"warning",duration:p||3e3,children:c}),{placement:"top-center"})};b.useEffect(()=>{o==="error"&&f("Oops! Something went wrong, please try again.","danger","Error",4e3),t(T("idle"))},[o,t]),b.useEffect(()=>{var c,r,x,p,S,C;o==="success"&&(L({app_id:"9749386f-0c3b-417c-b986-3447a73296cd",channel_for_external_user_ids:"push",include_external_user_ids:[`${(r=(c=s==null?void 0:s.service)==null?void 0:c.user)==null?void 0:r.id}`],url:`${E.appURL}/chat/${a==null?void 0:a.username.toLowerCase()}`,contents:{en:`Hello ${(p=(x=s==null?void 0:s.service)==null?void 0:x.user)==null?void 0:p.username}, ${a==null?void 0:a.username} has confirmed the completion of this service, we have released the payment to your Taskitly account.`},content_available:!0}),f("Service completed and closed successfully.","success","Success",8e3)),t($(!1)),t(_(null)),y.emit("confirmedService",(C=(S=s==null?void 0:s.service)==null?void 0:S.user)==null?void 0:C.id),t(I()),t(T("idle"))},[o]);const j=()=>{t(V({booking_id:l}))},h=()=>{t($(!1)),t(_(null))};return e.jsx(k,{isOpen:i,onClose:h,onRequestClose:h,type:"success",title:"Are You Satisfied With The Service?",onCancel:h,onConfirm:j,loading:u,children:e.jsx("p",{children:"Do you confirm that this service has been satisfactorily completed and we can go ahead and release the payment to the service provider?"})})};W("requests",J);const le=()=>{const t=z(),{imagePath:u}=E,{bookings:o,booking:s,completingService:i,confirmingService:l}=m(d=>d.requests.data),{bookingID:a}=m(d=>d.requests.state),{userType:f,profile:j}=m(d=>d.auth.user),h=f==="Provider",{loading:c,serviceCompleted:r,serviceConfirmed:x}=m(d=>{var B;return(B=d.requests)==null?void 0:B.data});window.OneSignal=window.OneSignal||[];const p=window.OneSignal;p.push(()=>{p.init({appId:"9749386f-0c3b-417c-b986-3447a73296cd",safari_web_id:"web.onesignal.auto.4d0b3421-6847-4c4b-a531-b4bcf634e4d8",allowLocalhostAsSecureOrigin:!0,autoResubscribe:!0})}),b.useEffect(()=>{(r||x)&&t(I()),r?t(F(!1)):x&&t(K(!1))},[t,r,x]);const S=d=>{t(D(!0)),t(_(d==null?void 0:d.id))},C=d=>{t($(!0)),t(_(d==null?void 0:d.id))};return e.jsxs("div",{className:"mt-2 p-4",children:[c?e.jsx(X,{}):e.jsxs("div",{children:[e.jsx("h4",{children:"Active Bookings"}),e.jsx("div",{className:"mt-4 mb-4",children:e.jsx(Q,{imagePath:u,bookings:o,booking:s,completingService:i,confirmingService:l,bookingID:a,isProvider:h,onComplete:S,onConfirm:C})}),e.jsx("h4",{children:"Enquiries"}),e.jsx("div",{className:"min-h-[50vh]",children:e.jsx(Z,{})})]}),e.jsx("div",{className:"sticky bottom-24 flex justify-end mr-5",children:e.jsx(R,{to:"history",children:e.jsx(Y,{variant:"solid",children:"Booking History"})})}),e.jsx(q,{socket:y.current}),e.jsx(ee,{socket:y.current})]})};export{le as default};
