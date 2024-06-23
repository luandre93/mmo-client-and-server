import { Environment } from "../environment.js";
import { createLoadingScreen } from "./sceneLoading.js";

export class scene00 {
  constructor(engine, socket) {
    this.socket = socket;
    this.engine = engine; // instancia da engine.
    this.player = null;
    this.camera = null;
    this.dsm = new BABYLON.DeviceSourceManager(this.engine);
    this.scene = new BABYLON.Scene(this.engine);
    this.zoom = 250;
    this.init();
  }

  async init() {
    this.createCameraAndLight();
    const clientCoordinates = await this.waitForClientCoordinates();
    this.player = this.renderMainPlayer(clientCoordinates.x, 20, clientCoordinates.y);
    this.createGround(this.scene, 1400, 1400); // Chão
    this.createGroundDown(this.scene, 1400); // abaixo do Chão
    this.renderPlayers();
    new Environment(this.scene, this.dsm, this.camera, this.player, this.socket, this.zoom);
  }

  waitForClientCoordinates() {
    return new Promise((resolve) => {
      const loadingScreen = createLoadingScreen(this.scene);
      const checkCoordinates = () => {
        if (this.socket.client.x && this.socket.client.y) {
          loadingScreen.dispose();
          resolve({ x: this.socket.client.x, y: this.socket.client.y });
        } else {
          setTimeout(checkCoordinates, 100);
        }
      };
      // Inicia a verificação inicial
      checkCoordinates();
    });
  }

  // Cria camera e luz.
  createCameraAndLight() {
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(15, 10, 10), this.scene);
    this.camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(7, Math.PI / 5, 5), this.scene);

    this.scene.onPointerObservable.add((eventData) => {
      // Verifica se o evento é de roda do mouse
      if (eventData.type === BABYLON.PointerEventTypes.POINTERWHEEL) {
        // Obtém os detalhes do evento
        const event = eventData.event;

        // Determina a direção do scroll e ajusta o zoom da câmera
        const delta = event.deltaY;

        if (delta > 0 || this.zoom < 190) {
          this.zoom = this.camera.radius += 20;
          this.camera.heightOffset = this.zoom + 10;
        } else {
          this.zoom = this.camera.radius -= 20;
          this.camera.heightOffset = this.zoom - 10;
        }
      }
    });
  }
  // Definições das mesh e objetos do mapa.
  createGround(scene, w, h) {
    const textureResolution = 512;
    const m = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
    const ground = BABYLON.MeshBuilder.CreateGround("Mesh_Ground", { width: w, height: h }, scene);
    const textureGround = new BABYLON.DynamicTexture("dynamic texture", textureResolution, scene);
    const textureContext = textureGround.getContext();
    const materialGround = new BABYLON.StandardMaterial("Mat", scene);
    materialGround.diffuseTexture = textureGround;
    ground.material = materialGround;
    var texture = new Image();
    texture.src = "./src/scenes/texture/texture01.png";
    texture.onload = function () {
      for (let c = 0; c <= m.length; c++) {
        for (let i = 0; i <= w; i++) {
          textureContext.drawImage(this, i * 50, m[c], 50, 50);
          textureContext.drawImage(this, m[c], i * 50, 50, 50);
        }
      }
      textureGround.update();
    };
  }

  createGroundDown(scene, w) {
    const textureResolution = 512;
    const groundDown = BABYLON.MeshBuilder.CreateBox("Mesh_Ground_Down", { width: w, height: 35, depth: 1400 }, scene);
    const textureGroundDown = new BABYLON.DynamicTexture("dynamic texture", textureResolution, scene);
    const textureContextDown = textureGroundDown.getContext();
    const materialGroundDown = new BABYLON.StandardMaterial("Mat", scene);
    materialGroundDown.diffuseTexture = textureGroundDown;
    groundDown.material = materialGroundDown;
    // var texture01 = new Image()
    groundDown.position.y = -18;
    var texture = new Image();
    texture.src = "./src/scenes/texture/texture02.png";
    var m = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
    texture.onload = function () {
      for (let c = 0; c <= m.length; c++) {
        for (let i = 0; i <= w; i++) {
          textureContextDown.drawImage(this, i * 50, m[c], 50, 50);
          textureContextDown.drawImage(this, m[c], i * 50, 50, 50);
        }
      }
      textureGroundDown.update();
    };
  }

  renderPlayers() {
    this.scene.registerBeforeRender(() => {
      let currentClientIDs = new Set();
      for (const value of this.socket.clients.values()) {
        currentClientIDs.add(value.id);
        this.createMeshPlayer(value);
      }

      this.scene.meshes.forEach((mesh) => {
        if (!mesh.name.startsWith("Mesh") && !currentClientIDs.has(mesh.id)) {
          mesh.dispose(); // Remover o mesh da cena
        }
      });
    });
  }

  renderMainPlayer(x, y, z) {
    const player = BABYLON.MeshBuilder.CreateBox("Mesh_Player", {
      height: 40,
      width: 40,
      depth: 40,
    });
    player.position.x = x;
    player.position.y = y;
    player.position.z = z;
    player.rotation.y = Math.PI;
    return player;
  }

  createMeshPlayer(value) {
    let existingBox = this.scene.getMeshByName(value.id);
    if (!existingBox) {
      // Se o box não existir, criar um novo
      BABYLON.MeshBuilder.CreateBox(value.id, {
        height: 40,
        width: 40,
        depth: 40,
        position: { x: value.x, y: 20, z: value.y },
      });
    } else {
      // Se o box existir, atualizar sua posição
      existingBox.position.x = value.x;
      existingBox.position.z = value.y;
      existingBox.position.y = 20;
    }
  }
}
