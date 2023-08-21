import{N as A,aF as M,ch as V,ci as G,j as e,cj as W,a8 as d,ck as E,a as U,u as Z,r as O,c as k,Z as B,A as F,G as K,L as _,a2 as q,a3 as H}from"./index-3595f095.js";import{C as J}from"./index.es-db38ad45.js";import{s as R,v as Q,a as X,u as Y}from"./index-043eeefd.js";import{u as ee}from"./useTimeOutMessage-a5f4d58e.js";const T=A.forwardRef((b,c)=>{var j,v;const{asElement:f,size:i,inputSize:g,validationPattern:m=/[0-9]{1}/,value:p,onChange:t,className:S,...a}=b,{themeColor:l,controlSize:$,primaryColorLevel:u,direction:D}=M(),w=(j=V())==null?void 0:j.size,P=(v=G())==null?void 0:v.size,h=g||P||w||$,C=new Array(i).fill("-"),x=(r,o)=>{const s=r.target,N=r.target.value;if(!m.test(N)&&N!=="")return;const I=p.split("");I[o]=N;const L=I.join("").slice(0,6);if(t(L),N){const z=s.nextElementSibling||null;z==null||z.focus()}},y=r=>{const o=r.currentTarget;if(r.key==="ArrowLeft"||r.key==="Backspace"){const s=o.previousElementSibling||null;s==null||s.focus(),s==null||s.setSelectionRange(0,1);return}if(r.key==="ArrowRight"){const s=o.nextSibling||null;s==null||s.focus(),s==null||s.setSelectionRange(0,1);return}},n=r=>{r.preventDefault();const o=r.clipboardData.getData("text").substring(0,i);t(o)};return e.jsx("div",{className:"flex gap-2",children:C.map((r,o)=>e.jsx("input",{...a,className:S||`input focus:ring-${l}-${u} focus-within:ring-${l}-${u} focus-within:border-${l}-${u} focus:border-${l}-${u} px-0 text-center input-${h} h-${W[h]}`,type:"text",inputMode:"numeric",autoComplete:"one-time-code",pattern:m.source,onInvalid:s=>s.target.setCustomValidity("Please enter a number."),maxLength:i,value:p.at(o)??"",onChange:s=>x(s,o),onKeyUp:y,onPaste:n},o))})});T.propTypes={asElement:d.string,type:d.string,className:d.string,size:d.oneOf([4,6,8]),inputSize:d.oneOf([E.LG,E.SM,E.MD]),value:d.any};T.defaultProps={type:"text",asElement:"input",className:""};const re=({onBack:b})=>{var x,y;const c=U(),f=Z(),[i,g]=O.useState(""),[m,p]=ee(),{profile:t}=k(n=>n.auth.user),{resent:S}=k(n=>n.verify.state),{status:a,verifyMessage:l,verifying:$,resending:u,timer:D}=k(n=>n.verify.data);O.useEffect(()=>{const n=()=>{q.push(e.jsx(H,{title:`${a==="success"?"Success":"Error"}`,type:`${a==="success"?"success":"danger"}`,duration:2e3,children:a==="success"?"Phone number verified successfully!":"Looks like something went wrong, please try again."}),{placement:"top-center"})};(a==="success"||a==="error")&&(p(l),g(""),n(),c(B()))},[c,f,p,a,l]),O.useEffect(()=>{a==="success"&&f("/home")},[f,a]);const w=()=>{c(R(!0)),c(X(!0)),c(Y({phone:t==null?void 0:t.phone}))},P=()=>{c(R(!1)),c(Q({phone:t==null?void 0:t.phone,otp:i}))},h=()=>{c(R(!0)),b()},C=({minutes:n,seconds:j,completed:v})=>v?e.jsx("span",{onClick:()=>w(),className:"font-bold text-gray-700 underline cursor-pointer",children:"Resend OTP"}):e.jsxs("span",{className:"font-bold text-gray-700",children:["Wait ",n,":",j," mins"]});return e.jsx("div",{className:"h-full flex flex-col justify-center p-6",children:e.jsxs("div",{className:"w-full flex flex-col gap-4 justify-center",children:[e.jsx("div",{className:"w-full flex justify-center items-center",children:e.jsx("img",{className:"w-72",src:"/img/signup.png",alt:""})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-center mt-4 text-2xl font-bold",children:"Verify Phone Number"}),S?e.jsxs("p",{className:"font-semibold text-center text-gray-400",children:["We have sent a new OTP to ",(x=t==null?void 0:t.phone)==null?void 0:x.replace(/(\d{3})(\d{4})(\d{3})(\d{4})/,"$1 $2 $3 $4")]}):e.jsxs("p",{className:"font-semibold text-center text-gray-400",children:["Enter the OTP code sent to ",(y=t==null?void 0:t.phone)==null?void 0:y.replace(/(\d{3})(\d{4})(\d{3})(\d{4})/,"$1 $2 $3 $4")]})]}),e.jsxs("div",{className:"mt-4",children:[m&&e.jsx(F,{className:"mb-4",type:a==="error"?"danger":"success",showIcon:!0,children:m}),e.jsx("form",{onSubmit:async n=>{n.preventDefault(),P()},children:e.jsxs("div",{className:"grid place-content-center bg-base-100 max-w-sm mx-auto",children:[e.jsx(T,{inputSize:"lg",size:4,value:i,onChange:n=>{g(n)}}),e.jsx(K,{className:"mt-8",block:!0,variant:"solid",type:"submit",disabled:(i==null?void 0:i.length)<4,loading:$,children:"Verify & Proceed"}),e.jsxs("div",{className:"mt-4",children:[e.jsxs("p",{className:"text-gray-400 text-center font-semibold flex w-full justify-center gap-2",children:["Didn't receive the OTP? "," ",u?e.jsx("span",{className:"inline",children:e.jsx(_,{size:22,loading:!0})}):e.jsx(J,{date:D?Date.now()+9e4:Date.now(),renderer:C})]}),e.jsx("p",{onClick:()=>h(),className:"font-bold text-gray-700 text-center underline cursor-pointer mt-2",children:"Wrong phone number?"})]})]})})]})]})})};export{re as default};
