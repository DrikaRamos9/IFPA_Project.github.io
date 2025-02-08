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

// Função de cadastrar
document.getElementById('form-curso').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtendo os dados do formulário
    const nome = document.getElementById('nome').value;
    const codigo = document.getElementById('codigo').value;
    const modalidade = document.getElementById('modalidade').value;
    const coordenador = document.getElementById('coordenador').value;
    const cargaHoraria = document.getElementById('cargaHoraria').value;

    // Validação caso não seja preenchido todas as informações
    if (!nome || !codigo || modalidade === " " || coordenador === " " || !cargaHoraria) {
        exibirMensagem('danger', 'Por favor, preencha todos os campos obrigatórios!', 'mensagem-alerta-modal');
        return;
    }

    // Criando um objeto para o curso
    const curso = { nome, codigo, modalidade, coordenador, cargaHoraria};

    // Recuperando os cursos existentes do LocalStorage
    let listaCursos = JSON.parse(localStorage.getItem('listaCursos')) || [];

    // Adicionando o novo curso à lista
    listaCursos.push(curso);

    // Salvando novamente no LocalStorage
    localStorage.setItem('listaCursos', JSON.stringify(listaCursos));

    // Atualizando a tabela - chamando a função
    adicionarCursoTabela(curso);

    // Limpando o formulário
    document.getElementById('form-curso').reset();

    // Exibindo mensagem de sucesso no modal
    exibirMensagem('success', 'Curso cadastrado com sucesso!', 'mensagem-alerta-modal');
});

// Função para adicionar um curso na tabela
function adicionarCursoTabela(curso) {
    const lista = document.getElementById('table-cursos');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${curso.nome}</td>
        <td>${curso.codigo}</td>
        <td>${curso.modalidade}</td>
        <td>${curso.coordenador}</td>
        <td>
            <button class="btn btn-primary btn-sm editar-curso">Editar</button>
            <button class="btn btn-danger btn-sm remover-curso">Remover</button>
        </td>
    `;

    lista.appendChild(row);

    // Adiciona evento ao botão de editar
    row.querySelector('.editar-curso').addEventListener('click', function () {
        editarCurso(curso, row);
    });

    // Adiciona evento ao botão de remoção
    row.querySelector('.remover-curso').addEventListener('click', function () {
        removerCurso(curso.codigo, row);
    });
}

// Função para remover curso do localStorage e da tabela
function removerCurso(codigo, row) {
    
    let cursos = JSON.parse(localStorage.getItem('listaCursos')) || [];

    // Filtra a lista para remover o curso com o código fornecida
    cursos = cursos.filter(curso => curso.codigo !== codigo);

    // Atualiza o localStorage
    localStorage.setItem('listaCursos', JSON.stringify(cursos));

    // Remove a linha da tabela
    row.remove();

    // Exibe uma mensagem de sucesso
    exibirMensagem('success', 'Curso removido com sucesso!');
}

// Função para exibir o nome dos coordenadores cadastrados
function exibirCoordenadores() {
    // Recuperando lista de Coordenadores existentes do LocalStorage
    const listaCoordenadores = JSON.parse(localStorage.getItem('listaCoordenadores')) || [];

    const nomes = listaCoordenadores.map(coordenador => coordenador.nome);

    // Seleciona o elemento <select> do formulário
    const selectCoordenador = document.getElementById('coordenador');

    selectCoordenador.innerHTML = `
        <option value=" " selected>Clique para selecionar o coordenador</option>
        <option value="A definir">A definir</option>
    `;

    // Adiciona os nomes dos coordenadores como opções no <select>
    nomes.forEach(nome => {
        const option = document.createElement('option');
        option.value = nome;
        option.textContent = nome;
        selectCoordenador.appendChild(option);
    });
}

// Função de carregar as informações para exibição
window.addEventListener('load', function () {
    exibirCoordenadores();

    // Carrega cursos previamente cadastrados
    const cursos = JSON.parse(localStorage.getItem('listaCursos')) || [];
    cursos.forEach(curso => adicionarCursoTabela(curso));
});

// Função de exibição do Modal
var cadCursoModal = document.getElementById('cadCursoModal');

cadCursoModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var recipient = button.getAttribute('data-bs-whatever');
    var modalBodyInput = cadCursoModal.querySelector('.modal-body input');

    modalBodyInput.value = recipient;
})