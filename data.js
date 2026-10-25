/* ===== CONFIGURAÇÃO CENTRAL: edite aqui produtos, URLs, códigos, ofertas e conteúdo ===== */
window.CONFIG={
  demo:true, // MODO VISUALIZAÇÃO (ligado): qualquer e-mail e senha entram, o login é só simulado no navegador. Antes de vender, preencha CONFIG.supabase abaixo e volte para false.
  supabase:{url:"",anonKey:""}, // preencha com os dados do SEU projeto; nunca use a service_role aqui
  /* hash = SHA-256 do código de acesso (nunca o código em texto). Cada produto tem o seu próprio código (só o hash fica aqui).
     ATENÇÃO: validação no navegador NÃO é proteção real. Para proteção real, valide no servidor (README). */
  modules:[
    {id:"main",title:"50 Receitas de Pães Sem Glúten",emoji:"",free:true},
    {id:"pizzas",title:"50 Pizzas Sem Glúten",desc:"Massas e coberturas para pizzas sem glúten.",emoji:"🍕",cover:"img/pizzas.jpg",hash:"5524fe000ffd5c1743a619d7e17581511ed083d674b9998c6c7b42024315e88a",price:5.9,fullPrice:7.9,buyUrl:"https://ggcheckout.app/checkout/v5/3bv9qF7v4hmqqU1KDLMzXs",enabled:true},
    {id:"bolos",title:"50 Bolos Sem Glúten",desc:"Bolos simples e de festa, sem glúten.",emoji:"🍰",cover:"img/bolos.jpg",hash:"845548b9529063b54598f77d3d8b332d66e2537cf0228d934802120a777bad8a",price:5.9,fullPrice:7.9,buyUrl:"https://ggcheckout.app/checkout/v5/llMoZddBExjqefE0r8uIJq",enabled:true},
    {id:"salgados",title:"50 Salgados e Lanches Sem Glúten",desc:"Salgados e lanches práticos para o dia a dia.",emoji:"🥟",cover:"img/salgados.jpg",hash:"270651be075a58532f43c18d19b581b8178ff42670fe9146add1821a7332aa4e",price:5.9,fullPrice:7.9,buyUrl:"https://ggcheckout.app/checkout/v5/CdbKe8VStcTL7bPhIMam08",enabled:true},
    {id:"guia",title:"Guia Prático: Onde Tem Glúten?",desc:"Identifique fontes de glúten, leia rótulos e evite a contaminação cruzada.",emoji:"🔍",cover:"img/gluten.jpg",guide:"gluten",hash:"0ab847ee0dd9fd88e9689ce1c32f2ebaaa969d3710ba1fd81246899ec37e268b",price:5.9,fullPrice:7.9,buyUrl:"https://ggcheckout.app/checkout/v5/ZNaF1t43FsX279dTR8h6qZ",enabled:true}
  ],
  offers:[ // price/fullPrice: número (ex.: 29.9) ou null. url: link de compra ou "". available: true/false
    {id:"whats",title:"Receber os materiais pelo WhatsApp",desc:"Descrição a definir.",price:null,url:"",available:false},
    {id:"vital",title:"Acesso vitalício ao app",desc:"Condições de acesso a definir.",price:null,url:"",available:false},
    {id:"combo",title:"Pacote combinado",desc:"Pizzas, Bolos e Salgados com desconto.",includes:["pizzas","bolos","salgados"],price:null,fullPrice:null,url:"",available:false}
  ]
};
const BG=["#EBCFA8","#DDB48A","#CFD3A2","#F1DDB8"];
const mk=(m,list)=>list.map(([name,cat,emoji,ings,kw],x)=>({id:m+(x+1),name,cat,emoji,bg:BG[x%4],demo:true,
  desc:"Receita demonstrativa. O texto definitivo será inserido pelo editorial.",
  ingredients:ings.split(",").map(s=>[s.trim(),"quantidade a definir"]),yield:"a definir",prep:null,bake:null,
  steps:["Etapa demonstrativa 1: misture os ingredientes secos.","Etapa demonstrativa 2: acrescente os ingredientes líquidos e misture.","Etapa demonstrativa 3: modele e asse conforme o conteúdo definitivo."],
  keywords:kw||"",notes:"Conteúdo demonstrativo: não foi testado e não representa a receita final."}));
window.DATA={
recipes:{
 main:(window.PAES||[]),
 pizzas:(window.PIZZAS&&window.PIZZAS.length)?window.PIZZAS:mk("pizzas",[
  ["Massa de pizza de arroz","Massas","🍕","farinha de arroz, polvilho, azeite, fermento, sal","base"],
  ["Pizza de calabresa","Salgadas","🌶️","massa sem glúten, molho de tomate, mussarela, calabresa, cebola","calabresa"],
  ["Pizza doce de banana","Doces","🍌","massa sem glúten, banana, canela, açúcar","sobremesa"]]),
 bolos:(window.BOLOS&&window.BOLOS.length)?window.BOLOS:mk("bolos",[
  ["Bolo de cenoura","Bolos simples","🥕","cenoura, ovos, óleo, açúcar, farinha sem glúten, fermento","cobertura"],
  ["Bolo de fubá","Bolos simples","🌽","fubá, leite, ovos, açúcar, óleo, fermento","café"],
  ["Bolo de chocolate","Bolos de festa","🍫","chocolate em pó, ovos, açúcar, farinha sem glúten, leite","aniversário"]]),
 salgados:(window.SALGADOS&&window.SALGADOS.length)?window.SALGADOS:mk("salgados",[
  ["Coxinha de mandioca","Salgados","🍗","mandioca cozida, frango desfiado, cebola, temperos","festa"],
  ["Empada de palmito","Salgados","🥧","massa sem glúten, palmito, cebola, azeite","lanche"],
  ["Sanduíche natural","Lanches","🥪","pão sem glúten, peito de frango, cenoura, requeijão","prático"]])
},
bonus:(window.BONUS||[]).map(b=>({...b,cover:({farinhas:"img/bonus-farinhas.jpg",sos:"img/bonus-sos.jpg",conserva:"img/bonus-conserva.jpg"})[b.id],alt:({farinhas:"Sacos e tigelas com grãos e farinhas",sos:"Pão com símbolo de proibido",conserva:"Pães fatiados embalados em sacos plásticos"})[b.id]})), // 3 bônus incluídos na oferta principal: content/bonus.js
guides:(window.GUIAS||[]) // produtos adicionais (order bump), nunca listados como bônus: content/guia.js
};