import{f as o,c as d,g as c}from"./index-508e130b.js";import{a as g,b as n}from"./BrowseService-a7ed36dd.js";const i=o({name:"browse/state",initialState:{},reducers:{}}),l=i.reducer,r=d("browse/data/getBrowseData",async(t,{rejectWithValue:e})=>{try{return(await g(t)).data}catch(a){return e(a.response.data)}}),s=d("browse/data/getCategory",async(t,{rejectWithValue:e})=>{try{return(await n(t)).data}catch(a){return e(a.response.data)}}),u=o({name:"browse/data",initialState:{loading:!1,gettingCategory:!1,categories:[],services:[],category:{},status:"idle",categoryStatus:"idle"},reducers:{setStatus:(t,e)=>{t.status=e.payload}},extraReducers:t=>{t.addCase(r.pending,e=>{e.loading=!0}).addCase(r.fulfilled,(e,a)=>{e.loading=!1,e.status=a.payload.status,e.categories=a.payload.categories}).addCase(r.rejected,e=>{e.loading=!1,e.status="error"}).addCase(s.pending,e=>{e.gettingCategory=!0}).addCase(s.fulfilled,(e,a)=>{e.gettingCategory=!1,e.categoryStatus=a.payload.status,e.category=a.payload.category,e.services=a.payload.category.services}).addCase(s.rejected,e=>{e.gettingCategory=!1,e.categoryStatus="error"})}}),y=u.reducer,C=c({state:l,data:y});export{s as a,r as g,C as r};
