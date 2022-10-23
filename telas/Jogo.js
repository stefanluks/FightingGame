import Tela from "../componentes/Tela.js";
import {Player, Teclas} from "../componentes/Player.js";

const Jogo = new Tela("Jogo", false);

let gameover = false;
let pause = false;
let debug = false;
let tecla_pressionada = "";

//Personagens padrões

const spriteP1 = new Image();
spriteP1.src = "../assets/sprites/kungfuman.png";

const spriteP2 = new Image();
spriteP2.src = "../assets/sprites/kungfuman2.png";

Jogo.p1 = new Player({
    sprite: spriteP1,
    posicao: {
        x: 200,
        y: 80
    },
    velocidade: {
        x: 0,
        y: 0
    },
    dimensao: {
        w: 100,
        h: 230
    },
    cor: "green",
    animacao: [
        { x: 0, y: 130 },
        { x: 100, y: 130 },
        { x: 200, y: 130 },
        { x: 300, y: 130 },
        { x: 400, y: 130 },
        { x: 500, y: 130 },
        { x: 600, y: 130 },
        { x: 700, y: 130 },
        { x: 800, y: 130 },
        { x: 0, y: 255 },
        { x: 100, y: 255 },
        { x: 200, y: 255 },
        { x: 300, y: 255 }
    ]
});
Jogo.p2 = new Player({
    sprite: spriteP2,
    posicao: {
        x: 1000,
        y: 80
    },
    velocidade: {
        x: 0,
        y: 0
    },
    dimensao: {
        w: 100,
        h: 230
    },
    cor: "blue",
    player2: true,
    animacao: [
        { x: 850, y: 130 },
        { x: 750, y: 130 },
        { x: 650, y: 130 },
        { x: 550, y: 130 },
        { x: 450, y: 130 },
        { x: 350, y: 130 },
        { x: 250, y: 130 },
        { x: 150, y: 130 },
        { x: 0, y: 130 },
        { x: 850, y: 255 },
        { x: 750, y: 255 },
        { x: 650, y: 255 },
        { x: 550, y: 255 },
    ]
});

let p1 = Jogo.p1;
let p2 = Jogo.p2;

let tempo = 99;
let timedow = setInterval(() => {
    if (!gameover) {
        if (!pause) tempo--;
        if (tempo === 0) {
            GameOver("Fim de Tempo");
            clearInterval(timedow);
        }
    } else {
        clearInterval(timedow);
    }
}, 1000);

let bg1 = new Image();
bg1.src = "../assets/backgrounds/bg3.jpg";

const gravidade = 0.2;

function ColisaoAtaqueP1() {
    let ataque = p1.Ataques[p1.ataqueSelecionado];
    return (
        ataque.posicao.x + ataque.caixa.w >= p2.posicao.x &&
        ataque.posicao.x <= p2.posicao.x + p2.dimensao.w &&
        ataque.posicao.y + ataque.caixa.h >= p2.posicao.y &&
        ataque.posicao.y <= p2.posicao.y + p2.dimensao.h
    )
}

function ColisaoAtaqueP2() {
    let ataque = p2.Ataques[p2.ataqueSelecionado];
    return (
        ataque.posicao.x + ataque.caixa.w >= p1.posicao.x &&
        ataque.posicao.x <= p1.posicao.x + p1.dimensao.w &&
        ataque.posicao.y + ataque.caixa.h >= p1.posicao.y &&
        ataque.posicao.y <= p1.posicao.y + p1.dimensao.h
    )
}

function Vitoria() {
    return Jogo.p1.vida <= 0 || Jogo.p2.vida <= 0;
}

function ControleHUD() {
    let timer = document.querySelector(".timer");
    if (pause) timer.innerHTML = "pause";
    else timer.innerHTML = tempo;

    let lifebarP1 = document.querySelector(".lb-player1");
    let lifebarP2 = document.querySelector(".lb-player2");

    lifebarP1.children[0].style.width = p1.vida + "%";
    lifebarP2.children[0].style.width = p2.vida + "%";

    if (p1.vida < 100) lifebarP1.children[0].className = "sangue-bar e dano";
    if (p2.vida < 100) lifebarP2.children[0].className = "sangue-bar d dano";

    if (debug) {
        let debugText = `
            <b>Debug: </b>${debug}<br>
            <b>Pausado: </b>${pause}<br>
            <b>Tempo: </b>${tempo}<br>
            <b>Game Over: </b>${gameover}<br>
            <b>Gravidade: </b>${gravidade} f<br>
            ------------------------------<br>
            <b>Player 1</b> vida:${p1.vida} <br>
            posição: <b>x:</b> ${parseInt(p1.posicao.x)} | <b>y:</b> ${parseInt(p1.posicao.y)} <br>
            Atacando: ${p1.atacando}<br>
            Ataque Selecionado: ${p1.ataqueSelecionado} <br>
            ------------------------------<br>
            <b>Player 2</b> vida:${p2.vida} <br>
            posição: <b>x:</b> ${parseInt(p2.posicao.x)} | <b>y:</b> ${parseInt(p2.posicao.y)} <br>
            Atacando: ${p2.atacando}<br>
            Ataque Selecionado: ${p2.ataqueSelecionado} <br>
            ------------------------------<br>
            TECLA PRESSIONADA: [ ${tecla_pressionada} ]
        `;
        document.querySelector(".debug").innerHTML = debugText;
    } else {
        document.querySelector(".debug").innerHTML = "";
    }
}

