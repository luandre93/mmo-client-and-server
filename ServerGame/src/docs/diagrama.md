         +------------------+
         |     Client       |
         +------------------+
                 |
                 |
         +------------------+
         |    UDP Server    |
         +------------------+
                 |
                 |
         +------------------+
         |   Handlers       |
         +------------------+
                 |
                 |
         +------------------+
         |    Services      |
         +------------------+
                 |
                 |
         +------------------+
         |    Models        |
         +------------------+

- **Client**: Representa o cliente que se conecta ao servidor, como um cliente de jogo.
- **UDP Server**: É o servidor UDP que recebe os pacotes enviados pelos clientes.
- **Handlers**: Responsáveis por receber e processar os pacotes recebidos pelo servidor UDP. Eles podem encaminhar as informações para os serviços correspondentes com base no tipo de pacote recebido.
- **Services**: Fornecem a lógica de negócio para o servidor. Eles podem lidar com a manipulação de jogadores, jogos, inventários e outras funcionalidades do seu RPG online.
- **Models**: Definem a estrutura de dados e as operações relacionadas às entidades do jogo, como jogadores, jogos, inventários, etc. Eles podem interagir com os serviços para realizar operações no banco de dados ou fornecer informações atualizadas aos clientes.
- **Database**: Representa o banco de dados onde as informações do jogo são armazenadas. Os modelos e serviços interagem com o banco de dados para ler e gravar dados relevantes.