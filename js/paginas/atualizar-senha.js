const urlAuth = "https://apifindfive-qull.vercel.app";

const formAtualizar = document.querySelector('#form-atualizar');
const btnAtualizar = document.querySelector('#btn-form');
const spinner = document.querySelector('#btn-form .spinner');
const textSpinner = document.querySelector('#btn-form .text-btn');

formAtualizar.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    btnAtualizar.disabled = true;
    textSpinner.textContent = 'Carregando';
    spinner.classList.replace('spinner', 'spinner-border');

    const data = {
        senha: formAtualizar.elements.senha.value.trim(),
        confirmSenha: formAtualizar.elements.confirmSenha.value.trim()
    };

    const token = getToken();
    console.log(token)
    try {
        
        const response = await axios.put(`${urlAuth}/usuario/atualizar-senha`, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const alert = alertSuccess(response.data['msg'])
        document.body.appendChild(alert)
        alertHide(alert.querySelector('.alert'));

        btnAtualizar.disabled = false;
        formAtualizar.reset();
        textSpinner.textContent = 'Redefinir';
        spinner.classList.replace('spinner-border', 'spinner');
    
    } catch (error) {
        btnAtualizar.disabled = false;
        textSpinner.textContent = 'Redefinir';
        spinner.classList.replace('spinner-border', 'spinner');
    
        const alert = alertWrong(error.response.data['msg']);
        document.body.appendChild(alert)
        alertHide(alert.querySelector('.alert'));
    }
});

function getToken(){

    const url = window.location.href;

    const urlParams = new URLSearchParams(new URL(url).search);
    const token = urlParams.get('token');

    return token;

}

const alertSuccess = (mensagem) => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="alert success show">
        <div class="icon"><span class="fas fa-circle-check"></span></div>
        <div class="msg"><span class="text">Sucesso: ${mensagem}</span></div>
        <div class="close-btn" onClick="closeAlert()">
            <span class="fas fa-times"></span>
        </div>
    </div>
    `
    return div;
}

const alertWrong = (mensagem) => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="alert wrong show">
        <div class="icon"><span class="fas fa-circle-exclamation"></span></div>
        <div class="msg"><span class="text">Problema: ${mensagem}</span></div>
        <div class="close-btn" onClick="closeAlert()">
            <span class="fas fa-times"></span>
        </div>
    </div>
    `
    return div;
}

function alertHide(alert){

    setTimeout(() => {
        if(!alert) return;

        alert.classList.remove('show');
        alert.classList.add('hide');
        alertDelete(alert)
    }, 3000)
}

function closeAlert(){
    const alert = document.querySelector('.alert');

    alert.classList.remove('show');
    alert.classList.add('hide');
    alertDelete(alert)
}

function alertDelete(elemento){
    setTimeout(() => {
        elemento.remove();
    }, 1000)
}
