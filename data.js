/* ===== CONFIGURAÇÃO CENTRAL: edite aqui produtos, URLs, códigos, ofertas e conteúdo ===== */
window.CONFIG={
  demo:false, // false = login real via Supabase (preencha CONFIG.supabase abaixo). true = login simulado, só para testes locais.
  supabase:{url:"",anonKey:""}, // preencha com os dados do SEU projeto; nunca use a service_role aqui
  /* hash = SHA-256 do código de acesso (nunca o código em texto). Em demonstração, todos usam o código de teste "demo".
     ATENÇÃO: validação no navegador NÃO é proteção real. Para proteção real, valide no servidor (README). */
  modules:[
    {id:"main",title:"50 Receitas de Pães Sem Glúten",emoji:"",free:true},
    {id:"pizzas",title:"50 Pizzas Sem Glúten",desc:"Massas e coberturas para pizzas sem glúten.",emoji:"🍕",cover:"img/pizzas.jpg",hash:"2a97516c354b68848cdbd8f54a226a0a55b21ed138e207ad6c5cbb9c00aa5aea",buyUrl:"",enabled:true},
    {id:"bolos",title:"50 Bolos Sem Glúten",desc:"Bolos simples e de festa, sem glúten.",emoji:"🍰",cover:"img/bolos.jpg",hash:"2a97516c354b68848cdbd8f54a226a0a55b21ed138e207ad6c5cbb9c00aa5aea",buyUrl:"",enabled:true},
    {id:"salgados",title:"50 Salgados e Lanches Sem Glúten",desc:"Salgados e lanches práticos para o dia a dia.",emoji:"🥟",cover:"img/salgados.jpg",hash:"2a97516c354b68848cdbd8f54a226a0a55b21ed138e207ad6c5cbb9c00aa5aea",buyUrl:"",enabled:true},
    {id:"guia",title:"Guia Prático: Onde Tem Glúten?",desc:"Identifique fontes de glúten, leia rótulos e evite a contaminação cruzada.",emoji:"🔍",cover:"img/gluten.jpg",guide:"gluten",hash:"2a97516c354b68848cdbd8f54a226a0a55b21ed138e207ad6c5cbb9c00aa5aea",buyUrl:"",enabled:true}
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
 pizzas:mk("pizzas",[
  ["Massa de pizza de arroz","Massas","🍕","farinha de arroz, polvilho, azeite, fermento, sal","base"],
  ["Pizza de calabresa","Salgadas","🌶️","massa sem glúten, molho de tomate, mussarela, calabresa, cebola","calabresa"],
  ["Pizza doce de banana","Doces","🍌","massa sem glúten, banana, canela, açúcar","sobremesa"]]),
 bolos:mk("bolos",[
  ["Bolo de cenoura","Bolos simples","🥕","cenoura, ovos, óleo, açúcar, farinha sem glúten, fermento","cobertura"],
  ["Bolo de fubá","Bolos simples","🌽","fubá, leite, ovos, açúcar, óleo, fermento","café"],
  ["Bolo de chocolate","Bolos de festa","🍫","chocolate em pó, ovos, açúcar, farinha sem glúten, leite","aniversário"]]),
 salgados:mk("salgados",[
  ["Coxinha de mandioca","Salgados","🍗","mandioca cozida, frango desfiado, cebola, temperos","festa"],
  ["Empada de palmito","Salgados","🥧","massa sem glúten, palmito, cebola, azeite","lanche"],
  ["Sanduíche natural","Lanches","🥪","pão sem glúten, peito de frango, cenoura, requeijão","prático"]])
},
bonus:[
 {id:"farinhas",t:"Guia de Farinhas e Substituições",e:"🌾",demo:true,secs:[
  {h:"Como usar este guia",p:["Conteúdo demonstrativo: o material definitivo será inserido pelo editorial."]},
  {h:"Farinhas e amidos",l:["Farinha de arroz","Polvilho doce e azedo","Fécula de batata","Farinha de grão-de-bico"]},
  {h:"Tabela de substituições",p:["Espaço reservado para a tabela definitiva."]}]},
 {id:"sos",t:"SOS Pão Sem Glúten: Como Evitar Erros Comuns",e:"🆘",demo:true,secs:[
  {h:"Problemas frequentes",l:["Pão que não cresce","Miolo úmido ou pesado","Casca muito dura","Pão que racha"]},
  {h:"Soluções",p:["Espaço reservado para o diagnóstico e as soluções definitivas."]}]},
 {id:"conserva",t:"Guia de Conservação e Congelamento",e:"❄️",demo:true,secs:[
  {h:"Temas do guia",l:["Conservar em temperatura ambiente","Armazenar na geladeira","Congelar e descongelar","Reaquecer"]},
  {h:"Orientações",p:["Espaço reservado para as orientações definitivas."]}]}
],
guides:[
 {id:"gluten",t:"Guia Prático: Onde Tem Glúten?",e:"🔍",secs:[
  {h:"O que é glúten",p:["Glúten é um conjunto de proteínas presente no trigo, no centeio e na cevada, e em seus derivados. A aveia pode conter traços por contaminação durante o cultivo ou o processamento."]},
  {h:"Onde costuma aparecer",l:["Pães, massas, bolos e biscoitos tradicionais","Cerveja e outras bebidas com malte","Empanados, farinha de rosca e salgados","Molhos prontos, caldos, temperos e embutidos","Sopas instantâneas e produtos de preparo rápido"]},
  {h:"Lendo rótulos",l:["Procure a frase CONTÉM GLÚTEN ou NÃO CONTÉM GLÚTEN: a legislação brasileira exige essa informação nos alimentos industrializados.","Observe ingredientes como trigo, centeio, cevada, malte e extrato de malte.","Confira o rótulo a cada compra: as receitas dos fabricantes podem mudar."]},
  {h:"Contaminação cruzada em casa",l:["Use utensílios, tábuas e peneiras bem lavados ou exclusivos.","Evite compartilhar manteiga, geleias e pastas usadas com talheres que tocaram pão comum.","Cuidado com óleo de fritura e fornos usados para alimentos com glúten."]},
  {h:"Aviso importante",p:["Este guia traz informações gerais e não substitui a orientação de médico ou nutricionista. Quem tem doença celíaca ou sensibilidade ao glúten deve seguir o acompanhamento profissional."]}]}
]
};