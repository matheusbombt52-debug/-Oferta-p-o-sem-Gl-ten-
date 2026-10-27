(()=>{
const C=CONFIG,D=DATA,mem={},$=s=>document.querySelector(s);
const norm=s=>(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const st={get(k,d){if(k in mem)return mem[k];try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},
 set(k,v){mem[k]=v;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},
 del(k){delete mem[k];try{localStorage.removeItem(k)}catch(e){}}};
const user=()=>{const u=st.get("sc_user",null);return u&&(C.demo||u.at)?u:null},uk=k=>k+":"+(user()?.email||"");
const favs=()=>st.get(uk("fav"),[]),unl=()=>st.get(uk("unl"),[]);
const sha=async t=>[...new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)))].map(b=>b.toString(16).padStart(2,"0")).join("");
const getM=id=>C.modules.find(m=>m.id==id),recs=id=>D.recipes[id]||[];
const brl=n=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n);
const toast=(m,err)=>{const t=$("#toast");t.textContent=m;t.className="show"+(err?" err":"");clearTimeout(toast.t);toast.t=setTimeout(()=>t.className="",3500)};
const page=(html,tab,fn)=>{$("#app").innerHTML=html;$("#nav").style.display=tab?"flex":"none";
 document.querySelectorAll("#nav a").forEach(a=>a.classList.toggle("on",a.dataset.t==tab));scrollTo(0,0);fn&&fn()};
const SB=()=>!!(C.supabase&&C.supabase.url&&C.supabase.anonKey),LIVE=()=>C.demo||SB();
let recTok="",recRt="";
const sb=async(p,o={})=>{try{const r=await fetch(C.supabase.url.replace(/\/$/,"")+"/auth/v1"+p,{method:o.m||"POST",headers:{"Content-Type":"application/json",apikey:C.supabase.anonKey,...(o.t?{Authorization:"Bearer "+o.t}:{})},body:o.b?JSON.stringify(o.b):undefined});let j={};try{j=await r.json()}catch(e){}return{ok:r.ok,s:r.status,j}}catch(e){return{ok:false,s:0,j:{}}}};
const errMsg=r=>{const j=r.j||{},c=String(j.error_code||""),m=String(j.msg||j.message||j.error_description||"").toLowerCase();
 if(!r.s)return"Não foi possível conectar. Verifique sua internet e tente novamente.";
 if(c=="invalid_credentials"||m.includes("invalid login"))return"E-mail ou senha incorretos.";
 if(c=="email_not_confirmed"||m.includes("not confirmed"))return"Confirme seu e-mail para entrar. Procure a mensagem que enviamos para você, inclusive na caixa de spam.";
 if(c=="user_already_exists")return"Este e-mail já tem cadastro. Entre ou recupere sua senha.";
 if(c=="weak_password")return"Escolha uma senha mais forte, com pelo menos 6 caracteres.";
 if(c=="signup_disabled")return"Novos cadastros estão desativados no momento.";
 if(c=="same_password")return"Escolha uma senha diferente da anterior.";
 if(r.s==429||c.includes("rate_limit"))return"Muitas tentativas. Aguarde alguns minutos e tente novamente.";
 return"Não foi possível concluir agora. Tente novamente em instantes."};
