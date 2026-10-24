/* FIB MDT Cloudflare compatibility adapter. */
(() => {
  const TOKEN_KEY = "fib_mdt_session";
  const pages = {
    Page_Dashboard:"dashboard.html", Page_Agents:"agents.html", Page_System:"system.html",
    Page_Patrols:"patrols.html", Page_Records:"records.html", "Page_Records(2)":"records.html",
    Page_Announcements:"announcements.html", Page_Vacations:"vacations.html", Page_IFines:"ifines.html",
    Page_Fines:"fines.html", Page_Lawyers:"lawyers.html", Page_Warrants:"warrants.html",
    Page_Wanted:"wanted.html", Page_Calendar:"calendar.html", Page_Classification:"classification.html",
    Page_Classifications:"classification.html", Page_Gangs:"gangs.html", Page_Bonuses:"bonuses.html", Page_Logs:"logs.html"
  };
  function err(payload,status){ const e=new Error(payload?.message||payload?.error||`API-Fehler (HTTP ${status})`); e.status=status; e.code=payload?.code; return e; }
  async function invoke(method,args){
    if(method === "include") {
      const key=String(args[0]||"").replace(/\.html$/i,""); const filename=pages[key];
      if(!filename) throw new Error(`Seite nicht freigegeben: ${key}`);
      const response=await fetch(`/pages/${filename}`,{credentials:"same-origin",headers:{Accept:"text/html"}});
      const body=await response.text(); if(!response.ok) throw err({message:body||"Seite konnte nicht geladen werden."},response.status); return body;
    }
    const token=sessionStorage.getItem(TOKEN_KEY)||"";
    const authRoutes={login:"login",requestAccount:"register",getCurrentUser:"session",getSessionInfo:"session-info",getMyPermissions:"permissions",logout:"logout",changeOwnPassword:"password",uploadOwnProfileImage:"profile-image",removeOwnProfileImage:"profile-image/remove"};
    const route=authRoutes[method]?`/api/auth/${authRoutes[method]}`:`/api/legacy/${encodeURIComponent(method)}`;
    const response=await fetch(route,{
      method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json",Accept:"application/json"},
      body:JSON.stringify({args,token})
    });
    let payload={}; try{payload=await response.json()}catch{}
    if(!response.ok) throw err(payload,response.status);
    return payload;
  }
  function makeRunner(){let success=null,failure=null,used=false;const proxy=new Proxy({}, {get(_t,p){
    if(p==="withSuccessHandler") return fn=>{success=fn;return proxy};
    if(p==="withFailureHandler") return fn=>{failure=fn;return proxy};
    if(p==="then") return undefined;
    return (...args)=>{if(used)throw new Error("Ein API-Runner kann nur einen Aufruf ausführen.");used=true;invoke(String(p),args).then(v=>{if(typeof success==="function")success(v)}).catch(e=>{if(typeof failure==="function")failure(e);else console.error("FIB MDT API",e)});};
  }});return proxy;}
  const api={}; Object.defineProperty(api,"run",{get:makeRunner}); window.CloudApi=api;
  window.runServer=(method,...args)=>invoke(method,args);
})();
