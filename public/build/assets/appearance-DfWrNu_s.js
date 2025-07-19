import{j as e,c as n,L as l}from"./app-BxkI1QLN.js";import{c as r}from"./createLucideIcon-TCzS0Pf0.js";import{S as m,H as h}from"./layout-s04A7uC-.js";import{A as y}from"./app-layout-DKOAps4F.js";/* empty css            */import"./button-Dmj70vIt.js";import"./index-DIuf1Vs8.js";import"./index-Dg6PdLUP.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],k=r("Monitor",g);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],u=r("Moon",x);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],b=r("Sun",f);function j({className:o="",...c}){const i=[{value:"light",icon:b,label:"Light"},{value:"dark",icon:u,label:"Dark"},{value:"system",icon:k,label:"System"}],p=t=>{document.cookie=`appearance=${t}; path=/; max-age=${365*24*60*60}`;const a=document.documentElement;if(a.classList.remove("light","dark"),t==="system"){const s=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";a.classList.add(s)}else a.classList.add(t);window.location.reload()},d=(()=>{const a=document.cookie.split(";").find(s=>s.trim().startsWith("appearance="));if(a){const s=a.split("=")[1];if(["light","dark","system"].includes(s))return s}return"system"})();return e.jsx("div",{className:n("inline-flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800",o),...c,children:i.map(({value:t,icon:a,label:s})=>e.jsxs("button",{onClick:()=>p(t),className:n("flex items-center rounded-md px-3.5 py-1.5 transition-colors",d===t?"bg-white text-gray-900 shadow-xs dark:bg-gray-700 dark:text-white":"text-gray-500 hover:bg-gray-200/60 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700/60 dark:hover:text-white"),children:[e.jsx(a,{className:"-ml-1 h-4 w-4"}),e.jsx("span",{className:"ml-1.5 text-sm",children:s})]},t))})}const v=[{title:"Appearance settings",href:"/settings/appearance"}];function T(){return e.jsxs(y,{breadcrumbs:v,children:[e.jsx(l,{title:"Appearance settings"}),e.jsx(m,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsx(h,{title:"Appearance settings",description:"Update your account's appearance settings"}),e.jsx(j,{})]})})]})}export{T as default};
