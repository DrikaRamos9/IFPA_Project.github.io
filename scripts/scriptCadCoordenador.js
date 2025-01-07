// Função para exibir mensagens de alerta
function exibirMensagem(tipo, texto) {
    const alerta = document.getElementById('mensagem-alerta');
    alerta.className = `alert alert-${tipo}`; // Define o tipo de mensagem (success, danger, etc.)
    alerta.textContent = texto; // Define o texto da mensagem
    alerta.classList.remove('d-none'); // Torna a mensagem visível

    // Oculta a mensagem após 3 segundos
    setTimeout(() => {
        alerta.classList.add('d-none');
    }, 3000);
}

// Função de Cadastro
document.getElementById('form-coordenador').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtendo os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const curso = document.getElementById('curso').value;
    const matricula = document.getElementById('matricula').value;
    const senha = document.getElementById('senha').value;

    let perfil = "Coordenador";

    // Criando um objeto para o coordenador
    const coordenador = { nome, email, curso, matricula, perfil, senha };

    // Recuperando os coordenadores existentes do LocalStorage
    let coordenadores = JSON.parse(localStorage.getItem('listaCoordenadores')) || [];

    // Adicionando o novo coordenador à lista
    coordenadores.push(coordenador);

    // Salvando novamente no LocalStorage
    localStorage.setItem('listaCoordenadores', JSON.stringify(coordenadores));

    // Atualizando a tabela - chamando a função
    adicionarCoordenadorTabela(coordenador);

    // Exibindo mensagem de sucesso
    exibirMensagem('success', 'Coordenador cadastrado com sucesso!');

    // Limpando o formulário
    document.getElementById('form-coordenador').reset();
});

// Função para adicionar um coordenador na tabela
function adicionarCoordenadorTabela(coordenador) {
    const lista = document.getElementById('table-coordenadores');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${coordenador.nome}</td>
        <td>${coordenador.email}</td>
        <td>${coordenador.curso}</td>
        <td>${coordenador.matricula}</td>
        <td>
            <button class="btn btn-danger btn-sm remover-coordenador">Remover</button>
        </td>
    `;

    lista.appendChild(row); //atualiza a tabela inserindo nova linha

    // Adiciona evento ao botão de remoção
    row.querySelector('.remover-coordenador').addEventListener('click', function () {
        removerCoordenador(coordenador.matricula, row);
    });
}

// Função para remover coordenador do localStorage e da tabela
function removerCoordenador(matricula, row) {
    
    let coordenadores = JSON.parse(localStorage.getItem('listaCoordenadores')) || [];

    // Filtra a lista para remover o coordenador com a matrícula selecionada
    coordenadores = coordenadores.filter(coordenador => coordenador.matricula !== matricula);

    // Atualiza o localStorage
    localStorage.setItem('listaCoordenadores', JSON.stringify(coordenadores));

    // Remove a linha da tabela
    row.remove();

    // Exibe uma mensagem de sucesso
    exibirMensagem('success', 'Coordenador removido com sucesso!');
}

// Carregando a lista de coordenadores do LocalStorage ao carregar a página
window.addEventListener('load', function() {
    const coordenadores = JSON.parse(localStorage.getItem('listaCoordenadores')) || [];
    coordenadores.forEach(adicionarCoordenadorTabela);
});