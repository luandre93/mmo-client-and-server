import { Socket } from "net";

export class ClientsHandler {
  public clients: any[];

  constructor() {
    this.clients = [];
  }

  public getClients() {
    return this.clients;
  }

  public removeClient(socket: Socket) {
    let index = this.clients.findIndex(function (o) {
      return o.remoteAddress === socket.remoteAddress && o.remotePort === socket.remotePort;
    });
    if (index !== -1) this.clients.splice(index, 1);
  }

  public addClient(client: Socket) {
    this.clients.push(client);
  }
}
