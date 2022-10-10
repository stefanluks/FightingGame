export class Player {

    constructor({ sprite, posicao, velocidade, dimensao, cor = "red", player2 = false, animacao, animacaoPulo }) {
        this.debug = false;
        this.sprite = sprite;
        this.posicao = posicao;
        this.velocidade = velocidade;
        this.dimensao = dimensao;
        this.cor = cor;
        this.player2 = player2;
        this.vida = 100;
        this.frames = 0;
        this.andando = false;
        this.EstaNoChao = false;
        this.atacando = false;
        this.ataqueSelecionado = 0;
        this.Ataques = [{
                cor: "gray",
                posicao: {
                    x: this.posicao.x,
                    y: this.posicao.y - 100
                },
                caixa: {
                    w: 60,
                    h: 50
                }
            },
            {
                cor: "white",
                posicao: {
                    x: this.posicao.x,
                    y: this.posicao.y
                },
                caixa: {
                    w: 100,
                    h: 100
                }
            },
        ]
        this.animSet = 0;
        this.anima = animacao;
        this.animaJump = animacaoPulo;
    }

    Atualizar(quadro, gravidade, ctx) {
        this.frames++;
        this.Desenhar(ctx);

        this.posicao.x += this.velocidade.x;
        this.posicao.y += this.velocidade.y;

        this.Ataques.forEach(ataque => {
            if (this.player2) {
                ataque.posicao.x = this.posicao.x - 10 - this.dimensao.w / 2;
            } else {
                ataque.posicao.x = this.posicao.x + this.dimensao.w;
            }
            ataque.posicao.y = this.posicao.y + 50;
        });

        if (this.posicao.y + this.dimensao.h <= quadro.h) {
            this.velocidade.y += gravidade;
        } else {
            this.velocidade.y = 0;
            this.EstaNoChao = true;
        }
    }

    Desenhar(ctx) {
        if (this.debug) {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.posicao.x, this.posicao.y, this.dimensao.w, this.dimensao.h);
        }
        if (true) {
            if (this.sprite) {
                if (this.atacando) {

                    let ataque = this.Ataques[this.ataqueSelecionado];

                    if (this.debug) {
                        ctx.fillStyle = ataque.cor;
                        ctx.fillRect(
                            ataque.posicao.x,
                            ataque.posicao.y,
                            ataque.caixa.w,
                            ataque.caixa.h
                        )
                    }

                    if (this.player2) {
                        if (this.ataqueSelecionado == 0) {
                            ctx.drawImage(this.sprite, 833, 500, 100, 120, this.posicao.x - 105, this.posicao.y, 200, 240);
                        }
                        if (this.ataqueSelecionado == 1) {
                            ctx.drawImage(this.sprite, 515, 500, 100, 120, this.posicao.x - 105, this.posicao.y, 200, 240);
                        }
                    } else {
                        if (this.ataqueSelecionado == 0) {
                            ctx.drawImage(this.sprite, 0, 500, 100, 120, this.posicao.x + 5, this.posicao.y, 200, 240);
                        }
                        if (this.ataqueSelecionado == 1) {
                            ctx.drawImage(this.sprite, 300, 500, 100, 120, this.posicao.x + 5, this.posicao.y, 200, 240);
                        }
                    }
                } else {
                    if (this.andando) {
                        if (this.player2) {
                            ctx.drawImage(this.sprite, 0, 130, 100, 120, this.posicao.x - 105, this.posicao.y, 200, 240);
                        } else {
                            if (this.frames % 5 == 0) {
                                if (this.animSet < this.anima.length - 1) this.animSet++;
                                else this.animSet = 0;
                            }
                            ctx.drawImage(this.sprite, this.anima[this.animSet].x, this.anima[this.animSet].y, 105, 120, this.posicao.x + 5, this.posicao.y, 200, 240);
                        }
                    } else {
                        if (this.player2) {
                            ctx.drawImage(this.sprite, 833, 0, 100, 130, this.posicao.x - 105, this.posicao.y, 200, 240);
                        } else {
                            ctx.drawImage(this.sprite, 0, 0, 100, 130, this.posicao.x + 5, this.posicao.y, 200, 240);
                        }
                    }
                }
            }
        }
    }
}

export const Teclas = {
    a: {
        presionado: false
    },
    d: {
        presionado: false
    },
    w: {
        presionado: false
    },
    ArrowLeft: {
        presionado: false
    },
    ArrowRight: {
        presionado: false
    },
    ArrowUp: {
        presionado: false
    },
    0: {
        presionado: false
    },
    1: {
        presionado: false
    }
}