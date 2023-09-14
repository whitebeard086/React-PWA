import{a as h,c as u,k as N,l as C,r as j,ak as x,al as p,W as S,j as e,F as D,o as E,p as P,q as k,t as F,P as O,y as g,$ as A,a0 as $,am as z,D as Y,an as b,ao as I,n as U,O as y,ap as w,L as R,N as T,E as q,aq as L,ar as B,z as c,as as H,at as _,au as V,av as v}from"./index-2cc994c4.js";import{u as K}from"./useAuth-ad87a33e.js";import{C as M}from"./index.es-e4e7ae4c.js";import{U as W}from"./UploadImage-3223695b.js";import"./CropImage-27c309dd.js";const G=()=>{const a=h(),{deletingAccount:s,deleteStatus:t}=u(r=>r.settings.data),o=N().shape({password:C().required("Please enter your password")}),i={password:""},l=(r,n,d,f)=>{A.push(e.jsx($,{title:d||"Error",type:n||"warning",duration:f||3e3,children:r}),{placement:"top-center"})};j.useEffect(()=>{t==="error"&&(l("Oops! Something went wrong, please try again.","danger","Error",5e3),a(x("idle")),a(p(!1))),t==="password error"&&(l("The password entered does not match your account password, please try again.","danger","Error",5e3),a(x("idle"))),t==="success"&&(l("Your account will be deleted in 72hrs, you can still cancel the process before time is up.","success","Success",6e3),a(x("idle")),a(S()),a(p(!1)))},[t,a]);const m=({password:r})=>{a(z({password:r}))};return e.jsx(D,{initialValues:i,validationSchema:o,onSubmit:r=>m(r),children:({touched:r,errors:n})=>e.jsx(E,{children:e.jsxs(P,{children:[e.jsx(k,{label:"Please Enter Your Password To Confirm",invalid:n.password&&r.password,errorMessage:n.password,children:e.jsx(F,{autoComplete:"off",name:"password",placeholder:"Enter Your Password",component:O})}),e.jsx(g,{type:"submit",variant:"solid",size:"sm",block:!0,className:"bg-red-100 !text-red-500 hover:!text-white hover:bg-red-500",loading:s,children:"Delete account"})]})})})},J=()=>{const a=h(),{deleteDialog:s}=u(o=>o.settings.state),t=()=>{a(p(!1))};return e.jsxs(Y,{isOpen:s,onClose:t,onRequestClose:t,scrollable:!0,className:"overflow-y-auto",bodyOpenClassName:"overflow-hidden",contentClassName:"mt-[30vh]",title:"delete account",children:[e.jsx("h4",{className:"text-lg font-bold text-gray-700",children:"Are you sure you want to do this?"}),e.jsx("div",{className:"mt-4 overflow-y-auto",children:e.jsx(G,{})})]})},Q=()=>{const a=h(),{deletingAccount:s,deleteStatus:t}=u(r=>r.settings.data),o=N().shape({password:C().required("Please enter your password")}),i={password:""},l=(r,n,d,f)=>{A.push(e.jsx($,{title:d||"Error",type:n||"warning",duration:f||3e3,children:r}),{placement:"top-center"})};j.useEffect(()=>{t==="error"&&(l("Oops! Something went wrong, please try again.","danger","Error",5e3),a(x("idle")),a(b(!1))),t==="password error"&&(l("The password entered does not match your account password, please try again.","danger","Error",5e3),a(x("idle"))),t==="success"&&(l("Your account deletion has been canceled.","success","Success",6e3),a(x("idle")),a(S()),a(b(!1)))},[t,a]);const m=({password:r})=>{a(I({password:r}))};return e.jsx(D,{initialValues:i,validationSchema:o,onSubmit:r=>m(r),children:({touched:r,errors:n})=>e.jsx(E,{children:e.jsxs(P,{children:[e.jsx(k,{label:"Please Enter Your Password To Confirm",invalid:n.password&&r.password,errorMessage:n.password,children:e.jsx(F,{autoComplete:"off",name:"password",placeholder:"Enter Your Password",component:O})}),e.jsx(g,{type:"submit",variant:"solid",size:"sm",block:!0,className:"!bg-gray-900 hover:!bg-black",loading:s,children:"Submit"})]})})})},X=()=>{const a=h(),{cancelDeleteDialog:s}=u(o=>o.settings.state),t=()=>{a(b(!1))};return e.jsxs(Y,{isOpen:s,onClose:t,onRequestClose:t,scrollable:!0,className:"overflow-y-auto",bodyOpenClassName:"overflow-hidden",contentClassName:"mt-[30vh]",title:"delete account",children:[e.jsx("h4",{className:"text-lg font-bold text-gray-700",children:"Are you sure you want to cancel this action?"}),e.jsx("div",{className:"mt-4 overflow-y-auto",children:e.jsx(Q,{})})]})},Z=()=>{const{imagePath:a}=T,{profile:s,gettingUser:t}=u(i=>i.auth.user),{uploading:o}=u(i=>i.settings.data);return e.jsxs("div",{className:"flex flex-col justify-center items-center mb-8",children:[e.jsx("div",{className:U("flex items-center flex-row gap-2 cursor-pointer relative"),children:t||o?e.jsxs("div",{className:"relative",children:[e.jsx(y,{size:150,icon:e.jsx(w,{}),src:s!=null&&s.image?`${a}/${s.image}`:null}),e.jsx("div",{className:"absolute top-0 w-full h-full grid place-content-center bg-black/50 rounded-lg",children:e.jsx(R,{loading:!0})})]}):e.jsxs("div",{className:"relative",children:[e.jsx(y,{size:150,className:"relative",icon:s!=null&&s.image?null:e.jsx(w,{}),src:s!=null&&s.image?`${a}/${s.image}`:null}),e.jsx(W,{})]})}),e.jsxs("div",{className:"flex flex-col justify-center items-center",children:[e.jsx("h4",{className:"text-lg font-bold text-primary-500",children:s.username}),e.jsx("p",{className:"text-base font-semibold text-primary-500",children:s.email})]})]})};q("settings",V);const le=()=>{const{handleSignOut:a}=K(),s=h();window.OneSignal=window.OneSignal||[];const t=window.OneSignal;j.useEffect(()=>{s(L())},[]);const{userType:o,enabledNotifications:i,profile:l}=u(d=>d.auth.user);t.push(()=>{t.init({appId:"9749386f-0c3b-417c-b986-3447a73296cd",safari_web_id:"web.onesignal.auto.4d0b3421-6847-4c4b-a531-b4bcf634e4d8",allowLocalhostAsSecureOrigin:!0,autoResubscribe:!0,promptOptions:{customlink:{enabled:!0,style:"button",size:"small",color:{button:"",text:"#FFFFFF"},text:{subscribe:"Subscribe to push notifications",unsubscribe:"Unsubscribe from push notifications"},unsubscribeEnabled:!0}}})});const m=()=>{t.push(function(){t.isPushNotificationsEnabled(function(d){d?(console.log("Push notifications are enabled!"),t.setExternalUserId(l==null?void 0:l.id),i||s(v(!0))):(console.log("Push notifications are not enabled yet."),i&&s(v(!1)))})})},r=()=>{s(p(!0))},n=()=>{s(b(!0))};return e.jsxs("div",{className:"bg-white min-h-[80vh]",children:[e.jsx(Z,{}),e.jsx("hr",{}),e.jsx("div",{className:"",children:e.jsxs("div",{children:[e.jsx("div",{onClick:()=>s(B(!0)),className:"flex items-center gap-2 transition duration-300 cursor-pointer w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",children:e.jsxs("div",{className:"w-full flex flex-col",children:[e.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Your Information"}),e.jsx("p",{className:"text xs",children:"Account details"})]})}),e.jsx(c,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/transactions",children:e.jsxs("div",{className:"w-full flex flex-col",children:[e.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Transactions"}),e.jsx("p",{className:"text xs",children:"View your transaction history"})]})}),o==="Provider"&&e.jsx(e.Fragment,{children:e.jsx(c,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/profile",children:e.jsxs("div",{className:"w-full flex flex-col",children:[e.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Provider Profile"}),e.jsx("p",{className:"text xs",children:"Edit your service provider profile"})]})})}),o==="Provider"&&e.jsx(e.Fragment,{children:e.jsx(c,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/withdraw",children:e.jsxs("div",{className:"w-full flex flex-col",children:[e.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Withdrawal Banks"}),e.jsx("p",{className:"text xs",children:"Add or Remove Bank Accounts"})]})})}),e.jsx(c,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/transaction-pin",children:e.jsxs("div",{className:"w-full flex flex-col",children:[e.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Change PIN"}),e.jsx("p",{className:"text xs",children:"Change your transaction pin"})]})}),e.jsx("div",{onClick:()=>s(H(!0)),className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 cursor-pointer hover:bg-gray-100 border-b-gray-200 border-b-2",children:e.jsx("div",{className:"w-full flex flex-col",children:e.jsx("span",{className:"text-base font-semibold text-gray-600",children:"KYC"})})}),e.jsx(c,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/refer-and-earn",children:e.jsx("div",{className:"w-full flex flex-col",children:e.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Refer & Earn"})})}),e.jsx(c,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/help-&-support",children:e.jsx("div",{className:"w-full flex flex-col",children:e.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Help & Support"})})}),e.jsx(c,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/t-&-c",children:e.jsx("div",{className:"w-full flex flex-col",children:e.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Terms & Conditions"})})}),e.jsx(c,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/privacy-policy",children:e.jsx("div",{className:"w-full flex flex-col",children:e.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Privacy Policy"})})}),e.jsx("div",{onClick:m,className:"onesignal-customlink-container"}),e.jsxs("div",{onClick:a,className:"flex items-center gap-2 cursor-pointer transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",children:[e.jsx("span",{className:"text-xl text-red-500 opacity-50",children:e.jsx(_,{})}),e.jsx("span",{className:"w-full text-base font-semibold text-red-500",children:"Logout"})]}),e.jsx("div",{className:"p-4",children:(l==null?void 0:l.deactivate_at)===null?e.jsx(g,{variant:"solid",size:"sm",className:"bg-red-100 !text-red-500 hover:!text-white hover:bg-red-500",onClick:r,children:"Delete your account"}):e.jsxs("div",{className:"",children:[e.jsxs("span",{className:"text-base font-semibold text-red-500",children:["Your account will be deleted in"," ",e.jsx(M,{daysInHours:!0,date:l==null?void 0:l.deactivate_at})]}),e.jsx(g,{variant:"solid",size:"sm",className:"!bg-gray-900 hover:!bg-black block mt-4",onClick:n,children:"Cancel"})]})})]})}),e.jsx(J,{}),e.jsx(X,{})]})};export{le as default};
