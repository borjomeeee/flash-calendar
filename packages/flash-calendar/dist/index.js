"use strict";var ie=Object.defineProperty,Jt=Object.defineProperties,jt=Object.getOwnPropertyDescriptor,Kt=Object.getOwnPropertyDescriptors,Ut=Object.getOwnPropertyNames,se=Object.getOwnPropertySymbols;var We=Object.prototype.hasOwnProperty,at=Object.prototype.propertyIsEnumerable;var nt=(t,n,e)=>n in t?ie(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,l=(t,n)=>{for(var e in n||(n={}))We.call(n,e)&&nt(t,e,n[e]);if(se)for(var e of se(n))at.call(n,e)&&nt(t,e,n[e]);return t},g=(t,n)=>Jt(t,Kt(n));var j=(t,n)=>{var e={};for(var a in t)We.call(t,a)&&n.indexOf(a)<0&&(e[a]=t[a]);if(t!=null&&se)for(var a of se(t))n.indexOf(a)<0&&at.call(t,a)&&(e[a]=t[a]);return e};var Qt=(t,n)=>{for(var e in n)ie(t,e,{get:n[e],enumerable:!0})},qt=(t,n,e,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of Ut(n))!We.call(t,r)&&r!==e&&ie(t,r,{get:()=>n[r],enumerable:!(a=jt(n,r))||a.enumerable});return t};var zt=t=>qt(ie({},"__esModule",{value:!0}),t);var dn={};Qt(dn,{Calendar:()=>ln,activeDateRangesEmitter:()=>K,buildCalendar:()=>Le,fromDateId:()=>E,getHeightForMonth:()=>ne,toDateId:()=>b,useCalendar:()=>me,useCalendarList:()=>Fe,useDateRange:()=>Lt,useOptimizedDayMetadata:()=>fe});module.exports=zt(dn);var te=require("react");var G=require("react"),F=require("react-native");function rt(t){return{all:t=t||new Map,on:function(n,e){var a=t.get(n);a?a.push(e):t.set(n,[e])},off:function(n,e){var a=t.get(n);a&&(e?a.splice(a.indexOf(e)>>>0,1):t.set(n,[]))},emit:function(n,e){var a=t.get(n);a&&a.slice().map(function(r){r(e)}),(a=t.get("*"))&&a.slice().map(function(r){r(n,e)})}}}var X=require("react");var dt=require("react");function b(t){let n=t.getFullYear(),e=t.getMonth()+1,a=t.getDate(),r=e<10?`0${e}`:e,o=a<10?`0${a}`:a;return`${n}-${r}-${o}`}function E(t){let[n,e,a]=t.split("-").map(Number);return new Date(n,e-1,a)}function B(t){return new Date(t.getFullYear(),t.getMonth(),1)}function ot(t){let n=new Date(t.getFullYear(),t.getMonth()+1,1),e=new Date(n.getTime()-1);return new Date(e)}function st(t,n){let e=new Date(t.getTime()),a=e.getDay();if(a===0&&n==="monday")return e.setDate(e.getDate()-6),e;let o=a-(n==="monday"?1:0);return e.setDate(e.getDate()-o),e}function le(t,n){let e=new Date(t);return e.setMonth(e.getMonth()+n),e}function Te(t,n){let e=new Date(t);return e.setMonth(e.getMonth()-n),e}function $(t,n){let e=new Date(t);return e.setDate(e.getDate()+n),e}function it(t,n){let e=new Date(t);return e.setDate(e.getDate()-n),e}function de(t){let n=t.getDay();return n===0||n===6}function ce(t,n){let e=t.getFullYear()-n.getFullYear(),a=t.getMonth()-n.getMonth();return e*12+a}function He(t,n){let a=new Date(t.getFullYear(),t.getMonth(),1).getDay();n==="monday"&&(a=a===0?6:a-1);let r=new Date(t.getFullYear(),t.getMonth()+1,0).getDate();return Math.ceil((a+r)/7)}function lt(t,n){let a=new Date(t.getFullYear(),t.getMonth(),1).getDay();n==="monday"&&(a=a===0?6:a-1);let r=t.getDate();return Math.floor((a+r-1)/7)+1}var pe=(t,n,e=1)=>Array.from({length:(n-t)/e+1},(a,r)=>t+r*e);var Yt=(t,n)=>{let e=t.getDay();return n==="sunday"?e:e===0?6:e-1},_=({todayId:t,id:n,calendarActiveDateRanges:e,calendarDisabledDateIds:a,calendarHighSeasonsDateRange:r,calendarSpecialDateRange:o,calendarStayDateRange:s})=>{let d=e==null?void 0:e.find(({startId:f,endId:y})=>f&&y?n>=f&&n<=y:f?n===f:y?n===y:!1),i=s==null?void 0:s.find(({startId:f,endId:y})=>f&&y?n>=f&&n<=y:f?n===f:y?n===y:!1),p=(d==null?void 0:d.startId)!==void 0&&d.endId!==void 0,D=(i==null?void 0:i.startId)!==void 0&&i.endId!==void 0,h=p||D,S=a==null?void 0:a.includes(n),C=o==null?void 0:o.find(({dateId:f})=>f===n),u=!!(r!=null&&r.includes(n)),m=t===n,c=["idle"];return u&&c.push("high-season"),C&&c.push("special-date"),m&&c.push("today"),S&&c.push("disabled"),d&&c.push("active"),i&&c.push("stay"),{isStartOfRange:n===(d==null?void 0:d.startId)||n===(i==null?void 0:i.startId),isEndOfRange:n===(d==null?void 0:d.endId)||n===(i==null?void 0:i.endId),isRangeValid:h,state:c,isHighSeasonDate:u,specialDate:C,stayDate:i==null?void 0:i.stayId}},$t=(t,n)=>new Intl.DateTimeFormat(n,{month:"long",year:"numeric"}).format(t),_t=(t,n)=>new Intl.DateTimeFormat(n,{weekday:"narrow"}).format(t),Xt=(t,n)=>new Intl.DateTimeFormat(n,{day:"numeric"}).format(t),Le=t=>{let{calendarMonthId:n,calendarFirstDayOfWeek:e="sunday",calendarFormatLocale:a="en-US",getCalendarMonthFormat:r=$t,getCalendarWeekDayFormat:o=_t,getCalendarDayFormat:s=Xt}=t,d=E(n),i=B(d),p=b(i),D=ot(d),h=b(D),S=Yt(i,e),C=e==="sunday"?0:1,u=e==="sunday"?6:0,m=b(new Date),c=it(i,S),f=[[...pe(1,S).map(()=>{let x=b(c),P=l({date:c,displayLabel:s(c,a),id:x,isDifferentMonth:!0,isEndOfMonth:!1,isEndOfWeek:c.getDay()===u,isStartOfMonth:!1,isStartOfWeek:c.getDay()===C,isWeekend:de(c)},_(g(l({},t),{todayId:m,id:x})));return c=$(c,1),P})]];for(;c.getMonth()===i.getMonth();){f[f.length-1].length===7&&f.push([]);let P=b(c);f[f.length-1].push(l({date:c,displayLabel:s(c,a),id:P,isDifferentMonth:!1,isEndOfMonth:P===h,isEndOfWeek:c.getDay()===u,isStartOfMonth:P===p,isStartOfWeek:c.getDay()===C,isWeekend:de(c)},_(g(l({},t),{todayId:m,id:P})))),c=$(c,1)}let y=f[f.length-1],W=7-y.length;y.push(...pe(1,W).map(()=>{let x=b(c),P=l({date:c,displayLabel:s(c,a),id:x,isDifferentMonth:!0,isEndOfMonth:!1,isEndOfWeek:c.getDay()===u,isStartOfMonth:!1,isStartOfWeek:c.getDay()===C,isWeekend:de(c)},_(g(l({},t),{todayId:m,id:x})));return c=$(c,1),P}));let I=st(d,e),ae=pe(1,7).map(x=>o($(I,x-1),a));return{weeksList:f,calendarRowMonth:r(d,a),weekDaysList:ae}},me=t=>(0,dt.useMemo)(()=>Le(t),[t]);var K=rt(),ct="flash-calendar-default-instance",fe=(t,n)=>{let[e,a]=(0,X.useState)(t),r=n!=null?n:ct;return(0,X.useEffect)(()=>{a(t)},[t]),(0,X.useEffect)(()=>{let o=s=>{let{ranges:d,disabledRanges:i,specialDateRanges:p,stayDateRange:D,highSeasonRange:h,instanceId:S=ct}=s;if(S!==r)return;let C=_({id:e.id,calendarActiveDateRanges:d,calendarDisabledDateIds:i,calendarSpecialDateRange:p,calendarStayDateRange:D,calendarHighSeasonsDateRange:h});Object.entries(C).every(([m,c])=>typeof c=="object"?JSON.stringify(c)===JSON.stringify(e[m]):c===e[m])||a(m=>l(l({},m),C))};return K.on("onSetActiveDateRanges",o),()=>{K.off("onSetActiveDateRanges",o)}},[t,r,e]),e};var gt=require("react-native");var pt={spacing:{0:0,2:2,4:4,6:6,8:8,12:12,16:16,20:20,24:24}},ye=g(l({},pt),{colors:{content:{disabled:"#B0B0B0",primary:"#000000",secondary:"#212121",inverse:{primary:"#FFFFFF"}},background:{primary:"#FFFFFF",tertiary:"#EDEFEE",tertiaryPressed:"#D1D2D3",inverse:{primary:"#000000"}},borders:{default:"#E0E0E0"},transparent:"transparent"}}),mt=g(l({},pt),{colors:{content:{disabled:"#bdbdbd",primary:"#FFFFFF",secondary:"#e8e8e8",inverse:{primary:"#000000"}},background:{primary:"#000000",tertiary:"#111111",tertiaryPressed:"#212121",inverse:{primary:"#FFFFFF"}},borders:{default:"#5c5c5c"},transparent:"transparent"}});var U=require("react"),Ct=require("react/jsx-runtime"),ft=(0,U.createContext)({colorScheme:void 0}),yt=({children:t,colorScheme:n})=>{let e=(0,U.useMemo)(()=>({colorScheme:n}),[n]);return(0,Ct.jsx)(ft.Provider,{value:e,children:t})},ut=()=>(0,U.useContext)(ft);var v=()=>{let t=(0,gt.useColorScheme)(),{colorScheme:n}=ut();return(n!=null?n:t)==="dark"?mt:ye};var T=require("react/jsx-runtime"),H=F.StyleSheet.create({baseContainer:{padding:6,alignItems:"center",justifyContent:"center",borderRadius:16,flex:1},baseContent:{textAlign:"center"}}),Zt=t=>{let n=g(l({},H.baseContent),{color:t.colors.content.primary});return{active:({isPressed:e,isHovered:a,isStartOfRange:r,isEndOfRange:o})=>{let s=e||a?{container:g(l({},H.baseContainer),{backgroundColor:t.colors.background.tertiary}),content:g(l({},n),{color:t.colors.content.primary})}:{container:g(l({},H.baseContainer),{backgroundColor:t.colors.background.inverse.primary}),content:g(l({},n),{color:t.colors.content.inverse.primary})};return s.container.borderRadius=0,r&&(s.container.borderTopLeftRadius=16,s.container.borderBottomLeftRadius=16),o&&(s.container.borderTopRightRadius=16,s.container.borderBottomRightRadius=16),!r&&!o&&(s.container.borderRadius=0),s},disabled:()=>({container:H.baseContainer,content:g(l({},n),{color:t.colors.content.disabled})}),stay:()=>({container:H.baseContainer,content:n}),idle:({isPressed:e,isHovered:a})=>e||a?{container:g(l({},H.baseContainer),{backgroundColor:t.colors.background.tertiary}),content:g(l({},n),{color:t.colors.content.primary})}:{container:H.baseContainer,content:n},today:({isPressed:e,isHovered:a})=>e||a?{container:g(l({},H.baseContainer),{backgroundColor:t.colors.background.tertiaryPressed}),content:n}:{container:g(l({},H.baseContainer),{borderColor:t.colors.borders.default,borderStyle:"solid",borderWidth:1}),content:n}}},Ae=({onPress:t,children:n,theme:e,height:a,metadata:r,textProps:o})=>{let s=v(),d=(0,G.useMemo)(()=>Zt(s),[s]),i=(0,G.useCallback)(()=>{t(r.id,r)},[r,t]);return(0,T.jsx)(F.Pressable,{disabled:r.state.includes("disabled"),onPress:i,style:({pressed:p,hovered:D,focused:h})=>{var c,f;let S={isPressed:p,isHovered:D,isFocused:h,isEndOfRange:(c=r.isEndOfRange)!=null?c:!1,isStartOfRange:(f=r.isStartOfRange)!=null?f:!1},C={};C.borderRadius=0,S.isStartOfRange&&(C.borderTopLeftRadius=16,C.borderBottomLeftRadius=16),S.isEndOfRange&&(C.borderTopRightRadius=16,C.borderBottomRightRadius=16),!S.isStartOfRange&&!S.isEndOfRange&&(C.borderRadius=0);let u=r.state.reduce((y,W)=>{var I;return y=l(l({},y),(I=d==null?void 0:d[W])==null?void 0:I.call(d,l(l({},S),r)).container),y},{}),m=r.state.reduce((y,W)=>{var I;return y=l(l({},y),(I=e==null?void 0:e[W])==null?void 0:I.call(e,l(l({},S),r)).container),y},{});return l(l(l({height:a},u),C),m)},children:({pressed:p,hovered:D,focused:h})=>{var m,c,f;let S={isPressed:p,isHovered:D,isFocused:h,isEndOfRange:(m=r.isEndOfRange)!=null?m:!1,isStartOfRange:(c=r.isStartOfRange)!=null?c:!1},C=r.state.reduce((y,W)=>{var I;return y=l(l({},y),(I=d==null?void 0:d[W])==null?void 0:I.call(d,l(l({},S),r)).content),y},{}),u=r.state.reduce((y,W)=>{var I;return y=l(l({},y),(I=e==null?void 0:e[W])==null?void 0:I.call(e,l(l({},S),r)).content),y},{});return(0,T.jsx)(F.Text,g(l({},o),{style:l(l(l({},(f=o==null?void 0:o.style)!=null?f:{}),C),u),children:n}))}})},Z=({children:t,isStartOfWeek:n,shouldShowActiveDayFiller:e,shouldShowSpecialDateDot:a,theme:r,daySpacing:o,dayHeight:s,stay:d})=>{let i=v(),p=(0,G.useMemo)(()=>l({position:"relative",marginLeft:n?0:o,flex:1,height:s},r==null?void 0:r.spacer),[s,o,n,r==null?void 0:r.spacer]),D=(0,G.useMemo)(()=>e?l({position:"absolute",top:0,bottom:0,right:-(o+1),width:o+2,backgroundColor:i.colors.background.inverse.primary},d?r==null?void 0:r.stayDayFiller:r==null?void 0:r.activeDayFiller):null,[i.colors.background.inverse.primary,o,e,r==null?void 0:r.activeDayFiller,r==null?void 0:r.stayDayFiller,d]),h=(0,G.useMemo)(()=>a?l({alignSelf:"center",width:4,height:4,borderRadius:2,backgroundColor:i.colors.background.inverse.primary},r==null?void 0:r.specialDateDot):null,[a,i.colors.background.inverse.primary,r==null?void 0:r.specialDateDot]);return(0,T.jsxs)(F.View,{style:p,children:[t,D?(0,T.jsx)(F.View,{style:D}):null,h?(0,T.jsx)(F.View,{style:g(l({},F.StyleSheet.absoluteFillObject),{alignContent:"center",alignItems:"center",justifyContent:"flex-end"}),children:(0,T.jsx)(F.View,{style:h})}):null]})},ue=({children:t,metadata:n,onPress:e,theme:a,dayHeight:r,daySpacing:o,containerTheme:s,calendarInstanceId:d})=>{let i=fe(n,d);return(0,T.jsx)(Z,{dayHeight:r,daySpacing:o,isStartOfWeek:i.isStartOfWeek,shouldShowActiveDayFiller:i.isRangeValid&&!i.isEndOfWeek?!i.isEndOfRange:!1,shouldShowSpecialDateDot:!!i.specialDate,stay:i.stayDate,theme:s,children:(0,T.jsx)(Ae,{height:r,metadata:i,onPress:e,theme:a,children:t})})};var Ce=require("react"),ge=require("react-native");var ht=require("react/jsx-runtime"),en=ge.StyleSheet.create({container:{padding:6,flex:1}}),he=(0,Ce.memo)(function(n){let{height:e,theme:a}=n,r=(0,Ce.useMemo)(()=>[g(l({},en.container),{height:e}),a==null?void 0:a.container],[e,a==null?void 0:a.container]);return(0,ht.jsx)(ge.View,{style:r})});var St=require("react"),Q=require("react-native");var Ne=require("react/jsx-runtime"),Dt=Q.StyleSheet.create({container:{alignItems:"center",flex:1,justifyContent:"center",padding:ye.spacing[6]},content:{}}),De=({children:t,height:n,theme:e,textProps:a})=>{let{colors:r}=v(),{containerStyles:o,contentStyles:s}=(0,St.useMemo)(()=>{let d=[Dt.container,{height:n},e==null?void 0:e.container],i=[Dt.content,{color:r.content.primary},a==null?void 0:a.style,e==null?void 0:e.content];return{containerStyles:d,contentStyles:i}},[r.content.primary,n,e==null?void 0:e.container,e==null?void 0:e.content,a==null?void 0:a.style]);return(0,Ne.jsx)(Q.View,{style:o,children:(0,Ne.jsx)(Q.Text,g(l({},a),{style:s,children:t}))})};var It=require("react"),q=require("react-native");var Be=require("react/jsx-runtime"),bt=q.StyleSheet.create({container:{width:"100%",alignItems:"center",justifyContent:"center"},content:{textAlign:"center",width:"100%"}}),Se=({children:t,height:n,theme:e})=>{let a=v(),{containerStyles:r,contentStyles:o}=(0,It.useMemo)(()=>{let s=[bt.container,{height:n},e==null?void 0:e.container],d=[bt.content,{color:a.colors.content.primary},e==null?void 0:e.content];return{containerStyles:s,contentStyles:d}},[a.colors.content.primary,n,e==null?void 0:e.container,e==null?void 0:e.content]);return(0,Be.jsx)(q.View,{style:r,children:(0,Be.jsx)(q.Text,{style:o,children:t})})};var Rt=require("react"),Ft=require("react-native");var Mt=require("react"),be=require("react-native"),kt=require("react/jsx-runtime"),tn=be.StyleSheet.create({container:{alignItems:"center",flexDirection:"row",flexGrow:0,flexShrink:0,flexWrap:"nowrap",justifyContent:"flex-start"}}),Ie=({alignItems:t,children:n,justifyContent:e="flex-start",grow:a=!1,shrink:r=!1,spacing:o=0,wrap:s="nowrap",backgroundColor:d,width:i,style:p={}})=>{let D=(0,Mt.useMemo)(()=>[tn.container,{gap:o},a?{flexGrow:1}:{},r?{flexShrink:1}:{},s?{flexWrap:s}:{},t?{alignItems:t}:{},e?{justifyContent:e}:{},d?{backgroundColor:d}:{},i?{width:i}:{},p],[t,d,a,e,r,o,p,i,s]);return(0,kt.jsx)(be.View,{style:D,children:n})};var wt=require("react/jsx-runtime"),nn=Ft.StyleSheet.create({container:{width:"100%"}}),ee=({children:t,spacing:n=0,theme:e})=>{let{containerStyles:a}=(0,Rt.useMemo)(()=>{var r;return{containerStyles:l(l({},nn.container),(r=e==null?void 0:e.container)!=null?r:{})}},[e==null?void 0:e.container]);return(0,wt.jsx)(Ie,{alignItems:"center",grow:!0,justifyContent:"space-between",spacing:n,style:a,children:t})};var L=require("react"),Me=require("react-native");var Ve=require("react/jsx-runtime"),an=Me.StyleSheet.create({container:{flexDirection:"column"}});function rn(t){return(0,L.isValidElement)(t)&&t.type===L.Fragment}function ke({children:t,spacing:n=0,alignItems:e,justifyContent:a,grow:r}){let o=(0,L.useMemo)(()=>g(l({},an.container),{gap:n,alignItems:e,justifyContent:a,flex:r?1:void 0}),[e,r,a,n]);return(0,Ve.jsx)(Me.View,{style:o,children:L.Children.toArray(t).map(s=>rn(s)?s.props.children:s).flat().filter(s=>s!==null&&typeof s!="undefined").map((s,d)=>(0,Ve.jsx)(L.Fragment,{children:s},d))})}var xt=t=>t.charAt(0).toUpperCase()+t.slice(1);var w=require("react/jsx-runtime"),on=(0,te.memo)(function(n){let u=n,{calendarInstanceId:e,calendarRowVerticalSpacing:a=8,calendarRowHorizontalSpacing:r=8,calendarDayHeight:o=32,calendarMonthHeaderHeight:s=20,calendarWeekHeaderHeight:d=o,onCalendarDayPress:i,theme:p}=u,D=j(u,["calendarInstanceId","calendarRowVerticalSpacing","calendarRowHorizontalSpacing","calendarDayHeight","calendarMonthHeaderHeight","calendarWeekHeaderHeight","onCalendarDayPress","theme"]),{calendarRowMonth:h,weeksList:S,weekDaysList:C}=me(D);return(0,w.jsxs)(ke,{alignItems:"center",spacing:a,children:[(0,w.jsx)(Se,{height:s,theme:p==null?void 0:p.rowMonth,children:xt(h)}),(0,w.jsx)(ee,{spacing:8,theme:p==null?void 0:p.rowWeek,children:C.map((m,c)=>(0,w.jsx)(De,{height:d,theme:p==null?void 0:p.itemWeekName,children:m},c))}),S.map((m,c)=>(0,w.jsx)(ee,{children:m.map(f=>f.isDifferentMonth?(0,w.jsx)(Z,{dayHeight:o,daySpacing:r,isStartOfWeek:f.isStartOfWeek,theme:p==null?void 0:p.itemDayContainer,children:(0,w.jsx)(he,{height:o,theme:p==null?void 0:p.itemEmpty})},f.id):(0,w.jsx)(ue,{calendarInstanceId:e,containerTheme:p==null?void 0:p.itemDayContainer,dayHeight:o,daySpacing:r,metadata:f,onPress:i,theme:p==null?void 0:p.itemDay,children:f.displayLabel},f.id))},c))]})}),Re=(0,te.memo)(function(n){let h=n,{calendarInstanceId:e,calendarActiveDateRanges:a,calendarDisabledDateIds:r,calendarSpecialDateRange:o,calendarStayDateRange:s,calendarHighSeasonsDateRange:d,calendarMonthId:i,calendarColorScheme:p}=h,D=j(h,["calendarInstanceId","calendarActiveDateRanges","calendarDisabledDateIds","calendarSpecialDateRange","calendarStayDateRange","calendarHighSeasonsDateRange","calendarMonthId","calendarColorScheme"]);return(0,te.useEffect)(()=>{K.emit("onSetActiveDateRanges",{instanceId:e,ranges:a!=null?a:[],disabledRanges:r!=null?r:[],specialDateRanges:o!=null?o:[],stayDateRange:s!=null?s:[],highSeasonRange:d!=null?d:[]})},[a,r,o,s,d,e,i]),(0,w.jsx)(yt,{colorScheme:p,children:(0,w.jsx)(on,g(l({},D),{calendarInstanceId:e,calendarMonthId:i}))})});var Wt=require("@shopify/flash-list"),M=require("react"),Tt=require("react-native");var A=require("react");function Pt(t,n,e,a,r,o,s,d,i){switch(arguments.length){case 1:return t;case 2:return n(t);case 3:return e(n(t));case 4:return a(e(n(t)));case 5:return r(a(e(n(t))));case 6:return o(r(a(e(n(t)))));case 7:return s(o(r(a(e(n(t))))));case 8:return d(s(o(r(a(e(n(t)))))));case 9:return i(d(s(o(r(a(e(n(t))))))));default:{let p=arguments[0];for(let D=1;D<arguments.length;D++)p=arguments[D](p);return p}}}var ve=(t,n,e="sunday")=>{let a=b(t),r=b(n);if(r<a)return[];let o=[{id:b(t),date:t,numberOfWeeks:He(t,e)}];if(a===r)return o;let s=ce(n,t);for(let d=1;d<=s;d++){let i=le(t,d),p=He(i,e);o.push({id:b(i),date:i,numberOfWeeks:p})}return o},Ot=(t,n,e)=>{let a=le(e,t),r=b(a),o=n!=null?n:r;return r>o?E(o):a},Et=(t,n,e)=>{let a=Te(e,t),r=b(a),o=n!=null?n:r;return o>r?Pt(E(o),B):a},Fe=({calendarInitialMonthId:t,calendarPastScrollRangeInMonths:n,calendarFutureScrollRangeInMonths:e,calendarFirstDayOfWeek:a,calendarMaxDateId:r,calendarMinDateId:o})=>{let{initialMonth:s,initialMonthId:d}=(0,A.useMemo)(()=>{let u=t?E(t):E(b(new Date)),m=B(u);return{initialMonth:m,initialMonthId:b(m)}},[t]),[i,p]=(0,A.useState)(()=>{let u=B(s),m=Et(n,o,u),c=Ot(e,r,u);return ve(m,c,a)}),D=(0,A.useCallback)(u=>{let m=le(i[i.length-1].date,1),c=Ot(Math.max(u-1,0),r,m),f=ve(m,c,a),y=[...i,...f];return p(y),y},[a,r,i]),h=(0,A.useCallback)(u=>{let m=Te(i[0].date,1),c=Et(Math.max(u-1,0),o,m),y=[...ve(c,m,a),...i];return p(y),y},[a,o,i]),S=(0,A.useCallback)(u=>{let m=i[0],c=i[i.length-1];return u>c.id?D(ce(E(u),c.date)):h(ce(m.date,E(u)))},[D,i,h]),C=(0,A.useMemo)(()=>i.findIndex(m=>m.id===d),[d,i]);return{monthList:i,initialMonthIndex:C,appendMonths:D,prependMonths:h,addMissingMonths:S}},ne=({calendarRowVerticalSpacing:t,calendarDayHeight:n,calendarWeekHeaderHeight:e,calendarMonthHeaderHeight:a,calendarAdditionalHeight:r,calendarMonth:o,calendarSpacing:s})=>{let d=a+t+e+t,i=n*o.numberOfWeeks+(o.numberOfWeeks-1)*t;return d+i+r+s};var we=require("react/jsx-runtime"),sn=t=>t.id,Ht=(0,M.memo)((0,M.forwardRef)(function(n,e){let Ze=n,{calendarInitialMonthId:a,calendarPastScrollRangeInMonths:r=12,calendarFutureScrollRangeInMonths:o=12,calendarFirstDayOfWeek:s="sunday",CalendarScrollComponent:d=Wt.FlashList,calendarFormatLocale:i,calendarSpacing:p=20,calendarRowHorizontalSpacing:D,calendarRowVerticalSpacing:h=8,calendarMonthHeaderHeight:S=20,calendarDayHeight:C=32,calendarWeekHeaderHeight:u=C,calendarAdditionalHeight:m=0,calendarColorScheme:c,theme:f,onEndReached:y}=Ze,et=j(Ze,["calendarInitialMonthId","calendarPastScrollRangeInMonths","calendarFutureScrollRangeInMonths","calendarFirstDayOfWeek","CalendarScrollComponent","calendarFormatLocale","calendarSpacing","calendarRowHorizontalSpacing","calendarRowVerticalSpacing","calendarMonthHeaderHeight","calendarDayHeight","calendarWeekHeaderHeight","calendarAdditionalHeight","calendarColorScheme","theme","onEndReached"]),{calendarActiveDateRanges:I,calendarStayDateRange:ae,calendarHighSeasonsDateRange:x,calendarSpecialDateRange:P,calendarDisabledDateIds:je,calendarInstanceId:Ke,calendarMaxDateId:Pe,calendarMinDateId:Oe,getCalendarDayFormat:Ue,getCalendarMonthFormat:Qe,getCalendarWeekDayFormat:qe,onCalendarDayPress:ze}=et,At=j(et,["calendarActiveDateRanges","calendarStayDateRange","calendarHighSeasonsDateRange","calendarSpecialDateRange","calendarDisabledDateIds","calendarInstanceId","calendarMaxDateId","calendarMinDateId","getCalendarDayFormat","getCalendarMonthFormat","getCalendarWeekDayFormat","onCalendarDayPress"]),Ye=(0,M.useMemo)(()=>({calendarActiveDateRanges:I,calendarStayDateRange:ae,calendarHighSeasonsDateRange:x,calendarSpecialDateRange:P,calendarColorScheme:c,calendarDayHeight:C,calendarDisabledDateIds:je,calendarFirstDayOfWeek:s,calendarFormatLocale:i,calendarInstanceId:Ke,calendarMaxDateId:Pe,calendarMinDateId:Oe,calendarMonthHeaderHeight:S,calendarRowHorizontalSpacing:D,calendarRowVerticalSpacing:h,calendarWeekHeaderHeight:u,getCalendarDayFormat:Ue,getCalendarMonthFormat:Qe,getCalendarWeekDayFormat:qe,onCalendarDayPress:ze,theme:f}),[c,I,ae,x,P,C,je,s,i,Pe,Oe,S,D,h,u,Ue,Qe,qe,Ke,ze,f]),{initialMonthIndex:Nt,monthList:re,appendMonths:$e,addMissingMonths:_e}=Fe({calendarFirstDayOfWeek:s,calendarFutureScrollRangeInMonths:o,calendarPastScrollRangeInMonths:r,calendarInitialMonthId:a,calendarMaxDateId:Pe,calendarMinDateId:Oe}),Bt=(0,M.useMemo)(()=>re.map(k=>g(l({},k),{calendarProps:Ye})),[Ye,re]),Vt=(0,M.useCallback)(()=>{$e(o),y==null||y()},[$e,o,y]),vt=(0,M.useCallback)((k,O)=>{let R=ne({calendarMonth:O,calendarSpacing:p,calendarDayHeight:C,calendarMonthHeaderHeight:S,calendarRowVerticalSpacing:h,calendarAdditionalHeight:m,calendarWeekHeaderHeight:u});k.size=R},[m,C,S,h,p,u]),Xe=(0,M.useCallback)(k=>{let O=b(B(k)),R=re,N=R.findIndex(V=>V.id===O);return N===-1&&(R=_e(O),N=R.findIndex(V=>V.id===O)),R.slice(0,N).reduce((V,Ee)=>{let Y=ne({calendarMonth:Ee,calendarSpacing:p,calendarDayHeight:C,calendarMonthHeaderHeight:S,calendarRowVerticalSpacing:h,calendarWeekHeaderHeight:u,calendarAdditionalHeight:m});return V+Y},0)},[_e,m,C,S,h,p,u,re]),oe=(0,M.useRef)(null);(0,M.useImperativeHandle)(e,()=>({scrollToMonth(k,O,{additionalOffset:R=0}={additionalOffset:0}){setTimeout(()=>{var N;(N=oe.current)==null||N.scrollToOffset({offset:Xe(k)+R,animated:O})},0)},scrollToDate(k,O,{additionalOffset:R=0}={additionalOffset:0}){var tt;let N=Xe(k),V=lt(k,s),Ee=C+h,Y=u+Ee*V;Y=Y-h,(tt=oe.current)==null||tt.scrollToOffset({offset:N+Y+R,animated:O})},scrollToOffset(k,O){var R;(R=oe.current)==null||R.scrollToOffset({offset:k,animated:O})}}));let Gt=(0,M.useMemo)(()=>({paddingBottom:p}),[p]);return(0,we.jsx)(d,l({data:Bt,estimatedItemSize:273,initialScrollIndex:Nt,keyExtractor:sn,onEndReached:Vt,overrideItemLayout:vt,ref:oe,renderItem:({item:k})=>(0,we.jsx)(Tt.View,{style:Gt,children:(0,we.jsx)(Re,l({calendarMonthId:k.id},k.calendarProps))}),showsVerticalScrollIndicator:!1},At))}));var Ge=Ae;Ge.Container=Z;Ge.WithContainer=ue;var xe={};xe.Day=Ge;xe.WeekName=De;xe.Empty=he;var Je={};Je.Month=Se;Je.Week=ee;var z=Re;z.Item=xe;z.Row=Je;z.List=Ht;z.HStack=Ie;z.VStack=ke;var ln=z;var J=require("react");var Lt=(t={startId:void 0,endId:void 0})=>{let[n,e]=(0,J.useState)(t),a=(0,J.useCallback)(o=>{e(s=>!s.startId&&!s.endId?{startId:o,endId:void 0}:s.startId&&s.endId?{startId:o,endId:void 0}:s.startId&&!s.endId?o<s.startId?{startId:o,endId:s.startId}:g(l({},s),{endId:o}):{startId:o,endId:o})},[]),r=(0,J.useCallback)(()=>{e({startId:void 0,endId:void 0})},[]);return(0,J.useMemo)(()=>{let o=!n.startId&&!n.endId?[]:[n],s=!!(n.startId&&n.endId);return{dateRange:n,calendarActiveDateRanges:o,onClearDateRange:r,onCalendarDayPress:a,isDateRangeValid:s}},[n,a,r])};0&&(module.exports={Calendar,activeDateRangesEmitter,buildCalendar,fromDateId,getHeightForMonth,toDateId,useCalendar,useCalendarList,useDateRange,useOptimizedDayMetadata});
//# sourceMappingURL=index.js.map