# Registro de progresso do conteúdo
| Material | Meta | Feito |
|---|---|---|
| Pães (content/paes.js) | 50 | 50 (01–50) |
| Pizzas (content/pizzas.js) | 50 | 50 (01–50), conferidas |
| Bolos (content/bolos.js) | 50 | 50 (01–50), conferidos |
| Salgados e lanches (content/salgados.js) | 50 | 50 (01–50), conferidos |
| Bônus 1: Guia de Farinhas e Substituições | completo | concluído (content/bonus.js) |
| Bônus 2: SOS Pão Sem Glúten | completo | concluído (content/bonus.js) |
| Bônus 3: Guia de Conservação e Congelamento | completo | concluído (content/bonus.js) |
| Guia Prático: Onde Tem Glúten? (ORDER BUMP, não é bônus) | completo | concluído (content/guia.js) |

## Lotes
- Lote 1: pães 01–08 (queijo, forma de arroz, batata-doce, frigideira de iogurte, liquidificador de cenoura, fubá e queijo, banana e canela, sementes).
- Lote 2: pães 09–20 (grão-de-bico de frigideira, mandioca, hambúrguer, arroz de liquidificador, iogurte, focaccia de ervas, linhaça e ovos, abóbora e coco, cacau e laranja, arepas, broa de milho, abobrinha e queijo).

- Lote 3: pães 21–50 (batata-baroa, requeijão, inhame, batata com ervas, arroz integral, trigo-sarraceno, quinoa, pãozinho de leite, forma de sorgo, pão sírio, cachorro-quente, tapioca com chia, milho de frigideira, batata de frigideira, tortilha de mandioca, beterraba, ricota, coco, milho verde, maçã e canela, rosquinhas de polvilho, recheados de goiabada e de frango, girassol e abóbora, chia e coco, amêndoas e sementes, azeitonas e alecrim, tomate seco, castanhas e frutas secas, pão de alho).

Categorias dos pães (9): rápidos 7, dia a dia 8, sanduíches 5, frigideira 7, liquidificador 4, doces 8, com sementes 5, recheados 2, especiais 4.

Nenhuma receita foi testada em cozinha (registro interno; não aparece na interface). Os campos de busca por palavra-chave usam o 13º parâmetro opcional da função `R`.

Próximo: pizzas (módulo exclusivo).

## Estrutura comercial (não alterar)
- Oferta principal: 50 Receitas de Pães Sem Glúten + 3 bônus incluídos (Farinhas, SOS, Conservação).
- Produtos exclusivos/adicionais, bloqueados por acesso: Pizzas, Bolos, Salgados e o Guia "Onde Tem Glúten?" (order bump). O guia fica em `D.guides` e em `CONFIG.modules`, nunca em `D.bonus`.

## Etapa 1 concluída: três bônus
- Arquivos: `content/bonus.js` (novo), `data.js` (D.bonus lê window.BONUS), `app.js` (renderização de tabelas), `style.css` (tabelas responsivas), `index.html` (script novo).
- Texto das ofertas corrigido de "4 bônus" para "3 bônus".
- Verificado: três bônus abrem completos, tabelas legíveis no celular, guia do glúten fora dos bônus e bloqueado, pizzas bloqueadas, biblioteca de pães intacta.
- Pendente: Etapa 2 (50 pizzas, 0 feitas), Etapa 3 (50 bolos, 0), Etapa 4 (50 salgados, 0), Etapa 5 (guia do glúten completo).

