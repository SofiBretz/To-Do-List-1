!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t){let r=JSON.parse(localStorage.getItem("task.lists"))||[],n=localStorage.getItem("task.selectedListId");const o=document.querySelector("[data-lists]"),l=document.querySelector("[data-new-list-form]"),a=document.querySelector("[data-new-list-input]"),i=document.querySelector("[data-delete-list-button]"),s=()=>{d(o),r.forEach(e=>{const t=document.createElement("li");t.dataset.listId=e.id,t.classList.add("list-group-item"),t.innerText=e.name,e.id===n&&(console.log(n),t.classList.add("active")),o.appendChild(t)})},u=()=>{localStorage.setItem("task.lists",JSON.stringify(r)),localStorage.setItem("task.selectedListId",n)},d=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},c=e=>({id:Date.now().toString(),name:e,tasks:[]});s(),o.addEventListener("click",e=>{"li"===e.target.tagName.toLowerCase()&&(n=e.target.dataset.listId,u(),s())}),i.addEventListener("click",e=>{r=r.filter(e=>e.id!==n),n=null,u(),s()}),l.addEventListener("submit",e=>{e.preventDefault();const t=a.value;if(null==t||""===t)return;const n=c(t);a.value=null,r.push(n),u(),s()})}]);