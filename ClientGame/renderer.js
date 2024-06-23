import "./node_modules/babylonjs/babylon.max.js";
import "./node_modules/babylonjs-gui/babylon.gui.js";
import { SocketClient } from "./src/app.net.js";
import { createModal } from "./src/render/render.modal.js";
import { createMenu } from "./src/render/render.menu.js";
import { createCanvas } from "./src/render/render.canvas.js";
import { scene00 } from "./src/scenes/scene00.js";

//Classe de cenas
export class Scenes {
  constructor() {
    this.bodyElement = document.getElementById("body");
    this.dsm = null;
    this.engine = null;
    this.canvasElement = null;
    this.menuGame = null;
    this.modalAlert = null;
    this.client = null;
    this.clients = null;
    this.mySocketClient = null;
    document.title = "Game Client";
  }

  scenes(scene) {
    switch (scene) {
      case "menu":
        this.showMenu();
        break;
      case "game":
        this.startGame();
        break;
      case "disconnect":
        this.disconnect();
        break;
      default:
        console.error("Invalid scene:", scene);
    }
  }

  showMenu() {
    if (!this.menuGame) {
      this.menuGame = createMenu();
      this.bodyElement.appendChild(this.menuGame);
    }
  }

  startGame() {
    this.mySocketClient = new SocketClient();
    this.mySocketClient.isConnected().then((connected) => {
      if (connected) {
        this.existCanvas();
        this.engine = new BABYLON.Engine(this.canvasGames, true);
        this.dsm = new BABYLON.DeviceSourceManager(this.engine);
        this.renderGame();
      }
    });
  }

  renderGame() {
    var S00 = new scene00(this.engine, this.mySocketClient);
    var switchScene = 0;
    this.engine.runRenderLoop(() => {
      switch (switchScene) {
        case 0:
          S00.scene.render();
          break;
      }
    });
  }

  disconnect() {
    console.log("Disconnecting...");
    document.title = "Game Client";
    this.removeCanvas();
    this.showMenu();
    this.alertConnection();
  }

  alertConnection() {
    if (!this.modalAlert) {
      this.modalAlert = createModal("modalAlert", "Conexão falhou com o servidor, tente mais tarde.");
      this.bodyElement.appendChild(this.modalAlert);
      const btnIniciar = document.getElementById("btnIniciar");
      btnIniciar.disabled = true;
      setTimeout(() => {
        this.removeModalAlert();
        btnIniciar.disabled = false;
      }, 5000);
    }
  }

  existCanvas() {
    if (!this.canvasGames) {
      this.removeMenu();
      this.canvasGames = createCanvas();
      this.bodyElement.appendChild(this.canvasGames);
    }
  }

  removeModalAlert() {
    this.modalAlert.remove();
    this.modalAlert = null;
  }

  removeMenu() {
    if (this.menuGame) {
      this.menuGame.remove();
      this.menuGame = null;
    }
  }

  removeCanvas() {
    if (this.canvasGames) {
      this.canvasGames.remove();
      this.canvasGames = null;
    }
  }
}

export const scenesInstance = new Scenes();
scenesInstance.scenes("menu");
