import Game from '../componentes/Game.js';
import Menu from '../telas/Menu.js';
import SelectPlayer from '../telas/SelectPlayer.js';
import Jogo from '../telas/Jogo.js';

window.onload = () => {
    const canvas = document.getElementById('jogo');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const game = new Game({
        nome: "SL ENGINE",
        dimensao: { x: canvas.width, y: canvas.height },
    });

    window.addEventListener('keydown', (e) => {
        game.teclasPressionada(e.key);
    });

    window.addEventListener('keyup', (e) => {
        game.teclasSolta(e.key);
    });

    game.AdicionarTela(Menu);
    game.AdicionarTela(SelectPlayer);
    game.AdicionarTela(Jogo);

    Loop();

    function Loop() {
        game.Atualizar();
        game.Desenhar(ctx);
        requestAnimationFrame(Loop);
    }
}