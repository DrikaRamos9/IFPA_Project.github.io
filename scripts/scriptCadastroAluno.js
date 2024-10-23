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
        labelfname.setAttribute('style', 'color: #b8b8bb')
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
        labelmatricula.setAttribute('style', 'color: #b8b8bb')
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
        labelpassword.setAttribute('style', 'color: #b8b8bb')
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
    // Previne o comportamento padrão do formulário
    event.preventDefault()

    if(validfname && validmatricula && validpassword){
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]') //criando um vetor para armazenar os dados do cadastro - localStorage do navegador
        
        listaUser.push(
            {
                fnameCad: fname.value,
                matriculaCad: matricula.value,
                passwordCad: password.value,
                lnameCad: lname.value
            }
        )

        localStorage.setItem('listaUser', JSON.stringify(listaUser)) //salvado o vetor no localStorage
        
        // Alert de sucesso no cadastro
        //alert('Cadastrado com sucesso!')
        showToast('successToast');

        // Função para dar um delay antes de ir pra tela de login
        setTimeout(function() { 
            window.location.href = './TelaLogin.html'
        }, 3000);
        
    }else {
        // Alert de falha no cadastro
        //alert('Erro ao cadastrar. Verifique se todos os campos foram preenchidos.')
        showToast('errorToast');
    }

}
