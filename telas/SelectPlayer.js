import Tela from "../componentes/Tela.js";

const SelectPlayer = new Tela("SelectPlayer", true);

let frame = 0;

let iconeP1 = new Image();
let iconeP2 = new Image();

let selectP1Img = new Image();
selectP1Img.src = "../assets/sprites/selectP1.png";

let seletorP1 = {
    cont: 0,
    x: 0,
    y: 305,
    img: selectP1Img
}

let selectP2img = new Image();
selectP2img.src = "../assets/sprites/selectP2.png";

let seletorP2 = {
    cont: 1,
    x: 1,
    y: 305,
    img: selectP2img
}

let vs = new Image();
vs.src = "../assets/sprites/vs.png";

let personagens = [{
        nome: "Kung Fu Man Blue",
        icon: "../assets/sprites/blueKungfumanIcon.png",
        sprite: "../assets/sprites/blueKungfumanIcone.png",
        ativo: true,
    },
    {
        nome: "Kung Fu Man Red",
        icon: "../assets/sprites/redKungfumanIcon.png",
        sprite: "../assets/sprites/redKungfumanIcone.png",
        ativo: true,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    },
    {
        nome: "Vazio",
        icon: "../assets/sprites/vazio.png",
        sprite: "../assets/sprites/vazio.png",
        ativo: false,
    }
]

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

    // Desenha o VS
    ctx.drawImage(vs, dimensao.x / 2 - 125, 15, 250, 250);
}

SelectPlayer.teclasDown = {
    a: () => {
        if (seletorP1.x > 0) seletorP1.x--;
    },
    d: () => {
        if (seletorP1.x < personagens.length - 1) seletorP1.x++;
    },
    w: () => {
        if (seletorP1.x > 7) seletorP1.x -= 8;
    },
    s: () => {
        if (seletorP1.x < personagens.length - 8) seletorP1.x += 8;
    },
    ArrowLeft: () => {
        if (seletorP2.x > 0) seletorP2.x--;
    },
    ArrowRight: () => {
        if (seletorP2.x < personagens.length - 1) seletorP2.x++;
    },
    ArrowUp: () => {
        if (seletorP2.x > 7) seletorP2.x -= 8;
    },
    ArrowDown: () => {
        if (seletorP2.x < personagens.length - 8) seletorP2.x += 8;
    }
}


export default SelectPlayer;