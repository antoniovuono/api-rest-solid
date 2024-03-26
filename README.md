# App

GymPass style app.

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
- [ ] O check-in só pode ser validado por adminstradores;
- [ ] A academia só pode ser cadastrada por adminstradores;

## RNFs (Requisitos não-funcionais)

São aqueles requisitos que não partem do cliente. São mais técnicos. (Qual banco de dados eu vou utilizar ? qual ferramenta ? qual biblioteca ?)

- [x] A senha do usuária precisa estar criptografada (bcrypt);
- [x] Os dados da aplicação devem estar persistidos dentro de um banco de dados PostgresSQL;
- [x] Todas as listas do usuário precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um jwt (jsonwebtoken);

# api-rest-solid

# api-rest-solid-
