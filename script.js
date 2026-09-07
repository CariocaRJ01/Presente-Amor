const botaoSurpresa =
document.getElementById("botao-surpresa");

const telaInicial =
document.querySelector(".tela-inicial");

const telaCoracao =
document.getElementById("tela-coracao");

const canvas =
document.getElementById("canvas-coracao");

const ctx =
canvas.getContext("2d");

const mensagemCoracao =
document.getElementById("mensagem-coracao");

const botaoProximo =
document.getElementById("botao-proximo");

const telaCarta =
document.getElementById("tela-carta");

const envelope =
document.getElementById("envelope");

const textoClique =
document.getElementById("texto-clique");

const papelCarta =
document.getElementById("papel-carta");

const papelEnvelope =
document.querySelector(".papel-envelope");

const abaEnvelope =
document.querySelector(".envelope-aba");

const botaoFinal =
document.getElementById("botao-final");

const telaFinal =
document.getElementById("tela-final");

const particulasFinal =
document.getElementById("particulas-final");

const restart =
document.getElementById("restart");

// ==================================================
// MÚSICA
// ==================================================

const musica = new Audio("musica/foi-deus.mp3");
musica.loop = true;
musica.volume = 0.6;
musica.preload = "auto";

// Função para tocar a música com segurança
function tocarMusica() {
    const promise = musica.play();

    if (promise !== undefined) {
        promise
            .then(() => {
                console.log("Música tocando!");
            })
            .catch((error) => {
                console.log("Erro ao tocar música:", error);
            });
    }
}

// ==================================================
// CANVAS
// ==================================================

let largura;
let altura;

let coracaoAtivo = false;

let tempo = 0;

function ajustarCanvas() {


largura =
    canvas.width =
    window.innerWidth;

altura =
    canvas.height =
    window.innerHeight;

if (coracaoAtivo) {
    definirAlvos();
}


}

ajustarCanvas();

window.addEventListener(
"resize",
ajustarCanvas
);

// ==================================================
// PARTÍCULAS DO PRIMEIRO CORAÇÃO
// ==================================================

const particulas = [];

const quantidadeParticulas = 700;

for (
let i = 0;
i < quantidadeParticulas;
i++
) {


particulas.push({

    x:
        Math.random() *
        window.innerWidth,

    y:
        Math.random() *
        window.innerHeight,

    tamanho:
        Math.random() * 2 + 0.5,

    alvoX: 0,

    alvoY: 0,

    velocidade:
        Math.random() * 0.04 + 0.02,

    fase:
        Math.random() *
        Math.PI * 2

});


}

// ==================================================
// CORAÇÃO
// ==================================================

function criarCoracao() {


const pontos = [];

for (
    let t = 0;
    t < Math.PI * 2;
    t += 0.01
) {

    const x =
        16 *
        Math.pow(
            Math.sin(t),
            3
        );

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    pontos.push({

        x:
            x * 15,

        y:
            -y * 15

    });
}

return pontos;


}

const pontosCoracao =
criarCoracao();

// ==================================================
// DEFINIR ALVOS
// ==================================================

function definirAlvos() {


for (
    let i = 0;
    i < particulas.length;
    i++
) {

    const ponto =
        pontosCoracao[
            i %
            pontosCoracao.length
        ];

    particulas[i].alvoX =
        largura / 2 +
        ponto.x;

    particulas[i].alvoY =
        altura / 2 +
        ponto.y;
}


}

// ==================================================
// ANIMAÇÃO DO CORAÇÃO
// ==================================================

function animar() {


ctx.clearRect(
    0,
    0,
    largura,
    altura
);

tempo += 0.025;

const pulsacao =
    1 +
    Math.sin(tempo * 2) *
    0.05;


for (
    const particula
    of particulas
) {

    if (coracaoAtivo) {

        const centroX =
            largura / 2;

        const centroY =
            altura / 2;


        const alvoX =
            centroX +
            (
                particula.alvoX -
                centroX
            ) *
            pulsacao;


        const alvoY =
            centroY +
            (
                particula.alvoY -
                centroY
            ) *
            pulsacao;


        particula.x +=
            (
                alvoX -
                particula.x
            ) *
            particula.velocidade;


        particula.y +=
            (
                alvoY -
                particula.y
            ) *
            particula.velocidade;


        particula.x +=
            Math.sin(
                tempo +
                particula.fase
            ) *
            0.25;


        particula.y +=
            Math.cos(
                tempo * 0.8 +
                particula.fase
            ) *
            0.25;
    }


    ctx.beginPath();


    ctx.arc(
        particula.x,
        particula.y,
        particula.tamanho,
        0,
        Math.PI * 2
    );


    ctx.shadowBlur = 10;

    ctx.shadowColor =
        "rgba(255, 100, 170, 0.8)";

    ctx.fillStyle =
        "rgba(255, 190, 215, 0.9)";

    ctx.fill();

    ctx.shadowBlur = 0;
}


requestAnimationFrame(animar);


}