## Etapa 2 concluída: 50 pizzas (content/pizzas.js)
- Lotes: 01–10 (massas e bases + tradicionais), 11–20 (tradicionais, brancas, especial), 21–30 (frigideira e liquidificador), 31–40 (leves, calzones e fechadas), 41–50 (doces, especiais e de forma).
- Categorias (10): massas e bases 5, de forma 4, tradicionais 8, brancas 5, especiais 2, de frigideira 5, de liquidificador 5, leves 5, calzones e fechadas 5, doces 6.
- Observação editorial: as pizzas de cobertura (07 em diante, parte delas) usam como base as massas 01, 02 ou 06 desta coleção; as demais têm massa própria.
- Arquivos alterados: content/pizzas.js (novo), data.js (pizzas lê window.PIZZAS), index.html (script novo), app.js (busca dos módulos e correção de busca que vazava entre módulos).
- Verificado (automático, celular 390 px): 50 receitas abrem completas, sem avisos, imagens ou emojis; busca por nome e ingrediente; acesso bloqueado sem desbloqueio; pães e bônus intactos.
- Nenhuma receita foi testada em cozinha.

## Etapa 3 concluída: 50 bolos (content/bolos.js)
- Lotes: 01–10 (simples e chocolate), 11–20 (chocolate, frutas e cítricos), 21–30 (cítricos, fubá e milho, coco), 31–40 (coco, raízes e legumes, especiarias), 41–50 (café e lanche, especiais).
- Categorias (10): bolos simples 6, chocolate e cacau 6, frutas 6, cítricos 4, fubá e milho 5, coco 4, raízes e legumes 5, especiarias 4, café e lanche 5, especiais 5.
- Variedade de técnica: massa de liquidificador, ovos batidos até triplicar (pão de ló), claras em neve, método da manteiga batida, leite quente, água fervente, banho-maria (quindim), sem farinha (chocolate, quindim), farinha de coco, farinha de amêndoas, caneca no micro-ondas, frigideira sem forno, rocambole, cheesecake assado.
- Arquivos criados: content/bolos.js.
- Arquivos alterados: index.html (script de bolos), data.js (bolos lê window.BOLOS; os 3 exemplos demonstrativos ficam só como reserva), app.js (campo opcional `cook`, linha "Cozimento:" usada pelas receitas 41 e 42, que não vão ao forno), PROGRESS.md.
- Pães, pizzas, bônus, guia do glúten, login, acesso e preços não foram alterados.
- Verificado (automático): 50 receitas, numeração 01–50 sem lacunas ou duplicações, nomes e ids únicos; campos obrigatórios preenchidos em todas; todo ingrediente tem quantidade; todo ingrediente é citado no preparo (as exceções apontadas pelo script eram falsos alertas de redação); nenhum ingrediente com glúten na lista; toda receita traz orientação de rótulo e contaminação cruzada nas dicas.
- Verificado (navegador automatizado, celular 390 px, com acesso liberado de teste): lista com 50 cards e 10 categorias; busca por nome e ingrediente (banana, beterraba, cenoura, farinha de coco, amêndoa, chocolate, goiabada; termo inexistente retorna vazio); as 50 receitas abrem com ingredientes, preparo, dicas e conservação, sem imagens, emojis, rolagem horizontal ou erros no console; avanço de etapas funciona; pães (50), pizzas (50) e 3 bônus continuam abrindo; módulo de bolos continua bloqueado sem código.
- Nenhuma receita foi testada em cozinha (registro interno; não aparece na interface).
- Pendente: revisão culinária em cozinha, a critério do editorial, antes do lançamento; fotos não foram incluídas (por decisão do briefing).

