// Funções do NavBar
function Sair(){
    localStorage.removeItem('token')
    localStorage.removeItem('userLogado')
    window.location.href = './index.html'
}

function Inicio(){
    window.location.href = './TelaConsultaCoordenador.html'
}

function Detalhar(index) {
    // Redireciona para a página de detalhes, passando o índice do usuário na URL
    window.location.href = `TelaConsultaDetalhada.html?index=${index}`;
}

document.addEventListener("DOMContentLoaded", function() {
    const sStatus = 'Ativo';

    // Busca a lista de usuários do localStorage
    const listaUser = JSON.parse(localStorage.getItem("listaUser")) || [];

    // Seleciona o tbody da tabela para inserir as linhas
    const tabelaCorpo = document.querySelector("table tbody");

    // Percorre a lista de usuários e cria uma linha para cada um
    listaUser.forEach((usuario, index) => { // Adiciona 'index' aqui para referenciar cada item
        // Cria uma nova linha
        const linha = document.createElement("tr");

        // Cria colunas e adiciona os dados do usuário
        linha.innerHTML = `
            <td>${usuario.fnameCad} ${usuario.lnameCad}</td>
            <td>${usuario.matriculaCad}</td>
            <td id="Status">${sStatus}</td>
            <td><button onclick="Detalhar(${index})"><i class='bx bxs-folder-open'></i></button></td>
        `;

        // Adiciona a linha à tabela
        tabelaCorpo.appendChild(linha);
    });
});


