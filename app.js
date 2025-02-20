/**********************************************************************************************
 * Objetivo: API refrente ao projeto de controle de jogos 
 * Data:13/03/2025
 * Autor: Pedro
 * Versão: 1.0
 * Observação: 
  
        ********** Para configurar e instalar a API,  precimaos das seguintes bibliotecas:
                express                npm install express --save
                cors                   npm instal cors --save
                body-parser            npm instal cors --save

        ********** Para configurar e instalar o acesso ao Banco de Dados precimos:   
                prisma                 npm install prisma --save (conexão com o BD)
                prisma/client          npm install @prisma/client --save  (Executa scripts no BD)

        *********** Após a instalação do prisma e do prisma client, devemos:
                npx prisma init (Inicializar o prisma no projeto)

        Para realizar o sincronismo do prisma com o banco de dados, devemos executar o seguinte comando:
                npx prisma migrate dev     

 * *******************************************************************************************/

//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Import das cotrollers para realizar o CRUD de dados
const controllerJogo = require('./controller/jogo/controllerJogo.js')

//Estabelecendo o formato dos dados que deverá chegar no body da requisição (POST ou PUT)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a API
const app = express()

//Configuração do cors
app.use((request, response, next)=>{
        response.header('Acess-Control-Allow-Origin','*')
        response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        app.use(cors())
        next()
})

//EndPoint para inserir um jogo no banco de dados 
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJSON, async function (request,response) {
        
        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do body da requisição para a controller inserir no Banco de Dados 
        let resultJogo =  await controllerJogo.inserirJogo(dadosBody)

        response.status(resultJogo.status_code)
        response.json(resultJogo)

})

app.listen('8080', function(){
        console.log('API aguardando Requisições...')
})