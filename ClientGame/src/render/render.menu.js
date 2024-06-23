import { scenesInstance } from "../../renderer.js";

export function createMenu() {
  const menuContainer = document.createElement("div");
  menuContainer.id = "menu";
  menuContainer.className = "main-menu";
  menuContainer.style.color = "#fff";
  menuContainer.style.position = "absolute";

  const menuInner = document.createElement("div");
  menuInner.style.border = "4px solid white";
  menuInner.style.borderRadius = "9px";
  menuInner.style.padding = "9px";
  menuInner.style.marginRight = "9px";

  const btnIniciar = document.createElement("input");
  btnIniciar.id = "btnIniciar";
  btnIniciar.className = "btn-iniciar";
  btnIniciar.type = "button";
  btnIniciar.value = "INICIAR JOGO";
  btnIniciar.addEventListener("click", () => scenesInstance.scenes("game"));

  const btnOpcoes = document.createElement("input");
  btnOpcoes.className = "btn-iniciar";
  btnOpcoes.type = "button";
  btnOpcoes.value = "OPÇÕES";

  const btnSair = document.createElement("input");
  btnSair.className = "btn-iniciar";
  btnSair.type = "button";
  btnSair.value = "SAIR";

  menuInner.appendChild(btnIniciar);
  menuInner.appendChild(btnOpcoes);
  menuInner.appendChild(btnSair);

  menuContainer.appendChild(menuInner);
  return menuContainer;
}
