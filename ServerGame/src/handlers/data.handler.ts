export class DataHandler {}

/* import { CustomLogger } from "../utils/custom.logger";
import { Socket } from "net";
export class DataClientHandler {
  public client: any;
  public clients: any[];
  constructor(client: any, clients: any[]) {
    this.clients = clients;
    this.client = client;
  }
  dataClient(data: any, socket: Socket) {
    this.client = JSON.parse(data.toString("utf-8"));
    if (this.client.state == "in_connect") {
      CustomLogger.log(`PORTA TCP: ${this.client.port} ID: ${this.client.id} conectou-se ao servidor.`);
    }
    if (this.client.state == "in_game") {
      this.clients.forEach((client) => {
        if (client.id == this.client.id) {
          client.posX = this.client.posX;
          client.posY = this.client.posY;
          client.state = this.client.state;
        }
        console.log(this.client);
        socket.write(JSON.stringify(client));
      });
    }
  }
}
 */
