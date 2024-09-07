// Função para efetuar o login
function entrar () {
    // Declarado variáveis do input
    let inputuser = document.querySelector('#inputuser')
    let inputsenha = document.querySelector('#inputsenha')

    // Variável do modal de mensagem de erro

    // Lista de usuários salvos no localstorage
    listaUser = []

    // Criando objeto para manipulação
    let userValid = {
        nome: '',
        sobrenome: '',
        user: '',
        senha: ''
    }

    // Pega a lista de users do localstorage
    listaUser = JSON.parse(localStorage.getItem('listaUser'))

    listaUser.forEach((item) => {
        if(inputuser.value == item.matriculaCad && inputsenha.value == item.passwordCad){
            userValid = {
                nome: item.fnameCad,
                sobrenome: item.lnameCad,
                user: item.matriculaCad,
                senha: item.passwordCad
            }

        }
    })

    // Verificação de usuário e senha vazios
    if(inputuser.value == "" && inputsenha.value == ""){
        alert("Insira seu usuário e senha.")
        return false
    }

    // Previne o comportamento padrão do formulário
    event.preventDefault()

    //if(inputuser.value != userValid.user && inputsenha.value != userValid.senha ){
        //alert("Usuário não cadastrado")
    //}

    // Verificação de usuário e senha iguais ou não
    if(inputuser.value == userValid.user && inputsenha.value == userValid.senha){
        //alert('Deu certo!!')

        // Criando um token com números aleatórios para validação
        let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
        localStorage.setItem('token', token) 

        // Armazenando nome do usuário para mostrar na tela de cosulta
        localStorage.setItem('userLogado', JSON.stringify(userValid))

        window.location.href = './TelaConsulta.html'

    } else {
        // Alert de falha no login
        alert('Usuário ou senha incorretos!')
    }

}