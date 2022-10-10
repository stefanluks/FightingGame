import { Player, Teclas } from './Player.js';

window.onload = () => {
    const btnJogar = document.querySelector(".btn");
    const canvas = document.getElementById("jogo");
    const ctx = canvas.getContext("2d");
    
    let gameover = false;
    let pause = true;
    let debug = false;
    let tecla_pressionada = "";

    btnJogar.addEventListener("click", ()=>{
        document.querySelector(".life-bars").style.top = "0px";
        pause = false;
        document.querySelector(".btn-jogar").remove();
    });
    
    let tempo = 99;
    let timedow = setInterval(()=>{
        if(!gameover){
            if(!pause) tempo--;
            if(tempo === 0){
                GameOver("Fim de Tempo");
                clearInterval(timedow);
            }
        }else{
            clearInterval(timedow);
        }
    },1000);

    canvas.width = 1280;
    canvas.height = 590;

    let bg1 = new Image();
    bg1.src = "./componentes/backgrounds/bg3.jpg";

    const gravidade = 0.2;
    const spriteP1 = new Image();
    spriteP1.src = "./componentes/sprites/kungfuman.png";
    const p1 = new Player({
        sprite: spriteP1,
        posicao:{
            x: 200,
            y: 80
        },
        velocidade:{ 
            x:0,
            y:0
        },
        dimensao:{
            w: 100,
            h: 230
        },
        cor:"green"
    });

    const spriteP2 = new Image();
    spriteP2.src = "./componentes/sprites/kungfuman2.png";
    const p2 = new Player({
        sprite: spriteP2,
        posicao:{
            x: 1000,
            y: 80
        },
        velocidade:{ 
            x:0,
            y:0
        },
        dimensao:{
            w: 100,
            h: 230
        },
        cor:"blue",
        player2: true
    });

    function ColisaoAtaqueP1(){
        let ataque = p1.Ataques[p1.ataqueSelecionado];
        return (
            ataque.posicao.x + ataque.caixa.w >= p2.posicao.x &&
            ataque.posicao.x <= p2.posicao.x + p2.dimensao.w &&
            ataque.posicao.y + ataque.caixa.h >= p2.posicao.y &&
            ataque.posicao.y <= p2.posicao.y + p2.dimensao.h
        )
    }

    function ColisaoAtaqueP2(){
        let ataque = p2.Ataques[p2.ataqueSelecionado];
        return (
            ataque.posicao.x + ataque.caixa.w >= p1.posicao.x &&
            ataque.posicao.x <= p1.posicao.x + p1.dimensao.w &&
            ataque.posicao.y + ataque.caixa.h >= p1.posicao.y &&
            ataque.posicao.y <= p1.posicao.y + p1.dimensao.h
        )
    }

    function Vitoria(){
        return p1.vida <= 0 || p2.vida <= 0;
    }

    function animacao(){
        p1.debug = p2.debug = debug;
        window.requestAnimationFrame(animacao);
        if(!gameover && !pause){
            ctx.fillStyle = "#6D5853";
            ctx.drawImage(bg1, 0, 0, 800, 432, 0, 0, canvas.width, canvas.height);
            ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

            let quadro = {w: canvas.width, h: canvas.height - 45};
            
            p1.Atualizar(quadro, gravidade, ctx);
            p2.Atualizar(quadro, gravidade, ctx);

            p1.velocidade.x = 0;
            p2.velocidade.x = 0;
            p1.andando = false;
            p2.andando = false;
            
            if(Teclas.a.presionado){
                p1.velocidade.x = -5;
                p1.andando = true;
            }else if(Teclas.d.presionado){
                p1.velocidade.x = 5;
                p1.andando = true;
            }
            
            if(Teclas.ArrowLeft.presionado){
                p2.velocidade.x = -5;
                p2.andando = true;
            }else if(Teclas.ArrowRight.presionado){
                p2.velocidade.x = 5;
                p2.andando = true;
            }

            if(p1.atacando && ColisaoAtaqueP1()){
                p2.vida -= 1;
            }
            if(p2.atacando && ColisaoAtaqueP2()){
                p1.vida -= 1;
            }

            if(Vitoria()) GameOver("Fim de Jogo!");
        }
        ControleHUD();
    }

    function ControleHUD(){
        let timer = document.querySelector(".timer");
        if(pause) timer.innerHTML = "pause";
        else timer.innerHTML = tempo;
        
        let lifebarP1 = document.querySelector(".lb-player1");
        let lifebarP2 = document.querySelector(".lb-player2");

        lifebarP1.children[0].style.width = p1.vida + "%";
        lifebarP2.children[0].style.width = p2.vida + "%";

        if(p1.vida < 100) lifebarP1.children[0].className = "sangue-bar e dano";
        if(p2.vida < 100) lifebarP2.children[0].className = "sangue-bar d dano";

        if(debug){
            let debugText = `
                <b>Debug: </b>${debug}<br>
                <b>Pausado: </b>${pause}<br>
                <b>Tempo: </b>${tempo}<br>
                <b>Game Over: </b>${gameover}<br>
                <b>Gravidade: </b>${gravidade} f<br>
                ------------------------------<br>
                <b>Player 1</b> vida:${p1.vida} <br>
                posição: <b>x:</b> ${parseInt(p1.posicao.x)} | <b>y:</b> ${parseInt(p1.posicao.y)} <br>
                Atacando: ${p1.atacando}<br>
                Ataque Selecionado: ${p1.ataqueSelecionado} <br>
                ------------------------------<br>
                <b>Player 2</b> vida:${p2.vida} <br>
                posição: <b>x:</b> ${parseInt(p2.posicao.x)} | <b>y:</b> ${parseInt(p2.posicao.y)} <br>
                Atacando: ${p2.atacando}<br>
                Ataque Selecionado: ${p2.ataqueSelecionado} <br>
                ------------------------------<br>
                TECLA PRESSIONADA: [ ${tecla_pressionada} ]
            `;
            document.querySelector(".debug").innerHTML = debugText;
        }else{
            document.querySelector(".debug").innerHTML="";
        }
    }

    function GameOver(tipo){
        gameover = true;
        let venceu = "";
        if(p1.vida > p2.vida) venceu = "Vitória do jogador 1";
        else if(p2.vida > p1.vida) venceu = "Vitória do jogador 2";
        else venceu = "Empate";

        let GameOverMsg = document.createElement("div");
        GameOverMsg.className = "game-over-msg";
        GameOverMsg.innerHTML = `
            <h2>${tipo}</h2>
            <h4>${venceu}</h4>
            <a href="/stefanluks/FightingGame" class="btn-reset">Revanche</a>
        `;
        document.querySelector("body").appendChild(GameOverMsg);
    }

    animacao();

    window.addEventListener("keydown", (event) =>{
        tecla_pressionada= event.key;
        if(!gameover){
            switch (event.key) {
                case 'a':
                    if(!pause) Teclas.a.presionado = true;
                    break;
                case 'd':
                    if(!pause) Teclas.d.presionado = true;
                    break;
                case 'w':
                    if(!pause && p1.EstaNoChao) p1.velocidade.y = -8;
                    break;
                case 'e':
                    if(!pause){
                        p1.ataqueSelecionado = 0;
                        p1.atacando = true;
                    }
                    break;
                case 'q':
                    if(!pause){
                        p1.ataqueSelecionado = 1;
                        p1.atacando = true;
                    }
                    break;
                case 'ArrowLeft':
                    if(!pause) Teclas.ArrowLeft.presionado = true;
                    break;
                case 'ArrowRight':
                    if(!pause) Teclas.ArrowRight.presionado = true;
                    break;
                case 'ArrowUp':
                    if(p2.EstaNoChao) p2.velocidade.y = -8;
                    break;
                case '0':
                    if(!pause){
                        p2.ataqueSelecionado = 0;
                        p2.atacando = true;
                    }
                    break;
                case '1':
                    if(!pause){
                        p2.ataqueSelecionado = 1;
                        p2.atacando = true;
                    }
                    break;
                case 'p':
                    pause = !pause;
                    break;
                case 'o':
                    debug = !debug;
                    break;
            }
        }
    });

    window.addEventListener("keyup", (event) =>{
        if(!gameover && !pause){
            switch (event.key) {
                case 'a':
                    Teclas.a.presionado = false;
                    break;
                case 'd':
                    Teclas.d.presionado = false;
                    break;
                case 'w':
                    p1.EstaNoChao = false;
                    break;
                case 'e':
                    p1.atacando = false;
                    break;
                case 'q':
                    p1.atacando = false;
                    break;
                case 'ArrowLeft':
                    Teclas.ArrowLeft.presionado = false;
                    break;
                case 'ArrowRight':
                    Teclas.ArrowRight.presionado = false;
                    break;
                case 'ArrowUp':
                    p2.EstaNoChao = false;
                    break;
                case '0':
                    p2.atacando = false;
                    break;
                case '1':
                    p2.atacando = false;
                    break;
            }
        }
    });
}