export default class Game {
    constructor({ nome, canvas = { width: 800, height: 600, context: null }, telas = [] }) {
        this.nome = nome;
        this.canvas = canvas;
        this.telas = telas;
        this.frames = 0;
        if (telas.length > 0) {
            this.telaAtiva = telas.find(tela => tela.ativa);
            this.telas.forEach(tela => {
                tela.game = this;
            });
        }
    }

    Atualizar() {
        this.frames++;
        this.telas.forEach(tela => {
            if (tela.ativa) tela.Atualizar(this.canvas.context, this.canvas.width, this.canvas.height);
        });
        requestAnimationFrame(this.Atualizar.bind(this));
    }

    TrocarTela(nome) {
        if (this.telaAtiva.nome != nome) {
            this.telaAtiva.Desativar();
            this.telaAtiva = this.telas.find(tela => tela.nome == nome);
            this.telaAtiva.Ativar();
        }
    }

    TeclaPressionada(tecla) {
        this.telaAtiva.TeclasPressionada(tecla);
    }

    TeclaSolta(tecla) {
        this.telaAtiva.TeclasSolta(tecla);
    }
}