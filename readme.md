# Massive Multiplayer Cliente e Servidor

- Elaboração de um servidor feito em typescript utilizando modulo TCP/IP do NodeJS.
- Elaboração de um cliente feito em javascript, com ajuda de uma biblioteca de modelo 3d chamado Babilon JS https://www.babylonjs.com/ .
- A finalidade do projeto foi estudar como funciona o envio de pacote entre clientes e servidor, e como servidor deve se comportar com os dados recebidos, parece algo facil falando, porem é muito mais complexo do que parece quando o projeto ganha um escopo maior de funcionalidades.

###Video de Demonstração

![](https://github.com/luandre93/mmo-client-and-server/blob/main/Demo/demo.gif?raw=true)

---

### Movimentação

Utilizando as teclas **W A S D** é possivel o cubo.

---

### Instalação e Execução

Acesse as pastas dos repositórios **ClientGame** e **ServerGame** e execute npm install pelo terminal.

Para executar o projeto é preciso somente executar o arquivo **runClientsAndServer.bat** que fica localizado na pasta principal.

---

### Configuração de Porta

##### Caso queira mudar a porta é preciso alterar os seguintes arquivos:

###### ClientGame -> ClientGame\src\app.net.js e alterar a porta na linha:

> this.socket.connect({ port: 3000});

###### ServerGame -> ServerGame\src\server.instance.ts e alterar a porta na linha:

> private readonly PORT: number = 3000;
