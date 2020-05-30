const URL_BASE = 'https://www.wllsistemas.com.br/api/v2/public/pessoa/'

window.addEventListener("load", function (event) {
    carregarTabela()
});

gravar.addEventListener('click', () => {

    if (!isValidForm()) {

        fetch(URL_BASE, {
                method: 'POST',
                body: `nome=${nome.value}&email=${email.value}&tipo=${tipo.value}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => response.json())
            .then(json => pResultado.innerHTML = json.mensagem);
    }

});

function carregarTabela() {
    var tabela = ''
    fetch(URL_BASE)
        .then(response => response.json())
        // .then(json => retornoBotoes.innerHTML = json[0].NOME)
        .then(json => {
            json.forEach(cliente => {
                tabela += `
                <tr>
                    <td class="align-middle">${cliente.ID}</td>
                    <td class="align-middle">${cliente.NOME}</td>
                    <td class="align-middle">${cliente.EMAIL}</td>
                    <td class="align-middle">${cliente.TIPO}</td>
                    <td><button id="btnAlterar" onclick="inserirDadosForm(this.value);" value="${cliente.ID}" class="col btn btn-dark">Alterar</button><button id="btnExcluir" value="${cliente.ID}" class="col btn btn-danger mt-2">Excluir</button></td>
                </tr>
                `
            });
            tDados.innerHTML = tabela
        })
}


// FUNÇAO DE INSERIR NO FORM
function inserirDadosForm(idDado) {
    dados = consultaDadoPorId(idDado)
    // document.getElementById('nome').value = dados.NOME
    nome.value = dados.NOME
    console.log(typeof (dados))
}

function editarDado(idDado) {
    alert('foi carai, o id é ' + idDado)
    fetch(URL_BASE, {
            method: 'PUT',
            body: `ID=${idDado}&NOME=${nome.value}&EMAIL=${email.value}&TIPO=${tipo.value}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => response.json())
        .then(json => pResultado.innerHTML = json.mensagem)
}

function excluirDado() {

}

btnConsultaId.addEventListener('click', consultaDadoPorId(txtId.value))

// FUNÇAO DE CONSULTAR
function consultaDadoPorId(idDado) {
    console.log(URL_BASE + idDado)
    fetch(URL_BASE + idDado)
        .then(response => response.json())
        .then(json => {
            return json.NOME, json.EMAIL, json.TIPO;
        })
}

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