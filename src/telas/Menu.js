import Tela from '../modelos/Tela.js';

const Menu = new Tela({
    nome: 'Menu',
    ativa: true,
});

Menu.elementos = {
    cont: 0,
    ativar: true,
    bg: new Image(),
};

Menu.elementos.bg.src = '../src/assets/backgrounds/arte.jpg';

Menu.teclas = {
    'Enter': () => {
        Menu.game.TrocarTela('Jogo');
    }
}

Menu.Atualizar = (ctx, w, h) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    ctx.drawImage(Menu.elementos.bg, 0, 0, w, h);

    if (Menu.game.frames % 5 == 0) {
        if (Menu.elementos.cont < 10) {
            Menu.elementos.cont++;
        } else {
            Menu.elementos.cont = 0;
            Menu.elementos.ativar = !Menu.elementos.ativar;
        }
    }
    ctx.fillStyle = "white";
    ctx.font = '25px Arial';
    if (Menu.elementos.ativar) ctx.fillText("Aperte enter para começar", w / 5 - 110, h / 3);
}


export default Menu;