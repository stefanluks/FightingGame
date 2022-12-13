import Engine from './src/config/jogo.js';

window.onload = () => {
    window.addEventListener("resize", AjustarTela);
    window.addEventListener("keydown", e => {
        Engine.TeclaPressionada(e.key);
    })
    window.addEventListener("keyup", e => {
        Engine.TeclaSolta(e.key);
    })

    function AjustarTela() {
        Engine.canvas = {
            width: window.innerWidth - 20,
            height: window.innerHeight - 10,
            context: Engine.canvas.context
        }
    }

    Engine.Atualizar();
}