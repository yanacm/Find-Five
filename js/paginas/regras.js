const btnSair = document.querySelector('#btn-sair');

btnSair.addEventListener('click', async e => {
    e.preventDefault();

    setCookie('usuario_find_five', 'nop');

    const tokenGoogle = getCookie('usuario_google');

    if(tokenGoogle){
        try {
            const response = await axios.post(`https://oauth2.googleapis.com/revoke?token=${tokenGoogle}`);
    
        } catch (error) {
            console.log(error)
        }
    }

    window.location.href = '../index.html';
})
