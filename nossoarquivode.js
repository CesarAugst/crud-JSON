const URL_BASE = 'https://www.wllsistemas.com.br/api/v3/cliente/';

gravar.addEventListener('click', () => {

    if (isValidForm()) {
        fetch(URL_BASE, {
                method: 'POST',
                body: `NOME=${nome.value}&EMAIL=${email.value}&TIPO=${tipo.value}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => response.json())
            .then(json => console.log(json.mensagem));
    }

});
