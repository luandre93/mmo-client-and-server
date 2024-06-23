/* 
    Autor: Luandre Bernardi de Andrade
    Descrição: Arquivo de Incialização do Servidor.
*/

import { ConnectionHandler } from "./handlers/connection.handler";
import { ServerInstance } from "./server.instance";

export class Main {
  public static run(): void {
    console.clear();
    const serverInstance = new ServerInstance();
    serverInstance.initialize();
    new ConnectionHandler(serverInstance.server).listenToMessages();
  }
}

/* 
Inicialização do objeto da classe Main que iniciara o servidor. 
*/
Main.run();
