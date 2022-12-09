import Tela from "/componentes/Tela.js";

const Menu = new Tela("Menu", true);

let frame = 0;
let show = true;

let bg = new Image();
bg.src = "/assets/sprites/arte.jpg";


Menu.teclasDown = {
    Enter: () => {
        Menu.game.proxTela();
        Menu.ativo = false;
    }
}

Menu.Atualizar = () => {
    frame++;
    if (frame % 50 == 0) {
        show = !show;
    }
}

Menu.Draw = (ctx, dimensao) => {
    // Desenha o menu
    ctx.drawImage(bg, 0, 0, dimensao.x, dimensao.y);
    if (show) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Aperte enter para jogar", dimensao.x / 7, dimensao.y / 3);
    }
}

export default Menu;