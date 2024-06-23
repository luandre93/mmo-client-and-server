import { Server } from "net";
import { CustomLogger } from "../utils/custom.logger";
import { isJSON } from "../utils/isJSON";
import { ClientsHandler } from "./clients.handler";

export class ConnectionHandler {
  private server: Server;
  public client: any;
  public clients: any[];
  private clientHandler: ClientsHandler;

  constructor(server: Server) {
    this.server = server;
    this.clientHandler = new ClientsHandler();
    this.clients = this.clientHandler.getClients();
  }

  public listenToMessages(): void {
    this.server.on("listening", this.handleMessages.bind(this));
    this.server.on("connection", this.handleSocketClient.bind(this));
    this.server.on("end", this.handleCloseConn.bind(this));
    setInterval(() => {
      console.table(this.clients.map((t) => t.body));
    }, 3000);
  }

  private handleSocketClient(socket: any) {
    this.clientHandler.addClient(socket);

    socket.on("data", (data: any) => {
      if (isJSON(data)) {
        const dataReceive = JSON.parse(data);

        switch (dataReceive.state) {
          case "in_connect":
            CustomLogger.log(`${dataReceive.id} se conectou ao servidor.`);
            this.clients.forEach((sock) => {
              socket.body = dataReceive;
              socket.body.x = 20;
              socket.body.y = 20;
              sock.write(JSON.stringify(socket.body));
            });
            break;

          case "req_players":
            this.clients.forEach((sock) => {
              const clients = this.clients.map((t) => t.body);
              const client = { type: "response", state: "in_players", clients: clients };
              sock.write(JSON.stringify(client));
            });
            break;

          case "in_game":
            this.clients.forEach((sock) => {
              socket.body = dataReceive;
              sock.write(JSON.stringify(socket.body));
            });
            break;

          default:
            break;
        }
      } else {
        socket.destroy();
        CustomLogger.log("Conexão desconhecida enviando dados será destruida ou dados não chegaram corretamente.");
      }
    });

    // Socket Close: Quando a aplicação do cliente fecha.
    socket.on("close", () => {
      if (socket.body) {
        this.clients.forEach((sock) => {
          let client = { type: "disconnect", id: socket.body.id };
          sock.write(JSON.stringify(client));
        });
        CustomLogger.log(`Conexão com o cliente ${socket.body.id} foi fechada.`);
      } else {
        CustomLogger.log(`Conexão com o cliente desconhecido foi fechada.`);
      }
      this.clientHandler.removeClient(socket);
    });

    // Socket Error: Quando houver algum erro na aplicação do cliente.
    socket.on("error", (data: any) => {});
  }

  private handleMessages() {
    CustomLogger.log("Servidor localizado porta 3000.");
  }

  private handleCloseConn() {
    CustomLogger.log("Servidor fechado.");
  }
}