const session=j=>({email:(j.user?.email||"").toLowerCase(),name:j.user?.user_metadata?.name||"",at:j.access_token,rt:j.refresh_token,exp:Math.floor(Date.now()/1000)+(+j.expires_in||3600)});
const go=()=>{location.hash=="#/"?route():location.hash="#/"};
const AV='<details class="aviso"><summary><b>Importante:</b> aviso sobre glúten e saúde</summary><p>Este material tem finalidade culinária e educativa. Embora as receitas tenham sido desenvolvidas com ingredientes sem glúten, é essencial verificar os rótulos dos produtos utilizados e prevenir a contaminação cruzada durante o preparo. Formulações e informações de embalagem podem mudar. Se você tem doença celíaca, alergias, intolerâncias ou outra condição de saúde que exige restrições alimentares, procure orientação de um profissional de saúde qualificado para entender os cuidados adequados às suas necessidades.</p></details>';
const back=(h,t="Voltar")=>`<a href="${h}" class="top">← ${t}</a>`;
const rcard=(m,r)=>`<a class="rc" href="#/r/${m}/${r.id}"><div class="th num" aria-hidden="true">${r.num?String(r.num).padStart(2,"0"):"·"}</div><div class="rb"><b>${esc(r.name)}</b><small>${esc(r.cat)}${favs().includes(m+":"+r.id)?" · favorita":""}</small></div></a>`;
const mth=m=>m.cover?`<img class="cv" src="${esc(m.cover)}" alt="Capa: ${esc(m.title)}" loading="lazy">`:`<div class="th" style="background:#F3E3C9">${m.emoji}</div>`;
const ICL='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2.2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',ICK='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l3 3"/></svg>',ICU='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2.2"/><path d="M8 11V8a4 4 0 0 1 7.5-1.9"/></svg>';
const lkb=ok=>ok?"":`<span class="lkb">${ICL}</span>`;
const xcard=m=>{const ok=unl().includes(m.id);return `<a class="rc xc${ok?"":" is-lk"}" href="#/exclusivos/${m.id}"><span class="cvw">${mth(m)}${lkb(ok)}${!ok&&pct(m)?`<span class="dchip">-${pct(m)}%</span>`:""}</span><div class="rb"><b>${esc(m.title)}</b><small class="xd">${esc(m.desc||"")}</small><span class="tag ${ok?"ok":"cta"}">${ok?ICU+"Desbloqueado":ICK+"Toque para liberar"}</span></div><span class="chev" aria-hidden="true">›</span></a>`};
const lockBtn=m=>m.buyUrl?`<a class="btn" href="${esc(m.buyUrl)}" target="_blank" rel="noopener">Quero desbloquear</a>`:`<button class="btn off" disabled>Compra disponível em breve</button>`;
const pct=m=>m.price&&m.fullPrice&&m.fullPrice>m.price?Math.round((1-m.price/m.fullPrice)*100):0;
const ICC='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M3 4h2.5l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.2"/></svg>';
const buyBox=m=>{if(!m.buyUrl)return lockBtn(m);const p=pct(m);if(!p)return lockBtn(m);return `<p class="orx"><span>Ainda não tem o código?</span></p><div class="promo"><div class="promo-h"><span class="pct">${p}% OFF</span><span class="promo-t">Oferta especial</span></div><div class="promo-p"><s>${brl(m.fullPrice)}</s><b>${brl(m.price)}</b></div><p class="promo-s">Você economiza ${brl(m.fullPrice-m.price)}</p><a class="btn buy" href="${esc(m.buyUrl)}" target="_blank" rel="noopener">${ICC}Comprar com ${p}% OFF</a><p class="promo-n">Depois da compra, use o código de acesso recebido para liberar este conteúdo aqui.</p></div>`};

/* ---------- Autenticação ---------- */
const AT={login:{h:"Entrar",p:"Digite seu e-mail e sua senha para entrar.",b:"Entrar"},signup:{h:"Criar conta",p:"Crie sua conta para acessar suas receitas.",b:"Criar minha conta"},reset:{h:"Recuperar senha",p:"Informe seu e-mail e enviaremos um link para você criar uma nova senha.",b:"Enviar link"},newpw:{h:"Nova senha",p:"Escolha uma nova senha para a sua conta.",b:"Salvar nova senha"}};
const LK={login:'<a href="#/recuperar">Esqueci minha senha</a><br><a href="#/cadastro">Ainda não tem conta? Criar conta</a>',signup:'Já tem conta? <a href="#/login">Entrar</a>',reset:'<a href="#/login">Voltar para entrar</a>',newpw:""};
const LOGO='<img class="lg" src="img/logo.png" alt="Sabores em Casa">';
function authView(kind,note){
 if(!LIVE())return page(`<section class="auth">${LOGO}<h2>Área de membros</h2><p class="mut">O acesso está sendo preparado. Volte em breve.</p></section>`,null);
 const T=AT[kind],pw=kind!="reset",np=kind=="newpw",hint=kind=="login"?"":" (mínimo 6 caracteres)";
 page(`<section class="auth">${LOGO}<h2>${T.h}</h2><p class="mut">${T.p}</p>
 <form id="f" novalidate>${kind=="signup"?'<label>Seu nome<input name="name" autocomplete="given-name"></label>':""}
 ${np?"":'<label>E-mail<input name="email" type="email" inputmode="email" autocomplete="email"></label>'}
 ${pw?`<label>${np?"Nova senha":"Senha"}${hint}<input name="pw" type="password" autocomplete="${kind=="login"?"current":"new"}-password"></label>`:""}
 <p id="err" class="error" role="alert">${esc(note||"")}</p><p id="ok" class="okmsg" role="status"></p><button class="btn" id="sb">${T.b}</button></form>
 <p class="l">${LK[kind]}</p></section>`,null,()=>{
  $("#f").onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target),em=(f.get("email")||"").trim().toLowerCase(),p=f.get("pw")||"",nm=(f.get("name")||"").trim(),er=$("#err"),ok=$("#ok"),bt=$("#sb");er.textContent=ok.textContent="";
   if(!np&&!/^\S+@\S+\.\S+$/.test(em))return er.textContent="Digite um e-mail válido, como nome@email.com.";
   if(pw&&(kind=="login"?!p:p.length<6))return er.textContent=kind=="login"?"Digite sua senha.":"A senha precisa ter pelo menos 6 caracteres.";
   if(C.demo){if(kind=="reset")return ok.textContent="Prévia: nenhum e-mail é enviado.";st.set("sc_user",{email:em,name:nm});return go()}
   const lb=bt.textContent;bt.disabled=true;bt.textContent="Aguarde…";let r;
   if(kind=="login")r=await sb("/token?grant_type=password",{b:{email:em,password:p}});
   else if(kind=="signup")r=await sb("/signup",{b:{email:em,password:p,data:{name:nm}}});
   else if(kind=="reset")r=await sb("/recover",{b:{email:em}});
   else r=await sb("/user",{m:"PUT",t:recTok,b:{password:p}});
   bt.disabled=false;bt.textContent=lb;
   if(!r.ok)return er.textContent=errMsg(r);
   if(kind=="login"){st.set("sc_user",session(r.j));return go()}
   if(kind=="signup"){if(r.j.access_token){st.set("sc_user",session(r.j));return go()}e.target.reset();return ok.textContent="Enviamos um link de confirmação para o seu e-mail. Confira a caixa de entrada (e o spam) para continuar."}
   if(kind=="reset"){e.target.reset();return ok.textContent="Se este e-mail tiver cadastro, enviaremos um link para criar uma nova senha. Confira também o spam."}
   st.set("sc_user",{email:(r.j.email||"").toLowerCase(),name:r.j.user_metadata?.name||"",at:recTok,rt:recRt,exp:Math.floor(Date.now()/1000)+3600});toast("Senha atualizada com sucesso.");go()}})}