## Etapa 4 concluída: 50 salgados e lanches (content/salgados.js)
- Lotes: 01–10 (empadas, empadões, tortas e quiche), 11–20 (salgados assados: esfiha, enroladinhos, pastel assado, empanada, kibe, rocambole), 21–30 (bolinhos e fritos, mais nuggets assados), 31–40 (panquecas, crepes, tapioca, wrap, cuscuz, tortilha, muffins, batata recheada), 41–50 (petiscos e lanches rápidos).
- Categorias (7): empadas e tortinhas 3, tortas 7, salgados assados 10, bolinhos e fritos 9, panquecas e crepes 3, lanches rápidos 10, petiscos 8.
- Receitas que não vão ao forno usam o campo `cook` (função `RSC`): fritura, frigideira, cozimento em panela. As demais usam forno e temperatura.
- Arquivos criados: content/salgados.js.
- Arquivos alterados: index.html (script de salgados), data.js (salgados lê window.SALGADOS; os 3 exemplos ficam só como reserva), PROGRESS.md.
- Pães, pizzas, bolos, bônus, guia do glúten, login, acessos, preços e visual não foram alterados.
- Verificado (script): 50 receitas, numeração 01–50 sem lacunas, nomes e ids únicos, campos obrigatórios preenchidos, toda receita com forno traz temperatura, nenhum ingrediente com trigo, aveia, cevada, centeio ou malte, aviso de rótulo em todas as receitas, nenhuma receita doce, sem emojis. Os alertas restantes do script (alho, óleo de fritura, plurais) foram falsos positivos de redação.
- Verificado (navegador automatizado, celular 390 px, demo com acesso liberado): lista com 50 cards e 7 categorias; busca por nome e ingrediente funciona e termo inexistente retorna vazio; as 50 receitas abrem com o número correto, sem imagens e sem rolagem horizontal; módulo bloqueado sem código; pães (9 categorias), pizzas (50), bolos (50) e 3 bônus continuam abrindo. Único erro de console: fontes do Google indisponíveis no ambiente de teste (sem internet).
- Nenhuma receita foi testada em cozinha (registro interno; não aparece na interface). Recomenda-se revisão culinária antes do lançamento, principalmente das massas de polvilho, mandioca e batata, e dos tempos de fritura.
- Atenção editorial: farinha de rosca, salsichas, presunto, flocão, fubá, polenta e grão-de-bico são produtos que podem conter ou ter contato com glúten; as receitas orientam conferir o rótulo.

## Etapa 5 concluída: Guia Prático: Onde Tem Glúten? (content/guia.js)
- Conteúdo: 12 capítulos pedidos no briefing (entendendo o glúten; cereais, farinhas e ingredientes; onde o glúten se esconde; naturalmente sem glúten; rótulos; contaminação cruzada em casa; compras; comer fora; lista de compras; consulta rápida em 3 tabelas; checklist diário; conclusão), mais uma seção "Antes de começar" com aviso de que não substitui orientação de médico ou nutricionista. Cerca de 2.200 palavras, 20 seções, sem imagens nem emojis no texto.
- Base de rotulagem: Lei nº 10.674/2003 (CONTÉM GLÚTEN / NÃO CONTÉM GLÚTEN) e RDC nº 26/2015 da Anvisa (ALÉRGICOS: CONTÉM / PODE CONTER). O guia orienta consultar o site da Anvisa em caso de dúvida ou atualização das regras.
- Arquivos criados: content/guia.js (window.GUIAS).
- Arquivos alterados: data.js (D.guides agora lê window.GUIAS; o texto curto antigo foi substituído), index.html (script novo), PROGRESS.md.
- Não alterados: pães, pizzas, bolos, salgados, 3 bônus, login, acessos, preços, links de compra, ofertas e visual. O guia continua em D.guides e CONFIG.modules (id "guia"), nunca em D.bonus, e usa o desbloqueio por código já existente.
- Pendente (depende de você): código de acesso real e URL de compra do guia (buyUrl continua vazio), preço e condições da oferta; revisão do texto por nutricionista ou profissional de saúde antes do lançamento, a seu critério.

## Próximo passo (retomar daqui)
- Conteúdo concluído. Restam as pendências comerciais e de configuração: Supabase, códigos reais, URLs de checkout, preços e fotos.

## Ajuste de design: Produtos exclusivos
- Cards redesenhados: capa em preto e branco com cadeado em círculo branco quando bloqueado; colorida e sem cadeado quando desbloqueado. Inclui descrição curta, selo com ícone (sem emoji) e seta. Na tela do produto a capa grande segue a mesma regra.
- Arquivos alterados: app.js (função `xcard` reutilizada na home e em Exclusivos), style.css (bloco "Produtos exclusivos" no final), data.js.
- Códigos de acesso reais configurados em `data.js` por produto (somente o hash SHA-256 fica no código): Pizzas, Bolos, Salgados e Guia, cada um com o seu.
- A demonstração tem um botão flutuante "Liberar todos os exclusivos" que existe só na demo, não no código do GitHub.
- Atenção: códigos de 4 dígitos têm só 10.000 combinações; quem abrir o código-fonte consegue descobrir o código a partir do hash em segundos. Para proteção real, valide no servidor (ver "Proteção real").

