// Funções do NavBar
function Sair(){
    localStorage.removeItem('token')
    localStorage.removeItem('userLogado')
    window.location.href = './index.html'
}

function Inicio(){
    window.location.href = './TelaConsultaCoordenador.html'
}

// Função para calcular o número de alunos cadastrados
function calculaTotalAlunos() {
    const totalAlunos = (JSON.parse(localStorage.getItem("listaAluno")) || []).length;
    document.querySelector('#TotalAlunos').textContent = `${totalAlunos}`;
    document.querySelector('#descTotalAlunos').textContent = `Há ${totalAlunos} aluno(s) cadastrados no sistema.`;
}

function Detalhar(index) {
    // Redireciona para a página de detalhes, passando o índice do usuário na URL
    window.location.href = `TelaConsultaDetalhada.html?index=${index}`;
}

document.addEventListener("DOMContentLoaded", function() {
    const sStatus = 'Ativo';

    // Busca a lista de alunos do localStorage
    const listaAluno = JSON.parse(localStorage.getItem("listaAluno")) || [];

    // Seleciona o tbody da tabela para inserir as linhas
    const tabelaCorpo = document.querySelector("table tbody");

    calculaTotalAlunos();

    function renderizarTabela(listaAluno) {
        tabelaCorpo.innerHTML = ""; // Limpa a tabela antes de renderizar os resultados

        // Percorre a lista de alunos e cria uma linha para cada um
        listaAluno.forEach((aluno, index) => { // Adiciona 'index' aqui para referenciar cada item
            // Cria uma nova linha
            const linha = document.createElement("tr");

            // Cria colunas e adiciona os dados de cada aluno
            linha.innerHTML = `
                <td>${aluno.fname} ${aluno.lname}</td>
                <td>${aluno.matricula}</td>
                <td id="Status">${sStatus}</td>
                <td><button onclick="Detalhar(${index})"><i class='bx bxs-folder-open'></i></button></td>
            `;

            // Adiciona a linha à tabela
            tabelaCorpo.appendChild(linha);
        });
    }

    // Renderiza a tabela com todos os alunos ao carregar a página
    renderizarTabela(listaAluno);

    // Captura o campo de busca
    const campoBusca = document.querySelector(".search-box input");

    // Adiciona um evento para capturar a digitação no campo de busca
    campoBusca.addEventListener("keyup", function () {
        const termoBusca = campoBusca.value.toLowerCase();

        // Filtra a lista de alunos pelo nome ou matrícula
        const alunosFiltrados = listaAluno.filter(aluno =>
            aluno.fname.toLowerCase().includes(termoBusca) ||
            aluno.lname.toLowerCase().includes(termoBusca) ||
            aluno.matricula.includes(termoBusca) // Mantém a matrícula numérica
        );

        // Atualiza a tabela com os resultados filtrados
        renderizarTabela(alunosFiltrados);
    });
});


