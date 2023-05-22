const urlAuth = "https://apifindfive-qull.vercel.app";

const formRegistro = document.querySelector("#form-registro");
const btnRegistro = document.querySelector("#btn-form-registro");

formRegistro.addEventListener('submit', async e => {
    e.preventDefault();

    btnRegistro.disabled = true;

    const data = {
        nome: formRegistro.elements.nome.value,
        email: formRegistro.elements.email.value,
        senha: formRegistro.elements.senha.value
    };

    try {
        
        const response = await axios.post(`${urlAuth}/auth/register`, data);
    
        const alert = alertSuccess(response.data['msg'])
        document.body.appendChild(alert)
        alertHide(alert.querySelector('.alert'));
    
    } catch (error) {
        const alert = alertWrong(error.response.data['msg']);
        document.body.appendChild(alert)
        alertHide(alert.querySelector('.alert'));
    }
    btnRegistro.disabled = false
    formRegistro.reset()
})

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
