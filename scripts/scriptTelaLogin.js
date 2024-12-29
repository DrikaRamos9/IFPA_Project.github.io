// Função para efetuar o login
function entrar() {
    // Declarado variáveis do input
    let inputuser = document.querySelector('#inputuser');
    let inputsenha = document.querySelector('#inputsenha');

    // Lista de usuários salvos no localstorage
    listaUser = [];

    // Criando objeto para manipulação
    let userValid = {
        nome: '',
        sobrenome: '',
        user: '',
        senha: '',
        perfil: ''
    };

    // Pega a lista de users do localstorage
    listaUser = JSON.parse(localStorage.getItem('listaUser'));

    listaUser.forEach((item) => {
        if(inputuser.value == item.matriculaCad && inputsenha.value == item.passwordCad){
            userValid = {
                nome: item.fnameCad,
                sobrenome: item.lnameCad,
                user: item.matriculaCad,
                senha: item.passwordCad,
                perfil: item.perfil
            };

        }
    });

    // Verificação de usuário e senha vazios
    if(inputuser.value == "" && inputsenha.value == ""){
        return false;
    }

    // Previne o comportamento padrão do formulário
    event.preventDefault();

    // Verificação de usuário, se as senha são iguais ou não
    if(inputuser.value == userValid.user && inputsenha.value == userValid.senha) {

        // Criando um token com números aleatórios para validação
        let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2);
        localStorage.setItem('token', token);

        // Armazenando nome do usuário para mostrar na tela de cosulta
        localStorage.setItem('userLogado', JSON.stringify(userValid));

        // Redirecionamento baseado no perfil
        if (userValid.perfil === 'Coordenador') {
            window.location.href = './TelaConsultaCoordenador.html';

        } else if (userValid.perfil === 'Aluno') {
            window.location.href = './TelaConsulta.html';

        } else {
            alert('Perfil não reconhecido!');
        }

    } else {
        // Alert de falha no login
        alert('Usuário ou senha incorretos! Se você não possui uma conta, cadastre-se.')
    }

}