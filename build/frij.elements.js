const e=(e,t,n)=>{let r=document.createElement(e);return t=t||{},Object.keys(t).forEach(e=>{"object"==typeof t[e]?r.setAttribute(e,JSON.stringify(t[e])):r.setAttribute(e,t[e])}),n&&(r.innerHTML=n),r},t=e=>{let t=document.createElement("template");return e=e.trim(),t.innerHTML=e,t},n=e=>{let t=document.createElement("span");return e=e.trim(),t.innerHTML=e,t.children[0]},r=(e,t)=>(t=t||document).querySelector(e),c=(e,t)=>("string"==typeof t&&(t=r(t)),t.appendChild(e)),o=(e,t)=>{"string"==typeof t&&(t=r(t)),e.forEach(e=>c(e,t))},i=e=>e.content.cloneNode(!0);export{c as addChildTo,o as addChildrenTo,i as cloneElement,e as createElement,r as getElement,n as htmlToElement,t as htmlToTemplate};
