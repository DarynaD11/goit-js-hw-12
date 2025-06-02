import{a as E,S as p,i as a}from"./assets/vendor-CrlV4O_2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const S="50613672-fd7de6baad1a69b0c755a9f02",P="https://pixabay.com/api/",q=15;async function g(s,r=1){const e={key:S,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:q};try{return(await E.get(P,{params:e})).data}catch(i){throw console.error("Error fetching images:",i),i}}const y=document.querySelector(".gallery"),c=document.querySelector(".loader"),l=document.querySelector(".load-more");let f=new p(".gallery a");function L(s){const r=s.map(e=>`
    <li class="photo-card">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <b>Likes</b>
          <span>${e.likes}</span>
        </div>
        <div class="info-item">
          <b>Views</b>
          <span>${e.views}</span>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <span>${e.comments}</span>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <span>${e.downloads}</span>
        </div>
      </div>
    </li>`).join("");y.insertAdjacentHTML("beforeend",r),f?f.refresh():f=new p(".gallery a",{captionsData:"alt",captionDelay:250})}function R(){y.innerHTML=""}function b(){c&&c.classList.remove("is-hidden")}function d(){c&&c.classList.add("is-hidden")}function B(){l&&l.classList.remove("is-hidden")}function v(){l&&l.classList.add("is-hidden")}const w=document.querySelector(".form"),M=w.querySelector('input[name="search-text"]'),$=document.querySelector(".load-more");let h="",n=1,m=0;w.addEventListener("submit",O);$.addEventListener("click",x);async function O(s){s.preventDefault();const r=M.value.trim();if(R(),v(),!r){a.warning({title:"Warning",message:"Please enter a search term",position:"topRight"});return}h=r,n=1;try{b();const e=await g(h,n);if(d(),e.hits.length===0){a.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(e.hits),m=e.totalHits,n*15<m&&B()}catch{d(),a.error({title:"Error",message:"Error fetching images. Please try again.",position:"topRight"})}}async function x(){n+=1,b();try{const s=await g(h,n);d(),L(s.hits);const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*1.5,behavior:"smooth"}),n*15>=m&&(v(),a.info({title:"",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{d(),a.error({title:"Error",message:"Error loading more images.",position:"topRight"})}}
//# sourceMappingURL=index.js.map
