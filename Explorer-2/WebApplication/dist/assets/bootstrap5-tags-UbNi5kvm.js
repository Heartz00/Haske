const k={items:[],allowNew:!1,showAllSuggestions:!1,badgeStyle:"primary",allowClear:!1,clearEnd:!1,selected:[],regex:"",separator:[],max:0,clearLabel:"Clear",searchLabel:"Type a value",showDropIcon:!0,keepOpen:!1,allowSame:!1,baseClass:"",placeholder:"",addOnBlur:!1,showDisabled:!1,hideNativeValidation:!1,suggestionsThreshold:-1,maximumItems:0,autoselectFirst:!0,updateOnSelect:!1,highlightTyped:!1,highlightClass:"",fullWidth:!0,fixed:!1,fuzzy:!1,startsWith:!1,singleBadge:!1,activeClasses:["bg-primary","text-white"],labelField:"label",valueField:"value",searchFields:["label"],queryParam:"query",server:"",serverMethod:"GET",serverParams:{},serverDataKey:"data",fetchOptions:{},liveServer:!1,noCache:!0,allowHtml:!1,debounceTime:300,notFoundMessage:"",inputFilter:o=>o,sanitizer:o=>B(o),onRenderItem:(o,e,t)=>t.config("allowHtml")?e:t.config("sanitizer")(e),onSelectItem:(o,e)=>{},onClearItem:(o,e)=>{},onCreateItem:(o,e)=>{},onBlur:(o,e)=>{},onFocus:(o,e)=>{},onCanAdd:(o,e,t)=>{},confirmClear:(o,e)=>Promise.resolve(),confirmAdd:(o,e)=>Promise.resolve(),onServerResponse:(o,e)=>o.json()},b="tags-",M="is-loading",H="is-active",p="is-invalid",N="is-max-reached",S="show",g="data-value",I="next",x="prev",j="form-control-focus",P="form-placeholder-shown",V="form-control-disabled",A=new WeakMap;let W=0,O=window.bootstrap&&window.bootstrap.Tooltip;function q(o,e=300){let t;return(...i)=>{clearTimeout(t),t=setTimeout(()=>{o.apply(this,i)},e)}}function J(o,e=null){const t=_("span");document.body.appendChild(t),t.style.fontSize=e||"inherit",t.style.height="auto",t.style.width="auto",t.style.position="absolute",t.style.whiteSpace="no-wrap",t.innerHTML=B(o);const i=Math.ceil(t.clientWidth);return document.body.removeChild(t),i}function B(o){return o.replace(/[\x26\x0A\<>'"]/g,function(e){return"&#"+e.charCodeAt(0)+";"})}function U(o){return o.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function D(o){return o?U(o.toString()).toLowerCase():""}function $(o,e){if(o.indexOf(e)>=0)return!0;let t=0;for(let i=0;i<e.length;i++){const s=e[i];if(s!=" "&&(t=o.indexOf(s,t)+1,t<=0))return!1}return!0}function C(o){o.style.display="none",y(o,{"aria-hidden":"true"})}function z(o){o.style.display="list-item",y(o,{"aria-hidden":"false"})}function y(o,e){for(const[t,i]of Object.entries(e))o.setAttribute(t,i)}function v(o,e){o.hasAttribute(e)&&o.removeAttribute(e)}function R(o){return["true","false","1","0",!0,!1].includes(o)&&!!JSON.parse(o)}function _(o){return document.createElement(o)}function G(o,e){let t=e[0];for(let i=1;i<e.length;i++)o=o.split(e[i]).join(t);return o.split(t)}function X(o,e="window"){return o.split(".").reduce((t,i)=>t[i],e)}class T{constructor(e,t={}){if(!(e instanceof HTMLElement)){console.error("Invalid element",e);return}A.set(e,this),W++,this._selectElement=e,this._configure(t),this._keyboardNavigation=!1,this._searchFunc=q(()=>{this._loadFromServer(!0)},this._config.debounceTime),this._fireEvents=!0,this._configureParent(),this._holderElement=_("div"),this._containerElement=_("div"),this._dropElement=_("ul"),this._searchInput=_("input"),this._holderElement.appendChild(this._containerElement),this._selectElement.parentElement.insertBefore(this._holderElement,this._selectElement),this._configureHolderElement(),this._configureContainerElement(),this._configureSelectElement(),this._configureSearchInput(),this._configureDropElement(),this.resetState(),this.handleEvent=i=>{this._handleEvent(i)},this._config.fixed&&(document.addEventListener("scroll",this,!0),window.addEventListener("resize",this)),["focus","blur","input","keydown","paste"].forEach(i=>{this._searchInput.addEventListener(i,this)}),["mousemove","mouseleave"].forEach(i=>{this._dropElement.addEventListener(i,this)}),this.loadData(!0)}static init(e="select[multiple]",t={},i=!1){let s=document.querySelectorAll(e);for(let n=0;n<s.length;n++){const l=T.getInstance(s[n]);l&&!i||(l&&l.dispose(),new T(s[n],t))}}static getInstance(e){if(A.has(e))return A.get(e)}dispose(){["focus","blur","input","keydown","paste"].forEach(e=>{this._searchInput.removeEventListener(e,this)}),["mousemove","mouseleave"].forEach(e=>{this._dropElement.removeEventListener(e,this)}),this._config.fixed&&(document.removeEventListener("scroll",this,!0),window.removeEventListener("resize",this)),this._selectElement.style.display="block",this._holderElement.parentElement.removeChild(this._holderElement),this.parentForm&&this.parentForm.removeEventListener("reset",this),A.delete(this._selectElement)}handleEvent(e){this._handleEvent(e)}_handleEvent(e){["scroll","resize"].includes(e.type)?(this._timer&&window.cancelAnimationFrame(this._timer),this._timer=window.requestAnimationFrame(()=>{this[`on${e.type}`](e)})):this[`on${e.type}`](e)}_configure(e={}){this._config=Object.assign({},k,{showDropIcon:!!this._findOption()});const t=this._selectElement.dataset.config?JSON.parse(this._selectElement.dataset.config):{},i={...e,...t,...this._selectElement.dataset};for(const[s,n]of Object.entries(k)){if(s=="config"||i[s]===void 0)continue;const l=i[s];switch(typeof n){case"number":this._config[s]=parseInt(l);break;case"boolean":this._config[s]=R(l);break;case"string":this._config[s]=l.toString();break;case"object":this._config[s]=l,typeof l=="string"&&(["{","["].includes(l[0])?this._config[s]=JSON.parse(l):this._config[s]=l.split(l.includes("|")?"|":","));break;case"function":this._config[s]=typeof l=="string"?l.split(".").reduce((r,a)=>r[a],window):l,this._config[s]||console.error("Invalid function",l);break;default:this._config[s]=l;break}}this._config.placeholder||(this._config.placeholder=this._getPlaceholder()),this._config.suggestionsThreshold==-1&&(this._config.suggestionsThreshold=this._config.liveServer?1:0)}config(e=null){return e?this._config[e]:this._config}setConfig(e,t){this._config[e]=t}_configureParent(){for(this.overflowParent=null,this.parentForm=this._selectElement.parentElement;this.parentForm&&(this.parentForm.style.overflow==="hidden"&&(this.overflowParent=this.parentForm),this.parentForm=this.parentForm.parentElement,!(this.parentForm&&this.parentForm.nodeName=="FORM")););this.parentForm&&this.parentForm.addEventListener("reset",this)}_getPlaceholder(){if(this._selectElement.hasAttribute("placeholder"))return this._selectElement.getAttribute("placeholder");if(this._selectElement.dataset.placeholder)return this._selectElement.dataset.placeholder;let e=this._selectElement.querySelector("option");return!e||!this._config.autoselectFirst?"":(v(e,"selected"),e.selected=!1,e.value?"":e.textContent)}_configureSelectElement(){const e=this._selectElement;this._config.hideNativeValidation?(e.style.position="absolute",e.style.left="-9999px"):e.style.cssText="height:1px;width:1px;opacity:0;padding:0;margin:0;border:0;float:left;flex-basis:100%;min-height:unset;",e.tabIndex=-1,e.addEventListener("focus",t=>{this.onclick(t)}),e.addEventListener("invalid",t=>{this._holderElement.classList.add(p)})}_configureDropElement(){const e=this._dropElement;e.classList.add("dropdown-menu",b+"menu"),e.id=b+"menu-"+W,e.setAttribute("role","menu");const t=e.style;t.padding="0",t.maxHeight="280px",this._config.fullWidth||(t.maxWidth="360px"),this._config.fixed&&(t.position="fixed"),t.overflowY="auto",t.overscrollBehavior="contain",t.textAlign="unset",e.addEventListener("mouseenter",i=>{this._keyboardNavigation=!1}),this._holderElement.appendChild(e),this._searchInput.setAttribute("aria-controls",e.id)}_configureHolderElement(){const e=this._holderElement;e.classList.add("form-control","dropdown"),["form-select-lg","form-select-sm","is-invalid","is-valid"].forEach(t=>{this._selectElement.classList.contains(t)&&e.classList.add(t)}),this._config.suggestionsThreshold==0&&this._config.showDropIcon&&e.classList.add("form-select"),this.overflowParent&&(e.style.position="inherit"),e.style.height="auto",e.addEventListener("click",this)}_configureContainerElement(){this._containerElement.addEventListener("click",t=>{this.isDisabled()||this._searchInput.style.visibility!="hidden"&&this._searchInput.focus()});const e=this._containerElement.style;e.display="flex",e.alignItems="center",e.flexWrap="wrap"}_configureSearchInput(){const e=this._searchInput;e.type="text",e.autocomplete="off",e.spellcheck=!1,y(e,{"aria-autocomplete":"list","aria-haspopup":"menu","aria-expanded":"false","aria-label":this._config.searchLabel,role:"combobox"}),e.style.cssText="background-color:transparent;color:currentColor;border:0;padding:0;outline:0;max-width:100%",this.resetSearchInput(!0),this._containerElement.appendChild(e),this._rtl=window.getComputedStyle(e).direction==="rtl"}onfocus(e){this._holderElement.classList.add(j),this.showOrSearch(),this._config.onFocus(e,this)}onblur(e){if(e.relatedTarget&&e.relatedTarget.classList.contains("modal")){this._searchInput.focus();return}this.afteronblur(e)}afteronblur(e){this._abortController&&this._abortController.abort();let t=!0;if(this._config.addOnBlur&&this._searchInput.value&&(t=this._enterValue()),this._holderElement.classList.remove(j),this.hideSuggestions(t),this._fireEvents){const i=this.getSelection(),s={selection:i?i.dataset.value:null,input:this._searchInput.value};this._config.onBlur(e,this),this._selectElement.dispatchEvent(new CustomEvent("tags.blur",{bubbles:!0,detail:s}))}}onpaste(e){const i=(e.clipboardData||window.clipboardData).getData("text/plain").replace(/\r\n|\n/g," ");if(i.length>2&&this._config.separator.length){const s=G(i,this._config.separator).filter(n=>n);s.length>1&&(e.preventDefault(),s.forEach(n=>{this._addPastedValue(n)}))}}_addPastedValue(e){let t=e,i={};if(this._config.allowNew)i.new=1;else{const s=this.getSelection();if(!s)return;e=s.getAttribute(g),t=s.dataset.label}this._config.confirmAdd(e,this).then(()=>{this._add(t,e,i)}).catch(()=>{})}oninput(e){const t=this._config.inputFilter(this._searchInput.value);if(t!=this._searchInput.value&&(this._searchInput.value=t),t){const i=t.slice(-1);if(this._config.separator.length&&this._config.separator.includes(i)){this._searchInput.value=this._searchInput.value.slice(0,-1);let s=this._searchInput.value;this._addPastedValue(s);return}}setTimeout(()=>{this._adjustWidth()}),this.showOrSearch()}onkeydown(e){let t=e.keyCode||e.key;const i=e.target;switch(e.keyCode==229&&(t=i.value.charAt(i.selectionStart-1).charCodeAt(0)),t){case 13:case"Enter":e.preventDefault(),this._enterValue();break;case 38:case"ArrowUp":e.preventDefault(),this._keyboardNavigation=!0,this._moveSelection(x);break;case 40:case"ArrowDown":e.preventDefault(),this._keyboardNavigation=!0,this.isDropdownVisible()?this._moveSelection(I):this.showOrSearch(!1);break;case 8:case"Backspace":const s=this.getLastItem();this._searchInput.value.length==0&&s&&this._config.confirmClear(s,this).then(()=>{this.removeLastItem(),this._adjustWidth(),this.showOrSearch()}).catch(()=>{});break;case 27:case"Escape":this._searchInput.focus(),this.hideSuggestions();break}}onmousemove(e){this._keyboardNavigation=!1}onmouseleave(e){this.removeSelection()}onscroll(e){this._positionMenu()}onresize(e){this._positionMenu()}onclick(e=null){!this.isSingle()&&this.isMaxReached()||this._searchInput.focus()}onreset(e){this.reset()}loadData(e=!1){Object.keys(this._config.items).length>0?this.setData(this._config.items,!0):this.resetSuggestions(!0),this._config.server&&(this._config.liveServer||this._loadFromServer(!e))}_setSelectedAttributes(){const e=this._selectElement.selectedOptions||[];for(let t=0;t<e.length;t++)e[t].value&&!e[t].hasAttribute("selected")&&e[t].setAttribute("selected","selected")}resetState(){this.isDisabled()?(this._holderElement.setAttribute("readonly",""),this._searchInput.setAttribute("disabled",""),this._holderElement.classList.add(V)):(v(this._holderElement,"readonly"),v(this._searchInput,"disabled"),this._holderElement.classList.remove(V))}resetSuggestions(e=!1){this._setSelectedAttributes();const t=s=>({value:s.getAttribute("value"),label:s.textContent,disabled:s.disabled,selected:s.selected,data:Object.assign({disabled:s.disabled},s.dataset)});let i=Array.from(this._selectElement.children).filter(s=>s.hasAttribute("label")||!s.disabled||this._config.showDisabled).map(s=>s.hasAttribute("label")?{group:s.getAttribute("label"),items:Array.from(s.children).map(n=>t(n))}:t(s));this.setData(i,e)}_enterValue(){let e=this.getSelection();if(e)return e.click(),!0;if(this._config.allowNew&&this._searchInput.value){let t=this._searchInput.value;return this._config.confirmAdd(t,this).then(()=>{this._add(t,t,{new:1})}).catch(()=>{}),!0}return!1}_loadFromServer(e=!1){this._abortController&&this._abortController.abort(),this._abortController=new AbortController;let t=this._selectElement.dataset.serverParams||{};typeof t=="string"&&(t=JSON.parse(t));const i=Object.assign({},this._config.serverParams,t);if(i[this._config.queryParam]=this._searchInput.value,this._config.noCache&&(i.t=Date.now()),i.related){const r=document.getElementById(i.related);if(r){i.related=r.value;const a=r.getAttribute("name");a&&(i[a]=r.value)}}const s=new URLSearchParams(i);let n=this._config.server,l=Object.assign(this._config.fetchOptions,{method:this._config.serverMethod||"GET",signal:this._abortController.signal});l.method==="POST"?l.body=s:n+="?"+s.toString(),this._holderElement.classList.add(M),fetch(n,l).then(r=>this._config.onServerResponse(r,this)).then(r=>{const a=X(this._config.serverDataKey,r)||r;this.setData(a,!e),this._abortController=null,e&&this._showSuggestions()}).catch(r=>{r.name==="AbortError"||this._abortController.signal.aborted||console.error(r)}).finally(r=>{this._holderElement.classList.remove(M)})}_add(e,t=null,i={}){if(!this.canAdd(e,i))return null;const s=this.addItem(e,t,i);return this._resetHtmlState(),this._config.keepOpen?this._showSuggestions():this.resetSearchInput(),s}_isItemEnabled(e){if(e.style.display==="none")return!1;const t=e.firstElementChild;return t.tagName==="A"&&!t.classList.contains("disabled")}_moveSelection(e=I,t=null){const i=this.getSelection();if(i){const s=e===I?"nextSibling":"previousSibling";t=i.parentNode;do t=t[s];while(t&&!this._isItemEnabled(t));t?i.classList.remove(...this._activeClasses()):i&&(t=i.parentElement)}else{if(e===x)return t;if(!t)for(t=this._dropElement.firstChild;t&&!this._isItemEnabled(t);)t=t.nextSibling}if(t){const s=t.offsetHeight,n=t.offsetTop,l=t.parentNode,r=l.offsetHeight,a=l.scrollHeight,h=l.offsetTop;if(s===0&&setTimeout(()=>{l.scrollTop=0}),e===x){const u=n-h>10?n-h:0;l.scrollTop=u}else n+s-(r+l.scrollTop)>0&&s>0&&(l.scrollTop=n+s-r+1,l.scrollTop+r>=a-10&&(l.scrollTop=n-h));const c=t.querySelector("a");c.classList.add(...this._activeClasses()),this._searchInput.setAttribute("aria-activedescendant",c.id),this._config.updateOnSelect&&(this._searchInput.value=c.dataset.label,this._adjustWidth())}else this._searchInput.setAttribute("aria-activedescendant","");return t}_adjustWidth(){this._holderElement.classList.remove(P),this._searchInput.value?this._searchInput.size=this._searchInput.value.length:this.getSelectedValues().length?(this._searchInput.placeholder="",this._searchInput.size=1):(this._searchInput.size=this._config.placeholder.length>0?this._config.placeholder.length:1,this._searchInput.placeholder=this._config.placeholder,this._holderElement.classList.add(P));const e=this._searchInput.value||this._searchInput.placeholder,t=window.getComputedStyle(this._holderElement).fontSize,i=J(e,t)+16;this._searchInput.style.width=i+"px"}_buildSuggestions(e){for(;this._dropElement.lastChild;)this._dropElement.removeChild(this._dropElement.lastChild);let t=0,i=1;for(let s=0;s<e.length;s++){const n=e[s];if(n){if(n.group&&n.items){const l=_("li");l.setAttribute("role","presentation"),l.dataset.id=""+i;const r=_("span");if(l.append(r),r.classList.add("dropdown-header","text-truncate"),r.innerHTML=this._config.sanitizer(n.group),this._dropElement.appendChild(l),n.items)for(let a=0;a<n.items.length;a++){const h=n.items[a];h.group_id=i,this._buildSuggestionsItem(n.items[a],t),t++}i++}this._buildSuggestionsItem(n,t),t++}}if(this._config.notFoundMessage){const s=_("li");s.setAttribute("role","presentation"),s.classList.add(b+"not-found"),s.innerHTML='<span class="dropdown-item"></span>',this._dropElement.appendChild(s)}}_buildSuggestionsItem(e,t){if(!e[this._config.valueField])return;const i=e[this._config.valueField],s=e[this._config.labelField];let n=this._config.onRenderItem(e,s,this);const l=_("li");l.setAttribute("role","presentation"),e.group_id&&l.setAttribute("data-group-id",""+e.group_id);const r=_("a");l.append(r),r.id=this._dropElement.id+"-"+t,r.classList.add("dropdown-item","text-truncate"),e.disabled&&r.classList.add("disabled"),r.setAttribute(g,i),r.dataset.label=s;const a={};this._config.searchFields.forEach(h=>{a[h]=e[h]}),r.dataset.searchData=JSON.stringify(a),r.setAttribute("href","#"),r.innerHTML=n,this._dropElement.appendChild(l),r.addEventListener("mouseenter",h=>{this._keyboardNavigation||(this.removeSelection(),l.querySelector("a").classList.add(...this._activeClasses()))}),r.addEventListener("mousedown",h=>{h.preventDefault()}),r.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),this._config.confirmAdd(i,this).then(()=>{this._add(s,i,e.data),this._config.onSelectItem(e,this)}).catch(()=>{})})}initialOptions(){return this._selectElement.querySelectorAll("option[data-init]")}_removeSelectedAttrs(){this._selectElement.querySelectorAll("option").forEach(e=>{v(e,"selected")})}reset(){this.removeAll(),this._fireEvents=!1;const e=this.initialOptions();this._removeSelectedAttrs();for(let t=0;t<e.length;t++){const i=e[t],s=Object.assign({},{disabled:i.hasAttribute("disabled")},i.dataset);this.addItem(i.textContent,i.value,s)}this._resetHtmlState(),this._fireEvents=!0}resetSearchInput(e=!1){if(this._searchInput.value="",this._adjustWidth(),this._checkMax(),this.isSingle()&&!e){document.activeElement.blur(),this.hideSuggestions();return}e||(this._shouldShow()||this.hideSuggestions(),this._searchInput===document.activeElement&&this._searchInput.dispatchEvent(new Event("input")))}_checkMax(){this.isMaxReached()?(this._holderElement.classList.add(N),this._searchInput.style.visibility="hidden"):this._searchInput.style.visibility=="hidden"&&(this._searchInput.style.visibility="visible")}getSelectedValues(){const e=this._selectElement.querySelectorAll("option[selected]");return Array.from(e).map(t=>t.value)}getAvailableValues(){const e=this._selectElement.querySelectorAll("option");return Array.from(e).map(t=>t.value)}showOrSearch(e=!0){if(e&&!this._shouldShow()){this.hideSuggestions(!1);return}this._config.liveServer?this._searchFunc():this._showSuggestions()}hideSuggestions(e=!0){this._dropElement.classList.remove(S),y(this._searchInput,{"aria-expanded":"false"}),this.removeSelection(),e&&this._holderElement.classList.remove(p)}toggleSuggestions(e=!0,t=!0){this._dropElement.classList.contains(S)?this.hideSuggestions(t):this.showOrSearch(e)}_shouldShow(){return this.isDisabled()||this.isMaxReached()?!1:this._searchInput.value.length>=this._config.suggestionsThreshold}_showSuggestions(){if(this._searchInput.style.visibility=="hidden")return;const e=D(this._searchInput.value),t={},i=this._dropElement.querySelectorAll("li");let s=0,n=null,l=!1,r={};for(let a=0;a<i.length;a++){let h=i[a],c=h.firstElementChild;if(c instanceof HTMLSpanElement){h.dataset.id&&(r[h.dataset.id]=!1),C(h);continue}if(c.classList.remove(...this._activeClasses()),!this._config.allowSame){const f=c.getAttribute(g);if(t[f]=t[f]||0,this._findOption(c.getAttribute(g),"[selected]",t[f]++)){C(h);continue}}const u=this._config.showAllSuggestions||e.length===0;let d=e.length==0&&this._config.suggestionsThreshold===0;if(!u&&e.length>0){const f=JSON.parse(c.dataset.searchData);this._config.searchFields.forEach(m=>{const w=D(f[m]);let L=!1;if(this._config.fuzzy)L=$(w,e);else{const F=w.indexOf(e);L=this._config.startsWith?F===0:F>=0}L&&(d=!0)})}const E=d||e.length===0;if(u||d?(s++,z(h),h.dataset.groupId&&(r[h.dataset.groupId]=!0),!n&&this._isItemEnabled(h)&&E&&(n=h),this._config.maximumItems>0&&s>this._config.maximumItems&&C(h)):C(h),this._config.highlightTyped){const f=c.textContent,m=D(f).indexOf(e),w=f.substring(0,m)+`<mark class="${this._config.highlightClass}">${f.substring(m,m+e.length)}</mark>`+f.substring(m+e.length,f.length);c.innerHTML=w}this._isItemEnabled(h)&&(l=!0)}if(!this._config.allowNew&&!(e.length===0&&!l)&&this._holderElement.classList.add(p),this._config.allowNew&&this._config.regex&&this.isInvalid()&&this._holderElement.classList.remove(p),Array.from(i).filter(a=>a.dataset.id).forEach(a=>{r[a.dataset.id]===!0&&z(a)}),l&&(this._holderElement.classList.remove(p),n&&this._config.autoselectFirst&&(this.removeSelection(),this._moveSelection(I,n))),s===0)if(this._config.notFoundMessage){const a=this._dropElement.querySelector("."+b+"not-found");a.style.display="block";const h=this._config.notFoundMessage.replace("{{tag}}",this._searchInput.value);a.innerHTML=`<span class="dropdown-item">${h}</span>`,this._showDropdown()}else this.hideSuggestions(!1);else this._showDropdown()}_showDropdown(){const e=this._dropElement.classList.contains(S);e||(this._dropElement.classList.add(S),y(this._searchInput,{"aria-expanded":"true"})),this._positionMenu(e)}_positionMenu(e=!1){const t=this._rtl,i=this._config.fixed,s=this._config.fullWidth,n=this._searchInput.getBoundingClientRect(),l=this._holderElement.getBoundingClientRect();let r=0,a=0;if(i?s?(r=l.x,a=l.y+l.height+2):(r=n.x,a=n.y+n.height):s?(r=0,a=l.height+2):(r=this._searchInput.offsetLeft,a=this._searchInput.offsetHeight+this._searchInput.offsetTop),t&&!s&&(r-=this._dropElement.offsetWidth-n.width),!s){const u=Math.min(window.innerWidth,document.body.offsetWidth),d=t?n.x+n.width-this._dropElement.offsetWidth-1:u-1-(n.x+this._dropElement.offsetWidth);d<0&&(r=t?r-d:r+d)}s&&(this._dropElement.style.width=this._holderElement.offsetWidth+"px"),e||(this._dropElement.style.transform="unset"),Object.assign(this._dropElement.style,{left:r+"px",top:a+"px"});const h=this._dropElement.getBoundingClientRect(),c=window.innerHeight;if(h.y+h.height>c||this._dropElement.style.transform.includes("translateY")){const u=s?l.height+4:n.height;this._dropElement.style.transform="translateY(calc(-100.1% - "+u+"px))"}}_getBootstrapVersion(){let e=5,t=window.jQuery;return t&&t.fn.tooltip&&t.fn.tooltip.Constructor&&(e=parseInt(t.fn.tooltip.Constructor.VERSION.charAt(0))),e}_isSelected(e){return!!Array.from(this._selectElement.querySelectorAll("option")).find(s=>s.textContent==e&&s.getAttribute("selected"))}_isSelectable(e){const i=Array.from(this._selectElement.querySelectorAll("option")).filter(s=>s.textContent==e);return!(i.length>0&&!i.find(n=>!n.getAttribute("selected")))}hasItem(e){for(let t of this._config.items){const i=t.items||[t];for(let s of i)if(s[this._config.labelField]==e)return!0}return!1}getItem(e){for(let t of this._config.items){const i=t.items||[t];for(let s of i)if(s[this._config.valueField]==e)return s}return null}_validateRegex(e){return new RegExp(this._config.regex.trim()).test(e)}getSelection(){return this._dropElement.querySelector("a."+H)}removeSelection(){const e=this.getSelection();e&&e.classList.remove(...this._activeClasses())}_activeClasses(){return[...this._config.activeClasses,H]}getActiveSelection(){return this.getSelection()}removeActiveSelection(){return this.removeSelection()}removeAll(){this.getSelectedValues().forEach(t=>{this.removeItem(t,!0)}),this._adjustWidth()}removeLastItem(e=!1){let t=this.getLastItem();t&&this.removeItem(t,e)}getLastItem(){let e=this._containerElement.querySelectorAll("span."+b+"badge");return e.length?e[e.length-1].getAttribute(g):void 0}enable(){this._selectElement.setAttribute("disabled",""),this.resetState()}disable(){v(this._selectElement,"disabled"),this.resetState()}isDisabled(){return this._selectElement.hasAttribute("disabled")||this._selectElement.disabled||this._selectElement.hasAttribute("readonly")}isDropdownVisible(){return this._dropElement.classList.contains(S)}isInvalid(){return this._holderElement.classList.contains(p)}isSingle(){return!this._selectElement.hasAttribute("multiple")}isMaxReached(){return this._config.max&&this.getSelectedValues().length>=this._config.max}canAdd(e,t={}){if(!e||t.new&&!this._config.allowNew||!t.new&&!this.hasItem(e)||this.isDisabled())return!1;if(!this.isSingle()&&!this._config.allowSame){if(t.new){if(this._isSelected(e))return!1}else if(!this._isSelectable(e))return!1}return this.isMaxReached()?!1:this._config.regex&&t.new&&!this._validateRegex(e)?(this._holderElement.classList.add(p),!1):this._config.onCanAdd&&this._config.onCanAdd(e,t,this)===!1?(this._holderElement.classList.add(p),!1):!0}getData(){return this._config.items}setData(e,t=!1){Array.isArray(e)||(e=Object.entries(e).map(([i,s])=>({value:i,label:s}))),this._config.items!=e&&(this._config.items=e),t&&(this._removeSelectedAttrs(),e.reduce((s,n)=>s.concat(n.group?n.items:[n]),[]).forEach(s=>{const n=s[this._config.valueField],l=s[this._config.labelField];if(n&&(s.selected||this._config.selected.includes(n))){const r=this.addItem(l,n,s.data);r&&r.setAttribute("data-init","true")}})),this._buildSuggestions(e),this._resetHtmlState()}_findOption(e=null,t="",i=0){const n="option"+(e===null?"":'[value="'+CSS.escape(e)+'"]')+t;return this._selectElement.querySelectorAll(n)[i]||null}setItem(e,t={}){let i=null,s=this._findOption(e,":not([selected])");s&&(i=this.addItem(s.textContent,s.value,t));let n=this.getItem(e);if(n){const l=n[this._config.valueField],r=n[this._config.labelField];i=this.addItem(r,l,t)}return this._adjustWidth(),this._checkMax(),i}addItem(e,t=null,i={}){t||(t=e),this.isSingle()&&this.getSelectedValues().length&&this.removeLastItem(!0);let s=this._findOption(t,":not([selected])");if(!s){s=_("option"),s.value=t,s.innerText=e;for(const[n,l]of Object.entries(i))s.dataset[n]=l;this._selectElement.appendChild(s),this._config.onCreateItem(s,this)}return s&&(i=Object.assign({title:s.getAttribute("title")},i,s.dataset)),s.setAttribute("selected","selected"),s.selected=!0,this._createBadge(e,t,i),this._fireEvents&&this._selectElement.dispatchEvent(new Event("change",{bubbles:!0})),s}_resetHtmlState(){const e=this._selectElement.innerHTML;this._selectElement.innerHTML="",this._selectElement.innerHTML=e,this._adjustWidth()}_createBadge(e,t=null,i={}){const s=this._getBootstrapVersion()===5,n=i.disabled&&R(i.disabled),l=this._config.allowClear&&!n;let r=this._config.allowHtml?e:this._config.sanitizer(e),a=_("span"),h=[b+"badge"];const c=this.isSingle()&&!this._config.singleBadge;if(!c){h.push("badge");let d=this._config.badgeStyle;i.badgeStyle&&(d=i.badgeStyle),i.badgeClass&&h.push(...i.badgeClass.split(" ")),this._config.baseClass?h.push(...this._config.baseClass.split(" ")):s?h=[...h,"bg-"+d,"text-truncate"]:h=[...h,"badge-"+d],a.style.maxWidth="100%"}n&&h.push("disabled","opacity-50");const u=c?0:2;if(a.style.margin=u+"px 6px "+u+"px 0px",a.style.marginBlock=u+"px",a.style.marginInline="0px 6px",a.style.display="flex",a.style.alignItems="center",a.classList.add(...h),a.setAttribute(g,t),i.title&&a.setAttribute("title",i.title),l){const d=h.includes("text-dark")||c?"btn-close":"btn-close btn-close-white";let E="margin-inline: 0px 6px;",f="left";this._config.clearEnd&&(f="right"),f=="right"&&(E="margin-inline: 6px 0px;");const m=s?'<button type="button" style="font-size:0.65em;'+E+'" class="'+d+'" aria-label="'+this._config.clearLabel+'"></button>':'<button type="button" style="font-size:1em;'+E+'text-shadow:none;color:currentColor;transform:scale(1.2);float:none" class="close" aria-label="'+this._config.clearLabel+'"><span aria-hidden="true">&times;</span></button>';r=f=="left"?m+r:r+m}a.innerHTML=r,this._containerElement.insertBefore(a,this._searchInput),i.title&&O&&s&&O.getOrCreateInstance(a),l&&a.querySelector("button").addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),this.isDisabled()||this._config.confirmClear(t,this).then(()=>{this.removeItem(t),document.activeElement.blur(),this._adjustWidth()}).catch(()=>{})})}getHolder(){return this._holderElement}clear(){this.hideSuggestions(),this.reset()}updateData(e){this.setData(e,!1),this.reset()}removeItem(e,t=!1){const i=CSS.escape(e);let s=this._containerElement.querySelectorAll("span["+g+'="'+i+'"]');if(!s.length)return;const n=s.length-1,l=s[n];l&&(l.dataset.bsOriginalTitle&&O.getOrCreateInstance(l).dispose(),l.remove());let r=this._findOption(e,"[selected]",n);r&&(v(r,"selected"),r.selected=!1,this._fireEvents&&!t&&this._selectElement.dispatchEvent(new Event("change",{bubbles:!0}))),this._searchInput.style.visibility=="hidden"&&!this.isMaxReached()&&(this._searchInput.style.visibility="visible",this._holderElement.classList.remove(N)),t||this._config.onClearItem(e,this)}}export{T};