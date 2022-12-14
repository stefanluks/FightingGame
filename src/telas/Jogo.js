import Tela from '../modelos/Tela.js';

const Jogo = new Tela({
    nome: 'Jogo',
    ativa: false,
});

Jogo.teclas = {
    'Escape': () => {
        Jogo.game.TrocarTela('Menu');
    }
}

const gravidade = 2;

let Player1 = {
    x: 0,
    y: 150,
    w: 50,
    h: 50,
    cor: 'blue',
    vida: 100,

    Atualizar(ctx, w, h) {
        if (this.x == 0) this.x = w / 6 - this.w / 2;
        if (this.y < h - 50 - this.h) this.y += gravidade;
        this.desenhar(ctx);
    },

    desenhar(ctx) {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

let Player2 = {
    x: 0,
    y: 150,
    w: 50,
    h: 50,
    cor: 'red',
    vida: 100,

    Atualizar(ctx, w, h) {
        if (this.x == 0) this.x = w - (w / 6) - this.w / 2;
        if (this.y < h - 50 - this.h) this.y += gravidade;
        this.desenhar(ctx);
    },

    desenhar(ctx) {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

Jogo.elementos = {
    barrasAtivadas: false,
    barras: `<div class="barras-de-vida"><div class="vida-p1"><div class="nome-p1">Player 01</div><div class="life"><div class="sangue"></div></div></div><img class="img-vs" src="./src/assets/sprites/vs.png" alt="" srcset=""><div class="vida-p2"><div class="nome-p2">Player 02</div><div class="life"><div class="sangue"></div></div></div></div>`,
    cenarios: [
        '../src/assets/backgrounds/bg1.png',
        '../src/assets/backgrounds/bg2.png',
        '../src/assets/backgrounds/bg3.jpg',
    ],
    bg: null,
}

Jogo.Atualizar = (ctx, w, h) => {
    if (Jogo.ativa && !Jogo.elementos.barrasAtivadas) {
        document.body.insertAdjacentHTML('beforeend', Jogo.elementos.barras);
        Jogo.elementos.barrasAtivadas = true;
        let indice = Math.floor(Math.random() * 3);
        let bg = Jogo.elementos.cenarios[indice];
        Jogo.elementos.bg = new Image();
        Jogo.elementos.bg.src = bg;
    }
    if (Jogo.elementos.bg) {
        ctx.drawImage(Jogo.elementos.bg, 0, 0, w, h);
    }
    // Chão
    ctx.fillStyle = 'brown';
    ctx.fillRect(0, h - 50, w, 50);

    //desenhar Player 01
    Player1.Atualizar(ctx, w, h);

    //desenhar Player 02
    Player2.Atualizar(ctx, w, h);
}

export default Jogo;