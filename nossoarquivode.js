const URL_BASE = 'https://www.wllsistemas.com.br/api/v2/public/pessoa/'

window.addEventListener("load", function(event) {
    carregarTabela()
});

gravar.addEventListener('click', () => {

    if (!isValidForm()) {
        console.log('ok')
        fetch(URL_BASE, {
                method: 'POST',
                body: `nome=${nome.value}&email=${email.value}&tipo=${tipo.value}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => response.json())
            .then(json => console.log(json.mensagem));
    }

});

function carregarTabela() {
    var tabela =''
    fetch(URL_BASE)
        .then(response => response.json())
        // .then(json => retornoBotoes.innerHTML = json[0].NOME)
        .then(json => {
            json.forEach(cliente => {
                tabela += `
                <tr>
                    <th scope="row"></th>
                    <td>${cliente.ID}</td>
                    <td>${cliente.NOME}</td>
                    <td>${cliente.EMAIL}</td>
                    <td>${cliente.TIPO}</td>
                    <td><button id="btnAlterar" value="' + ${cliente.ID} + '" class="col btn btn-dark">Alterar</button><button id="btnExcluir" value="' + ${cliente.ID} + '" class="col btn btn-dark">Excluir</button></td>
                </tr>
                `
            });
            tDados.innerHTML = tabela
        })
}

function editarDado(idDado){
    alert('foi carai, o id é ' + idDado)
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

function isValidForm() {
    let error = true;

    if (nome.value == '') {
        nome.style.border = '2px solid red';
        pResultado.innerHTML = 'Favor preencher o campo Nome';

        error = false;
    } else {
        nome.style.border = '1px solid #ccc';
    }

    if (email.value == '') {
        email.style.border = '2px solid red';
        pResultado.innerHTML = 'Favor preencher o campo E-mail';

        error = false;
    } else {
        email.style.border = '1px solid #ccc';
    }

    if (tipo.value == '') {
        tipo.style.border = '2px solid red';
        pResultado.innerHTML = 'Favor selecionar um tipo';

        error = false;
    } else {
        tipo.style.border = '1px solid #ccc';
    }
}
