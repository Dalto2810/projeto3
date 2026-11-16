import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".hero");
const gamePanel = document.querySelector(".game-panel");
const resultPanel = document.querySelector(".result-panel");
const progressBar = document.querySelector(".progress-bar");
const contador = document.querySelector(".contador");
const perguntaNum = document.querySelector(".pergunta-num");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", jogaNovamente);

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    telaInicial.style.display = "none";
    resultPanel.classList.remove("active");
    gamePanel.classList.add("active");
    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    perguntaAtual = perguntas[atual];
    const numero = String(atual + 1).padStart(2, "0");
    const progresso = ((atual + 1) / perguntas.length) * 100;

    contador.textContent = numero;
    perguntaNum.textContent = numero;
    progressBar.style.width = `${progresso}%`;
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    perguntaAtual.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.innerHTML = `<span>${String.fromCharCode(65 + index)}. </span>${alternativa.texto}`;
        botao.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botao);
    });
}

function respostaSelecionada(opcaoSelecionada) {
    historiaFinal += `${aleatorio(opcaoSelecionada.afirmacao)} `;

    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
        mostraPergunta();
    } else {
        mostraResultado();
    }
}

function mostraResultado() {
    gamePanel.classList.remove("active");
    resultPanel.classList.add("active");
    textoResultado.textContent = historiaFinal.trim();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";
    resultPanel.classList.remove("active");
    telaInicial.style.display = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
}
