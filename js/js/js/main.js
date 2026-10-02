import { perguntas } from './perguntas.js';
import { geraNomeAleatorio, buscaItemAleatorio } from './aleatorio.js';

const caixaInicial = document.querySelector('.caixa-inicial');
const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const caixaResultado = document.querySelector('.caixa-resultado');
const textoResultado = document.querySelector('.texto-resultado');
const campoNome = document.querySelector('#campo-nome');
const btnIniciar = document.querySelector('.btn-iniciar');
const btnNovamente = document.querySelector('.btn-novamente');

let atual = 0;
let perguntaAtual;
let historiaFinal = "";
let nomePlayer = "";

btnIniciar.addEventListener('click', iniciarJogo);
btnNovamente.addEventListener('click', jogarNovamente);

function iniciarJogo() {
    nomePlayer = campoNome.value.trim();
    if (nomePlayer === "") {
        nomePlayer = geraNomeAleatorio();
    }
    caixaInicial.classList.add('esconder');
    caixaPerguntas.classList.remove('esconder');
    caixaAlternativas.classList.remove('esconder');
    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        exibeResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    // Aplicação do método replace para inserir o nome do estudante
    caixaPerguntas.textContent = perguntaAtual.enunciado.replace("[NOME]", nomePlayer);
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    historiaFinal += opcaoSelecionada.afirmacao + " ";
    atual++;
    mostraPergunta();
}

function exibeResultado() {
    caixaPerguntas.classList.add('esconder');
    caixaAlternativas.classList.add('esconder');
    caixaResultado.classList.remove('esconder');
    btnNovamente.classList.remove('esconder');
    
    textoResultado.textContent = `Resumo da jornada de ${nomePlayer}: ${historiaFinal}`;
}

function jogarNovamente() {
    atual = 0;
    historiaFinal = "";
    caixaResultado.classList.add('esconder');
    caixaInicial.classList.remove('esconder');
    campoNome.value = "";
}