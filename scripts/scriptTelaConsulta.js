const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')

const scategoria = document.querySelector('#Categoria')
const stitulo = document.querySelector('#Titulo')
const scargaH = document.querySelector('#CargaH')
const sDataR = document.querySelector('#DataR')
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
        scargaH.value = itens[index].CargaH
        sDataR.value = itens[index].DataR
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
    setItensBD()
    loadItens()
}

// Inserir os dados na tabela
function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.Categoria}</td>
        <td>${item.Titulo}</td>
        <td>${item.CargaH} h</td>
        <td>${item.DataR}</td>
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

// Função de salvar dados
btnSalvar.onclick = e => {

    if (scategoria.value == '' || stitulo.value == '' || scargaH.value == '' || sDataR.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].Categoria = scategoria.value
        itens[id].Titulo = stitulo.value
        itens[id].CargaH = scargaH.value
        itens[id].DataR = sDataR.value
    } else {
        itens.push({'Categoria': scategoria.value, 'Titulo': stitulo.value, 'CargaH': scargaH.value, 'DataR': sDataR.value})
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}

// Função para calcular o total da carga horária cadastrada
function calculaTotalCargaHoraria() {
    const totalCargaH = itens.reduce((total, item) => total + parseFloat(item.CargaH || 0), 0)
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