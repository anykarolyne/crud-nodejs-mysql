# crud-nodejs-mysql

1º passo: clone o repositório

2º passo: Instalar as dependencias necessárias no arquivo baixado

```
npm install
```
3º Configuração do Banco

* Faça dump do arquivo users.sql
```
mysql -u root -p banco_criado < backup.sql
```
* Configure suas informações do MySQL no app.js

4º passo: Rodar o servidor

```
node app.js
```