// ==================================================
// ABRIR SURPRESA
// ==================================================

botaoSurpresa.addEventListener("click", () => {
    botaoSurpresa.disabled = true;

   // Toca a música
    musica.play().catch(() => {
        console.log("A música ainda não está disponível.");
    });

    definirAlvos();


    telaInicial.classList.add(
        "saindo"
    );


    setTimeout(() => {

        telaInicial.style.display =
            "none";

        telaCoracao.style.display =
            "flex";

        telaCoracao.style.opacity =
            "0";


        setTimeout(() => {

            telaCoracao.style.opacity =
                "1";

            canvas.style.opacity =
                "1";

            coracaoAtivo =
                true;

        }, 100);


        setTimeout(() => {

            mensagemCoracao.style.opacity =
                "1";

            mensagemCoracao.style.transform =
                "scale(1)";

        }, 2500);


        setTimeout(() => {

            botaoProximo.style.opacity =
                "1";

            botaoProximo.style.transform =
                "translateY(0)";

        }, 4000);


    }, 1000);

}


);

// ==================================================
// BOTÃO PRÓXIMO
// ==================================================

botaoProximo.addEventListener(
"click",
() => {


    botaoProximo.disabled =
        true;

    telaCoracao.style.opacity =
        "0";


    setTimeout(() => {

        telaCoracao.style.display =
            "none";

        telaCarta.style.display =
            "flex";

        telaCarta.style.opacity =
            "1";


        envelope.style.opacity =
            "1";

        envelope.style.transform =
            "scale(1)";


        textoClique.style.opacity =
            "0.9";


        papelCarta.style.opacity =
            "0";

        papelCarta.style.transform =
            "translateY(80px) scale(0.9)";

        papelCarta.style.pointerEvents =
            "none";

    }, 1000);

}


);

// ==================================================
// ABRIR ENVELOPE
// ==================================================

let envelopeAberto = false;

envelope.addEventListener(
"click",
abrirEnvelope
);

envelope.addEventListener(
"keydown",
(event) => {


    if (
        event.key === "Enter" ||
        event.key === " "
    ) {

        event.preventDefault();

        abrirEnvelope();
    }

}


);

function abrirEnvelope() {


if (envelopeAberto) {
    return;
}


envelopeAberto =
    true;


textoClique.style.opacity =
    "0";


abaEnvelope.style.transform =
    "rotateX(180deg)";


setTimeout(() => {

    papelEnvelope.style.transform =
        "translateY(-160px)";

}, 700);


setTimeout(() => {

    envelope.style.opacity =
        "0";

    envelope.style.transform =
        "scale(0.85)";

}, 1900);


setTimeout(() => {

    papelCarta.style.opacity =
        "1";

    papelCarta.style.transform =
        "translateY(0) scale(1)";

    papelCarta.style.pointerEvents =
        "auto";

}, 2400);


}

// ==================================================
// FINAL CINEMATOGRÁFICO
// ==================================================

function criarParticulasFinais() {


particulasFinal.innerHTML = "";


const quantidade = 80;


for (
    let i = 0;
    i < quantidade;
    i++
) {

    const particula =
        document.createElement("div");


    particula.className =
        "particula-final";


    particula.style.left =
        Math.random() * 100 + "%";


    particula.style.top =
        55 +
        Math.random() * 45 +
        "%";


    particula.style.setProperty(
        "--delay",
        Math.random() * 4 + "s"
    );


    particula.style.setProperty(
        "--duracao",
        4 +
        Math.random() * 5 +
        "s"
    );


    particula.style.transform =
        `scale(${
            0.5 +
            Math.random() * 1.5
        })`;


    particulasFinal.appendChild(
        particula
    );
}


}

// ==================================================
// BOTÃO "AINDA TEM UMA SURPRESA"
// ==================================================

botaoFinal.addEventListener(
"click",
() => {


    botaoFinal.disabled =
        true;


    telaCarta.style.opacity =
        "0";


    setTimeout(() => {

        telaCarta.style.display =
            "none";


        criarParticulasFinais();


        telaFinal.style.display =
            "flex";


        setTimeout(() => {

            telaFinal.style.opacity =
                "1";

        }, 100);

    }, 1200);

}


);

// ==================================================
// RECOMEÇAR
// ==================================================

restart.addEventListener(
"click",
() => {


    location.reload();

}


);

// ==================================================
// INICIAR ANIMAÇÃO
// ==================================================

animar();