## Ajuste de texto: chamada para liberar
- O selo "Bloqueado" virou "Toque para liberar" (ícone de chave, cor de destaque). Na tela do produto: "Digite seu código para liberar", campo "Digite o código de acesso" e botão "Liberar acesso". Arquivos: app.js, style.css, PROGRESS.md.

## Compra dos exclusivos: links e oferta
- Links de checkout (GGCheckout) configurados em `data.js` (`buyUrl`) para Pizzas, Bolos, Salgados e Guia, na ordem informada. O botão de compra agora aparece na tela de cada produto.
- Preços informados: R$ 5,90 por produto (de R$ 7,90, referência anterior). O desconto é calculado automaticamente a partir de `price` e `fullPrice` em `data.js` (hoje, 25% OFF). Para mudar, edite esses dois campos.
- Visual: bloco de oferta com selo de % de desconto, preço antigo riscado, preço novo, economia em reais e botão "Quero com 25% de desconto"; selo "-25%" na capa dos cards bloqueados. Quando o produto é liberado, o bloco some.
- Arquivos alterados: data.js, app.js, style.css, PROGRESS.md. Ofertas adicionais (WhatsApp, vitalício, combo) não foram alteradas.
- Pendente: confirmar no GGCheckout que o preço de cada link é R$ 5,90 e como o cliente recebe o código de acesso (o app só valida o código; a entrega dele depende da configuração do checkout).

## Correção: selo de desconto na capa
- O selo "-25%" herdava o estilo dos filtros de receitas (classe `.chip`) e aparecia como um círculo grande. Renomeado para `.dchip`, com estilo próprio. Arquivos: app.js, style.css, PROGRESS.md.

## Ajuste: ordem na tela do produto
- A opção de compra (bloco de oferta) agora fica abaixo do campo do código, separada por "Ainda não tem o código?". O botão de compra passou a dizer "Comprar com 25% OFF" para caber em uma linha. Arquivos: app.js, style.css, PROGRESS.md.

## Imagens nos bônus
- Três imagens enviadas pelo cliente foram otimizadas (960x540, JPEG) e usadas como capa: Guia de Farinhas e Substituições (`img/bonus-farinhas.jpg`, grãos e farinhas), SOS Pão Sem Glúten (`img/bonus-sos.jpg`, pão com símbolo de proibido) e Guia de Conservação e Congelamento (`img/bonus-conserva.jpg`, pães fatiados embalados).
- Aparecem como miniatura em Meus bônus e como imagem grande no topo de cada bônus. O mapeamento fica em `data.js` (`bonus:` com `cover` e `alt`); o texto dos bônus (content/bonus.js) não foi alterado. O Guia Onde Tem Glúten? continua sem imagens no conteúdo.
- Arquivos: img/ (3 novos), data.js, app.js, PROGRESS.md.

## Emojis dos bônus trocados pelas imagens
- Na Home ("Meus bônus incluídos") os blocos agora mostram a imagem de cada bônus no lugar do emoji; no título da página de cada bônus o emoji foi removido (a imagem grande já aparece logo abaixo). O emoji do Guia Onde Tem Glúten? também saiu do título, em linha com a regra de não ter emojis no guia. Arquivos: app.js, style.css, PROGRESS.md.

## Acesso liberado para visualização
- Com `demo:false` e o Supabase vazio, o app mostrava só "O acesso está sendo preparado" e ninguém conseguia entrar. Agora `CONFIG.demo` está `true` em data.js: qualquer e-mail válido e senha de 6+ caracteres entram (login simulado, guardado só no navegador de cada pessoa). Os produtos exclusivos continuam bloqueados e só abrem com os códigos.
- Importante antes de vender: com `demo:true` quem tiver o link entra e vê pães e bônus sem pagar. Para uso real, preencher `CONFIG.supabase` e voltar para `demo:false`.
- Arquivos: data.js, README.md, PROGRESS.md.

