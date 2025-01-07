const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')

const scategoria = document.querySelector('#Categoria')
const stitulo = document.querySelector('#Titulo')
const scargaH = document.querySelector('#cargaHoraria')
const sDataR = document.querySelector('#dataRealizacao')
const sStatus = 'teste Concluido'

const btnSalvar = document.querySelector('#btn-salvar')

let itens
let id

// Modal de Registro de Nova Atividade
function openModal(edit = false, index = 0) {
    
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
        }
    }

    if (edit) {
        scategoria.value = itens[index].Categoria
        stitulo.value = itens[index].Titulo
        scargaH.value = itens[index].cargaHoraria
        sDataR.value = itens[index].dataRealizacao
        id = index
    } else {
        scategoria.value = ''
        stitulo.value = ''
        scargaH.value = ''
        sDataR.value = ''
    }
    
}

// Botão de editar item
function editItem(index) {
    openModal(true, index)
}

// Botão de deletar item
function deleteItem(index) {
    itens.splice(index, 1)
    //alert("Atividade excluída!")
    setItensBD()
    loadItens()
}

function formatarData(dataISO) {
    // Dividir a string ISO (YYYY-MM-DD) em partes
    const [ano, mes, dia] = dataISO.split('-');
    
    // Retornar no formato DD/MM/AAAA
    return `${dia}/${mes}/${ano}`;
}


// Inserir os dados na tabela
function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.Categoria}</td>
        <td>${item.Titulo}</td>
        <td>${item.cargaHoraria} h</td>
        <td>${formatarData(item.dataRealizacao)}</td>
        <td id="Status">${sStatus}</td>
        <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
        </td>
        <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
    e.preventDefault();

    // Validação dos campos obrigatórios
    if (!scategoria.value || !stitulo.value || !scargaH.value || !sDataR.value) {
        alert("Preencha todos os campos!")
        return;
    }

    if (isNaN(scargaH.value)) {
        alert("Carga horária inválida!");
        return;
    }

    if (!isValidDate(sDataR.value)) {
        alert("Data inválida!");
        return;
    }

    try {
        if (id !== undefined) {
            // Atualizar item existente
            itens[id] = {
                'Categoria': scategoria.value,
                'Titulo': stitulo.value,
                'cargaHoraria': scargaH.value,
                'dataRealizacao': sDataR.value
            };
        } else {
            // Adicionar novo item
            itens.push({
                'Categoria': scategoria.value,
                'Titulo': stitulo.value,
                'cargaHoraria': scargaH.value,
                'dataRealizacao': sDataR.value
            });
        }

        // Exibir feedback de sucesso
        alert("Atividade cadastrada com sucesso!");

        // Persistência e atualização da UI
        setItensBD();
        modal.classList.remove('active');
        loadItens();

        // Reset do ID
        id = undefined;
    } catch (error) {
        console.error("Erro ao salvar os dados:", error);
        alert("Erro ao salvar os dados! Tente novamente.");
    }
};

// Função de validação de data
function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Formato esperado: YYYY-MM-DD
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

// Função para calcular o total da carga horária cadastrada
function calculaTotalCargaHoraria() {
    const totalCargaH = itens.reduce((total, item) => total + parseFloat(item.cargaHoraria || 0), 0)
    document.querySelector('#total-cargaH').textContent = `${totalCargaH} h`
}

// Função para calcular o número de atividades registradas
function calculaTotalAtividades() {
    const totalAtividades = itens.length
    document.querySelector('#total-atividades').textContent = `Você tem ${totalAtividades} atividade(s) aguardando análise.`
}

// Pega os dados de usuário armazenados no webStorage
let userLogado = JSON.parse(localStorage.getItem('userLogado'))
let logado = document.querySelector('#logado')

// Usa a matrícula do aluno como identificador único
const alunoId = userLogado.user;

// Condição para o usuário não logado não ter acesso a página
// desativa essa linha caso queira editar... ela ativa faz com que o acesso à página não ocorra sem login
if (localStorage.getItem('token') === null) {
    alert('Você não está logado.');

    // Função para dar um delay antes de ir pra tela de login
    setTimeout(() => { 
        window.location.href = './index.html';
    }, 2000);
} else {
    logado.innerHTML = `Bem-vindo ${userLogado.nome} ${userLogado.sobrenome}`; // Exibe o nome do usuário na página
}

// Cria um BD no webstorage com os dados da tabela
const getItensBD = () => JSON.parse(localStorage.getItem(`dbAtividades_${alunoId}`)) ?? [];
const setItensBD = () => localStorage.setItem(`dbAtividades_${alunoId}`, JSON.stringify(itens));

// Função de carregar os dados
function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })

    calculaTotalCargaHoraria() // Atualiza o total da carga horária
    calculaTotalAtividades() // Atualiza o total de atividades registradas na tabela
}

// Carrega dados
loadItens()

// Funções do NavBar
function sair(){
    localStorage.removeItem('token')
    localStorage.removeItem('userLogado')
    window.location.href = './index.html'
}

function DadosPessoais(){
    window.location.href = './TelaDadosAluno.html'
}

function Inicio(){
    window.location.href = './TelaConsulta.html'
}