//Declaração de variáveis
let fname = document.querySelector('#fname')
let labelfname = document.querySelector('#labelfname')
let validfname = false // significa que os campos não estão preenchidos

let lname = document.querySelector('#lname')
let labellname = document.querySelector('#labellname')
let validlname = false // significa que os campos não estão preenchidos

let matricula = document.querySelector('#matricula')
let labelmatricula = document.querySelector('#labelmatricula')
let validmatricula = false

let password = document.querySelector('#password')
let labelpassword = document.querySelector('#labelpassword')
let validpassword = false


// Validação do campo nome - se as letras digitadas forem menores que 3 muda a cor da label
fname.addEventListener('keyup', () => {
    if(fname.value.length <= 2){
        labelfname.setAttribute('style', 'color: red')
        labelfname.innerHTML = 'Primeiro Nome - Insira no mínimo 3 letras'
        validfname = false
    } else {
        labelfname.setAttribute('style', 'color: blue')
        labelfname.innerHTML = 'Primeiro Nome *'
        validfname = true
    }
})

// Validação do campo Matricula - se os caracteres digitados forem menores que 11 muda a cor da label
matricula.addEventListener('keyup', () => {
    if(matricula.value.length <= 10){
        labelmatricula.setAttribute('style', 'color: red')
        labelmatricula.innerHTML = 'Matrícula - Insira no mínimo 11 caracteres'
        validmatricula = false
    } else {
        labelmatricula.setAttribute('style', 'color: blue')
        labelmatricula.innerHTML = 'Matrícula *'
        validmatricula = true
    }
})

// Validação do campo senha - se os caracteres digitados forem menores que 5 muda a cor da label
password.addEventListener('keyup', () => {
    if(password.value.length <= 5){
        labelpassword.setAttribute('style', 'color: red')
        labelpassword.innerHTML = 'Crie sua senha - Insira no mínimo 6 caracteres'
        validpassword = false
    } else {
        labelpassword.setAttribute('style', 'color: blue')
        labelpassword.innerHTML = 'Crie sua senha *'
        validpassword = true
    }
})

// Função para mostrar o Toast/Alert
function showToast(toastId) {
    var toastElement = document.getElementById(toastId);
    var toast = new bootstrap.Toast(toastElement);
    toast.show();
}



// Função de Cadastrar usuário
function cadastrar(){

    if(validfname && validmatricula && validpassword){
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]') //criando um vetor para armazenar os dados do cadastro - localStorage do navegador
        
        // Verifica se já existe um usuário com a mesma matrícula
        let usuarioExistente = listaUser.some(user => user.matriculaCad === matricula.value);
        if (usuarioExistente) {
            // Previne o comportamento padrão do formulário
            event.preventDefault()
            showToast('existToast');
            return; // Interrompe o cadastro se o usuário já existe
        }

        // Adiciona o novo usuário à lista
        listaUser.push(
            {
                fnameCad: fname.value,
                matriculaCad: matricula.value,
                passwordCad: password.value,
                lnameCad: lname.value
            }
        )

        localStorage.setItem('listaUser', JSON.stringify(listaUser)) //salvado o vetor no localStorage
        
        //alert("Sucesso")
        // Previne o comportamento padrão do formulário
        event.preventDefault()
        // Alert de sucesso no cadastro
        showToast('successToast');

        // Função para dar um delay antes de ir pra tela de login
        setTimeout(function() { 
            window.location.href = './index.html'
        }, 3000);
        
    }else {
        // Alert de falha no cadastro
        showToast('errorToast');
    }

}
