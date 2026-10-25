# Sabores em Casa: Área de Membros

## Publicar no GitHub Pages
1. Suba todos os arquivos na raiz do repositório.
2. Settings > Pages > Deploy from a branch > `main` / root.

## Onde editar
- `data.js`: módulos, códigos (hash), URLs de compra, ofertas, receitas e bônus.
- Para gerar o hash de um código: `printf 'SEU_CODIGO' | sha256sum` (cole o resultado em `hash`).

## O que está implementado
Navegação inferior, busca real (nome, ingrediente, palavra-chave, sem acento), filtros, receitas com ingredientes marcáveis, passo a passo e favoritos, 4 bônus, produtos exclusivos com código por produto, ofertas configuráveis, conta.

## Login e cadastro (Supabase Auth)
O app usa a autenticação do Supabase por e-mail e senha: cadastro, login, recuperação de senha, confirmação de e-mail e nova senha por link.
Enquanto `CONFIG.supabase` estiver vazio em `data.js`, a tela de entrada mostra apenas "O acesso está sendo preparado" e nenhum login é simulado.

### Configuração (uma vez)
1. Crie um projeto no Supabase e copie a **Project URL** e a chave **anon/public** (nunca a `service_role`) para `CONFIG.supabase` em `data.js`.
2. Em Authentication > URL Configuration, informe como **Site URL** o endereço do seu GitHub Pages (e o mesmo em Redirect URLs). Sem isso, os links dos e-mails não voltam para o app.
3. Em Authentication > Providers > Email, decida se a confirmação de e-mail fica ligada. Ligada: o cliente recebe o link e o app avisa para conferir o e-mail. Desligada: a conta entra direto.
4. Em Authentication > Email Templates, traduza os e-mails para português e ajuste o remetente (SMTP próprio é recomendado para produção; o envio padrão do Supabase tem limite baixo).
5. `demo:false` deve ficar assim em produção (clientes reais). `demo:true` libera a navegação para visualização: qualquer e-mail e senha entram, com login simulado. Atualmente está `true` para você ver o site hospedado; volte para `false` depois de configurar o Supabase.

## Limite conhecido
Os códigos dos produtos exclusivos são validados no navegador (hash SHA-256) e podem ser contornados por quem abrir o código-fonte. Para proteção real, veja "Proteção real" abaixo.

## Proteção real (próximo passo)
1. Guarde as receitas dos módulos exclusivos em tabelas com RLS ativo; libere por tabela `acessos(user_id, produto)`.
2. Valide o código de acesso numa Edge Function que grava em `acessos`. Nunca exponha a service_role no frontend.

## Pendente de você
Conteúdo editorial, fotos, códigos reais, URLs de checkout, preços e condições das ofertas.
