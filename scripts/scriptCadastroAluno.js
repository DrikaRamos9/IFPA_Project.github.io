// Declaração de variáveis
let fname = document.querySelector('#fname');
let labelfname = document.querySelector('#labelfname');

let lname = document.querySelector('#lname');
let labellname = document.querySelector('#labellname');

let matricula = document.querySelector('#matricula');
let labelmatricula = document.querySelector('#labelmatricula');

let password = document.querySelector('#password');
let labelpassword = document.querySelector('#labelpassword');

let confirmPassword = document.querySelector('#confirmPassword');
let labelconfirmPassword = document.querySelector('#labelconfirmPassword');

let email = document.querySelector('#email');
let phone = document.querySelector('#phone');
let curso = document.querySelector('#curso');
let perfil = "Aluno";

// Variáveis para as Validações
// significa que os campos não estão preenchidos
let validmatricula = false;
let validpassword = false;
let validConfirmPassword = false;

// Validação do campo Matricula - se os caracteres digitados forem menores que 11 muda a cor da label
matricula.addEventListener('keyup', () => {
    if(matricula.value.length <= 10){
        labelmatricula.setAttribute('style', 'color: red');
        labelmatricula.innerHTML = 'Matrícula - Insira no mínimo 11 caracteres';
        validmatricula = false;
    } else {
        labelmatricula.setAttribute('style', 'color: blue');
        labelmatricula.innerHTML = 'Matrícula *';
        validmatricula = true;
    }
});

// Validação do campo senha - se os caracteres digitados forem menores que 5 muda a cor da label
password.addEventListener('keyup', () => {
    if(password.value.length <= 5){
        labelpassword.setAttribute('style', 'color: red');
        labelpassword.innerHTML = 'Crie sua senha - Insira no mínimo 6 caracteres';
        validpassword = false;
    } else {
        labelpassword.setAttribute('style', 'color: blue');
        labelpassword.innerHTML = 'Crie sua senha *';
        validpassword = true;
    }
});

// Validação do campo de confirmação de senha
confirmPassword.addEventListener('keyup', () => {
    if (confirmPassword.value !== password.value) {
        labelconfirmPassword.setAttribute('style', 'color: red');
        labelconfirmPassword.innerHTML = 'Confirme sua senha - As senhas não coincidem';
        validConfirmPassword = false;
    } else {
        labelconfirmPassword.setAttribute('style', 'color: blue');
        labelconfirmPassword.innerHTML = 'Senha validada *';
        validConfirmPassword = true;
    }
});

// Função para mostrar o Toast/Alert
function showToast(toastId) {
    var toastElement = document.getElementById(toastId);
    var toast = new bootstrap.Toast(toastElement);
    toast.show();
}

// Função de Cadastrar usuário
function cadastrar(){

    if(validmatricula && validpassword && validConfirmPassword){
        
        let listaAluno = JSON.parse(localStorage.getItem('listaAluno') || '[]'); //criando um vetor para armazenar os dados do cadastro - localStorage do navegador
        
        // Verifica se já existe um usuário com a mesma matrícula
        let usuarioExistente = listaAluno.some(user => user.matricula === matricula.value);
        if (usuarioExistente) {
            event.preventDefault() // Previne o comportamento padrão do formulário
            showToast('existToast');
            return; // Interrompe o cadastro se o usuário já existe
        }

        // Adiciona o novo usuário à lista
        listaAluno.push(
            {
                fnameCad: fname.value,
                lnameCad: lname.value,
                matricula: matricula.value,
                password: password.value,
                email: email.value,
                phone: phone.value,
                curso: curso.value,
                perfil: perfil
            }
        );

        localStorage.setItem('listaAluno', JSON.stringify(listaAluno)); //salvado o vetor no localStorage
        
        event.preventDefault()
        // Alert de sucesso no cadastro
        showToast('successToast');

        // Função para dar um delay antes de ir pra tela de login
        setTimeout(function() { 
            window.location.href = './index.html';
        }, 3000);
        
    }else {
        // Alert de falha no cadastro
        showToast('errorToast');
    }

}
