import Game from '../modelos/Game.js';
import telas from './telas.js';

const canvas = document.getElementById('application');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 10;

const Engine = new Game({
    nome: 'SL engine',
    canvas: {
        width: canvas.width,
        height: canvas.height,
        context: ctx
    },
    telas: telas,
});

window.addEventListener("resize", AjustarTela);

function AjustarTela() {
    const canvas = document.getElementById('application');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 10;

    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export default Engine;