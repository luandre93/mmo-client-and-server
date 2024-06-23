import Controller from "./controller.js";

export class Environment {
  constructor(scene, dsm, camera, player, socket, zoom) {
    this.scene = scene;
    this.camera = camera;
    this.player = player;
    this.socket = socket;
    this.zoom = zoom;
    this.dsm = dsm;
    this.Menu();
    this.Camera();
    this.Controller();
    this.text.text = `X: ${Math.round(this.player.position.x)} Y: ${Math.round(this.player.position.z)}`;
  }

  Menu() {
    this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    this.text = new BABYLON.GUI.TextBlock();
    this.text.color = "white";
    this.text.fontSize = 14;
    this.advancedTexture.addControl(this.text);
    this.text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.text.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
  }

  Camera() {
    this.camera.lockedTarget = this.player;
    this.camera.radius = this.zoom;
    this.camera.rotationOffset = 230;
    this.camera.heightOffset = 290;

    console.log("Class Environment :: CAMERA :: Concluido!");
  }

  Controller() {
    var controller = new Controller(this.dsm);
    controller.ControllerStart();
    this.scene.registerBeforeRender(() => {
      if (this.dsm.getDeviceSource(BABYLON.DeviceType.Keyboard)) {
        let deltaX = 0;
        let deltaZ = 0;

        if (this.dsm.getDeviceSource(BABYLON.DeviceType.Keyboard).getInput(65) == 1) {
          deltaX = 1.2;
          deltaZ = 1.2;
          this.player.position.x += deltaX;
          this.player.position.z -= deltaZ;
          /*  this.camera.alpha = this.player.position.x;
          this.camera.beta = this.player.position.y; */
          /*  this.camera.radius = this.isometric.depth; */
        } else if (this.dsm.getDeviceSource(BABYLON.DeviceType.Keyboard).getInput(68) == 1) {
          deltaX = 1.2;
          deltaZ = 1.2;
          this.player.position.x -= deltaX;
          this.player.position.z += deltaZ;
          /*   this.camera.alpha = this.player.position.x;
          this.camera.beta = this.player.position.y; */
        }
        if (this.dsm.getDeviceSource(BABYLON.DeviceType.Keyboard).getInput(87) == 1) {
          deltaX = 1.2;
          deltaZ = 1.2;
          this.player.position.x -= deltaX;
          this.player.position.z -= deltaZ;
          /*   this.camera.alpha = this.player.position.x;
          this.camera.beta = this.player.position.y; */
        } else if (this.dsm.getDeviceSource(BABYLON.DeviceType.Keyboard).getInput(83) == 1) {
          deltaX = 1.2;
          deltaZ = 1.2;
          this.player.position.x += deltaX;
          this.player.position.z += deltaZ;
          /*    this.camera.alpha = this.player.position.x;
          this.camera.beta = this.player.position.y; */
        }
        if (deltaX !== 0 || deltaZ !== 0) {
          this.SendPacketMove();
          this.text.text = "X: " + Math.round(this.socket.client.x) + " Y: " + Math.round(this.socket.client.y);
        }
      }
    });

    console.log("Class Environment :: CONTROLLER :: Concluido!");
  }

  SendPacketMove() {
    this.socket.client.x = this.player.position.x;
    this.socket.client.y = this.player.position.z;
    this.text.text = `X: ${Math.round(this.socket.client.x)} Y: ${Math.round(this.socket.client.y)}`;
    this.socket.sendMovePlayer(Math.round(this.socket.client.x), Math.round(this.socket.client.y));
  }
}
