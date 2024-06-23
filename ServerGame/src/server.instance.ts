import net, { Server } from "net";
import { CustomLogger } from "./utils/custom.logger";

export class ServerInstance {
  private readonly PORT: number = 3000;
  public server: Server;

  constructor() {
    this.server = net.createServer();
  }

  public initialize(): void {
    try {
      this.server.listen(this.PORT, function () {
        CustomLogger.log("Servidor iniciado.");
      });
    } catch (error) {
      console.error(error);
    }
  }
}
