/*
==============================================================
GABARITO DE BUGS NO JAVASCRIPT (SÓ O PROFESSOR LÊ)
==============================================================
BUG #7  — contador incrementa +2 em vez de +1
BUG #8  — botão "Zerar" atualiza só o display; deixa a variável antiga
BUG #9  — campo "descrição" nunca é validado (aceita envio em branco)
BUG #10 — regex de e-mail permissiva demais (aceita "abc" como válido)
BUG #11 — carrossel usa `>` no lugar de `>=`: a cada volta, some por 1.5s (índice fica fora do array)
BUG #12 — valida <select> comparando string com número (nunca detecta)
==============================================================
*/

// ============ CONTADOR ============
let contadorBugs = 0;
const contadorEl = document.getElementById('contador');
const btnIncrementar = document.getElementById('btn-incrementar');
const btnZerar = document.getElementById('btn-zerar');

btnIncrementar.addEventListener('click', () => {
    // BUG #7: soma 2 em vez de 1
    contadorBugs += 2;
    contadorEl.textContent = contadorBugs;
});

btnZerar.addEventListener('click', () => {
    // BUG #8: só zera o texto na tela; a variável contadorBugs continua com o valor antigo
    // Se o aluno clicar em "+" depois de "Zerar", o contador pula pro valor antigo + 2
    contadorEl.textContent = '0';
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

    // BUG #10: regex fraquíssima — aceita qualquer texto não-vazio como e-mail
    // Certo seria algo como /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const regexEmail = /.+/;
    if (!regexEmail.test(email)) {
        mostrarMensagem('E-mail inválido!', 'erro');
        return;
    }

    // BUG #12: value do <select> é sempre string. Comparar com número (0) nunca é true
    // Certo seria: if (tipo === '')
    if (tipo === 0) {
        mostrarMensagem('Selecione um tipo de bug!', 'erro');
        return;
    }

    // BUG #9: descrição nunca é validada — enviar em branco passa direto

    mostrarMensagem(
        `Denúncia registrada! Nosso agente vai investigar "${descricao || 'seu caso'}" em breve. 🕵️`,
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
    // BUG #11: deveria ser >= depoimentos.length (off-by-one)
    // Do jeito atual, indiceAtual chega em depoimentos.length antes de resetar,
    // e nesse ciclo o depoimento é undefined — nenhum aparece por 1,5 segundos
    if (indiceAtual > depoimentos.length) {
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
