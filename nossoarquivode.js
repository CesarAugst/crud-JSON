const URL_BASE = 'https://www.wllsistemas.com.br/api/v3/cliente/';

document.onload(carregarTabela())

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

function carregarTabela() {
    fetch(URL_BASE)
        .then(response => response.json())
        // .then(json => retornoBotoes.innerHTML = json[0].NOME)
        .then(json => {
            json.forEach(cliente => {
                retornoBotoes.innerHTML += cliente.NOME + '<br>';
            });
        })
}

function editarDado(idDado){
    fetch(URL_BASE, {
        method: 'PUT',
        body: `ID=${idDado}&NOME=${nome.value}&EMAIL=${email.value}&TIPO=${tipo.value}`,
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
    })
    .then(response => response.json())
    .then(json => pResultado.innerHTML = json.mensagem)
}

function excluirDado(){

}