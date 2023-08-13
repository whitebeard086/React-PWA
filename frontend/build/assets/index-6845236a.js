import{h as B,i as E,bK as P,j as e,z as i,U as f,ao as j,S as t,H as R,a as N,c as h,T as D,r as v,bL as C,b7 as _,bz as k,a2 as A,a3 as I,bM as L,K as U,bN as S,bO as q,bP as F}from"./index-2aa62b4f.js";import{B as O}from"./index-93237b3d.js";import{B as H}from"./BillsComponent-fc086b1e.js";import{s as K}from"./sendPushNotification-2a35c3f5.js";import"./index.esm-46c9d8cb.js";const $=B({name:"dashboard/state",initialState:{completeServiceDialog:!1,completeService:!1,confirmServiceDialog:!1,confirmService:!1,bookingID:null},reducers:{setBookingID:(s,c)=>{s.bookingID=c.payload},setConfirmService:(s,c)=>{s.confirmService=c.payload},setCompleteService:(s,c)=>{s.completeService=c.payload},toggleCompleteServiceDialog:(s,c)=>{s.completeServiceDialog=c.payload},toggleConfirmServiceDialog:(s,c)=>{s.confirmServiceDialog=c.payload}}}),{setBookingID:T,setConfirmService:te,setCompleteService:ce,toggleConfirmServiceDialog:ae,toggleCompleteServiceDialog:y}=$.actions,V=$.reducer,G=E({state:V,data:P}),M=()=>e.jsxs("div",{children:[e.jsx("h4",{children:"Active Bookings"}),e.jsxs("div",{className:"mt-4 mb-4 flex gap-4 overflow-auto pb-4",children:[e.jsx(i,{className:"min-w-[18rem] w-80",bodyClass:"flex w-full flex-col justify-center items-center",children:e.jsxs("div",{className:"w-full flex items-center gap-4",children:[e.jsxs("div",{className:"w-1/2 flex flex-col items-center",children:[e.jsx(f,{size:"lg",shape:"circle",icon:e.jsx(j,{})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center items-center w-full",children:[e.jsx(t,{width:"80%"}),e.jsx(t,{width:"100%"})]})]}),e.jsx(t,{width:"50%",height:"30px"})]})}),e.jsx(i,{className:"min-w-[18rem] w-80",bodyClass:"flex w-full flex-col justify-center items-center",children:e.jsxs("div",{className:"w-full flex items-center gap-4",children:[e.jsxs("div",{className:"w-1/2 flex flex-col items-center",children:[e.jsx(f,{size:"lg",shape:"circle",icon:e.jsx(j,{})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center items-center w-full",children:[e.jsx(t,{width:"80%"}),e.jsx(t,{width:"100%"})]})]}),e.jsx(t,{width:"50%",height:"30px"})]})}),e.jsx(i,{className:"min-w-[18rem] w-80",bodyClass:"flex w-full flex-col justify-center items-center",children:e.jsxs("div",{className:"w-full flex items-center gap-4",children:[e.jsxs("div",{className:"w-1/2 flex flex-col items-center",children:[e.jsx(f,{size:"lg",shape:"circle",icon:e.jsx(j,{})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center items-center w-full",children:[e.jsx(t,{width:"80%"}),e.jsx(t,{width:"100%"})]})]}),e.jsx(t,{width:"50%",height:"30px"})]})})]}),e.jsx("h4",{children:"Unanswered Request Chats"}),e.jsxs("div",{className:"mt-4 mb-4 flex gap-4 overflow-auto pb-4",children:[e.jsxs(i,{className:"min-w-[10rem] w-40",bodyClass:"flex w-full flex-col justify-center items-center",children:[e.jsx(f,{size:"lg",shape:"circle",icon:e.jsx(j,{})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center items-center w-full",children:[e.jsx(t,{width:"80%"}),e.jsx(t,{width:"100%"})]})]}),e.jsxs(i,{className:"min-w-[10rem] w-40",bodyClass:"flex w-full flex-col justify-center items-center",children:[e.jsx(f,{size:"lg",shape:"circle",icon:e.jsx(j,{})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center items-center w-full",children:[e.jsx(t,{width:"80%"}),e.jsx(t,{width:"100%"})]})]}),e.jsxs(i,{className:"min-w-[10rem] w-40",bodyClass:"flex w-full flex-col justify-center items-center",children:[e.jsx(f,{size:"lg",shape:"circle",icon:e.jsx(j,{})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center items-center w-full",children:[e.jsx(t,{width:"80%"}),e.jsx(t,{width:"100%"})]})]}),e.jsxs(i,{className:"min-w-[10rem] w-40",bodyClass:"flex w-full flex-col justify-center items-center",children:[e.jsx(f,{size:"lg",shape:"circle",icon:e.jsx(j,{})}),e.jsxs("div",{className:"mt-2 flex flex-col gap-1 justify-center items-center w-full",children:[e.jsx(t,{width:"80%"}),e.jsx(t,{width:"100%"})]})]})]}),e.jsxs("div",{className:"mt-4 mb-4 w-full flex items-center gap-4 overflow-auto pb-4",children:[e.jsx(i,{className:"w-1/2 min-w-[18rem] h-40",bodyClass:"h-full",children:e.jsxs("div",{className:"w-full h-full flex flex-col gap-4 justify-center items-center",children:[e.jsx("h4",{children:"All Profile Views"}),e.jsx(t,{width:"30%",height:"15px"})]})}),e.jsx(i,{className:"w-1/2 min-w-[18rem] h-40",bodyClass:"h-full",children:e.jsxs("div",{className:"w-full h-full flex flex-col gap-4 justify-center items-center",children:[e.jsx("h4",{children:"All Service Requests"}),e.jsx(t,{width:"30%",height:"15px"})]})})]}),e.jsx("div",{className:"col-span-4 w-full mt-4",children:e.jsx(i,{className:"bg-black",children:e.jsxs("div",{children:[e.jsx("h4",{className:"text-lg font-bold mb-2 text-white",children:"Bill Payments"}),e.jsxs("div",{className:"grid grid-cols-4 gap-4",children:[e.jsx(i,{bordered:!0,bodyClass:"p-0",className:"p-0",children:e.jsx(t,{height:"60px"})}),e.jsx(i,{bordered:!0,bodyClass:"p-0",className:"p-0",children:e.jsx(t,{height:"60px"})}),e.jsx(i,{bordered:!0,bodyClass:"p-0",className:"p-0",children:e.jsx(t,{height:"60px"})}),e.jsx(i,{bordered:!0,bodyClass:"p-0",className:"p-0",children:e.jsx(t,{height:"60px"})}),e.jsx(i,{bordered:!0,bodyClass:"p-0",className:"p-0",children:e.jsx(t,{height:"60px"})}),e.jsx(i,{bordered:!0,bodyClass:"p-0",className:"p-0",children:e.jsx(t,{height:"60px"})}),e.jsx(i,{bordered:!0,bodyClass:"p-0",className:"p-0",children:e.jsx(t,{height:"60px"})}),e.jsx(i,{bordered:!0,bodyClass:"p-0",className:"p-0",children:e.jsx(t,{height:"60px"})})]})]})})})]}),W=({data:s,imagePath:c})=>{const a=s==null?void 0:s.filter(l=>{var o;return((o=l.messages)==null?void 0:o.length)>0});return e.jsx(e.Fragment,{children:(a==null?void 0:a.length)<1?e.jsx("div",{className:"min-h-[20vh] w-full flex flex-col justify-center",children:e.jsxs("p",{className:"text-center text-gray-400 font-bold text-2xl",children:["You don't have ",e.jsx("br",{})," any unanswered chats..."]})}):e.jsx(e.Fragment,{children:a==null?void 0:a.map(l=>{var o,r,d,u,m;return e.jsx(R,{to:`/chat/${(o=l.user)==null?void 0:o.slug}`,state:{chat:l.id},children:e.jsxs(i,{className:"min-w-[10rem] w-40",bodyClass:"flex w-full flex-col justify-center items-center",children:[e.jsx(f,{size:"lg",shape:"circle",icon:e.jsx(j,{}),src:(r=l.user)!=null&&r.image?`${c}/${(d=l.user)==null?void 0:d.image}`:null}),e.jsx("h4",{className:"font-semibold text-base",children:`${(u=l==null?void 0:l.user)==null?void 0:u.first_name} ${(m=l==null?void 0:l.user)==null?void 0:m.last_name}`})]})},l.id)})})})},Y=({bookingsCount:s,profile:c})=>{var a;return e.jsxs(e.Fragment,{children:[e.jsx(i,{className:"w-1/2 min-w-[18rem] h-40",bodyClass:"h-full",children:e.jsxs("div",{className:"w-full h-full flex flex-col gap-4 justify-center items-center",children:[e.jsx("h4",{className:"text-gray-600",children:"All Profile Views"}),e.jsx("h4",{className:"font-semibold",children:(a=c==null?void 0:c.profile_views)==null?void 0:a.toLocaleString()})]})}),e.jsx(i,{className:"w-1/2 min-w-[18rem] h-40",bodyClass:"h-full",children:e.jsxs("div",{className:"w-full h-full flex flex-col gap-4 justify-center items-center",children:[e.jsx("h4",{className:"text-gray-600",children:"All Service Requests"}),e.jsx("h4",{className:"font-semibold",children:s==null?void 0:s.toLocaleString()})]})})]})},J=()=>{const s=N(),{imagePath:c}=D,{enquiries:a,bookings:l,bookingsCount:o,booking:r,completingService:d,confirmingService:u}=h(x=>x.dashboard.data),{bookingID:m}=h(x=>x.dashboard.state),{profile:g,userType:n}=h(x=>x.auth.user),w=n==="Provider",p=a==null?void 0:a.filter(x=>x.messages.every(z=>z.sender_id!==(g==null?void 0:g.id)));console.log(p);const b=x=>{s(y(!0)),s(T(x==null?void 0:x.id))};return e.jsxs("div",{children:[e.jsx("h4",{children:"Active Bookings"}),e.jsx("div",{className:"mt-4 mb-4",children:e.jsx(O,{imagePath:c,bookings:l,isProvider:w,booking:r,completingService:d,confirmingService:u,bookingID:m,onComplete:b})}),e.jsx("h4",{children:"Unanswered Request Chats"}),e.jsx("div",{className:"mt-4 mb-4 flex gap-4 overflow-auto pb-4",children:e.jsx(W,{data:p,imagePath:c})}),e.jsx("div",{className:"mt-4 mb-4 w-full flex items-center gap-4 overflow-auto pb-4",children:e.jsx(Y,{bookingsCount:o,profile:g})}),e.jsx(H,{})]})},Q=()=>{const s=N(),{completingService:c,serviceStatus:a,booking:l}=h(n=>n.dashboard.data),{completeServiceDialog:o,bookingID:r}=h(n=>n.dashboard.state),{profile:d}=h(n=>n.auth.user),u=(n,w,p,b)=>{A.push(e.jsx(I,{title:p||"Error",type:w||"warning",duration:b||3e3,children:n}),{placement:"top-center"})};v.useEffect(()=>{a==="error"&&u("Oops! Something went wrong, please try again.","danger","Error",4e3),s(C("idle"))},[a,s]),v.useEffect(()=>{var n,w,p;a==="success"&&(K({app_id:"9749386f-0c3b-417c-b986-3447a73296cd",channel_for_external_user_ids:"push",include_external_user_ids:[`${(n=l==null?void 0:l.user)==null?void 0:n.id}`],url:`${D.appURL}/chat/${d==null?void 0:d.username.toLowerCase()}`,contents:{en:`Hello ${(w=l==null?void 0:l.user)==null?void 0:w.username}, ${d==null?void 0:d.username} has completed your service, please inspect the work and confirm if you are satisfied.`},content_available:!0}),u("We have notified the user that booked this service that it has been completed, please wait a moment for them to confirm.","success","Success",8e3)),s(y(!1)),s(C("idle")),_.emit("completedService",(p=l==null?void 0:l.user)==null?void 0:p.id,console.log("Emit Service Completed, Dashboard: ",!0))},[a]);const m=()=>{s(y(!1))},g=()=>{s(L({booking_id:r}))};return e.jsx(k,{isOpen:o,onClose:m,onRequestClose:m,type:"success",title:"Service Completed?",onCancel:m,onConfirm:g,loading:c,children:e.jsx("p",{children:"Confirm that you have successfully completed this service?"})})};U("dashboard",G);const ie=()=>{const s=N(),{serviceCompleted:c,serviceConfirmed:a}=h(r=>r.dashboard.data),{serviceBooked:l}=h(r=>r.chat.data),{loading:o}=h(r=>r.dashboard.data);return v.useEffect(()=>{s(S())},[s]),v.useEffect(()=>{(c||a||l)&&s(S()),c?s(q(!1)):a&&s(F(!1))},[s,c,a,l]),e.jsxs("div",{className:"mt-10 mb-8 px-4",children:[o?e.jsx(M,{}):e.jsx(J,{}),e.jsx(Q,{socket:_.current})]})};export{ie as default};