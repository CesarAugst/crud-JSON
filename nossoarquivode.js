const URL_BASE = 'https://www.wllsistemas.com.br/api/v2/public/pessoa/'

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
                tDados.innerHTML += '<td>' + cliente.ID + '</td>' +
                                    '<td>' + cliente.NOME + '</td>' + 
                                    '<td>' + cliente.EMAIL + '</td>' + 
                                    '<td>' + cliente.TIPO + '</td>' + 
                                    '<td>' + cliente.ID + '</td>'
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
    var tabela = ' '
    fetch(URL_BASE)
        .then( response => response.json())
        .then( json => {
            json.forEach(cliente => {
                console.log(cliente.ID)
                tabela += `
                <tr>
                    <th scope="row"></th>
                    <td>${cliente.ID}</td>
                    <td>${cliente.NOME}</td>
                    <td>${cliente.EMAIL}</td>
                    <td>${cliente.TIPO}</td>
                    <td><button id="btnAlterar">Alterar</button><button id="btnExcluir">Excluir</button></td>
                </tr>
                `
            });
            tdados.innerHTML = tabela
        })
})
