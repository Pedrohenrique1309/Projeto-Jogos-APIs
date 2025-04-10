/**********************************************************************************************
 * Objetivo: API refrente ao projeto de controle de jogos 
 * Data:13/03/2025
 * Autor: Pedro
 * Versão: 1.0
 * Observação: 
  
        ********** Para configurar e instalar a API,  precimaos das seguintes bibliotecas:
                express                npm install express --save
                cors                   npm instal cors --save
                body-parser            npm instal body-parser --save

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

//EndPoint para inserir um jogo no Banco de Dados 
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJSON, async function (request,response) {
        
        //Recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do body da requisição para a controller inserir no Banco de Dados 
        let resultJogo =  await controllerJogo.inserirJogo(dadosBody,contentType)

        response.status(resultJogo.status_code)
        response.json(resultJogo)

})

//EndPoint para listar todos jogos no Banco de Dados
app.get('/v1/controle-jogos/jogo', cors(), async function (request, response) {
        
        //Chama a função para listar os jogos 
        let resultJogo = await controllerJogo.listarJogo()

        response.status(resultJogo.status_code)
        response.json(resultJogo)

})

//EndPoint para buscar jogo no Banco de Dados pelo ID
app.get('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {
        
        let idJogo = request.params.id

        //Chama a função para listar os jogos 
        let resultJogo = await controllerJogo.buscarJogo(idJogo)

        response.status(resultJogo.status_code)
        response.json(resultJogo)

})

//EndPoint para deletar jogo no Banco de Dados pelo ID
app.delete('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {
        
        let idJogo = request.params.id

        //Chama a função para listar os jogos 
        let resultJogo = await controllerJogo.excluirJogo(idJogo)

        response.status(resultJogo.status_code)
        response.json(resultJogo)

})

//EndPoint para atualizar jogo no Banco de Dados pelo ID
app.put('/v1/controle-jogos/jogo/:id', cors(), bodyParserJSON, async function (request,response) {
        
        
        //Recebe content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe o ID do jogo
        let idJogo = request.params.id

        //Recebe os dados do jogo encainhado no body da requisição
        let dadosBody = request.body

        let resultJogo = await controllerJogo.atualizarJogo(dadosBody, idJogo, contentType)

        response.status(resultJogo.status_code)
        response.json(resultJogo)

})

'==================================================================== CRUD ATUALIZACAO ===================================================================='

//EndPoint para inserir uma atualizacao no Banco de Dados 
app.post('/v1/controle-atualizacoes/atualizacao', cors(), bodyParserJSON, async function (request,response) {
        
        //Recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do body da requisição para a controller inserir no Banco de Dados 
        let resultAtualizacao =  await controllerAtualizacao.inserirAtualizacao(dadosBody,contentType)

        response.status(resultAtualizacao.status_code)
        response.json(resultAtualizacao)

})

//EndPoint para listar todas atualizacoes no Banco de Dados
app.get('/v1/controle-atualizacoes/atualizacao', cors(), async function (request, response) {
        
        //Chama a função para listar os jogos 
        let resultAtualizacao = await controllerAtualizacao.listarAtualizacao()

        response.status(resultAtualizacao.status_code)
        response.json(resultAtualizacao)

})

//EndPoint para buscar atualizacao no Banco de Dados pelo ID
app.get('/v1/controle-atualizacoes/atualizacao/:id', cors(), async function (request, response) {
        
        let idAtualizacao = request.params.id

        //Chama a função para listar as atualizacoes
        let resultAtualizacao = await controllerJogo.buscarAtualizacao(idAtualizacao)

        response.status(resultAtualizacao.status_code)
        response.json(resultAtualizacao)

})

//EndPoint para deletar atualizacao no Banco de Dados pelo ID
app.delete('/v1/controle-atualizacoes/atualizacao/:id', cors(), async function (request, response) {
        
        let idAtualizacao = request.params.id

        //Chama a função para listar os jogos 
        let resultAtualizacao = await controllerAtualizacao.excluirAtualizacao(idAtualizacao)

        response.status(resultAtualizacao.status_code)
        response.json(resultAtualizacao)

})

app.listen('3030', function(){
        console.log('API aguardando Requisições...')
})