import { Player } from "../componentes/Player.js";

const spriteP1 = new Image();
spriteP1.src = "../assets/sprites/kungfuman.png";

const spriteP2 = new Image();
spriteP2.src = "../assets/sprites/kungfuman2.png";

const personagens = [{
    nome: "Kung Fu Man Blue",
    icon: "../assets/sprites/blueKungfumanIcon.png",
    sprite: "../assets/sprites/blueKungfumanIcone.png",
    ativo: true,
    inGame: new Player({
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
    })
},
{
    nome: "Kung Fu Man Red",
    icon: "../assets/sprites/redKungfumanIcon.png",
    sprite: "../assets/sprites/redKungfumanIcone.png",
    ativo: true,
    inGame: new Player({
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
    })
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
];

export default personagens;