import{o as p,_ as d,s as _,i as k}from"./index-CkdC1qCT.js";import{e as t,f as r,E as c,x as i,g as u,Z as h,a4 as f}from"./@vue-CXKnfUZt.js";import{m as g}from"./vuex-BTKxU11I.js";import"./bootstrap-5y-2wTs5.js";/* empty css                        *//* empty css                     */import{a as L}from"./axios-CCb-kr4I.js";import"./vue-i18n-DipsLOQt.js";import"./@intlify-Dg0E80p9.js";const C={props:[],async created(){const n=new URLSearchParams(window.location.search),o=await p.parseToken("token",n.get("token"));this.tokenChecked=!0,"ErrorCode"in o?this.errorCode=o.ErrorCode:"RedirectUrl"in o&&(window.location=o.RedirectUrl)},setup(){return{}},data(){return{tokenChecked:!1,errorCode:null}},mounted(){},methods:{},computed:{...g({tokens:n=>n.configuration.tokens})},components:{}},T={class:"d-flex flex-column min-vh-100 justify-content-center align-items-center h4 text-center"},w={key:0},A=["innerHTML"],H=c("div",{class:"spinner-border",role:"status"},[c("span",{class:"visually-hidden"},"Loading...")],-1),M=["innerHTML"],v=["innerHTML"],y=["innerHTML"];function $(n,o,a,s,e,l){return t(),r("div",T,[e.tokenChecked?i("",!0):(t(),r("span",w,[c("p",{innerHTML:n.$t("token.token_being_checked_html")},null,8,A),H])),e.tokenChecked&&e.errorCode=="invalid"?(t(),r("p",{key:1,innerHTML:n.$t("token.error_token_invalid_html")},null,8,M)):i("",!0),e.tokenChecked&&e.errorCode=="expired"?(t(),r("p",{key:2,innerHTML:n.$t("token.error_token_expired_html")},null,8,v)):i("",!0),e.tokenChecked&&e.errorCode=="unknown"?(t(),r("p",{key:3,innerHTML:n.$t("token.error_token_unknown_html")},null,8,y)):i("",!0)])}const x=d(C,[["render",$]]),E={async created(){console.log("Creating Landing App..."),console.log("Landing App created")},components:{TokenLanding:x}},N={class:"full-page"};function R(n,o,a,s,e,l){const m=h("TokenLanding");return t(),r("div",N,[u(m)])}const S=d(E,[["render",R]]),V=["token","auth-token","authorization"];L.get("../api/pre-login-configuration").then(n=>{const o=f(S);o.use(_),o.use(k);const a=new URLSearchParams(window.location.search);for(let s of V){const e=a.get(s);e&&(localStorage.setItem(s,e),p.updateAuthHeader(s))}o.mount("#app-landing")});