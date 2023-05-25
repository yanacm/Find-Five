//const urlAuth = "https://apifindfive-qull.vercel.app";
const urlAuth = "http://localhost:3000";


const formLogin = document.querySelector('#form-login');
const btnLogin = document.querySelector("#btn-form-login");
const btnGoogle = document.querySelector('#btn-google');

getTokenGoogle();

formLogin.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    btnLogin.disabled = true;

    const data = {
        email: formLogin.elements.email.value,
        senha: formLogin.elements.senha.value
    };

    try {
        
        const response = await axios.post(`${urlAuth}/auth/login`, data);
    
        setCookie('usuario_find_five', response.data['token']);

        window.location.href = 'regras.html';
    
    } catch (error) {
        const alert = alertWrong(error.response.data['msg']);
        document.body.appendChild(alert)
        alertHide(alert.querySelector('.alert'));
    }
    btnLogin.disabled = false;
    formLogin.reset();
})

btnGoogle.addEventListener('click', async (evento) => {
    try {

        window.location.href = `${urlAuth}/auth/google`;
    
    } catch (error) {
        console.log(error);
    }
})

function getTokenGoogle(){
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const tokenGoogle = urlParams.get('tokenGoogle');

    if(!token) return;
    setCookie('usuario_find_five', token);

    if(tokenGoogle){
        setCookie('usuario_google', tokenGoogle);
    }
    window.location.href = 'regras.html';
}

function setCookie(name, value) {
    let cookieString = name + '=' + encodeURIComponent(value);
  
    document.cookie = cookieString;
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