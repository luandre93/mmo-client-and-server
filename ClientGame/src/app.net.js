import { scenesInstance } from "./../renderer.js";
import { isJSON } from "./utils/isJSON.js";

const net = require("net");

export class SocketClient {
  constructor() {
    this.client = {};
    this.clients = new Map();
    this.socket = new net.Socket();
    this.connectionPromise = new Promise((resolve, reject) => {
      this.socket.connect({ port: 3000 });

      this.socket.on("connect", () => {
        resolve();
        this.onConnect();
      });

      this.socket.on("error", () => {
        reject();
        scenesInstance.scenes("disconnect");
      });
    });
  }

  async isConnected() {
    return await this.connectionPromise.then(() => true).catch(() => false);
  }

  onConnect() {
    this.client.id = `${this.socket.localAddress}:${this.socket.localPort}`;
    document.title = `Client [${this.client.id}]`;
    this.client.port = this.socket.localPort;
    this.client.state = "in_connect";
    this.client.type = "response";
    this.sendClientData();
    this.socket.on("data", this.onData.bind(this));
  }

  onData(data) {
    if (isJSON(data)) {
      let response = JSON.parse(data);

      if (response.type == "response") {
        switch (response.state) {
          case "in_connect":
            // ser for o player atual.
            if (this.client.id == response.id) {
              this.reqPlayersInMap();
              this.client.x = response.x;
              this.client.y = response.y;
            }
            // Se for outro player.
            if (this.client.id !== response.id) {
              if (!this.clients.get(response.id)) this.clients.set(response.id, response);
            }
            break;

          case "in_players":
            response.clients.map((res) => {
              if (res.id != this.client.id) this.clients.set(res.id, res);
            });
            break;

          case "in_game":
            if (this.client.id !== response.id) this.clients.set(response.id, response);
            break;

          case "disconnect":
            console.log(response);
            this.clients.delete(response.id);
            break;

          default:
            break;
        }
      }

      if (response.type == "disconnect") {
        console.log(response);
        this.clients.delete(response.id);
      }
    }
  }

  sendMovePlayer(x, y) {
    this.client.state = "in_game";
    this.client.x = x;
    this.client.y = y;
    this.sendClientData();
  }

  reqPlayersInMap() {
    this.socket.write(JSON.stringify({ state: "req_players" }));
  }

  sendClientData() {
    this.socket.write(JSON.stringify(this.client));
  }
}