/* links recebidos por e-mail (confirmação de cadastro, recuperação de senha) */
async function fromLink(){const h=new URLSearchParams(location.hash.slice(1));history.replaceState(null,"",location.pathname+location.search+"#/");
 if(h.get("error")||h.get("error_description"))return authView("login","O link expirou ou já foi usado. Entre ou solicite um novo em “Esqueci minha senha”.");
 const t=h.get("access_token");
 if(h.get("type")=="recovery"){recTok=t;recRt=h.get("refresh_token")||"";return authView("newpw")}
 const r=await sb("/user",{m:"GET",t});if(!r.ok)return authView("login","Não foi possível validar o link. Tente entrar ou solicite um novo.");
 st.set("sc_user",{email:(r.j.email||"").toLowerCase(),name:r.j.user_metadata?.name||"",at:t,rt:h.get("refresh_token")||"",exp:Math.floor(Date.now()/1000)+(+h.get("expires_in")||3600)});toast("E-mail confirmado com sucesso.");route()}

/* ---------- Início ---------- */
const done=()=>st.get(uk("done"),[]);
function prog(){const ex=C.modules.filter(m=>!m.free),u=unl(),nb=D.bonus.filter(b=>!b.demo).length,total=1+nb+ex.length,got=1+nb+ex.filter(m=>u.includes(m.id)).length,acc=k=>k.startsWith("main:")||u.includes(k.split(":")[0]),dn=done().filter(acc).length,avail=recs("main").filter(r=>!r.demo).length+ex.filter(m=>u.includes(m.id)).reduce((s,m)=>s+recs(m.id).filter(r=>!r.demo).length,0);return{total,got,pct:Math.round(got/total*100),dn,avail,next:ex.find(m=>!u.includes(m.id)),nex:ex.length,gex:ex.filter(m=>u.includes(m.id)).length}}
const MD={primeira:"img/medalha-primeira.png",cinco:"img/medalha-cinco.png",dez:"img/medalha-dez.png",colecao:"img/medalha-colecao.png"};
const bnr=()=>{const L=C.modules.filter(m=>!m.free&&m.banner&&!unl().includes(m.id));if(!L.length)return"";return `<section class="car" aria-label="Ofertas dos produtos exclusivos"><div class="car-t" id="car">${L.map((m,i)=>`<a class="car-s" href="#/exclusivos/${m.id}"><img src="${esc(m.banner)}" alt="${esc(m.title)}, de ${brl(m.fullPrice)} por ${brl(m.price)} (${pct(m)}% de desconto)"${i?' loading="lazy"':""}></a>`).join("")}</div>${L.length>1?`<div class="car-d">${L.map((m,i)=>`<i class="${i?"":"on"}"></i>`).join("")}</div>`:""}</section>`};
function carInit(){const car=$("#car");if(!car)return;const ds=[...document.querySelectorAll(".car-d i")],n=car.children.length;let idx=0,hold=0;
 car.addEventListener("scroll",()=>{idx=Math.round(car.scrollLeft/car.clientWidth);ds.forEach((d,i)=>d.classList.toggle("on",i==idx))},{passive:true});
 ["touchstart","mousedown","focusin"].forEach(e=>car.addEventListener(e,()=>{hold=Date.now()+8000}));car.addEventListener("mouseenter",()=>{hold=Infinity});car.addEventListener("mouseleave",()=>{hold=Date.now()+2000});
 ds.forEach((d,i)=>d.onclick=()=>{hold=Date.now()+8000;car.scrollTo({left:i*car.clientWidth,behavior:"smooth"})});
 if(n>1&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const t=setInterval(()=>{if(!document.body.contains(car))return clearInterval(t);if(document.hidden||Date.now()<hold)return;idx=(idx+1)%n;car.scrollTo({left:idx*car.clientWidth,behavior:"smooth"})},5000)}}
