const urlAuth = "https://apifindfive-qull.vercel.app";
const urlGame = "https://findfiveapi.onrender.com";

(async () => {
    try {
        const token = getCookie('usuario_find_five');
        const response = await axios.get(`${urlAuth}/auth`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    
        console.log(response.data['msg']);

    } catch (error) {;
        console.log(error);
    
        setCookie('usuario_find_five', 'nop')
        window.location.href = '../index.html';
    }
})();

function setCookie(name, value) {
    let cookieString = name + '=' + encodeURIComponent(value);
  
    document.cookie = cookieString;
}

function getCookie(name) {
    const cookieString = decodeURIComponent(document.cookie);
    const cookies = cookieString.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
  
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }

    return '';
}