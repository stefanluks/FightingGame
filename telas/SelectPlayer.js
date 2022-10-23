import Tela from "../componentes/Tela.js";
import personagens from "./Personagens.js";

const SelectPlayer = new Tela("SelectPlayer", false);

let frame = 0;

let iconeP1 = new Image();
let iconeP2 = new Image();

const moveSeletorSom = SelectPlayer.novoAudio("../assets/sounds/moveSeletor.wav");
const SelectSom = SelectPlayer.novoAudio("../assets/sounds/selectMenu.mp3");

let P1selecionado = 0;
let P2selecionado = 0;

let selectP1Img = new Image();
selectP1Img.src = "../assets/sprites/selectP1.png";

let seletorP1 = {
    cont: 0,
    x: 0,
    y: 305,
    selecionado: false,
    img: selectP1Img
}

let selectP2img = new Image();
selectP2img.src = "../assets/sprites/selectP2.png";

let seletorP2 = {
    cont: 1,
    x: 1,
    y: 305,
    selecionado: false,
    img: selectP2img
}

let vs = new Image();
vs.src = "../assets/sprites/vs.png";


SelectPlayer.Atualizar = () => {
    frame++;
}

SelectPlayer.Draw = (ctx, dimensao) => {
    // Desenha o background
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, dimensao.x, dimensao.y);

    let caixaSelecao = {
        x: dimensao.x / 5,
        y: 300,
        w: personagens.length / 2 * 105,
        h: dimensao.y - 410,
    }

    ctx.fillStyle = "black";
    ctx.fillRect(caixaSelecao.x, caixaSelecao.y, caixaSelecao.w, caixaSelecao.h);

    //icone player 1
    ctx.fillStyle = "blue";
    ctx.fillRect(60, 30, dimensao.x / 2 - 250, dimensao.y / 2 - 75);
    iconeP1.src = personagens[seletorP1.x].sprite;
    ctx.drawImage(iconeP1, 60, 30, dimensao.x / 2 - 250, dimensao.y / 2 - 75);

    //icone player 2
    ctx.fillStyle = "red";
    ctx.fillRect(dimensao.x - (dimensao.x / 2 - 250) - 60, 30, dimensao.x / 2 - 250, dimensao.y / 2 - 75);
    iconeP2.src = personagens[seletorP2.x].sprite;
    ctx.drawImage(iconeP2, dimensao.x - (dimensao.x / 2 - 250) - 60, 30, dimensao.x / 2 - 250, dimensao.y / 2 - 75);

    // desenha os personagens
    ctx.fillStyle = "white";
    let x = 105;
    let y = 305;
    let cont = 0;
    personagens.forEach((personagem, index) => {
        if (index > 7) {
            y = 410;
            if (index == 8) cont = 0;
        }
        ctx.fillRect(140 + (cont * x) + 5, y, 100, 100);
        let img = new Image();
        img.src = personagem.icon;
        ctx.drawImage(img, 140 + (cont * x) + 5, y, 100, 100);
        cont++;
    });

    //seletores
    if (seletorP1.x >= 8) {
        seletorP1.y = 410;
        seletorP1.cont = seletorP1.x - 8;
    } else {
        seletorP1.y = 305;
        seletorP1.cont = seletorP1.x;
    }
    if (seletorP2.x >= 8) {
        seletorP2.y = 410;
        seletorP2.cont = seletorP2.x - 8;
    } else {
        seletorP2.y = 305;
        seletorP2.cont = seletorP2.x;
    }
    ctx.drawImage(seletorP1.img, 140 + (seletorP1.cont * x) + 5, seletorP1.y, 100, 100);
    ctx.drawImage(seletorP2.img, 140 + (seletorP2.cont * x) + 5, seletorP2.y, 100, 100);
    if(seletorP1.selecionado){
        ctx.font = "30px Arial bold"
        ctx.fillStyle = "blue";
        ctx.fillText("OK",  140 + (seletorP1.cont * x) + 25, seletorP1.y + 50)
    }
    if(seletorP2.selecionado){
        ctx.font = "30px Arial bold"
        ctx.fillStyle = "red";
        ctx.fillText("OK",  140 + (seletorP2.cont * x) + 25, seletorP2.y + 50)
    }

    // Desenha o VS
    ctx.drawImage(vs, dimensao.x / 2 - 125, 15, 250, 250);
}

SelectPlayer.teclasDown = {
    a: () => {
        if(seletorP1.selecionado === false){
            if (seletorP1.x > 0) seletorP1.x--;
            SelectPlayer.audios[moveSeletorSom].play();
        }
    },
    d: () => {
        if(seletorP1.selecionado === false){
            if (seletorP1.x < personagens.length - 1) seletorP1.x++;
            SelectPlayer.audios[moveSeletorSom].play();
        }
    },
    w: () => {
        if(seletorP1.selecionado === false){
            if (seletorP1.x > 7) seletorP1.x -= 8;
            SelectPlayer.audios[moveSeletorSom].play();
        }
    },
    s: () => {
        if(seletorP1.selecionado === false){
            if (seletorP1.x < personagens.length - 8) seletorP1.x += 8;
            SelectPlayer.audios[moveSeletorSom].play();
        }
    },
    e: () => {
        if(personagens[seletorP1.x].ativo){
            seletorP1.selecionado = !seletorP1.selecionado;
            P1selecionado = seletorP1.x;
            SelectPlayer.audios[SelectSom].play();
        }else{
            SelectPlayer.audios[SelectSom].play();
        }
    },
    ArrowLeft: () => {
        if(seletorP2.selecionado === false){
            if (seletorP2.x > 0) seletorP2.x--;
        }
    },
    ArrowRight: () => {
        if(seletorP2.selecionado === false){
            if (seletorP2.x < personagens.length - 1) seletorP2.x++;
        }
    },
    ArrowUp: () => {
        if(seletorP2.selecionado === false){
            if (seletorP2.x > 7) seletorP2.x -= 8;
        }
    },
    ArrowDown: () => {
        if(seletorP2.selecionado === false){
            if (seletorP2.x < personagens.length - 8) seletorP2.x += 8;
        }
    },
    0: () => {
        if(personagens[seletorP2.x].ativo){
            seletorP2.selecionado = !seletorP2.selecionado;
            P2selecionado = seletorP2.x;
            SelectPlayer.audios[SelectSom].play();
        }else{
            SelectPlayer.audios[SelectSom].play();
        }
    },
}

SelectPlayer.teclasUp = {
    Enter: () => {
        if(seletorP1.selecionado && seletorP2.selecionado){
            let game = SelectPlayer.getGame();
            let jogo = game.telas[game.telas.indexOf(SelectPlayer)+1];
            jogo.p1 = personagens[P1selecionado].inGame;
            jogo.p2 = personagens[P2selecionado].inGame;
            SelectPlayer.ativo = false;
            game.proxTela();
        }
    }
}


export default SelectPlayer;