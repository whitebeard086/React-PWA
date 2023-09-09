import{h as B,d as m,al as G,am as W,an as Z,a as b,c as p,k as q,l as H,r as u,U as S,j as s,F,o as U,p as O,q as R,t as L,P as V,y,Y as I,Z as $,D as M,ab as J,ac as Q,n as X,M as z,ao as Y,L as ee,K as se,i as ae,E as te,ap as re,z as g,aq as oe,ar as ne,as as T}from"./index-cd793fee.js";import{u as le}from"./useAuth-0bb234bc.js";import{C as ie}from"./index.es-d4bc950f.js";import{a as ce,b as de}from"./BrowseService-6aaec19a.js";import{c as ue,d as ge}from"./HomeService-d664c6cd.js";import{C as pe}from"./CropImage-84236c3a.js";const _=B({name:"settings/state",initialState:{deleteDialog:!1,cancelDeleteDialog:!1},reducers:{toggleDeleteDialog:(t,e)=>{t.deleteDialog=e.payload},toggleCancelDeleteDialog:(t,e)=>{t.cancelDeleteDialog=e.payload}}}),{toggleDeleteDialog:D,toggleCancelDeleteDialog:A}=_.actions,xe=_.reducer,w=m("browse/data/getBrowseData",async(t,{rejectWithValue:e})=>{try{return(await ce(t)).data}catch(a){return e(a.response.data)}}),E=m("settings/data/createCategory",async(t,{rejectWithValue:e})=>{try{return(await ue(t)).data}catch(a){return e(a.response.data)}}),k=m("settings/data/updateCategory",async(t,{rejectWithValue:e})=>{try{return(await ge(t)).data}catch(a){return e(a.response.data)}}),P=m("browse/data/getCategory",async(t,{rejectWithValue:e})=>{try{return(await de(t)).data}catch(a){return e(a.response.data)}}),C=m("settings/data/uploadImage",async(t,{rejectWithValue:e})=>{try{return(await G(t)).data}catch(a){return e(a.response.data)}}),N=m("settings/data/deleteAccount",async(t,{rejectWithValue:e})=>{try{return(await W(t)).data}catch(a){return e(a.response.data)}}),v=m("settings/data/cancelDeleteAccount",async(t,{rejectWithValue:e})=>{try{return(await Z(t)).data}catch(a){return e(a.response.data)}}),K=B({name:"settings/data",initialState:{gettingCategories:!1,gettingCategory:!1,creatingCategory:!1,updatingCategory:!1,uploading:!1,deletingAccount:!1,category:{},uploadStatus:"idle",deleteStatus:"idle"},reducers:{setUploadStatus:(t,e)=>{t.uploadStatus=e.payload},setDeleteStatus:(t,e)=>{t.deleteStatus=e.payload}},extraReducers:t=>{t.addCase(E.pending,e=>{e.creatingCategory=!0}).addCase(E.fulfilled,e=>{e.creatingCategory=!1}).addCase(E.rejected,e=>{e.creatingCategory=!1}).addCase(k.pending,e=>{e.updatingCategory=!0}).addCase(k.fulfilled,e=>{e.updatingCategory=!1}).addCase(k.rejected,e=>{e.updatingCategory=!1}).addCase(w.pending,e=>{e.gettingCategories=!0}).addCase(w.fulfilled,(e,a)=>{e.gettingCategories=!1,e.categories=a.payload.categories}).addCase(w.rejected,e=>{e.gettingCategories=!1}).addCase(P.pending,e=>{e.gettingCategory=!0}).addCase(P.fulfilled,(e,a)=>{e.gettingCategory=!1,e.category=a.payload.category}).addCase(P.rejected,e=>{e.gettingCategory=!1}).addCase(C.pending,e=>{e.uploading=!0}).addCase(C.fulfilled,(e,a)=>{e.uploading=!1,e.uploadStatus=a.payload.status}).addCase(C.rejected,e=>{e.uploading=!1,e.uploadStatus="error"}).addCase(N.pending,e=>{e.deletingAccount=!0}).addCase(N.fulfilled,(e,a)=>{e.deletingAccount=!1;const{status:n}=a.payload;e.deleteStatus=n}).addCase(N.rejected,(e,a)=>{e.deletingAccount=!1;const{status:n}=a.payload;e.deleteStatus=n}).addCase(v.pending,e=>{e.deletingAccount=!0}).addCase(v.fulfilled,(e,a)=>{e.deletingAccount=!1;const{status:n}=a.payload;e.deleteStatus=n}).addCase(v.rejected,(e,a)=>{e.deletingAccount=!1;const{status:n}=a.payload;e.deleteStatus=n})}}),{setUploadStatus:me,setDeleteStatus:h}=K.actions,fe=K.reducer,he=()=>{const t=b(),{deletingAccount:e,deleteStatus:a}=p(r=>r.settings.data),n=q().shape({password:H().required("Please enter your password")}),i={password:""},o=(r,l,d,c)=>{I.push(s.jsx($,{title:d||"Error",type:l||"warning",duration:c||3e3,children:r}),{placement:"top-center"})};u.useEffect(()=>{a==="error"&&(o("Oops! Something went wrong, please try again.","danger","Error",5e3),t(h("idle")),t(D(!1))),a==="password error"&&(o("The password entered does not match your account password, please try again.","danger","Error",5e3),t(h("idle"))),a==="success"&&(o("Your account will be deleted in 72hrs, you can still cancel the process before time is up.","success","Success",6e3),t(h("idle")),t(S()),t(D(!1)))},[a,t]);const x=({password:r})=>{t(N({password:r}))};return s.jsx(F,{initialValues:i,validationSchema:n,onSubmit:r=>x(r),children:({touched:r,errors:l})=>s.jsx(U,{children:s.jsxs(O,{children:[s.jsx(R,{label:"Please Enter Your Password To Confirm",invalid:l.password&&r.password,errorMessage:l.password,children:s.jsx(L,{autoComplete:"off",name:"password",placeholder:"Enter Your Password",component:V})}),s.jsx(y,{type:"submit",variant:"solid",size:"sm",block:!0,className:"bg-red-100 !text-red-500 hover:!text-white hover:bg-red-500",loading:e,children:"Delete account"})]})})})},be=()=>{const t=b(),{deleteDialog:e}=p(n=>n.settings.state),a=()=>{t(D(!1))};return s.jsxs(M,{isOpen:e,onClose:a,onRequestClose:a,scrollable:!0,className:"overflow-y-auto",bodyOpenClassName:"overflow-hidden",contentClassName:"mt-[30vh]",title:"delete account",children:[s.jsx("h4",{className:"text-lg font-bold text-gray-700",children:"Are you sure you want to do this?"}),s.jsx("div",{className:"mt-4 overflow-y-auto",children:s.jsx(he,{})})]})},ye=()=>{const t=b(),{deletingAccount:e,deleteStatus:a}=p(r=>r.settings.data),n=q().shape({password:H().required("Please enter your password")}),i={password:""},o=(r,l,d,c)=>{I.push(s.jsx($,{title:d||"Error",type:l||"warning",duration:c||3e3,children:r}),{placement:"top-center"})};u.useEffect(()=>{a==="error"&&(o("Oops! Something went wrong, please try again.","danger","Error",5e3),t(h("idle")),t(A(!1))),a==="password error"&&(o("The password entered does not match your account password, please try again.","danger","Error",5e3),t(h("idle"))),a==="success"&&(o("Your account deletion has been canceled.","success","Success",6e3),t(h("idle")),t(S()),t(A(!1)))},[a,t]);const x=({password:r})=>{t(v({password:r}))};return s.jsx(F,{initialValues:i,validationSchema:n,onSubmit:r=>x(r),children:({touched:r,errors:l})=>s.jsx(U,{children:s.jsxs(O,{children:[s.jsx(R,{label:"Please Enter Your Password To Confirm",invalid:l.password&&r.password,errorMessage:l.password,children:s.jsx(L,{autoComplete:"off",name:"password",placeholder:"Enter Your Password",component:V})}),s.jsx(y,{type:"submit",variant:"solid",size:"sm",block:!0,className:"!bg-gray-900 hover:!bg-black",loading:e,children:"Submit"})]})})})},je=()=>{const t=b(),{cancelDeleteDialog:e}=p(n=>n.settings.state),a=()=>{t(A(!1))};return s.jsxs(M,{isOpen:e,onClose:a,onRequestClose:a,scrollable:!0,className:"overflow-y-auto",bodyOpenClassName:"overflow-hidden",contentClassName:"mt-[30vh]",title:"delete account",children:[s.jsx("h4",{className:"text-lg font-bold text-gray-700",children:"Are you sure you want to cancel this action?"}),s.jsx("div",{className:"mt-4 overflow-y-auto",children:s.jsx(ye,{})})]})},we=()=>{const t=b(),[e,a]=u.useState(!1),[n,i]=u.useState(null),[o,x]=u.useState(null);console.log(o);const{uploadStatus:r}=p(c=>c.settings.data),l=u.useCallback(()=>{t(C({image:o})),t(S())},[t,o]),d=(c,j,f)=>{c.setFieldValue(j.name,URL.createObjectURL(f[0])),i(URL.createObjectURL(f[0])),a(!0)};return u.useEffect(()=>{o!==null&&l()},[o,l]),u.useEffect(()=>{r!=="idle"&&(()=>{I.push(s.jsx($,{title:`${r==="success"?"Success":"Error"}`,type:`${r==="success"?"success":"danger"}`,duration:5e3,children:r==="success"?"Image uploaded successfully!":"Looks like something went wrong, please try again."}),{placement:"top-center"})})(),r==="success"&&t(S()),(r==="success"||r==="error")&&t(me("idle"))},[t,r]),s.jsx(F,{initialValues:{image:""},onSubmit:l,children:()=>s.jsxs(U,{className:"absolute top-[45%] right-[23%]",children:[s.jsx(O,{children:s.jsx(R,{children:s.jsx(L,{name:"banner",children:({field:c,form:j})=>s.jsx(J,{showList:!1,uploadLimit:1,onChange:f=>d(j,c,f),onFileRemove:f=>d(j,c,f),children:s.jsx(y,{type:"button",size:"xs",className:"",variant:"solid",icon:s.jsx(Q,{}),children:"Upload"})})})})}),s.jsx(pe,{photoURL:n,setOpenCrop:a,openCrop:e,aspect:1/1,setPhotoURL:i,setFile:x,onCropImage:l,maxSizeMB:.05})]})})},Ce=()=>{const{imagePath:t}=se,{profile:e,gettingUser:a}=p(i=>i.auth.user),{uploading:n}=p(i=>i.settings.data);return s.jsxs("div",{className:"flex flex-col justify-center items-center mb-8",children:[s.jsx("div",{className:X("flex items-center flex-row gap-2 cursor-pointer relative"),children:a||n?s.jsxs("div",{className:"relative",children:[s.jsx(z,{size:150,icon:s.jsx(Y,{}),src:e!=null&&e.image?`${t}/${e.image}`:null}),s.jsx("div",{className:"absolute top-0 w-full h-full grid place-content-center bg-black/50 rounded-lg",children:s.jsx(ee,{loading:!0})})]}):s.jsxs("div",{className:"relative",children:[s.jsx(z,{size:150,className:"relative",icon:e!=null&&e.image?null:s.jsx(Y,{}),src:e!=null&&e.image?`${t}/${e.image}`:null}),s.jsx(we,{})]})}),s.jsxs("div",{className:"flex flex-col justify-center items-center",children:[s.jsx("h4",{className:"text-lg font-bold text-primary-500",children:e.username}),s.jsx("p",{className:"text-base font-semibold text-primary-500",children:e.email})]})]})},Ne=ae({state:xe,data:fe});te("settings",Ne);const Pe=()=>{const{handleSignOut:t}=le(),e=b();window.OneSignal=window.OneSignal||[];const a=window.OneSignal;u.useEffect(()=>{e(w())},[]);const{userType:n,enabledNotifications:i,profile:o}=p(d=>d.auth.user);a.push(()=>{a.init({appId:"9749386f-0c3b-417c-b986-3447a73296cd",safari_web_id:"web.onesignal.auto.4d0b3421-6847-4c4b-a531-b4bcf634e4d8",allowLocalhostAsSecureOrigin:!0,autoResubscribe:!0,promptOptions:{customlink:{enabled:!0,style:"button",size:"small",color:{button:"",text:"#FFFFFF"},text:{subscribe:"Subscribe to push notifications",unsubscribe:"Unsubscribe from push notifications"},unsubscribeEnabled:!0}}})});const x=()=>{a.push(function(){a.isPushNotificationsEnabled(function(d){d?(console.log("Push notifications are enabled!"),a.setExternalUserId(o==null?void 0:o.id),i||e(T(!0))):(console.log("Push notifications are not enabled yet."),i&&e(T(!1)))})})},r=()=>{e(D(!0))},l=()=>{e(A(!0))};return s.jsxs("div",{className:"bg-white min-h-[80vh]",children:[s.jsx(Ce,{}),s.jsx("hr",{}),s.jsx("div",{className:"",children:s.jsxs("div",{children:[s.jsx("div",{onClick:()=>e(re(!0)),className:"flex items-center gap-2 transition duration-300 cursor-pointer w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",children:s.jsxs("div",{className:"w-full flex flex-col",children:[s.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Your Information"}),s.jsx("p",{className:"text xs",children:"Account details"})]})}),s.jsx(g,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/transactions",children:s.jsxs("div",{className:"w-full flex flex-col",children:[s.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Transactions"}),s.jsx("p",{className:"text xs",children:"View your transaction history"})]})}),n==="Provider"&&s.jsx(s.Fragment,{children:s.jsx(g,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/profile",children:s.jsxs("div",{className:"w-full flex flex-col",children:[s.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Provider Profile"}),s.jsx("p",{className:"text xs",children:"Edit your service provider profile"})]})})}),n==="Provider"&&s.jsx(s.Fragment,{children:s.jsx(g,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/withdraw",children:s.jsxs("div",{className:"w-full flex flex-col",children:[s.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Withdrawal Banks"}),s.jsx("p",{className:"text xs",children:"Add or Remove Bank Accounts"})]})})}),s.jsx(g,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/transaction-pin",children:s.jsxs("div",{className:"w-full flex flex-col",children:[s.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Change PIN"}),s.jsx("p",{className:"text xs",children:"Change your transaction pin"})]})}),s.jsx("div",{onClick:()=>e(oe(!0)),className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 cursor-pointer hover:bg-gray-100 border-b-gray-200 border-b-2",children:s.jsx("div",{className:"w-full flex flex-col",children:s.jsx("span",{className:"text-base font-semibold text-gray-600",children:"KYC"})})}),s.jsx(g,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/refer-and-earn",children:s.jsx("div",{className:"w-full flex flex-col",children:s.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Refer & Earn"})})}),s.jsx(g,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/help-&-support",children:s.jsx("div",{className:"w-full flex flex-col",children:s.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Help & Support"})})}),s.jsx(g,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/t-&-c",children:s.jsx("div",{className:"w-full flex flex-col",children:s.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Terms & Conditions"})})}),s.jsx(g,{className:"flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",to:"/privacy-policy",children:s.jsx("div",{className:"w-full flex flex-col",children:s.jsx("span",{className:"text-base font-semibold text-gray-600",children:"Privacy Policy"})})}),s.jsx("div",{onClick:x,className:"onesignal-customlink-container"}),s.jsxs("div",{onClick:t,className:"flex items-center gap-2 cursor-pointer transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2",children:[s.jsx("span",{className:"text-xl text-red-500 opacity-50",children:s.jsx(ne,{})}),s.jsx("span",{className:"w-full text-base font-semibold text-red-500",children:"Logout"})]}),s.jsx("div",{className:"p-4",children:(o==null?void 0:o.deactivate_at)===null?s.jsx(y,{variant:"solid",size:"sm",className:"bg-red-100 !text-red-500 hover:!text-white hover:bg-red-500",onClick:r,children:"Delete your account"}):s.jsxs("div",{className:"",children:[s.jsxs("span",{className:"text-base font-semibold text-red-500",children:["Your account will be deleted in"," ",s.jsx(ie,{daysInHours:!0,date:o==null?void 0:o.deactivate_at})]}),s.jsx(y,{variant:"solid",size:"sm",className:"!bg-gray-900 hover:!bg-black block mt-4",onClick:l,children:"Cancel"})]})})]})}),s.jsx(be,{}),s.jsx(je,{})]})};export{Pe as default};