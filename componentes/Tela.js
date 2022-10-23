export default class Tela {
    constructor(nome, ativo) {
        this.nome = nome;
        this.ativo = ativo;
        this.teclasDown = {};
        this.teclasUp = {};
        this.game = null;
        this.audios = [];
    }

    getGame(){
        return this.game;
    }

    Atualizar(dimensao) {
        console.log("Atualizando tela " + this.nome);
    }

    novoAudio(url){
        let audio = new Audio();
        audio.src = url;
        this.audios.push(audio);
        return this.audios.indexOf(audio);
    }

    teclaPressionada(tecla) {
        console.log(tecla)
        let btn = this.teclasDown[tecla];
        if (btn) btn();
    }

    teclaSolta(tecla) {
        let btn = this.teclasUp[tecla];
        if (btn) btn();
    }

    Draw(ctx, dimensao) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, dimensao.x, dimensao.y);
        ctx.fillStyle = 'white';
        ctx.font = '70px Arial';
        ctx.fillText(this.nome, dimensao.x / 2 - 70, dimensao.y / 2);
    }
}