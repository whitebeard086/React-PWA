import{d as te,e as Je,f as Ke,g as Xe,h as Pe,i as Ye,k as Ze,l as Ie,m as Qe,n as Ve,r as y,u as ea,a as re,b as aa,o as sa,p as C,q as ta,c as L,j as a,t as ra,A as Z,F as na,v as ia,w as oa,x as T,y as k,z as we,L as Q,R as V,I as G,P as ye,B as la,D as q,E as ca,G as $e,H as da,J as ua,K as ma,C as pa}from"./index-3595f095.js";import{u as ha}from"./useTimeOutMessage-a5f4d58e.js";import{u as fa}from"./useAuth-2e48c85d.js";const ee=te("authentication/data/getProfileTypes",async(s,{rejectWithValue:e})=>{try{return(await Je(s)).data}catch(t){return e(t.response.data)}}),H=te("authentication/data/checkUser",async(s,{rejectWithValue:e})=>{try{return(await Ke(s)).data}catch(t){return e(t.response.data)}}),J=te("authentication/data/checkEmail",async(s,{rejectWithValue:e})=>{try{return(await Xe(s)).data}catch(t){return e(t.response.data)}}),De=Pe({name:"authentication/data",initialState:{signupData:{},checkingUsername:!1,usernameAvail:!1,checkingEmail:!1,emailAvail:!1,status:"idle",emailStatus:"idle",statusMessage:"",emailStatusMessage:"",profileTypes:[],gettingProfileTypes:!1},reducers:{setSignupData:(s,e)=>{s.signupData=e.payload}},extraReducers:s=>{s.addCase(ee.pending,e=>{e.gettingProfileTypes=!0}).addCase(ee.fulfilled,(e,t)=>{e.gettingProfileTypes=!1,e.profileTypes=t.payload.profile_types}).addCase(ee.rejected,e=>{e.gettingProfileTypes=!1}).addCase(H.pending,e=>{e.checkingUsername=!0}).addCase(H.fulfilled,(e,t)=>{e.checkingUsername=!1,e.usernameAvail=!0,e.status=t.payload.status,e.statusMessage=t.payload.message}).addCase(H.rejected,(e,t)=>{e.checkingUsername=!1,e.usernameAvail=!1,e.status=t.payload.status,e.statusMessage=t.payload.message}).addCase(J.pending,e=>{e.checkingEmail=!0}).addCase(J.fulfilled,(e,t)=>{e.checkingEmail=!1,e.emailAvail=!0,e.emailStatus=t.payload.status,e.emailStatusMessage=t.payload.message}).addCase(J.rejected,(e,t)=>{e.checkingEmail=!1,e.emailAvail=!1,e.emailStatus=t.payload.status,e.emailStatusMessage=t.payload.message})}}),{setSignupData:ga}=De.actions,xa=De.reducer,Ue=Pe({name:"authentication/state",initialState:{passwordActive:!1,pwdStatus:{characters:!1,number:!1,uppercase:!1,lowercase:!1,specialChar:!1},emailActive:!1,terms:!1,termsDialog:!1},reducers:{togglePasswordActive:(s,e)=>{s.passwordActive=e.payload},toggleEmailActive:(s,e)=>{s.emailActive=e.payload},toggleTermsDialog:(s,e)=>{s.termsDialog=e.payload},setTerms:(s,e)=>{s.terms=e.payload},setChar:(s,e)=>{s.pwdStatus.characters=e.payload},setNum:(s,e)=>{s.pwdStatus.number=e.payload},setUpCase:(s,e)=>{s.pwdStatus.uppercase=e.payload},setLoCase:(s,e)=>{s.pwdStatus.lowercase=e.payload},setSpChar:(s,e)=>{s.pwdStatus.specialChar=e.payload}}}),{togglePasswordActive:be,toggleEmailActive:es,toggleTermsDialog:se,setTerms:je,setChar:Ne,setNum:Ce,setUpCase:Te,setLoCase:ke,setSpChar:Se}=Ue.actions,va=Ue.reducer,wa=Ye({state:va,data:xa});var ya=Ze,ba=function(){return ya.Date.now()},ja=ba,Na=/\s/;function Ca(s){for(var e=s.length;e--&&Na.test(s.charAt(e)););return e}var Ta=Ca,ka=Ta,Sa=/^\s+/;function Ea(s){return s&&s.slice(0,ka(s)+1).replace(Sa,"")}var _a=Ea,Aa=_a,Ee=Ie,Ma=Qe,_e=0/0,Pa=/^[-+]0x[0-9a-f]+$/i,Ia=/^0b[01]+$/i,$a=/^0o[0-7]+$/i,Da=parseInt;function Ua(s){if(typeof s=="number")return s;if(Ma(s))return _e;if(Ee(s)){var e=typeof s.valueOf=="function"?s.valueOf():s;s=Ee(e)?e+"":e}if(typeof s!="string")return s===0?s:+s;s=Aa(s);var t=Ia.test(s);return t||$a.test(s)?Da(s.slice(2),t?2:8):Pa.test(s)?_e:+s}var qa=Ua,La=Ie,ae=ja,Ae=qa,Oa="Expected a function",Ra=Math.max,Ba=Math.min;function Wa(s,e,t){var c,u,S,h,n,x,f=0,O=!1,v=!1,E=!0;if(typeof s!="function")throw new TypeError(Oa);e=Ae(e)||0,La(t)&&(O=!!t.leading,v="maxWait"in t,S=v?Ra(Ae(t.maxWait)||0,e):S,E="trailing"in t?!!t.trailing:E);function _(i){var m=c,j=u;return c=u=void 0,f=i,h=s.apply(j,m),h}function R(i){return f=i,n=setTimeout(A,e),O?_(i):h}function w(i){var m=i-x,j=i-f,N=e-m;return v?Ba(N,S-j):N}function I(i){var m=i-x,j=i-f;return x===void 0||m>=e||m<0||v&&j>=S}function A(){var i=ae();if(I(i))return B(i);n=setTimeout(A,w(i))}function B(i){return n=void 0,E&&c?_(i):(c=u=void 0,h)}function b(){n!==void 0&&clearTimeout(n),f=0,c=x=u=n=void 0}function W(){return n===void 0?h:B(ae())}function g(){var i=ae(),m=I(i);if(c=arguments,u=this,x=i,m){if(n===void 0)return R(x);if(v)return clearTimeout(n),n=setTimeout(A,e),_(x)}return n===void 0&&(n=setTimeout(A,e)),h}return g.cancel=b,g.flush=W,g}var za=Wa;const Me=Ve(za);function Fa(s){const[e,t]=y.useState("");return y.useEffect(()=>{if(e){let c=setTimeout(()=>t(""),s||3e3);return()=>{clearTimeout(c)}}},[e]),[e,t]}function Ga(s){const[e,t]=y.useState("");return y.useEffect(()=>{if(e){let c=setTimeout(()=>t(""),s||3e3);return()=>{clearTimeout(c)}}},[e]),[e,t]}const Ha=s=>{var xe,ve;const{disableSubmit:e=!1,className:t,signInUrl:c="/login"}=s,[u,S]=y.useState(1),h=ea(),n=re(),f=((ve=(xe=aa().state)==null?void 0:xe.from)==null?void 0:ve.pathname)||"/home",O=sa().shape({username:C().required("Please enter your user name"),first_name:C().required("Please enter your first name"),last_name:C().required("Please enter your last name"),userType:C(),email:C().email("Invalid email").required("Please enter your email"),password:C().required("Please enter your password"),password_confirmation:C().oneOf([ta("password"),null],"Your passwords do not match")}),v=r=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r);let E,_,R,w,I;const{signUp:A}=fa(),B=r=>{S(r)},{status:b,statusMessage:W,emailStatus:g,emailStatusMessage:i,checkingUsername:m,checkingEmail:j,emailAvail:N,usernameAvail:z,profileTypes:Ka,gettingProfileTypes:qe}=L(r=>r.authentication.data),{passwordActive:Le,pwdStatus:{characters:ne,number:ie,uppercase:oe,lowercase:le,specialChar:ce},terms:de}=L(r=>r.authentication.state),{signedIn:ue}=L(r=>r.auth.session),{userType:M,verifiedPhone:$,hasService:K}=L(r=>r.auth.user),D=ne&&ie&&oe&&le&&ce,Oe=r=>{n(H({username:r}))},Re=Me(r=>{v(r)&&n(J({email:r}))},1e3),Be=Me(Oe,1e3),We=r=>{Be(r.target.value)},ze=r=>{Re(r.target.value)},[me,Fe]=ha(),[pe,he]=Fa(),[fe,ge]=Ga();y.useEffect(()=>{let r=f;ue&&(M==="Client"&&$?r=f:M==="Client"&&!$?r="/verify":M==="Provider"&&!K?r="/service-setup":M==="Provider"&&!$?r="/verify":M==="Provider"&&K&&$&&(r="/home"),h(r,{replace:!0}))},[f,K,h,ue,M,$]),y.useEffect(()=>{(b==="success"||b==="error")&&he(W)},[he,b,W]),y.useEffect(()=>{(g==="success"||g==="error")&&ge(i)},[g,i,ge]);const Ge=async(r,l)=>{const{username:U,password:p,email:F,password_confirmation:d,userType:P,first_name:X,last_name:o}=r;l(!0);const Y=await A({username:U,first_name:X,last_name:o,password:p,email:F,password_confirmation:d,profile_type_id:u});n(ga({username:U,email:F,userType:P===1?"Client":P===2?"Provider":null})),Y.status==="failed"&&Fe(Y.message),l(!1)},He=()=>{n(se(!0))};return a.jsxs("div",{className:ra(t,"mt-4 max-w-lg mx-auto"),children:[me&&a.jsx(Z,{className:"mb-4",type:"danger",showIcon:!0,children:me}),a.jsx(na,{initialValues:{username:"",first_name:"",last_name:"",password:"",password_confirmation:"",email:"",userType:""},validationSchema:O,onSubmit:(r,{setSubmitting:l})=>{e?l(!1):Ge(r,l)},children:({touched:r,errors:l,isSubmitting:U,values:p,setErrors:F,setFieldValue:d})=>{const P=p.password===p.password_confirmation,X=o=>{w=o.target.value,E=(w.match(/[A-Z]/g)||[]).length,_=(w.match(/[a-z]/g)||[]).length,R=(w.match(/[0-9]/g)||[]).length,I=(w.match(/\W/g)||[]).length,w.length>7?(d("password",o.target.value),n(Ne(!0))):(d("password",o.target.value),F({...l,password:"password should have at least 8 characters."}),n(Ne(!1))),E>0?(d("password",o.target.value),n(Te(!0))):(d("password",o.target.value),n(Te(!1))),_>0?(d("password",o.target.value),n(ke(!0))):(d("password",o.target.value),n(ke(!1))),R>0?(d("password",o.target.value),n(Ce(!0))):(d("password",o.target.value),n(Ce(!1))),I>0?(d("password",o.target.value),n(Se(!0))):(d("password",o.target.value),n(Se(!1)))};return a.jsx(ia,{children:a.jsxs(oa,{children:[(b==="success"||b==="error")&&pe&&a.jsx(Z,{className:"mb-4",type:z?"success":"danger",showIcon:!0,children:pe}),a.jsx(T,{label:"",invalid:l.userType&&r.userType,errorMessage:l.userType,children:a.jsx(k,{name:"userType",children:({field:o,form:Y})=>qe?a.jsx(we,{bodyClass:"p-1",className:"w-full",children:a.jsx(Q,{loading:!0})}):a.jsx("div",{className:"flex justify-center",children:a.jsxs(V.Group,{value:u,onChange:B,className:"flex w-full items-center gap-4",children:[a.jsx(V,{value:1,className:"border-2 w-full p-2 rounded-md border-gray-400 !mr-0",children:"Client"}),a.jsx(V,{value:2,className:"border-2 w-full p-2 rounded-md border-gray-400 !mr-0",children:"Provider"})]})})})}),a.jsx(T,{label:a.jsxs("div",{className:"flex items-center w-full gap-2",children:[a.jsx("p",{}),a.jsx(Q,{loading:m,customLoader:a.jsx("div",{className:"flex items-center justify-center",children:a.jsxs("div",{className:"flex gap-1 space-x-2 animate-pulse",children:[a.jsx("div",{className:"w-2 h-2 bg-green-50 rounded-full"}),a.jsx("div",{className:"w-2 h-2 bg-green-50 rounded-full"}),a.jsx("div",{className:"w-2 h-2 bg-green-50 rounded-full"})]})})})]}),invalid:l.username&&r.username,errorMessage:l.username,children:a.jsx(k,{type:"text",autoComplete:"off",name:"username",placeholder:"Username",className:`${z?"border-green-500 dark:border-green-500":!z&&p.username.length>0?"border-red-500 dark:border-red-500 focus:!ring-red-500":null}`,onChange:o=>{d("username",o.target.value),We(o)},component:G})}),a.jsx(T,{label:"",invalid:l.first_name&&r.first_name,errorMessage:l.first_name,children:a.jsx(k,{type:"text",autoComplete:"off",name:"first_name",placeholder:"First Name",component:G})}),a.jsx(T,{label:"",invalid:l.last_name&&r.last_name,errorMessage:l.last_name,children:a.jsx(k,{type:"text",autoComplete:"off",name:"last_name",placeholder:"Last Name",component:G})}),(g==="success"||g==="error")&&fe&&a.jsx(Z,{className:"mb-4",type:N?"success":"danger",showIcon:!0,children:fe}),a.jsx(T,{label:a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("p",{}),a.jsx(Q,{loading:j,customLoader:a.jsx("div",{className:"flex items-center justify-center",children:a.jsxs("div",{className:"flex gap-1 space-x-2 animate-pulse",children:[a.jsx("div",{className:"w-2 h-2 bg-green-50 rounded-full"}),a.jsx("div",{className:"w-2 h-2 bg-green-50 rounded-full"}),a.jsx("div",{className:"w-2 h-2 bg-green-50 rounded-full"})]})})})]}),invalid:l.email&&r.email,errorMessage:l.email,children:a.jsx(k,{type:"email",autoComplete:"off",name:"email",className:`${N?"border-green-500 dark:border-green-500":!N&&v(p.email)>0?"border-red-500 focus:!ring-red-500":null}`,placeholder:"Email",onChange:o=>{d("email",o.target.value),ze(o)},component:G})}),a.jsx(T,{label:"",invalid:l.password&&r.password,errorMessage:l.password,children:a.jsx(k,{autoComplete:"off",name:"password",passwordClass:`${D?"border-green-500":!D&&p.password.length>7?"border-red-500 focus:!ring-red-500":null}`,placeholder:"Password",onBlur:()=>n(be(!1)),onFocus:()=>n(be(!0)),onChange:o=>X(o),component:ye})}),Le&&a.jsx(la.div,{className:"mb-3",initial:{opacity:0},animate:{opacity:1},transition:{type:"tween",duration:.5},children:a.jsxs(we,{bordered:!0,className:"mb-4",children:[a.jsx("h4",{className:"text-sm",children:"Password must contain:"}),a.jsxs("div",{className:"p-4",children:[a.jsxs("div",{className:`flex items-center ${ne?"text-green-500":"text-red-500"}`,children:[a.jsx(q,{className:"text-3xl"}),a.jsx("p",{children:"at least 8 characters"})]}),a.jsxs("div",{className:`flex items-center ${ie?"text-green-500":"text-red-500"}`,children:[a.jsx(q,{className:"text-3xl"}),a.jsx("p",{children:"at least 1 number"})]}),a.jsxs("div",{className:`flex items-center ${oe?"text-green-500":"text-red-500"}`,children:[a.jsx(q,{className:"text-3xl"}),a.jsx("p",{children:"at least 1 uppercase"})]}),a.jsxs("div",{className:`flex items-center ${le?"text-green-500":"text-red-500"}`,children:[a.jsx(q,{className:"text-3xl"}),a.jsx("p",{children:"at least 1 lowercase"})]}),a.jsxs("div",{className:`flex items-center ${ce?"text-green-500":"text-red-500"}`,children:[a.jsx(q,{className:"text-3xl"}),a.jsx("p",{children:"at least 1 special character (: @ $ ! % * ? &)"})]})]})]})}),a.jsx(T,{label:"",invalid:l.password_confirmation&&r.password_confirmation,errorMessage:l.password_confirmation,children:a.jsx(k,{autoComplete:"off",name:"password_confirmation",passwordClass:`${D&&P?"border-green-500":(!D||!P)&&p.password.length>7?"border-red-500 focus:!ring-red-500":null}`,placeholder:"Confirm Password",component:ye})}),a.jsx("div",{className:"mt-8 mb-4",children:a.jsxs(ca,{checked:de,onChange:He,className:"text-sm",children:[" ","I agree with the"," ",a.jsx("span",{className:"font-bold cursor-pointer",children:"Terms and Policy"})," "]})}),a.jsx($e,{block:!0,loading:U,variant:"solid",type:"submit",disabled:!D||!z||!N||!P||!de||!p.first_name||!p.last_name,children:U?"Creating Account...":"Sign Up"}),a.jsxs("div",{className:"mt-2 text-center text-sm",children:[a.jsx("span",{children:"Already have an account? "}),a.jsx(da,{className:"underline font-bold text-primary-500",to:c,children:"Sign in"})]})]})})}})]})},Ja=()=>{const s=re(),{termsDialog:e}=L(u=>u.authentication.state),t=()=>{s(se(!1)),s(je(!1))},c=()=>{s(je(!0)),s(se(!1))};return a.jsxs(ua,{isOpen:e,onClose:t,title:"Privacy Policy & Terms",width:1e3,children:[a.jsx("h4",{className:"text-center",children:"Terms of Service"}),a.jsxs("div",{className:"overflow-y-auto mt-4 flex flex-col gap-4 max-h-[88vh] sm:max-h-[80vh]",children:[a.jsx("p",{children:"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"}),a.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}),a.jsx("p",{children:"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."}),a.jsx($e,{block:!0,size:"sm",variant:"solid",className:"mt-4",onClick:()=>c(),children:"Accept"})]})]})};ma("authentication",wa);const as=()=>(re(),a.jsx(pa,{className:"max-w-xl bg-white p-6",children:a.jsxs("div",{className:"w-full",children:[a.jsx("div",{className:"w-full flex justify-center",children:a.jsx("img",{className:"w-72",src:"/img/signup.png",alt:""})}),a.jsx("div",{className:"flex flex-col items-center gap-4 w-full justify-center",children:a.jsx("h1",{className:"font-bold text-lg",children:"Register to continue"})}),a.jsx(Ha,{}),a.jsx(Ja,{})]})}));export{as as default};