/* ---------- Card de oferta: aparece uma única vez, após ~8 min de uso ---------- */
function promoCard(force){if($("#promo"))return;const ex=C.modules.filter(m=>!m.free&&!unl().includes(m.id));if(!ex.length||!user())return;const k=uk("promo");if(!force){if(st.get(k,{}).shown)return;st.set(k,{t:C.promoSeconds||480,shown:1})}
 const el=document.createElement("div");el.id="promo";el.setAttribute("role","dialog");el.setAttribute("aria-label","Oferta especial");
 el.innerHTML=`<button class="px" aria-label="Fechar">×</button><p class="pk">Oferta especial</p><h3>Aproveite o desconto!</h3><p class="ps">Você ainda não liberou ${ex.length==1?"este produto":"estes produtos"}:</p>${ex.map(m=>`<a class="pi" href="#/exclusivos/${m.id}"><span>${esc(m.title)}</span><b>${pct(m)?pct(m)+"% OFF":"Ver"}</b></a>`).join("")}<button class="pn" type="button">Agora não</button>`;
 document.body.appendChild(el);const close=()=>el.remove();el.querySelector(".px").onclick=close;el.querySelector(".pn").onclick=close;el.querySelectorAll("a.pi").forEach(x=>x.addEventListener("click",close))}
let pt=null;function promoTick(){if(!user()||document.hidden)return;const k=uk("promo"),s=st.get(k,{t:0,shown:0});if(s.shown)return;if(!pt||pt.k!=k)pt={k,t:s.t||0};pt.t++;if(pt.t%5==0)st.set(k,{t:pt.t,shown:0});if(pt.t>=(C.promoSeconds||480))promoCard(false)}
setInterval(promoTick,1000);
function home(){
 const u=user(),nm=(u.name||u.email.split("@")[0]).split(" ")[0],first=nm.charAt(0).toUpperCase()+nm.slice(1),P=prog(),last=st.get(uk("last"),null),lr=last&&(last.m=="main"||unl().includes(last.m))?recs(last.m).find(r=>r.id==last.id):null,
 bd=[["Primeira receita feita",P.dn>=1,MD.primeira],["5 receitas feitas",P.dn>=5,MD.cinco],["10 receitas feitas",P.dn>=10,MD.dez],["Coleção completa",!P.next,MD.colecao]],rp=P.avail?Math.round(P.dn/P.avail*100):0;
 page(`<div class="top2"><img class="lgs" src="img/logo.png" alt="Sabores em Casa"><a class="av" href="#/conta" aria-label="Minha conta">${esc(first.charAt(0))}</a></div>
 <section class="hero"><div><p class="hero-k">Bem-vindo de volta</p><h1>Olá, ${esc(first)}!</h1><p class="hero-s">${P.next?`Sua coleção está em ${P.pct}%. Faltam ${P.total-P.got} ${P.total-P.got==1?"material":"materiais"} para completar.`:"Parabéns! Você liberou toda a coleção."}</p></div><div class="ring" data-p="${P.pct}" style="--p:0"><b>${P.pct}%</b></div></section>
 ${lr?`<a class="cont" href="#/r/${last.m}/${lr.id}"><span><small>Continue de onde parou</small><b>${esc(lr.name)}</b></span><span class="chev" aria-hidden="true">›</span></a>`:""}
 ${bnr()}
 <section class="card jc"><div class="jh"><img src="img/jornada.jpg" alt="Mãos sovando massa sobre a bancada com farinha"><div class="jht"><h2>Sua jornada</h2><small>Acompanhe o seu avanço</small></div></div><div class="jb">
  <div class="pl"><span>Materiais liberados</span><b>${P.got} de ${P.total}</b></div><div class="pb"><i data-w="${P.pct}"></i></div>
  <div class="pl"><span>Receitas feitas</span><b>${P.dn} de ${P.avail}</b></div><div class="pb"><i data-w="${rp}"></i></div>
  ${P.next&&!bnr()?`<a class="nxt" href="#/exclusivos/${P.next.id}"><span><small>Próximo desbloqueio</small><b>${esc(P.next.title)}</b></span><span class="nxo">${pct(P.next)?pct(P.next)+"% OFF":"Ver"}</span></a>`:""}
  <h3 class="bh">Conquistas</h3><div class="bds">${bd.map(([t,on,p])=>`<div class="bd${on?" on":""}"><img src="${p}" alt="" width="68" height="68" loading="lazy"><small>${t}</small></div>`).join("")}</div></div></section>
 <a class="lib" href="#/receitas"><img class="libimg" src="img/paes-capa.jpg" alt="Pães sem glúten feitos em casa"><div class="libb"><h2>50 Receitas de Pães Sem Glúten</h2><p>Descubra receitas para diferentes momentos do dia.</p>${recs("main").filter(r=>!r.demo).length==50?'<span class="tag ok">50 receitas disponíveis</span>':""}<span class="btn">Explorar receitas</span></div></a>
 <h2>Meus bônus incluídos</h2><div class="grid2">${D.bonus.map(b=>`<a class="tile" href="#/bonus/${b.id}">${b.cover?`<img class="tn" src="${esc(b.cover)}" alt="${esc(b.alt||"")}" loading="lazy">`:`<i>${b.e}</i>`}${esc(b.t)}</a>`).join("")}</div>
 <h2>Produtos exclusivos</h2>${C.modules.filter(m=>!m.free).map(xcard).join("")}
 <a class="btn sec" href="#/ofertas" style="margin-top:12px">Ver ofertas adicionais</a>`,"home",()=>{S={q:"",cat:"Todas"};carInit();requestAnimationFrame(()=>requestAnimationFrame(()=>{document.querySelectorAll(".pb i").forEach(e=>e.style.width=e.dataset.w+"%");document.querySelectorAll(".ring").forEach(e=>e.style.setProperty("--p",e.dataset.p))}))})}

