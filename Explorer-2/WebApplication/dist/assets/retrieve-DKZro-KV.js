import{o as n,_ as l,s as m,i as p}from"./index-CkdC1qCT.js";import{e as o,f as r,E as u,x as c,g as f,Z as g,a4 as y}from"./@vue-CXKnfUZt.js";import{m as w}from"./vuex-BTKxU11I.js";import"./bootstrap-5y-2wTs5.js";/* empty css                        *//* empty css                     */import{a as v}from"./axios-CCb-kr4I.js";import"./vue-i18n-DipsLOQt.js";import"./@intlify-Dg0E80p9.js";const _={props:[],async created(){const e=new URLSearchParams(window.location.search);e.has("StudyInstanceUID")?this.studyInstanceUid=e.get("StudyInstanceUID"):e.has("study")?this.studyInstanceUid=e.get("study"):console.error("No study defined.  Use StudyInstanceUID=1.2.3.... in your url");const t=e.get("modality");e.has("viewer")&&(this.viewer=e.get("viewer"));const i=await n.findStudy(this.studyInstanceUid);if(i==null){if(this.state="finding-remotely",(await n.remoteDicomFind("Study",t,{StudyInstanceUID:this.studyInstanceUid},!0)).length==0)this.state="not-found";else if(this.remoteMode=="dicom"){const s={StudyInstanceUID:this.studyInstanceUid},d=await n.remoteDicomRetrieveResource("Study",t,s,this.system.DicomAet);this.state="retrieving",this.startMonitoringJob(d)}}else this.studyOrthancId=i.ID,this.openViewer()},setup(){return{}},data(){return{state:"finding-locally",remoteMode:"dicom",viewer:"stone-viewer",retrievedInstancesCount:0,studyInstanceUid:null,studyOrthancId:null,jobProgressComplete:0,jobProgressFailed:0,jobProgressRemaining:100,jobRefreshTimeout:200,jobIsComplete:!1,jobIsRunning:!1,jobIsSuccess:!1}},mounted(){},methods:{startMonitoringJob(e){this.jobRefreshTimeout=200,setTimeout(this.monitorJob,this.jobRefreshTimeout,[e])},openViewer(){this.viewer=="stone-viewer"?window.location.href=n.getStoneViewerUrl("study",this.studyInstanceUid):this.viewer=="osimis-viewer"?window.location.href=n.getOsimisViewerUrl("study",this.studyOrthancId):this.viewer=="ohif-viewer"?window.location.href=n.getOh("study",this.studyOrthancId):console.error("unsupported viewer: ",this.viewer)},async monitorJob(e){const t=await n.getJobStatus(e);if(this.jobIsComplete=t.State=="Success"||t.State=="Failure",this.jobIsRunning=t.State=="Running",this.jobIsSuccess=t.State=="Success",this.jobIsComplete)this.jobProgressRemaining=0,this.jobIsSuccess?(this.jobProgressComplete=100,this.jobProgressFailed=0):(this.jobProgressComplete=0,this.jobProgressFailed=100);else{if(this.studyOrthancId==null){const i=await n.findStudy(this.studyInstanceUid);i!=null&&(this.studyOrthancId=i.ID)}else{const i=await n.getStudyInstances(this.studyOrthancId);this.retrievedInstancesCount=i.length}this.jobProgressFailed=0,this.jobProgressComplete=t.Progress,this.jobProgressRemaining=100-this.jobProgressComplete}this.jobIsComplete?this.openViewer():(this.jobRefreshTimeout=Math.min(this.jobRefreshTimeout+200,2e3),setTimeout(this.monitorJob,this.jobRefreshTimeout,[e]))}},computed:{...w({system:e=>e.configuration.system})},components:{}},I={class:"d-flex flex-column min-vh-100 justify-content-center align-items-center h4 text-center"},b=["innerHTML"],j=["innerHTML"],S=["innerHTML"],R=["innerHTML"],T=["innerHTML"],U=u("div",{class:"spinner-border",role:"status"},[u("span",{class:"visually-hidden"},"Loading...")],-1);function A(e,t,i,a,s,d){return o(),r("div",I,[u("span",null,[s.state=="finding-locally"?(o(),r("p",{key:0,innerHTML:e.$t("retrieve_and_view.finding_locally")},null,8,b)):c("",!0),s.state=="finding-remotely"?(o(),r("p",{key:1,innerHTML:e.$t("retrieve_and_view.finding_remotely")},null,8,j)):c("",!0),s.state=="not-found"?(o(),r("p",{key:2,innerHTML:e.$t("retrieve_and_view.not_found")},null,8,S)):c("",!0),s.state=="retrieving"?(o(),r("p",{key:3,innerHTML:e.$t("retrieve_and_view.retrieving")},null,8,R)):c("",!0),s.state=="retrieving"?(o(),r("p",{key:4,innerHTML:e.$t("retrieve_and_view.retrieved_html",{count:s.retrievedInstancesCount})},null,8,T)):c("",!0),U])])}const M=l(_,[["render",A]]),P={async created(){console.log("Creating RetrieveAndView App..."),await this.$store.dispatch("configuration/load"),console.log("RetrieveAndView App created")},components:{RetrieveAndView:M}},V={class:"full-page"};function C(e,t,i,a,s,d){const h=g("RetrieveAndView");return o(),r("div",V,[f(h)])}const L=l(P,[["render",C]]),D=["token","auth-token","authorization"];v.get("../api/pre-login-configuration").then(e=>{const t=y(L);t.use(m),t.use(p);const i=new URLSearchParams(window.location.search);for(let a of D){const s=i.get(a);s&&(localStorage.setItem(a,s),n.updateAuthHeader(a))}t.mount("#app-retrieve-and-view")});