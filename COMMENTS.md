
### Tasks
1. Task 001: Project planning
2. Task 002: Start project API
3. Task 003: O usuário 123 cadastra o seu primeiro device. A API cadastra o device e retorna sucesso.
4. Task 004: O usuário 456 cadastra três devices e tenta cadastrar o quarto sem sucesso, sendo informado que ainda pode fazer uma troca. 
5. Task 005: O usuário 456 realiza a troca de device
6. Task 006: O usuário 456 tenta cadastra um quarto device sem sucesso, sendo informado a data da próxima troca.
7. Task 007: O usuário 789 cadastra dois devices
8. Task 008: O usuário 789 troca um device cadastrado
9. Task 009: O usuário 789 tenta remver os dois devices, tendo suceso apenas na primeira tentativa, sendo informado na segunda tentativa a data da próxima troca
10. Task 010: Comments

### Tables

## Devices
- User ID
- Device ID
- Device name
- Device model
- Status Enable
## Replacements
- Replacement ID
- User ID
- Current device id
- Replaced device id
- Replace date


## Up Databse
Install postgres as docker
```
sudo docker pull postgres
```
Start database postgres
```
sudo docker run -d -p 5400:5432 --name postgres -e POSTGRES_PASSWORD=123123 postgres
```
## On root project
```
npm install
```
## Run migration
```
node_modules/.bin/adonis migration:run
```
## Start optional
```
node_modules/.bin/adonis serve --dev
```
## Default start
```
npm start
```
## Test
```
npm run test
```

## Test watch
```
npm run test:watch
```
### Comentários

Conforme a analise do enunciado do desafio, alguns aspectos foram levados em consideração para a escolha da arquitetura da solução.
Abaixo serão descritos alguns conceitos de arquitetura, suas características e o motivo pelo qual foram ou não foram escolhidas para o projeto. 

## Node Serverless Framework + MongoDB

Esta arquitetura na minha opinião é a mais adequada entre todas, no entanto não foi escolhida devido ao tempo curto de desenvolvimento do projeto, face à pouca informação a respeito desta tecnologia na internet. 


Rest Node Express + Sequelize + MongoDB

Esta opção não foi escolhida devido ao fato de eu considerar o Express muito cru para a criação de uma api, deixando à cargo do desenvolvedor a implementação completa dos requisitos não funcionais do sistema, tornado muito mais trabalhoso o processo de desenvolvimento, assim como deixando o código muito mais sujeito à vunerabilidades. 


## Rest Node com Adonis JS Framework + PostgreSQL

Dada as condições do projeto esta foi a opção escolhida, embora houvesse outras opções que atendessem melhor à demanda. 

O Adonis JS Framework foi escolhido devido ao fato de ele disponibilizar toda uma estrutura de funcionalidades para testes, segurança e demais demandas relacionadas ao desenvolvimento. Permitindo também uma melhor estruturação do código, uma maior segurança em seu funcionamento, assim como também uma maior produtividade em seu desenvolvimento, fator que foi considerado crucial para esta escolha. 

O banco PostgreSQL não seria a escolha ideal pelo fato de ele ser um banco relacional. Contudo devido ao tempo escaço e à simplicidade de implementação e de substituição proporcionada pelo ORM Lucid do Adonis JS, para este exercício esta foi a escolha mais vantajosa, considerando uma substituição desta escolha antes de ir para produção. 

Constraints foram removidas para facilitação do desenvolviento, contudo para produção seriam re-incluídas.

### Bibliotecas

## moment
A biblioteca Moment foi utilizada para manipulação de datas

## pg 
A bibliote pg foi utilizada como driver para interação com o banco de dados PostgreSQL.

## nodemon
Como dependência de desenvolvimento, a biblioteca nodemon foi utilizada para permitir maior agilidade no desenvolvimento orientado à testes, visto que ela observa a alteração dos arquivos e reexecuta os testes.


Demais demais bibliotecas nativas do Adonis JS utilizadas não serão aqui mencionadas devido.

### Fluxo e Desenvolvimento. 

O fluxo pensado para o desenvolvimento foi estruturado segundo o conceito git-flow e estruturação de tarefas a partir do Jira.

O primeiro passo foi entender o projeto e criar as tarefas. 
Com as tarefas prontas foi criado o fluxo de testes unitários, de forma que todas tarefas fossem testadas.

Para cada tarefa foi criada uma nova funcionalidade, dessa forma o Jira inclui automaticamente uma ligação da tarefa para o branch da funcionalidade no repositório do git, simplificando muito a inspeção da resolução do problema.  