## Home profissional, progresso e interatividade
- Home refeita: logo pequena e avatar com a inicial do nome, cartão de boas-vindas com anel de progresso, cartão "Continue de onde parou" (última receita aberta), cartão "Sua jornada" com duas barras animadas (materiais liberados e receitas feitas), "Próximo desbloqueio" com o selo de desconto e 4 conquistas (primeira receita, 5, 10 e coleção completa).
- Progresso da coleção: pães + 3 bônus + 4 exclusivos = 8 materiais (começa em 50%); cada produto liberado sobe a barra e o aviso ao liberar mostra a nova porcentagem. A tela Exclusivos também ganhou a barra "Produtos liberados".
- Receitas: novo botão "Marcar como feita" (alimenta a barra de receitas e as conquistas). Dados guardados no navegador de cada pessoa (`done`, `last`).
- Emojis da barra inferior e do avatar trocados por ícones desenhados (index.html, style.css).
- Arquivos alterados: app.js, index.html, style.css, PROGRESS.md.

## Imagem no cartão Sua jornada
- Foto de mãos sovando massa (img/jornada.jpg, recortada em 2:1) como cabeçalho do cartão "Sua jornada". A foto de pães sobre mesa de madeira enviada junto NÃO foi usada: mostra espigas de trigo, croissants e massas folhadas, que contêm glúten e contradizem a proposta do app.
- Pendente: 4 medalhas das conquistas (geradas externamente) e imagens das categorias de receita.
- Arquivos: img/jornada.jpg, app.js, style.css, PROGRESS.md.

## Medalhas das conquistas
- As 4 medalhas ilustradas (geradas externamente) substituem os ícones: img/medalha-primeira.png (panela com pão), medalha-cinco.png (tigela com estrela), medalha-dez.png (troféu com milho e oliveira), medalha-colecao.png (livros com coroa). Fundo transparente, 220 px, cerca de 60 KB cada.
- Bloqueadas aparecem em cinza e esmaecidas (filtro CSS); ao conquistar, ganham cor e sombra. Aviso "Conquista desbloqueada" ao marcar a 1ª, 5ª e 10ª receita feita e ao liberar o último produto exclusivo.
- Arquivos: img/ (4 novos), app.js, style.css, PROGRESS.md.

## Carrossel de banners e card de oferta
- Banners (img/banner-pizzas|bolos|salgados|guia.jpg, 1200x214, ~60 KB cada), criados com textos pelo ChatGPT e recortados em faixa fina 5,6:1. Os textos foram conferidos: nomes, acentos, "De R$ 7,90 por R$ 5,90", "25% OFF" e "Ver oferta". Se o preço mudar, os banners precisam ser gerados de novo (o preço está dentro da imagem).
- Carrossel na Home (logo abaixo do cartão de boas-vindas): mostra só os exclusivos que a pessoa ainda não liberou e some quando todos estão liberados. Desliza com o dedo, passa sozinho a cada 5 s (pausa ao tocar e respeita "reduzir movimento"), tem bolinhas de posição e cada banner leva ao produto. O bloco "Próximo desbloqueio" da jornada só aparece se o carrossel não existir (evita repetição). Campo `banner` de cada módulo em data.js.
- Card de oferta: aparece uma única vez, depois de 8 minutos de uso ativo (conta só com a tela aberta e visível), listando apenas os exclusivos ainda não liberados com o selo de desconto e link para cada um. Se a pessoa já liberou tudo, não aparece. Tempo configurável em `CONFIG.promoSeconds` (data.js, 480 s).
- Limite: o controle "uma vez" fica no navegador de cada aparelho. Se a pessoa limpar os dados ou entrar por outro aparelho/navegador, pode ver de novo. Para controle real, guardar no servidor (Supabase).
- Arquivos: img/ (4 banners), data.js, app.js, style.css, PROGRESS.md.