/* ---------- Biblioteca (busca + filtros reais) ---------- */
let S={q:"",cat:"Todas"},lastM="";
function modView(id){
 if(id=="main")return libView();
 const m=getM(id);if(lastM!=id){if(lastM)S={q:"",cat:"Todas"};lastM=id}
 if(!recs(id).some(r=>!r.demo))return page(`${back("#/exclusivos","Produtos exclusivos")}<h1>${esc(m.title)}</h1><div class="card"><p>As receitas desta coleção estão sendo preparadas e serão liberadas aqui em breve.</p></div>`,"excl");
 const cats=["Todas",...new Set(recs(id).map(r=>r.cat))];
 page(`${back(id=="main"?"#/":"#/exclusivos")}<h1>${esc(m.title)}</h1>${AV}
 <input type="search" id="q" placeholder="Buscar por receita ou ingrediente" aria-label="Buscar" value="${esc(S.q)}">
 <div class="chips">${cats.map(c=>`<button class="chip ${S.cat==c?"on":""}" data-c="${esc(c)}">${esc(c)}</button>`).join("")}</div><div id="list"></div>`,id=="main"?"rec":"excl",()=>{
  const upd=()=>{const q=norm(S.q.trim()),out=recs(id).filter(r=>(S.cat=="Todas"||r.cat==S.cat)&&(!q||norm([r.name,r.keywords,r.ingredients.map(i=>i[0]).join(" ")].join(" ")).includes(q)));
   $("#list").innerHTML=out.length?out.map(r=>rcard(id,r)).join(""):`<div class="empty"><p>Nenhuma receita encontrada${S.q?` para “${esc(S.q)}”`:""}.</p><button class="btn sec sm" id="clr">Limpar pesquisa e filtros</button></div>`;
   $("#clr")&&($("#clr").onclick=()=>{S={q:"",cat:"Todas"};modView(id)})};
  $("#q").oninput=e=>{S.q=e.target.value;upd()};
  document.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{S.cat=b.dataset.c;modView(id)});upd()})}

