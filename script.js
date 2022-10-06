async function buscaEndereco (cep) {
    let mensagemErro = document.getElementById("erro");
    mensagemErro.innerHTML = "";
    try {
        let consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let consultaCepConvertida = await consultaCep.json();
        if(consultaCepConvertida.erro) {
            throw Error("CEP não existente.");
        }

        let estado = document.getElementById("estado");
        let cidade = document.getElementById("cidade");
        let logradouro = document.getElementById("endereco");
        let bairro = document.getElementById("bairro");

        estado.value = consultaCepConvertida.uf;
        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        bairro.value = consultaCepConvertida.bairro;

        console.log(consultaCepConvertida);
        return consultaCepConvertida
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro)
    }
}

let cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));