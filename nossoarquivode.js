const URL_BASE = 'https://www.wllsistemas.com.br/api/v2/public/pessoa/'

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

btnConsultaId.addEventListener('click', () =>{
    //recebe o campo onde digita a informação
    id = txtId.value
    console.log(URL_BASE + id)
    fetch(URL_BASE + id)
        .then(response => response.json())
        .then(json => {
            console.log(json[0].ID)
            pResultado.innerHTML =
                `Id: ${ json[0].ID}<br>
                Nome: ${ json[0].NOME}<br>
                Email: ${ json[0].EMAIL}<br>
                Tipo: ${ json[0].TIPO}<br>`
        })
})

btnConsultaGeral.addEventListener('click', () => {
    fetch(URL_BASE)
        .then( response => response.json())
        .then( json => {
            json.forEach(cliente => {
                console.log(cliente.NOME)
            });
        })
})