const slugf=c=>norm(c).replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const CD={"Pães rápidos":"Massas simples, prontas em pouco tempo","Pães para o dia a dia":"Para o café da manhã e as refeições","Pães para sanduíches":"Fatias e pães macios para recheios","Pães de frigideira":"Sem forno, direto na frigideira","Pães de liquidificador":"Massas batidas, sem sova","Pães doces":"Para o lanche e o café da tarde","Pães com sementes":"Com sementes e mais textura","Pães recheados":"Com recheios doces e salgados","Pães especiais":"Para ocasiões e mesas especiais"};
function libView(){
 if(lastM!="main"){S={q:"",cat:"Todas"};lastM="main"}
 const all=recs("main"),cats=[...new Set(all.map(r=>r.cat))],fv=favs().filter(x=>x.startsWith("main:")).map(x=>all.find(r=>"main:"+r.id==x)).filter(Boolean);
 page(`${back("#/","Início")}<h1>50 Receitas de Pães Sem Glúten</h1><p class="mut">Escolha uma categoria ou busque pelo nome da receita ou por um ingrediente que você tem em casa.</p>${AV}
 <input type="search" id="q" placeholder="Buscar por receita ou ingrediente" aria-label="Buscar por receita ou ingrediente" value="${esc(S.q)}"><div id="list"></div>`,"rec",()=>{
  const upd=()=>{const q=norm(S.q.trim());
   if(!q){$("#list").innerHTML=`<h2>Categorias</h2>${cats.map(c=>{const n=all.filter(r=>r.cat==c).length;return `<a class="cat" href="#/receitas/c/${slugf(c)}"><div><b>${esc(c)}</b><small>${esc(CD[c]||"")}</small></div><span class="mut">${n} ${n==1?"receita":"receitas"} ›</span></a>`}).join("")}${fv.length?`<h2>Suas favoritas</h2>${fv.map(r=>rcard("main",r)).join("")}`:""}`;return}
   const out=all.filter(r=>norm([r.name,r.keywords,r.ingredients.map(i=>i[0]).join(" ")].join(" ")).includes(q));
   $("#list").innerHTML=out.length?`<p class="mut">${out.length} ${out.length==1?"receita encontrada":"receitas encontradas"}</p>${out.map(r=>rcard("main",r)).join("")}`:`<div class="empty"><p>Não encontramos receitas para “${esc(S.q.trim())}”.<br>Tente outro nome ou ingrediente.</p><button class="btn sec sm" id="clr">Limpar busca</button></div>`;
   $("#clr")&&($("#clr").onclick=()=>{S.q="";$("#q").value="";upd();$("#q").focus()})};
  $("#q").oninput=e=>{S.q=e.target.value;upd()};upd()})}
function catView(slug){
 const all=recs("main"),cat=[...new Set(all.map(r=>r.cat))].find(c=>slugf(c)==slug);if(!cat)return libView();
 const L=all.filter(r=>r.cat==cat);
 page(`${back("#/receitas","Biblioteca de pães")}<h1>${esc(cat)}</h1><p class="mut">${L.length} ${L.length==1?"receita":"receitas"}</p>${L.map(r=>rcard("main",r)).join("")}`,"rec")}

/* ---------- Receita ---------- */
function recipe(mid,rid){
 const r=recs(mid).find(x=>x.id==rid);if(!r)return page(`<div class="empty"><p>Receita não encontrada.</p><a class="btn" href="#/receitas">Voltar à biblioteca</a></div>`,"rec");
 const fk=mid+":"+rid,ck=uk("chk:"+fk);let step=0;st.set(uk("last"),{m:mid,id:rid});
 const draw=()=>{const fv=favs().includes(fk),dn=done().includes(fk),ch=st.get(ck,[]);
  page(`${back(mid=="main"?"#/receitas/c/"+slugf(r.cat):"#/m/"+mid,mid=="main"?"Voltar para "+esc(r.cat):"Voltar à biblioteca")}
  <h1>${r.num?String(r.num).padStart(2,"0")+". ":""}${esc(r.name)}</h1>${r.desc?`<p>${esc(r.desc)}</p>`:""}<p class="mut">${[r.yield&&"Rendimento: "+r.yield,r.prep&&"Preparo: "+r.prep+" min",r.cook&&"Cozimento: "+r.cook,r.bake?"Forno: "+r.bake+" min"+(r.temp?" a "+r.temp:""):r.temp&&"Frigideira: "+r.temp].filter(Boolean).map(esc).join("<br>")}</p>
  <button class="btn ${fv?"":"sec"}" id="fav" aria-pressed="${fv}">${fv?"Salvo nos favoritos":"Salvar nos favoritos"}</button>
   <button class="btn ${dn?"olive":"sec"}" id="dn" aria-pressed="${dn}" style="margin-top:8px">${dn?"Receita feita":"Marcar como feita"}</button>
  <h2>Ingredientes</h2><p class="mut"><small>Confira no rótulo a declaração sobre glúten de cada produto industrializado e evite a contaminação cruzada.</small></p>${r.ingredients.map((i,x)=>`<label class="ing ${ch.includes(x)?"done":""}"><input type="checkbox" data-i="${x}" ${ch.includes(x)?"checked":""}><span>${esc(i[0])}<br><small>${esc(i[1])}</small></span></label>`).join("")}
  <h2>Modo de preparo</h2><p class="mut">Etapa ${step+1} de ${r.steps.length}</p><div class="step">${esc(r.steps[step])}</div>
  <div class="row"><button class="btn sec" id="pv" ${step?"":"disabled"}>Anterior</button><button class="btn olive" id="nx" ${step<r.steps.length-1?"":"disabled"}>Próxima</button></div>
  ${r.tips?`<h2>Dicas</h2><ul class="g">${r.tips.map(t=>`<li>${esc(t)}</li>`).join("")}</ul>`:""}${r.storage?`<h2>Conservação</h2><p>${esc(r.storage)}</p>`:""}${r.notes?`<h2>Observações</h2><p>${esc(r.notes)}</p>`:""}${AV}`,mid=="main"?"rec":"excl",()=>{
   $("#dn").onclick=()=>{const l=done();st.set(uk("done"),dn?l.filter(x=>x!=fk):[...l,fk]);if(!dn){const n=prog().dn,T={1:"Primeira receita feita",5:"5 receitas feitas",10:"10 receitas feitas"};toast(T[n]?"Conquista desbloqueada: "+T[n]+"!":"Receita marcada como feita!")}const y=scrollY;draw();scrollTo(0,y)};$("#fav").onclick=()=>{const l=favs();st.set(uk("fav"),fv?l.filter(x=>x!=fk):[...l,fk]);const y=scrollY;draw();scrollTo(0,y)};
   document.querySelectorAll(".ing input").forEach(c=>c.onchange=()=>{const x=+c.dataset.i,l=st.get(ck,[]);st.set(ck,c.checked?[...l,x]:l.filter(v=>v!=x));c.closest(".ing").classList.toggle("done",c.checked)});
   $("#pv").onclick=()=>{step--;const y=scrollY;draw();scrollTo(0,y)};$("#nx").onclick=()=>{step++;const y=scrollY;draw();scrollTo(0,y)}})};draw()}