function GameOver(tipo) {
    gameover = true;
    let venceu = "";
    if (p1.vida > p2.vida) venceu = "Vitória do jogador 1";
    else if (p2.vida > p1.vida) venceu = "Vitória do jogador 2";
    else venceu = "Empate";

    let GameOverMsg = document.createElement("div");
    GameOverMsg.className = "game-over-msg";
    GameOverMsg.innerHTML = `
        <h2>${tipo}</h2>
        <h4>${venceu}</h4>
        <button onclick="window.location.reload()" class="btn-reset">Revanche</button>
    `;
    document.querySelector("body").appendChild(GameOverMsg);
}

Jogo.Atualizar = () => {
    if(Jogo.ativo){
        Jogo.p1.debug = Jogo.p2.debug = debug;
        if (!gameover && !pause) {
            Jogo.p1.velocidade.x = 0;
            Jogo.p2.velocidade.x = 0;
            Jogo.p1.andando = false;
            Jogo.p2.andando = false;

            if (Teclas.a.presionado) {
                Jogo.p1.velocidade.x = -5;
                Jogo.p1.andando = true;
            } else if (Teclas.d.presionado) {
                Jogo.p1.velocidade.x = 5;
                Jogo.p1.andando = true;
            }

            if (Teclas.ArrowLeft.presionado) {
                Jogo.p2.velocidade.x = -5;
                Jogo.p2.andando = true;
            } else if (Teclas.ArrowRight.presionado) {
                Jogo.p2.velocidade.x = 5;
                Jogo.p2.andando = true;
            }

            if (Jogo.p1.atacando && ColisaoAtaqueP1()) {
                Jogo.p2.vida -= 1;
            }
            if (Jogo.p2.atacando && ColisaoAtaqueP2()) {
                Jogo.p1.vida -= 1;
            }

            if (Vitoria()) GameOver("Fim de Jogo!");
        }
        ControleHUD();
    }
}

Jogo.Draw = (ctx, dimensao) => {
    if (!gameover && !pause) {
        ctx.fillStyle = "#6D5853";
        ctx.drawImage(bg1, 0, 0, 800, 432, 0, 0, dimensao.x, dimensao.y);
        ctx.fillRect(0, dimensao.y - 50, dimensao.x, 50);

        let quadro = { w: dimensao.x, h: dimensao.y - 45 };

        Jogo.p1.Atualizar(quadro, gravidade, ctx);
        Jogo.p2.Atualizar(quadro, gravidade, ctx);
    }
}

Jogo.teclasDown = {
    a: () => {
        if (!gameover && !pause) {
            Teclas.a.presionado = true;
        }
    },
    d: () => {
        if (!gameover && !pause) {
            Teclas.d.presionado = true;
        };
    },
    w: () => {
        if (!gameover && !pause && p1.EstaNoChao) {
            p1.velocidade.y = -8;
        }
    },
    e: () => {
        if(!pause){
            p1.ataqueSelecionado = 0;
            p1.atacando = true;
        }
    },
    q: () => {
        if(!pause){
            p1.ataqueSelecionado = 1;
            p1.atacando = true;
        }
    },
    ArrowLeft: () => {
        if (!gameover && !pause) {
            Teclas.ArrowLeft.presionado = true;
        }
    },
    ArrowRight: () => {
        if (!gameover && !pause) {
            Teclas.ArrowRight.presionado = true;
        };
    },
    ArrowUp: () => {
        if (!gameover && !pause && p2.EstaNoChao) {
            p2.velocidade.y = -8;
        }
    },
    0: () => {
        if(!pause){
            p2.ataqueSelecionado = 0;
            p2.atacando = true;
        }
    },
    1: () => {
        if(!pause){
            p2.ataqueSelecionado = 1;
            p2.atacando = true;
        }
    },
}

Jogo.teclasUp = {
    a: () => {
        Teclas.a.presionado = false;
    },
    d: () => {
        Teclas.d.presionado = false;
    },
    w: () => {
        p1.EstaNoChao = false;
    },
    e: () => {
        p1.atacando = false;
    },
    q: () => {
        p1.atacando = false;
    },
    ArrowLeft: () => {
        Teclas.ArrowLeft.presionado = false;
    },
    ArrowRight: () => {
        Teclas.ArrowRight.presionado = false;
    },
    ArrowUp: () => {
        p2.EstaNoChao = false;
    },
    0: () => {
        p2.atacando = false;
    },
    1: () => {
        p2.atacando = false;
    },
}


export default Jogo;