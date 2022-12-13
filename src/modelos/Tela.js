export default class Tela {
    constructor({ nome, ativa = false }) {
        this.nome = nome;
        this.ativa = ativa;
        this.game = null;
        this.teclas = {};
    }

    Atualizar(ctx, width, height) {
        console.log('Atualizando tela ' + this.nome);
    }

    Desativar() {
        this.ativa = false;
    }

    Ativar() {
        this.ativa = true;
    }

    TeclasPressionada(tecla) {
        console.log('Tecla ' + tecla + ' pressionada na tela ' + this.nome);
        let press = this.teclas[tecla];
        if (press) press();
    }

    TeclasSolta(tecla) {
        console.log('Tecla ' + tecla + ' solta na tela ' + this.nome);
        let press = this.teclas[tecla];
        if (press) press();
    }
}