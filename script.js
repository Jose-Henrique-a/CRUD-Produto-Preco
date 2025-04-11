// Selecionar a tabela
const tabela = document.querySelector("#tabela");
// Elemento para mensagens de feedback
const mensagemFeedback = document.createElement("div");
mensagemFeedback.id = "mensagem-feedback";
document.querySelector("#output").prepend(mensagemFeedback);

// Inicializar a tabela
limpaTabela();
getprodutos();

// Função para mostrar mensagem de feedback
function mostrarMensagem(tipo, texto) {
    mensagemFeedback.className = `mensagem-${tipo}`;
    mensagemFeedback.textContent = texto;
    mensagemFeedback.style.display = "block";
    setTimeout(() => {
        mensagemFeedback.style.display = "none";
    }, 3000); // Mensagem desaparece após 3 segundos
}

// Função para listar produtos
function getprodutos() {
    fetch("https://api-produto-vercel.vercel.app/produtos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache"
    })
        .then((resposta) => {
            if (!resposta.ok) throw new Error(`Erro ao buscar produtos: ${resposta.status}`);
            return resposta.json();
        })
        .then((produtos) => {
            limpaTabela();
            produtos.forEach((produto) => {
                const tr = document.createElement("tr");
                tr.id = `a${produto.id}`;
                tr.innerHTML = `
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td class="preco">${produto.preco.toFixed(2)}</td>
                `;
                const tdAcoes = document.createElement("td");

                const botaoEditar = document.createElement("button");
                botaoEditar.className = "btn-editar";
                botaoEditar.onclick = () => mostraEditar(produto.id);
                botaoEditar.textContent = "Editar";

                const botaoApagar = document.createElement("button");
                botaoApagar.className = "btn-apagar";
                botaoApagar.onclick = () => deleta(produto.id);
                botaoApagar.textContent = "Apagar";

                const botaoView = document.createElement("button");
                botaoView.className = "btn-view";
                botaoView.onclick = () => mostraView(produto.id);
                botaoView.textContent = "Detalhes";

                tdAcoes.append(botaoEditar, botaoApagar, botaoView);
                tr.appendChild(tdAcoes);
                tabela.appendChild(tr);
            });
        })
        .catch((erro) => {
            console.error("Erro ao listar produtos:", erro);
            mostrarMensagem("erro", "Falha ao carregar produtos");
        });
}

// Função para cadastrar produto
function cadastrar() {
    const nomeInsere = document.getElementById("nome").value.trim();
    const precoInsere = parseFloat(document.getElementById("preco").value);

    if (!nomeInsere || isNaN(precoInsere) || precoInsere < 0) {
        mostrarMensagem("erro", "Por favor, preencha todos os campos corretamente.");
        return;
    }

    const produto = { nome: nomeInsere, preco: precoInsere };

    fetch("https://api-produto-vercel.vercel.app/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
    })
        .then((response) => {
            const div = document.getElementById("div-cadastrar");
            div.classList.remove("div-cadastrar-ativo");
            div.classList.add("div-cadastrar-inativo");
            limpaTabela();
            getprodutos();
            mostrarMensagem("sucesso", "Produto cadastrado com sucesso!");
            return response.json().catch(() => ({}));
        })
        .catch((erro) => {
            console.error("Erro ao cadastrar:", erro);
        });
}

// Função para mostrar/esconder formulário de cadastro
function mostraCadastro() {
    const div = document.getElementById("div-cadastrar");
    const divEditar = document.getElementById("div-editar");
    const divView = document.getElementById("div-view");

    div.classList.toggle("div-cadastrar-ativo");
    div.classList.toggle("div-cadastrar-inativo");

    divEditar.classList.remove("div-editar-ativo");
    divEditar.classList.add("div-editar-inativo");
    divView.classList.remove("div-view-ativo");
    divView.classList.add("div-view-inativo");

    if (div.classList.contains("div-cadastrar-ativo")) {
        document.getElementById("nome").value = "";
        document.getElementById("preco").value = "";
    }
}

