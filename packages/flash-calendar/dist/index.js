"use strict";var ie=Object.defineProperty,Jt=Object.defineProperties,jt=Object.getOwnPropertyDescriptor,Kt=Object.getOwnPropertyDescriptors,Ut=Object.getOwnPropertyNames,se=Object.getOwnPropertySymbols;var We=Object.prototype.hasOwnProperty,at=Object.prototype.propertyIsEnumerable;var nt=(t,n,e)=>n in t?ie(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,l=(t,n)=>{for(var e in n||(n={}))We.call(n,e)&&nt(t,e,n[e]);if(se)for(var e of se(n))at.call(n,e)&&nt(t,e,n[e]);return t},y=(t,n)=>Jt(t,Kt(n));var K=(t,n)=>{var e={};for(var a in t)We.call(t,a)&&n.indexOf(a)<0&&(e[a]=t[a]);if(t!=null&&se)for(var a of se(t))n.indexOf(a)<0&&at.call(t,a)&&(e[a]=t[a]);return e};var Qt=(t,n)=>{for(var e in n)ie(t,e,{get:n[e],enumerable:!0})},qt=(t,n,e,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of Ut(n))!We.call(t,r)&&r!==e&&ie(t,r,{get:()=>n[r],enumerable:!(a=jt(n,r))||a.enumerable});return t};var zt=t=>qt(ie({},"__esModule",{value:!0}),t);var dn={};Qt(dn,{Calendar:()=>ln,activeDateRangesEmitter:()=>U,buildCalendar:()=>Le,fromDateId:()=>W,getHeightForMonth:()=>ae,toDateId:()=>S,useCalendar:()=>me,useCalendarList:()=>we,useDateRange:()=>Lt,useOptimizedDayMetadata:()=>fe});module.exports=zt(dn);var ne=require("react");var J=require("react"),F=require("react-native");function rt(t){return{all:t=t||new Map,on:function(n,e){var a=t.get(n);a?a.push(e):t.set(n,[e])},off:function(n,e){var a=t.get(n);a&&(e?a.splice(a.indexOf(e)>>>0,1):t.set(n,[]))},emit:function(n,e){var a=t.get(n);a&&a.slice().map(function(r){r(e)}),(a=t.get("*"))&&a.slice().map(function(r){r(n,e)})}}}var Z=require("react");var dt=require("react");function S(t){let n=t.getFullYear(),e=t.getMonth()+1,a=t.getDate(),r=e<10?`0${e}`:e,o=a<10?`0${a}`:a;return`${n}-${r}-${o}`}function W(t){let[n,e,a]=t.split("-").map(Number);return new Date(n,e-1,a)}function V(t){return new Date(t.getFullYear(),t.getMonth(),1)}function ot(t){let n=new Date(t.getFullYear(),t.getMonth()+1,1),e=new Date(n.getTime()-1);return new Date(e)}function st(t,n){let e=new Date(t.getTime()),a=e.getDay();if(a===0&&n==="monday")return e.setDate(e.getDate()-6),e;let o=a-(n==="monday"?1:0);return e.setDate(e.getDate()-o),e}function le(t,n){let e=new Date(t);return e.setMonth(e.getMonth()+n),e}function Te(t,n){let e=new Date(t);return e.setMonth(e.getMonth()-n),e}function _(t,n){let e=new Date(t);return e.setDate(e.getDate()+n),e}function it(t,n){let e=new Date(t);return e.setDate(e.getDate()-n),e}function de(t){let n=t.getDay();return n===0||n===6}function ce(t,n){let e=t.getFullYear()-n.getFullYear(),a=t.getMonth()-n.getMonth();return e*12+a}function He(t,n){let a=new Date(t.getFullYear(),t.getMonth(),1).getDay();n==="monday"&&(a=a===0?6:a-1);let r=new Date(t.getFullYear(),t.getMonth()+1,0).getDate();return Math.ceil((a+r)/7)}function lt(t,n){let a=new Date(t.getFullYear(),t.getMonth(),1).getDay();n==="monday"&&(a=a===0?6:a-1);let r=t.getDate();return Math.floor((a+r-1)/7)+1}var pe=(t,n,e=1)=>Array.from({length:(n-t)/e+1},(a,r)=>t+r*e);var Yt=(t,n)=>{let e=t.getDay();return n==="sunday"?e:e===0?6:e-1},X=({todayId:t,id:n,calendarActiveDateRanges:e,calendarDisabledDateIds:a,calendarHighSeasonsDateRange:r,calendarSpecialDateRange:o,calendarStayDateRange:s})=>{let c=e==null?void 0:e.find(({startId:D,endId:I})=>D&&I?n>=D&&n<=I:D?n===D:I?n===I:!1),i=s==null?void 0:s.find(({startId:D,endId:I})=>D&&I?n>=D&&n<=I:D?n===D:I?n===I:!1),d=(c==null?void 0:c.startId)!==void 0&&c.endId!==void 0,g=(i==null?void 0:i.startId)!==void 0&&i.endId!==void 0,u=d||g,b=a==null?void 0:a.includes(n),h=o==null?void 0:o.find(({dateId:D})=>D===n),m=!!(r!=null&&r.includes(n)),f=t===n,p=c?"active":i!=null&&i.stayId?"stay":b?"disabled":"idle",C=[];return m&&C.push("high-season"),h&&C.push("special-date"),f&&C.push("today"),{isStartOfRange:n===(c==null?void 0:c.startId)||n===(i==null?void 0:i.startId),isEndOfRange:n===(c==null?void 0:c.endId)||n===(i==null?void 0:i.endId),isRangeValid:u,state:p,types:C,isHighSeasonDate:m,specialDate:h,stayDate:i==null?void 0:i.stayId}},$t=(t,n)=>new Intl.DateTimeFormat(n,{month:"long",year:"numeric"}).format(t),_t=(t,n)=>new Intl.DateTimeFormat(n,{weekday:"narrow"}).format(t),Xt=(t,n)=>new Intl.DateTimeFormat(n,{day:"numeric"}).format(t),Le=t=>{let{calendarMonthId:n,calendarFirstDayOfWeek:e="sunday",calendarFormatLocale:a="en-US",getCalendarMonthFormat:r=$t,getCalendarWeekDayFormat:o=_t,getCalendarDayFormat:s=Xt}=t,c=W(n),i=V(c),d=S(i),g=ot(c),u=S(g),b=Yt(i,e),h=e==="sunday"?0:1,m=e==="sunday"?6:0,f=S(new Date),p=it(i,b),C=[[...pe(1,b).map(()=>{let M=S(p),O=l({date:p,displayLabel:s(p,a),id:M,isDifferentMonth:!0,isEndOfMonth:!1,isEndOfWeek:p.getDay()===m,isStartOfMonth:!1,isStartOfWeek:p.getDay()===h,isWeekend:de(p)},X(y(l({},t),{todayId:f,id:M})));return p=_(p,1),O})]];for(;p.getMonth()===i.getMonth();){C[C.length-1].length===7&&C.push([]);let O=S(p);C[C.length-1].push(l({date:p,displayLabel:s(p,a),id:O,isDifferentMonth:!1,isEndOfMonth:O===u,isEndOfWeek:p.getDay()===m,isStartOfMonth:O===d,isStartOfWeek:p.getDay()===h,isWeekend:de(p)},X(y(l({},t),{todayId:f,id:O})))),p=_(p,1)}let D=C[C.length-1],I=7-D.length;D.push(...pe(1,I).map(()=>{let M=S(p),O=l({date:p,displayLabel:s(p,a),id:M,isDifferentMonth:!0,isEndOfMonth:!1,isEndOfWeek:p.getDay()===m,isStartOfMonth:!1,isStartOfWeek:p.getDay()===h,isWeekend:de(p)},X(y(l({},t),{todayId:f,id:M})));return p=_(p,1),O}));let x=st(c,e),N=pe(1,7).map(M=>o(_(x,M-1),a));return{weeksList:C,calendarRowMonth:r(c,a),weekDaysList:N}},me=t=>(0,dt.useMemo)(()=>Le(t),[t]);var U=rt(),ct="flash-calendar-default-instance",fe=(t,n)=>{let[e,a]=(0,Z.useState)(t),r=n!=null?n:ct;return(0,Z.useEffect)(()=>{a(t)},[t]),(0,Z.useEffect)(()=>{let o=s=>{let{ranges:c,disabledRanges:i,specialDateRanges:d,stayDateRange:g,highSeasonRange:u,instanceId:b=ct}=s;if(b!==r)return;let h=X({id:e.id,calendarActiveDateRanges:c,calendarDisabledDateIds:i,calendarSpecialDateRange:d,calendarStayDateRange:g,calendarHighSeasonsDateRange:u});Object.entries(h).every(([f,p])=>typeof p=="object"?JSON.stringify(p)===JSON.stringify(e[f]):p===e[f])||a(f=>l(l({},f),h))};return U.on("onSetActiveDateRanges",o),()=>{U.off("onSetActiveDateRanges",o)}},[t,r,e]),e};var gt=require("react-native");var pt={spacing:{0:0,2:2,4:4,6:6,8:8,12:12,16:16,20:20,24:24}},ye=y(l({},pt),{colors:{content:{disabled:"#B0B0B0",primary:"#000000",secondary:"#212121",inverse:{primary:"#FFFFFF"}},background:{primary:"#FFFFFF",tertiary:"#EDEFEE",tertiaryPressed:"#D1D2D3",inverse:{primary:"#000000"}},borders:{default:"#E0E0E0"},transparent:"transparent"}}),mt=y(l({},pt),{colors:{content:{disabled:"#bdbdbd",primary:"#FFFFFF",secondary:"#e8e8e8",inverse:{primary:"#000000"}},background:{primary:"#000000",tertiary:"#111111",tertiaryPressed:"#212121",inverse:{primary:"#FFFFFF"}},borders:{default:"#5c5c5c"},transparent:"transparent"}});var Q=require("react"),Ct=require("react/jsx-runtime"),ft=(0,Q.createContext)({colorScheme:void 0}),yt=({children:t,colorScheme:n})=>{let e=(0,Q.useMemo)(()=>({colorScheme:n}),[n]);return(0,Ct.jsx)(ft.Provider,{value:e,children:t})},ut=()=>(0,Q.useContext)(ft);var v=()=>{let t=(0,gt.useColorScheme)(),{colorScheme:n}=ut();return(n!=null?n:t)==="dark"?mt:ye};var T=require("react/jsx-runtime"),H=F.StyleSheet.create({baseContainer:{padding:6,alignItems:"center",justifyContent:"center",borderRadius:16,flex:1},baseContent:{textAlign:"center"}}),Zt=t=>{let n=y(l({},H.baseContent),{color:t.colors.content.primary});return{active:({isPressed:e,isHovered:a,isStartOfRange:r,isEndOfRange:o})=>{let s=e||a?{container:y(l({},H.baseContainer),{backgroundColor:t.colors.background.tertiary}),content:y(l({},n),{color:t.colors.content.primary})}:{container:y(l({},H.baseContainer),{backgroundColor:t.colors.background.inverse.primary}),content:y(l({},n),{color:t.colors.content.inverse.primary})};return s.container.borderRadius=0,r&&(s.container.borderTopLeftRadius=16,s.container.borderBottomLeftRadius=16),o&&(s.container.borderTopRightRadius=16,s.container.borderBottomRightRadius=16),!r&&!o&&(s.container.borderRadius=0),s},disabled:()=>({container:H.baseContainer,content:y(l({},n),{color:t.colors.content.disabled})}),stay:()=>({container:H.baseContainer,content:n}),idle:({isPressed:e,isHovered:a})=>e||a?{container:y(l({},H.baseContainer),{backgroundColor:t.colors.background.tertiary}),content:y(l({},n),{color:t.colors.content.primary})}:{container:H.baseContainer,content:n},today:({isPressed:e,isHovered:a})=>e||a?{container:y(l({},H.baseContainer),{backgroundColor:t.colors.background.tertiaryPressed}),content:n}:{container:y(l({},H.baseContainer),{borderColor:t.colors.borders.default,borderStyle:"solid",borderWidth:1}),content:n}}},Ae=({onPress:t,children:n,theme:e,height:a,metadata:r,textProps:o})=>{let s=v(),c=(0,J.useMemo)(()=>Zt(s),[s]),i=(0,J.useCallback)(()=>{t(r.id,r)},[r,t]);return(0,T.jsx)(F.Pressable,{disabled:r.state==="disabled",onPress:i,style:({pressed:d,hovered:g,focused:u})=>{var p,C,D,I;let b={isPressed:d,isHovered:g,isFocused:u,isEndOfRange:(p=r.isEndOfRange)!=null?p:!1,isStartOfRange:(C=r.isStartOfRange)!=null?C:!1},{container:h}=c[r.state](b),m=l({},h);m.borderRadius=0,b.isStartOfRange&&(m.borderTopLeftRadius=16,m.borderBottomLeftRadius=16),b.isEndOfRange&&(m.borderTopRightRadius=16,m.borderBottomRightRadius=16),!b.isStartOfRange&&!b.isEndOfRange&&(m.borderRadius=0);let f=r.types.reduce((x,N)=>{var M;return x=l(l({},x),(M=e==null?void 0:e[N])==null?void 0:M.call(e,y(l({},r),{isPressed:d})).container),x},{});return l(l(l(y(l({},m),{height:a}),f),(D=e==null?void 0:e.base)==null?void 0:D.call(e,y(l({},r),{isPressed:d})).container),(I=e==null?void 0:e[r.state])==null?void 0:I.call(e,y(l({},r),{isPressed:d})).container)},children:({pressed:d,hovered:g,focused:u})=>{var f,p,C,D,I;let b={isPressed:d,isHovered:g,isFocused:u,isEndOfRange:(f=r.isEndOfRange)!=null?f:!1,isStartOfRange:(p=r.isStartOfRange)!=null?p:!1},{content:h}=c[r.state](b),m=r.types.reduce((x,N)=>{var M;return x=l(l({},x),(M=e==null?void 0:e[N])==null?void 0:M.call(e,y(l({},r),{isPressed:d})).content),x},{});return(0,T.jsx)(F.Text,y(l({},o),{style:l(l(l(l(l({},h),(C=o==null?void 0:o.style)!=null?C:{}),m),(D=e==null?void 0:e.base)==null?void 0:D.call(e,y(l({},r),{isPressed:d,isHovered:g,isFocused:u})).content),(I=e==null?void 0:e[r.state])==null?void 0:I.call(e,y(l({},r),{isPressed:d,isHovered:g,isFocused:u})).content),children:n}))}})},ee=({children:t,isStartOfWeek:n,shouldShowActiveDayFiller:e,shouldShowSpecialDateDot:a,theme:r,daySpacing:o,dayHeight:s,stay:c})=>{let i=v(),d=(0,J.useMemo)(()=>l({position:"relative",marginLeft:n?0:o,flex:1,height:s},r==null?void 0:r.spacer),[s,o,n,r==null?void 0:r.spacer]),g=(0,J.useMemo)(()=>e?l({position:"absolute",top:0,bottom:0,right:-(o+1),width:o+2,backgroundColor:i.colors.background.inverse.primary},c?r==null?void 0:r.stayDayFiller:r==null?void 0:r.activeDayFiller):null,[i.colors.background.inverse.primary,o,e,r==null?void 0:r.activeDayFiller,r==null?void 0:r.stayDayFiller,c]),u=(0,J.useMemo)(()=>a?l({alignSelf:"center",width:4,height:4,borderRadius:2,backgroundColor:i.colors.background.inverse.primary},r==null?void 0:r.specialDateDot):null,[a,i.colors.background.inverse.primary,r==null?void 0:r.specialDateDot]);return(0,T.jsxs)(F.View,{style:d,children:[t,g?(0,T.jsx)(F.View,{style:g}):null,u?(0,T.jsx)(F.View,{style:y(l({},F.StyleSheet.absoluteFillObject),{alignContent:"center",alignItems:"center",justifyContent:"flex-end"}),children:(0,T.jsx)(F.View,{style:u})}):null]})},ue=({children:t,metadata:n,onPress:e,theme:a,dayHeight:r,daySpacing:o,containerTheme:s,calendarInstanceId:c})=>{let i=fe(n,c);return(0,T.jsx)(ee,{dayHeight:r,daySpacing:o,isStartOfWeek:i.isStartOfWeek,shouldShowActiveDayFiller:i.isRangeValid&&!i.isEndOfWeek?!i.isEndOfRange:!1,shouldShowSpecialDateDot:!!i.specialDate,stay:i.stayDate,theme:s,children:(0,T.jsx)(Ae,{height:r,metadata:i,onPress:e,theme:a,children:t})})};var Ce=require("react"),ge=require("react-native");var Dt=require("react/jsx-runtime"),en=ge.StyleSheet.create({container:{padding:6,flex:1}}),De=(0,Ce.memo)(function(n){let{height:e,theme:a}=n,r=(0,Ce.useMemo)(()=>[y(l({},en.container),{height:e}),a==null?void 0:a.container],[e,a==null?void 0:a.container]);return(0,Dt.jsx)(ge.View,{style:r})});var bt=require("react"),q=require("react-native");var Ne=require("react/jsx-runtime"),ht=q.StyleSheet.create({container:{alignItems:"center",flex:1,justifyContent:"center",padding:ye.spacing[6]},content:{}}),he=({children:t,height:n,theme:e,textProps:a})=>{let{colors:r}=v(),{containerStyles:o,contentStyles:s}=(0,bt.useMemo)(()=>{let c=[ht.container,{height:n},e==null?void 0:e.container],i=[ht.content,{color:r.content.primary},a==null?void 0:a.style,e==null?void 0:e.content];return{containerStyles:c,contentStyles:i}},[r.content.primary,n,e==null?void 0:e.container,e==null?void 0:e.content,a==null?void 0:a.style]);return(0,Ne.jsx)(q.View,{style:o,children:(0,Ne.jsx)(q.Text,y(l({},a),{style:s,children:t}))})};var It=require("react"),z=require("react-native");var Be=require("react/jsx-runtime"),St=z.StyleSheet.create({container:{width:"100%",alignItems:"center",justifyContent:"center"},content:{textAlign:"center",width:"100%"}}),be=({children:t,height:n,theme:e})=>{let a=v(),{containerStyles:r,contentStyles:o}=(0,It.useMemo)(()=>{let s=[St.container,{height:n},e==null?void 0:e.container],c=[St.content,{color:a.colors.content.primary},e==null?void 0:e.content];return{containerStyles:s,contentStyles:c}},[a.colors.content.primary,n,e==null?void 0:e.container,e==null?void 0:e.content]);return(0,Be.jsx)(z.View,{style:r,children:(0,Be.jsx)(z.Text,{style:o,children:t})})};var Rt=require("react"),wt=require("react-native");var Mt=require("react"),Se=require("react-native"),kt=require("react/jsx-runtime"),tn=Se.StyleSheet.create({container:{alignItems:"center",flexDirection:"row",flexGrow:0,flexShrink:0,flexWrap:"nowrap",justifyContent:"flex-start"}}),Ie=({alignItems:t,children:n,justifyContent:e="flex-start",grow:a=!1,shrink:r=!1,spacing:o=0,wrap:s="nowrap",backgroundColor:c,width:i,style:d={}})=>{let g=(0,Mt.useMemo)(()=>[tn.container,{gap:o},a?{flexGrow:1}:{},r?{flexShrink:1}:{},s?{flexWrap:s}:{},t?{alignItems:t}:{},e?{justifyContent:e}:{},c?{backgroundColor:c}:{},i?{width:i}:{},d],[t,c,a,e,r,o,d,i,s]);return(0,kt.jsx)(Se.View,{style:g,children:n})};var xt=require("react/jsx-runtime"),nn=wt.StyleSheet.create({container:{width:"100%"}}),te=({children:t,spacing:n=0,theme:e})=>{let{containerStyles:a}=(0,Rt.useMemo)(()=>{var r;return{containerStyles:l(l({},nn.container),(r=e==null?void 0:e.container)!=null?r:{})}},[e==null?void 0:e.container]);return(0,xt.jsx)(Ie,{alignItems:"center",grow:!0,justifyContent:"space-between",spacing:n,style:a,children:t})};var L=require("react"),Me=require("react-native");var Ve=require("react/jsx-runtime"),an=Me.StyleSheet.create({container:{flexDirection:"column"}});function rn(t){return(0,L.isValidElement)(t)&&t.type===L.Fragment}function ke({children:t,spacing:n=0,alignItems:e,justifyContent:a,grow:r}){let o=(0,L.useMemo)(()=>y(l({},an.container),{gap:n,alignItems:e,justifyContent:a,flex:r?1:void 0}),[e,r,a,n]);return(0,Ve.jsx)(Me.View,{style:o,children:L.Children.toArray(t).map(s=>rn(s)?s.props.children:s).flat().filter(s=>s!==null&&typeof s!="undefined").map((s,c)=>(0,Ve.jsx)(L.Fragment,{children:s},c))})}var Ft=t=>t.charAt(0).toUpperCase()+t.slice(1);var P=require("react/jsx-runtime"),on=(0,ne.memo)(function(n){let m=n,{calendarInstanceId:e,calendarRowVerticalSpacing:a=8,calendarRowHorizontalSpacing:r=8,calendarDayHeight:o=32,calendarMonthHeaderHeight:s=20,calendarWeekHeaderHeight:c=o,onCalendarDayPress:i,theme:d}=m,g=K(m,["calendarInstanceId","calendarRowVerticalSpacing","calendarRowHorizontalSpacing","calendarDayHeight","calendarMonthHeaderHeight","calendarWeekHeaderHeight","onCalendarDayPress","theme"]),{calendarRowMonth:u,weeksList:b,weekDaysList:h}=me(g);return(0,P.jsxs)(ke,{alignItems:"center",spacing:a,children:[(0,P.jsx)(be,{height:s,theme:d==null?void 0:d.rowMonth,children:Ft(u)}),(0,P.jsx)(te,{spacing:8,theme:d==null?void 0:d.rowWeek,children:h.map((f,p)=>(0,P.jsx)(he,{height:c,theme:d==null?void 0:d.itemWeekName,children:f},p))}),b.map((f,p)=>(0,P.jsx)(te,{children:f.map(C=>C.isDifferentMonth?(0,P.jsx)(ee,{dayHeight:o,daySpacing:r,isStartOfWeek:C.isStartOfWeek,theme:d==null?void 0:d.itemDayContainer,children:(0,P.jsx)(De,{height:o,theme:d==null?void 0:d.itemEmpty})},C.id):(0,P.jsx)(ue,{calendarInstanceId:e,containerTheme:d==null?void 0:d.itemDayContainer,dayHeight:o,daySpacing:r,metadata:C,onPress:i,theme:d==null?void 0:d.itemDay,children:C.displayLabel},C.id))},p))]})}),Re=(0,ne.memo)(function(n){let u=n,{calendarInstanceId:e,calendarActiveDateRanges:a,calendarDisabledDateIds:r,calendarSpecialDateRange:o,calendarStayDateRange:s,calendarHighSeasonsDateRange:c,calendarMonthId:i,calendarColorScheme:d}=u,g=K(u,["calendarInstanceId","calendarActiveDateRanges","calendarDisabledDateIds","calendarSpecialDateRange","calendarStayDateRange","calendarHighSeasonsDateRange","calendarMonthId","calendarColorScheme"]);return(0,ne.useEffect)(()=>{U.emit("onSetActiveDateRanges",{instanceId:e,ranges:a!=null?a:[],disabledRanges:r!=null?r:[],specialDateRanges:o!=null?o:[],stayDateRange:s!=null?s:[],highSeasonRange:c!=null?c:[]})},[a,r,o,s,c,e,i]),(0,P.jsx)(yt,{colorScheme:d,children:(0,P.jsx)(on,y(l({},g),{calendarInstanceId:e,calendarMonthId:i}))})});var Wt=require("@shopify/flash-list"),k=require("react"),Tt=require("react-native");var A=require("react");function Pt(t,n,e,a,r,o,s,c,i){switch(arguments.length){case 1:return t;case 2:return n(t);case 3:return e(n(t));case 4:return a(e(n(t)));case 5:return r(a(e(n(t))));case 6:return o(r(a(e(n(t)))));case 7:return s(o(r(a(e(n(t))))));case 8:return c(s(o(r(a(e(n(t)))))));case 9:return i(c(s(o(r(a(e(n(t))))))));default:{let d=arguments[0];for(let g=1;g<arguments.length;g++)d=arguments[g](d);return d}}}var Ge=(t,n,e="sunday")=>{let a=S(t),r=S(n);if(r<a)return[];let o=[{id:S(t),date:t,numberOfWeeks:He(t,e)}];if(a===r)return o;let s=ce(n,t);for(let c=1;c<=s;c++){let i=le(t,c),d=He(i,e);o.push({id:S(i),date:i,numberOfWeeks:d})}return o},Ot=(t,n,e)=>{let a=le(e,t),r=S(a),o=n!=null?n:r;return r>o?W(o):a},Et=(t,n,e)=>{let a=Te(e,t),r=S(a),o=n!=null?n:r;return o>r?Pt(W(o),V):a},we=({calendarInitialMonthId:t,calendarPastScrollRangeInMonths:n,calendarFutureScrollRangeInMonths:e,calendarFirstDayOfWeek:a,calendarMaxDateId:r,calendarMinDateId:o})=>{let{initialMonth:s,initialMonthId:c}=(0,A.useMemo)(()=>{let m=t?W(t):W(S(new Date)),f=V(m);return{initialMonth:f,initialMonthId:S(f)}},[t]),[i,d]=(0,A.useState)(()=>{let m=V(s),f=Et(n,o,m),p=Ot(e,r,m);return Ge(f,p,a)}),g=(0,A.useCallback)(m=>{let f=le(i[i.length-1].date,1),p=Ot(Math.max(m-1,0),r,f),C=Ge(f,p,a),D=[...i,...C];return d(D),D},[a,r,i]),u=(0,A.useCallback)(m=>{let f=Te(i[0].date,1),p=Et(Math.max(m-1,0),o,f),D=[...Ge(p,f,a),...i];return d(D),D},[a,o,i]),b=(0,A.useCallback)(m=>{let f=i[0],p=i[i.length-1];return m>p.id?g(ce(W(m),p.date)):u(ce(f.date,W(m)))},[g,i,u]),h=(0,A.useMemo)(()=>i.findIndex(f=>f.id===c),[c,i]);return{monthList:i,initialMonthIndex:h,appendMonths:g,prependMonths:u,addMissingMonths:b}},ae=({calendarRowVerticalSpacing:t,calendarDayHeight:n,calendarWeekHeaderHeight:e,calendarMonthHeaderHeight:a,calendarAdditionalHeight:r,calendarMonth:o,calendarSpacing:s})=>{let c=a+t+e+t,i=n*o.numberOfWeeks+(o.numberOfWeeks-1)*t;return c+i+r+s};var xe=require("react/jsx-runtime"),sn=t=>t.id,Ht=(0,k.memo)((0,k.forwardRef)(function(n,e){let Ze=n,{calendarInitialMonthId:a,calendarPastScrollRangeInMonths:r=12,calendarFutureScrollRangeInMonths:o=12,calendarFirstDayOfWeek:s="sunday",CalendarScrollComponent:c=Wt.FlashList,calendarFormatLocale:i,calendarSpacing:d=20,calendarRowHorizontalSpacing:g,calendarRowVerticalSpacing:u=8,calendarMonthHeaderHeight:b=20,calendarDayHeight:h=32,calendarWeekHeaderHeight:m=h,calendarAdditionalHeight:f=0,calendarColorScheme:p,theme:C,onEndReached:D}=Ze,et=K(Ze,["calendarInitialMonthId","calendarPastScrollRangeInMonths","calendarFutureScrollRangeInMonths","calendarFirstDayOfWeek","CalendarScrollComponent","calendarFormatLocale","calendarSpacing","calendarRowHorizontalSpacing","calendarRowVerticalSpacing","calendarMonthHeaderHeight","calendarDayHeight","calendarWeekHeaderHeight","calendarAdditionalHeight","calendarColorScheme","theme","onEndReached"]),{calendarActiveDateRanges:x,calendarStayDateRange:N,calendarHighSeasonsDateRange:M,calendarSpecialDateRange:O,calendarDisabledDateIds:je,calendarInstanceId:Ke,calendarMaxDateId:Pe,calendarMinDateId:Oe,getCalendarDayFormat:Ue,getCalendarMonthFormat:Qe,getCalendarWeekDayFormat:qe,onCalendarDayPress:ze}=et,At=K(et,["calendarActiveDateRanges","calendarStayDateRange","calendarHighSeasonsDateRange","calendarSpecialDateRange","calendarDisabledDateIds","calendarInstanceId","calendarMaxDateId","calendarMinDateId","getCalendarDayFormat","getCalendarMonthFormat","getCalendarWeekDayFormat","onCalendarDayPress"]),Ye=(0,k.useMemo)(()=>({calendarActiveDateRanges:x,calendarStayDateRange:N,calendarHighSeasonsDateRange:M,calendarSpecialDateRange:O,calendarColorScheme:p,calendarDayHeight:h,calendarDisabledDateIds:je,calendarFirstDayOfWeek:s,calendarFormatLocale:i,calendarInstanceId:Ke,calendarMaxDateId:Pe,calendarMinDateId:Oe,calendarMonthHeaderHeight:b,calendarRowHorizontalSpacing:g,calendarRowVerticalSpacing:u,calendarWeekHeaderHeight:m,getCalendarDayFormat:Ue,getCalendarMonthFormat:Qe,getCalendarWeekDayFormat:qe,onCalendarDayPress:ze,theme:C}),[p,x,N,M,O,h,je,s,i,Pe,Oe,b,g,u,m,Ue,Qe,qe,Ke,ze,C]),{initialMonthIndex:Nt,monthList:re,appendMonths:$e,addMissingMonths:_e}=we({calendarFirstDayOfWeek:s,calendarFutureScrollRangeInMonths:o,calendarPastScrollRangeInMonths:r,calendarInitialMonthId:a,calendarMaxDateId:Pe,calendarMinDateId:Oe}),Bt=(0,k.useMemo)(()=>re.map(R=>y(l({},R),{calendarProps:Ye})),[Ye,re]),Vt=(0,k.useCallback)(()=>{$e(o),D==null||D()},[$e,o,D]),Gt=(0,k.useCallback)((R,E)=>{let w=ae({calendarMonth:E,calendarSpacing:d,calendarDayHeight:h,calendarMonthHeaderHeight:b,calendarRowVerticalSpacing:u,calendarAdditionalHeight:f,calendarWeekHeaderHeight:m});R.size=w},[f,h,b,u,d,m]),Xe=(0,k.useCallback)(R=>{let E=S(V(R)),w=re,B=w.findIndex(G=>G.id===E);return B===-1&&(w=_e(E),B=w.findIndex(G=>G.id===E)),w.slice(0,B).reduce((G,Ee)=>{let $=ae({calendarMonth:Ee,calendarSpacing:d,calendarDayHeight:h,calendarMonthHeaderHeight:b,calendarRowVerticalSpacing:u,calendarWeekHeaderHeight:m,calendarAdditionalHeight:f});return G+$},0)},[_e,f,h,b,u,d,m,re]),oe=(0,k.useRef)(null);(0,k.useImperativeHandle)(e,()=>({scrollToMonth(R,E,{additionalOffset:w=0}={additionalOffset:0}){setTimeout(()=>{var B;(B=oe.current)==null||B.scrollToOffset({offset:Xe(R)+w,animated:E})},0)},scrollToDate(R,E,{additionalOffset:w=0}={additionalOffset:0}){var tt;let B=Xe(R),G=lt(R,s),Ee=h+u,$=m+Ee*G;$=$-u,(tt=oe.current)==null||tt.scrollToOffset({offset:B+$+w,animated:E})},scrollToOffset(R,E){var w;(w=oe.current)==null||w.scrollToOffset({offset:R,animated:E})}}));let vt=(0,k.useMemo)(()=>({paddingBottom:d}),[d]);return(0,xe.jsx)(c,l({data:Bt,estimatedItemSize:273,initialScrollIndex:Nt,keyExtractor:sn,onEndReached:Vt,overrideItemLayout:Gt,ref:oe,renderItem:({item:R})=>(0,xe.jsx)(Tt.View,{style:vt,children:(0,xe.jsx)(Re,l({calendarMonthId:R.id},R.calendarProps))}),showsVerticalScrollIndicator:!1},At))}));var ve=Ae;ve.Container=ee;ve.WithContainer=ue;var Fe={};Fe.Day=ve;Fe.WeekName=he;Fe.Empty=De;var Je={};Je.Month=be;Je.Week=te;var Y=Re;Y.Item=Fe;Y.Row=Je;Y.List=Ht;Y.HStack=Ie;Y.VStack=ke;var ln=Y;var j=require("react");var Lt=(t={startId:void 0,endId:void 0})=>{let[n,e]=(0,j.useState)(t),a=(0,j.useCallback)(o=>{e(s=>!s.startId&&!s.endId?{startId:o,endId:void 0}:s.startId&&s.endId?{startId:o,endId:void 0}:s.startId&&!s.endId?o<s.startId?{startId:o,endId:s.startId}:y(l({},s),{endId:o}):{startId:o,endId:o})},[]),r=(0,j.useCallback)(()=>{e({startId:void 0,endId:void 0})},[]);return(0,j.useMemo)(()=>{let o=!n.startId&&!n.endId?[]:[n],s=!!(n.startId&&n.endId);return{dateRange:n,calendarActiveDateRanges:o,onClearDateRange:r,onCalendarDayPress:a,isDateRangeValid:s}},[n,a,r])};0&&(module.exports={Calendar,activeDateRangesEmitter,buildCalendar,fromDateId,getHeightForMonth,toDateId,useCalendar,useCalendarList,useDateRange,useOptimizedDayMetadata});
//# sourceMappingURL=index.js.map