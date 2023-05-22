const urlAuth = "https://apifindfive-qull.vercel.app";

const btnSair = document.querySelector('#btn-sair');

btnSair.addEventListener('click', e => {
    e.preventDefault();

    setCookie('usuario_find_five', 'nop');
    window.location.href = '../index.html';
})