// Função para limpar tabela
function limpaTabela() {
    tabela.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Preço</th>
            <th>Ações</th>
        </tr>
    `;
}

// Função para deletar produto
function deleta(idDoProdutoDelete) {
    if (confirm("CONFIRMA A EXCLUSÃO DO REGISTRO?\nESTA AÇÃO NÃO PODE SER DESFEITA")) {
        fetch(`https://api-produto-vercel.vercel.app/produtos/${idDoProdutoDelete}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resposta) => {
                limpaTabela();
                getprodutos();
                mostrarMensagem("sucesso", "Produto excluído com sucesso!");
                return resposta.json().catch(() => ({}));
            })
            .catch((erro) => {
                console.error("Erro ao deletar:", erro);
            });
    }
}

// Função para mostrar formulário de edição
function mostraEditar(idDoProdutoEdit) {
    const div = document.getElementById("div-editar");
    const divCadastro = document.getElementById("div-cadastrar");
    const divView = document.getElementById("div-view");

    if (idDoProdutoEdit === 0) {
        div.classList.remove("div-editar-ativo");
        div.classList.add("div-editar-inativo");
        return;
    }

    div.classList.toggle("div-editar-ativo");
    div.classList.toggle("div-editar-inativo");

    divCadastro.classList.remove("div-cadastrar-ativo");
    divCadastro.classList.add("div-cadastrar-inativo");
    divView.classList.remove("div-view-ativo");
    divView.classList.add("div-view-inativo");

    fetch(`https://api-produto-vercel.vercel.app/produtos/${idDoProdutoEdit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((resposta) => {
            if (!resposta.ok) throw new Error(`Erro ao buscar produto: ${resposta.status}`);
            return resposta.json();
        })
        .then((obj) => {
            document.getElementById("idEdit").value = obj.id;
            document.getElementById("nomeEdit").value = obj.nome;
            document.getElementById("precoEdit").value = obj.preco.toFixed(2);
        })
        .catch((erro) => {
            console.error("Erro ao carregar dados para edição:", erro);
            mostrarMensagem("erro", "Falha ao carregar dados do produto");
        });
}

// Função para salvar alterações
function salvarAlteracao() {
    const idEditar = parseInt(document.getElementById("idEdit").value);
    const nomeEditar = document.getElementById("nomeEdit").value.trim();
    const precoEditar = parseFloat(document.getElementById("precoEdit").value);

    if (!nomeEditar || isNaN(precoEditar) || precoEditar < 0) {
        mostrarMensagem("erro", "Por favor, preencha todos os campos corretamente.");
        return;
    }

    const produto = { nome: nomeEditar, preco: precoEditar };

    fetch(`https://api-produto-vercel.vercel.app/produtos/${idEditar}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
    })
        .then((response) => {
            limpaTabela();
            getprodutos();
            const div = document.getElementById("div-editar");
            div.classList.remove("div-editar-ativo");
            div.classList.add("div-editar-inativo");
            mostrarMensagem("sucesso", "Produto atualizado com sucesso!");
            return response.json().catch(() => ({}));
        })
        .catch((erro) => {
            console.error("Erro ao atualizar:", erro);
        });
}

// Função para visualizar produto
function mostraView(idVisualizar) {
    const div = document.getElementById("div-view");
    const divCadastro = document.getElementById("div-cadastrar");
    const divEditar = document.getElementById("div-editar");

    if (idVisualizar === 0) {
        div.classList.remove("div-view-ativo");
        div.classList.add("div-view-inativo");
        return;
    }

    div.classList.toggle("div-view-ativo");
    div.classList.toggle("div-view-inativo");

    divCadastro.classList.remove("div-cadastrar-ativo");
    divCadastro.classList.add("div-cadastrar-inativo");
    divEditar.classList.remove("div-editar-ativo");
    divEditar.classList.add("div-editar-inativo");

    fetch(`https://api-produto-vercel.vercel.app/produtos/${idVisualizar}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((resposta) => {
            if (!resposta.ok) throw new Error(`Erro ao buscar produto: ${resposta.status}`);
            return resposta.json();
        })
        .then((obj) => {
            document.getElementById("idView").value = obj.id;
            document.getElementById("nomeView").value = obj.nome;
            document.getElementById("precoView").value = obj.preco.toFixed(2);
        })
        .catch((erro) => {
            console.error("Erro ao carregar dados para visualização:", erro);
            mostrarMensagem("erro", "Falha ao carregar dados do produto");
        });
}