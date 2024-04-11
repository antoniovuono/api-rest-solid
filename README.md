# GymPass

GymPass é um aplicativo back-end desenvolvido em Node.js, utilizando o framework Fastify para lidar com requisições HTTP e o Prisma como ORM para interação com o banco de dados.

Este aplicativo é voltado para o registro de academias, permitindo que os usuários possam buscar academias próximas (até 10km de distância) e realizar check-ins nelas.

## RFs (Requisitos funcionais)

É uma funcionalidade que o aplicativo deve ter.

- [x] Deve ser possível cadastrar um usuário;
- [x] Deve ser possível realizar autenticação;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Dever ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

É uma regra que determina como a funcionalidade deve se comportar.

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode realizar dois check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não tiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos depois de ser criado;
- [x] O check-in só pode ser validado por adminstradores;
- [x] A academia só pode ser cadastrada por adminstradores;

## RNFs (Requisitos não-funcionais)

São aqueles requisitos que não partem do cliente. São mais técnicos. (Qual banco de dados eu vou utilizar ? qual ferramenta ? qual biblioteca ?)

- [x] A senha do usuária precisa estar criptografada (bcrypt);
- [x] Os dados da aplicação devem estar persistidos dentro de um banco de dados PostgresSQL;
- [x] Todas as listas do usuário precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um jwt (jsonwebtoken);

## Executando o Projeto

Para executar o projeto em seu ambiente local, siga as instruções abaixo:

### Pré-requisitos:

- É necessário ter o Node.js instalado, na versão 18 ou superior.
- O Docker também deve estar instalado em sua máquina.

### Instalação das Dependências:

Após clonar o projeto em seu ambiente local, execute o seguinte comando para instalar todas as dependências necessárias:

```sh
yarn
```

## Banco de dados

Antes de iniciar a aplicação, é necessário inicializar o container do banco de dados utilizando o docker.

- -d: essa flag é opcional e permite que o container seja executado em segundo plano, eliminando a necessidade de manter o terminal aberto.

Para subir o container, execute o seguinte comando:

```
docker-compose up -d
```

Você pode utilizar o `prisma-studio` para interagir com as tabelas do banco de dados.

```
npx prisma studio
```

### Rodando a Aplicação

`start:dev`: Este comando inicia o servidor em modo de desenvolvimento. Ele usa o tsx para reiniciar automaticamente o servidor sempre que um arquivo é alterado. Execute o comando com:

```sh
yarn start:dev
```

`start:prod`: Este comando inicia o servidor em modo de produção. Ele usa o node para iniciar o servidor a partir dos arquivos de build. Execute o comando com:

```sh
yarn start:prod
```

### Build

`build`: Este comando compila os arquivos TypeScript do projeto para JavaScript, que podem ser executados diretamente pelo Node.js. Os arquivos compilados são colocados no diretório build. Execute o comando com:

```sh
yarn build
```

### Testes

`test`: Este comando executa todos os testes unitários do projeto que estão no diretório src/use-cases. Execute o comando com:

```sh
yarn test
```

`test:watch`: Este comando executa os testes unitários em modo de observação. Sempre que um arquivo é alterado, os testes são executados novamente. Execute o comando com:

```sh
yarn test:watch
```

`test:e2e`: Este comando executa todos os testes de ponta a ponta (E2E) do projeto que estão no diretório src/http. Execute o comando com:

```sh
yarn test:e2e
```

`test:e2e:watch`: Este comando executa os testes E2E em modo de observação. Sempre que um arquivo é alterado, os testes são executados novamente. Execute o comando com:

```sh
yarn test:e2e:watch
```

### Cobertura de testes

`test:coverage`: Este comando executa todos os testes e gera um relatório de cobertura de testes. Execute o comando com:

```sh
yarn test:coverage
```
