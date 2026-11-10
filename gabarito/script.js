// ============ CONTADOR ============
let contadorBugs = 0;
const contadorEl = document.getElementById('contador');
const btnIncrementar = document.getElementById('btn-incrementar');
const btnZerar = document.getElementById('btn-zerar');

btnIncrementar.addEventListener('click', () => {
    contadorBugs += 1;
    contadorEl.textContent = contadorBugs;
});

btnZerar.addEventListener('click', () => {
    contadorBugs = 0;
    contadorEl.textContent = contadorBugs;
});

// ============ FORMULÁRIO ============
const form = document.getElementById('form-denuncia');
const mensagemEl = document.getElementById('mensagem-form');

function mostrarMensagem(texto, tipo) {
    mensagemEl.textContent = texto;
    mensagemEl.className = 'mensagem ' + tipo;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value.trim();

    if (nome === '') {
        mostrarMensagem('Preencha seu nome, cidadão!', 'erro');
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        mostrarMensagem('E-mail inválido!', 'erro');
        return;
    }

    if (tipo === '') {
        mostrarMensagem('Selecione um tipo de bug!', 'erro');
        return;
    }

    if (descricao === '') {
        mostrarMensagem('Descreva o bug encontrado!', 'erro');
        return;
    }

    mostrarMensagem(
        `Denúncia registrada! Nosso agente vai investigar "${descricao}" em breve. 🕵️`,
        'sucesso'
    );
    form.reset();
});

// ============ CARROSSEL DE DEPOIMENTOS ============
const depoimentos = document.querySelectorAll('.depoimento');
let indiceAtual = 0;

setInterval(() => {
    depoimentos[indiceAtual]?.classList.remove('ativo');
    indiceAtual++;
    if (indiceAtual >= depoimentos.length) {
        indiceAtual = 0;
    }
    depoimentos[indiceAtual]?.classList.add('ativo');
}, 1500);

// ============ MENU HAMBÚRGUER ============
const btnHamburguer = document.getElementById('btn-hamburguer');
const menu = document.getElementById('menu');

btnHamburguer.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    btnHamburguer.textContent = aberto ? '✕' : '☰';
});

menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('aberto');
        btnHamburguer.textContent = '☰';
    });
});
