// Função para efetuar o login
async function entrar() {
    // Declarado variáveis do input
    let inputuser = document.querySelector('#inputuser');
    let inputsenha = document.querySelector('#inputsenha');

    // Pega a lista de users do localStorage
    let listaUser = JSON.parse(localStorage.getItem('listaAluno')) || [];

    // Criando objeto para manipulação
    let userValid = {
        nome: '',
        sobrenome: '',
        user: '',
        senha: '',
        perfil: ''
    };

    listaUser.forEach((item) => {
        if(inputuser.value == item.matricula && inputsenha.value == item.password){
            userValid = {
                nome: item.fname,
                sobrenome: item.lname,
                user: item.matricula,
                senha: item.password,
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
            window.location.href = './TelaConsultaAluno.html';

        } else {
            alert('Perfil não reconhecido!');
        }

    } else {
        // Alert de falha no login
        alert('Usuário ou senha incorretos! Se você não possui uma conta, cadastre-se.')
    }

}