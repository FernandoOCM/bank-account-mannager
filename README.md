# bank-account-mannager

### Pre requisitos
  * Node.js
  * PostgreSQL

### Configurando o Banco de dados
O repositório possui todos os scripts necessários para a criação do banco na pasta database_scripts.

Utilizando algum gerenciador de banco de dados execute o script create_database.sql para criar o banco, as tabelas e seus relacionamentos.

Na pasta também existe o script insert_persons.sql, que serve como exemplo para inserção de alguns registros na tabela person. 

### Configurando a API

#### Dependencias
Na pasta raiz do repositório, precisamos instalar as dependências do projeto, então execute o comando: `yarn install`.

Caso utilize o npm como gerenciador de pacotes, o comando é: `npm install`.

#### Envs
Para a API funcionar é preciso configurar algumas variáveis de ambiente. Na pasta raiz existe um arquivo para seguir de exemplo, o .env.example

Crie um arquivo na raiz do projeto com o nome .env e nele adicione as variáveis que estão no arquivo de exemplo, preenchendo os valores com suas configurações. 

### Executando a API
Com as configurações concluídas, podemos executar a api.
Recomendo usar a funcionalidade Run and Debug do vs-code, pois o repositório já possui as configurações para ler as variáveis de ambiente configuradas no arquivo .env

#### Health Check
Para verificar se está tudo OK, a api possui um endpoint de Health Check, seu path é: `/v1/healthcheck`

Ao fazer uma requisição do tipo GET para esse endpoint, o retorno esperado é algo do tipo: 
```json
{
    "message": "Service Integration OK",
    "build": "1.0.0"
}
```
#### Endpoints
Com a API executando podemos fazer requisições para seus endpoints, que são:

| Método  | Path                                                 | Descrição                                                   |
| ------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| GET     | /v1/healthcheck                                      | Verifica se a api está funcionando                          |
| POST    | /v1/person/:personId/account                         | Cria uma conta                                              |
| GET     | /v1/person/:personId/account/:accountId              | Pesquisa o saldo de uma conta                               |
| PATCH   | /v1/person/:personId/account/:accountId              | Realiza o bloqueio/desbloqueio da conta                     |
| POST    | /v1/person/:personId/account/:accountId/transaction  | Cadastra uma transação de deposito ou saque para uma conta  |
| GET     | /v1/person/:personId/account/:accountId/transaction  | Pesquisa de extrato de uma conta                            |

Na pasta raiz do repositório, na pasta postman_collection existe um json que pode ser importado no postman para ser usado para testar a api, com exemplos de body para as requisições e etc.




