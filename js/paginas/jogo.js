const urlAuth = "https://apifindfive-qull.vercel.app";

const buttonsLogout = document.querySelectorAll('.btn-sair');

buttonsLogout.forEach( btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        setCookie('usuario_find_five', 'nop');
        window.location.href = '../index.html';
    })
})