/* ---------- Bônus ---------- */
const bonusList=()=>page(`${back("#/","Início")}<h1>Meus bônus</h1><p class="mut">Materiais incluídos no seu acesso.</p>${D.bonus.map(b=>`<a class="rc" href="#/bonus/${b.id}">${b.cover?`<span class="cvw"><img class="cv" src="${esc(b.cover)}" alt="${esc(b.alt||"")}" loading="lazy"></span>`:`<div class="th" style="background:#F3E3C9">${b.e}</div>`}<div class="rb"><b>${esc(b.t)}</b><span class="tag ${b.demo?"":"ok"}">${b.demo?"Em breve":"Incluído"}</span></div></a>`).join("")}`,"bonus");
function bonusView(id,bk="#/bonus"){const b=(bk=="#/bonus"?D.bonus:D.guides).find(x=>x.id==id);if(!b)return bonusList();
 page(`${back(bk,bk=="#/bonus"?"Meus bônus":"Produtos exclusivos")}<h1>${esc(b.t)}</h1>${b.cover?`<div class="cvw big"><img class="cvb" src="${esc(b.cover)}" alt="${esc(b.alt||"")}"></div>`:""}${AV}
 ${b.demo?'<div class="card"><p>Este material está sendo finalizado e será liberado em breve.</p></div>':b.secs.map(s=>`<h2>${esc(s.h)}</h2>${(s.p||[]).map(p=>`<p>${esc(p)}</p>`).join("")}${s.l?`<ul class="g">${s.l.map(i=>`<li>${esc(i)}</li>`).join("")}</ul>`:""}${s.t?`<div class="tw"><table><thead><tr>${s.t.h.map(x=>`<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>${s.t.r.map(r=>`<tr>${r.map((c,k)=>`<td data-l="${esc(s.t.h[k])}">${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:""}`).join("")}`,bk=="#/bonus"?"bonus":"excl")}

/* ---------- Exclusivos ---------- */
function excl(id){
 const m=getM(id);
 if(!m||m.free)return page(`${back("#/","Início")}<h1>Produtos exclusivos</h1><p class="mut">Toque em um produto e digite o seu código para liberar o acesso.</p>${(()=>{const P=prog();return `<div class="pl"><span>Produtos liberados</span><b>${P.gex} de ${P.nex}</b></div><div class="pb"><i style="width:${Math.round(P.gex/P.nex*100)}%"></i></div>`})()}
 ${C.modules.filter(x=>!x.free).map(xcard).join("")}
 <a class="btn sec" href="#/ofertas" style="margin-top:12px">Ver ofertas adicionais</a>`,"excl");
 const ok=unl().includes(id);
 page(`${back("#/exclusivos","Produtos exclusivos")}<div class="card">${m.cover?`<div class="cvw big${ok?"":" is-lk"}"><img class="cvb" src="${esc(m.cover)}" alt="Capa: ${esc(m.title)}">${lkb(ok)}</div>`:""}
  <h2 style="margin-top:0">${esc(m.title)}</h2><span class="tag ${ok?"ok":"cta"}">${ok?ICU+"Desbloqueado":ICK+"Digite seu código para liberar"}</span><p>${esc(m.desc)}</p>
  ${ok?`<a class="btn olive" href="#/m/${m.id}">${m.guide?"Abrir guia":"Abrir receitas"}</a>`:`<form class="uf" style="margin-top:10px" novalidate><label>Digite o código de acesso<input type="password" name="c" autocomplete="off" placeholder="Código de acesso"></label><p class="error" role="alert"></p><button class="btn sec">Liberar acesso</button></form>${buyBox(m)}`}</div>`,"excl",()=>{
  const f=$(".uf");if(!f)return;
  f.onsubmit=async e=>{e.preventDefault();const c=f.c.value.trim(),er=f.querySelector(".error");
   if(!c)return er.textContent="Digite o código de acesso.";
   if(!m.hash)return er.textContent="Este produto ainda não está disponível para desbloqueio.";
   if(await sha(c)!==m.hash)return er.textContent="Código incorreto. Confira o código recebido na compra e tente de novo.";
   st.set(uk("unl"),[...unl(),m.id]);toast(prog().next?"Produto desbloqueado! Sua coleção está em "+prog().pct+"%.":"Conquista desbloqueada: Coleção completa!");excl(id)}})}

/* ---------- Ofertas ---------- */
const offers=()=>page(`${back("#/exclusivos")}<h1>Ofertas adicionais</h1><p class="mut">Estas ofertas são separadas dos 3 bônus incluídos.</p>
 ${C.offers.filter(o=>o.available&&o.url).length?C.offers.filter(o=>o.available&&o.url).map(o=>{const ok=o.available&&o.url;return `<div class="card"><h3>${esc(o.title)}</h3><p>${esc(o.desc)}</p>
  ${o.includes?`<p><b>Inclui:</b></p><ul class="g">${o.includes.map(i=>`<li>${esc(getM(i)?.title||i)}</li>`).join("")}</ul>`:""}
  <p class="price">${typeof o.price=="number"?(typeof o.fullPrice=="number"&&o.fullPrice>o.price?`<small><s>${brl(o.fullPrice)}</s></small> `:"")+brl(o.price):""}</p>
  ${ok?`<a class="btn" href="${esc(o.url)}" target="_blank" rel="noopener">Quero esta oferta</a>`:`<button class="btn off" disabled>${o.available?"Link a configurar":"Indisponível no momento"}</button>`}</div>`}).join(""):'<div class="empty"><p>Não há ofertas adicionais disponíveis no momento.</p></div>'}`,"excl");

/* ---------- Conta ---------- */
const account=()=>{const u=user();page(`${back("#/","Início")}<h1>Minha conta</h1><div class="card"><small>E-mail</small><p><b>${esc(u.email)}</b></p></div>
 <h2>Configurações</h2><div class="card"><p class="mut">Os dados abaixo ficam apenas neste aparelho.</p>
 <button class="btn sec" id="cf">Limpar minhas favoritas</button><br><br><button class="btn sec" id="cu">Remover acessos liberados</button></div>
 <button class="btn" id="out" style="margin-top:12px">Sair da conta</button>`,"conta",()=>{
 $("#cf").onclick=()=>{st.del(uk("fav"));toast("Favoritas removidas.")};
 $("#cu").onclick=()=>{st.del(uk("unl"));toast("Acessos removidos deste aparelho.")};
 $("#out").onclick=()=>{const u=user();if(!C.demo&&u&&u.at)sb("/logout",{t:u.at});st.del("sc_user");location.hash="#/login"}})};

/* ---------- Rotas ---------- */
function route(){try{
 if(/^#(access_token|error)=/.test(location.hash))return fromLink();
 const [p,a,b]=(location.hash.slice(2)||"").split("/"),auth={login:1,cadastro:1,recuperar:1};
 if(!user()&&!auth[p])return authView("login");
 if(user()&&auth[p]){location.hash="#/";return}
 ({"":home,receitas:()=>a=="c"?catView(b):libView(),m:()=>{const m=getM(a);if(!m||m.free)return modView("main");unl().includes(a)?(m.guide?bonusView(m.guide,"#/exclusivos"):modView(a)):(toast("Desbloqueie este produto primeiro.",1),location.hash="#/exclusivos")},
  r:()=>{const m=getM(a);m&&(m.free||unl().includes(a))?recipe(a,b):location.hash="#/exclusivos"},
  bonus:()=>a?bonusView(a):bonusList(),exclusivos:()=>excl(a),ofertas:offers,conta:account,
  login:()=>authView("login"),cadastro:()=>authView("signup"),recuperar:()=>authView("reset")}[p]||home)()
}catch(e){console.error(e);page(`<div class="empty"><p>Algo deu errado ao abrir esta tela.</p><a class="btn" href="#/">Voltar ao início</a></div>`,null)}}
addEventListener("hashchange",route);
(async()=>{const u=user();if(!C.demo&&u&&u.rt&&u.exp&&u.exp-60<Date.now()/1000){const r=await sb("/token?grant_type=refresh_token",{b:{refresh_token:u.rt}});
 if(r.ok){const n=session(r.j);st.set("sc_user",{...n,email:n.email||u.email,name:n.name||u.name})}else if(r.s>=400&&r.s<500)st.del("sc_user")}
 route()})();
})();
