const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')

const scategoria = document.getElementById('Categoria')
const stitulo = document.getElementById('Titulo')
const scargaH = document.getElementById('cargaHoraria')
const sDataR = document.getElementById('dataRealizacao')
const sDocument = document.getElementById('uploadCertificado')
const sStatus = 'Em análise'

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
    itens = itens.filter((_, i) => i !== index);
    //alert("Atividade excluída!")
    setItensBD();
    loadItens();
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

    // Verificando se o número é positivo
    const cargaHoraria = parseFloat(scargaH.value.trim());
    if (isNaN(cargaHoraria) || cargaHoraria <= 0) {
        alert("Carga horária inválida! Insira um número positivo.");
        return;
    }

    // Validando formato da data
    if (!isValidDate(sDataR.value)) {
        alert("Data inválida!");
        return;
    }

    const novoItem = {
        'Categoria': scategoria.value,
        'Titulo': stitulo.value,
        'cargaHoraria': cargaHoraria,
        'dataRealizacao': sDataR.value,
        'status': sStatus,
        'documento': null // Documento será atualizado após leitura do arquivo
    };


    // Verificar se um arquivo foi anexado
    if (sDocument.files.length > 0) {
        const file = sDocument.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            novoItem.documento = e.target.result; // Armazena o arquivo como Base64
            salvarItem(novoItem);
        };

        reader.readAsDataURL(file);
    } else {
        salvarItem(novoItem);
    }

    // Função para salvar o item no vetor e no localStorage
    function salvarItem(novoItem) {
        try {
            if (id !== undefined) {
                // Atualizar item existente
                itens[id] = novoItem;
            } else {
                // Adicionar novo item
                itens.push(novoItem);
            }

            // Persistência e atualização da UI
            setItensBD();
            loadItens();
            modal.classList.remove('active'); // Fecha modal depois de carregar os dados

            // Reset do ID
            id = undefined;

            // Exibir feedback de sucesso
            alert("Atividade cadastrada com sucesso!");

        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
            alert("Erro ao salvar os dados! Tente novamente.");
        }
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
    const totalCargaH = itens.reduce((total, item) => total + parseFloat(item.cargaHoraria || 0), 0);
    document.querySelector('#total-cargaH').textContent = `${totalCargaH} h`;

    const progresso = (totalCargaH * 100) / 400; //precisa colocar a carga horária máxima de cada curso
    document.querySelector('#progresso').textContent = `${Math.floor(progresso)}%`;

    if (progresso >= 50) {
        document.querySelector('#descProgresso').innerHTML = `Seu progresso está regular.`;
    } else {
        document.querySelector('#descProgresso').innerHTML = `Seu progresso está abaixo do recomendado.`;
    }
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
    window.location.href = './TelaConsultaAluno.html'
}