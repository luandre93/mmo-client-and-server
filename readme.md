# Massive Multiplayer Cliente e Servidor

Este projeto é um exemplo de um jogo multijogador massivo, onde um servidor em Node.js se comunica com vários clientes que utilizam Babylon.js para renderização 3D. O principal objetivo foi estudar o envio de pacotes entre clientes e servidor, bem como o comportamento do servidor ao receber esses dados. A complexidade do projeto aumenta conforme se adicionam mais funcionalidades.

### Video de Demonstração

![](https://github.com/luandre93/mmo-client-and-server/blob/main/Demo/demo.gif?raw=true)

---

## Movimentação

Utilize as teclas W A S D para mover os cubos no ambiente do jogo.

---

## Instalação e Execução

Para executar o projeto, siga os passos abaixo:

1. Acesse as pastas dos repositórios **ClientGame** e **ServerGame**.
2. Execute npm install no terminal para instalar as dependências.
3. Para iniciar o projeto, execute o arquivo **runClientsAndServer.bat** localizado na pasta principal.

---

## Configuração de Porta

Caso queira mudar a porta é preciso alterar os seguintes arquivos:

#### Cliente

###### No arquivo ClientGame\src\app.net.js, altere a porta na linha:

`this.socket.connect({ port: 3000});`

#### Servidor

###### ServerGame -> ServerGame\src\server.instance.ts e alterar a porta na linha:

`private readonly PORT: number = 3000`
