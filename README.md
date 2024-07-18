![Logo IFPA](img/LOGO-IFPA.png) 

# Atividade Final de Programação Web
Atividade final proposta pelo professor Cláudio Martins como objeto de avaliação para a disciplina de programação web.

Aluna: Adriele Camila da Costa Ramos

Curso: Tecnólogo em Análise e Desenvolvimento de Sistemas

Turno: Tarde

### Introdução
Este projeto é uma aplicação web de Carrinho de Compras. Ele permite aos usuários visualizar uma lista de produtos, adicionar ou remover produtos ao carrinho e finalizar a compra, que é salva em uma tabela no Supabase.

### Estrutura do Projeto
1. Ferramentas e Frameworks utilizados no desenvolvimento deste projeto:
    1. ![Logo Bootstrap](img/LogoBootstrap.png)
    2. ![Logo Supabase](img/LogoSupabase.png)

2. Descrição do arquivo index.html:
   1. Arquivo HTML principal que contém a estrutura básica da aplicação web e inclui as bibliotecas Vue.js e Bootstrap. Também contém o script com a lógica da aplicação 
      Vue.js, incluindo a manipulação do carrinho, a consulta de produtos e o checkout no Supabase.
      
   2. A estruturação do código HTML foi feita com tags padrão no cabeçalho fazendo a importação das bibliotecas dos frameworks. Inicia com a criação da Barra de Navegação no topo da
      página, em seguida temos as tags para a criação do Carrossel, Região do Conteúdo Principal com a lista dos produtos e do carrinho, e por fim, o rodapé da página com algumas 
      informções simples.
   
   3. O script da lógica com Vue.js possui os campos com as credenciais para acesso a API do Supabase, as funções para Adicionar os produtos ao carrinho, Remover produtos do carrinho,
      Calcular o total dos valores dos produtos e Finalizar compra.
3. Pasta IMG contém as imagens utilizadas no projeto.

### Acesse a página do projeto no GitHubPages clicando no link abaixo
https://drikaramos9.github.io/IFPA_Project.github.io/

### Funcionalidades
* Consulta de Produtos: Visualize uma lista de produtos com nome, preço e imagem.
* Adição de Produto ao Carrinho: Adicione produtos ao carrinho com um clique no botão "Adicionar ao Carrinho".
* Remoção de Produto ao Carrinho: Remova produtos do carrinho com um clique no botão "Remover".
* Finalização da Compra: Finalize a compra clicando no botão "Finalizar Compra".
