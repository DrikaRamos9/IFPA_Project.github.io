// Função para exibir mensagens de alerta
function exibirMensagem(tipo, texto, elementoAlvo = 'mensagem-alerta') {
    const alerta = document.getElementById(elementoAlvo);
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

    /** Validação caso não seja preenchido todas as informações
    if (!nome || !matricula || email === " " || senha === " ") {
        exibirMensagem('danger', 'Por favor, preencha todos os campos obrigatórios!', 'mensagem-alerta-modal');
        return;
    } */

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
    exibirMensagem('success', 'Coordenador cadastrado com sucesso!', 'mensagem-alerta-modal');

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
            <button class="btn btn-primary btn-sm editar-coordenador">Editar</button>
            <button class="btn btn-danger btn-sm remover-coordenador">Remover</button>
        </td>
    `;

    lista.appendChild(row); //atualiza a tabela inserindo nova linha

    // Adiciona evento ao botão de editar
    row.querySelector('.editar-coordenador').addEventListener('click', function () {
        editarCurso(curso, row);
    });

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

// Função para exibir os cursos cadastrados
function exibirCursos() {
    // Recuperando lista de Cursos existentes do LocalStorage
    const listaCursos = JSON.parse(localStorage.getItem('listaCursos')) || [];

    const nomes = listaCursos.map(curso => curso.nome);

    // Seleciona o elemento <select> do formulário
    const selectCurso = document.getElementById('curso');

    selectCurso.innerHTML = `
        <option value=" " selected>Clique para selecionar o curso</option>
    `;

    // Adiciona os cursos como opções no <select>
    nomes.forEach(nome => {
        const option = document.createElement('option');
        option.value = nome;
        option.textContent = nome;
        selectCurso.appendChild(option);
    });
}

// Função de carregar as informações para exibição
window.addEventListener('load', function () {
    exibirCursos();

    const coordenadores = JSON.parse(localStorage.getItem('listaCoordenadores')) || [];
    coordenadores.forEach(adicionarCoordenadorTabela);
});


// Função de exibição do Modal
var cadCoordenadorModal = document.getElementById('cadCoordenadorModal');

cadCoordenadorModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var recipient = button.getAttribute('data-bs-whatever');
    var modalBodyInput = cadCoordenadorModal.querySelector('.modal-body input');

    modalBodyInput.value = recipient;
})