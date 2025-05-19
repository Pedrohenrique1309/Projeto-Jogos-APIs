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
const controllerAtualizacao = require('./controller/atualizacao/controllerAtualizacao.js')
const controllerFaixaEtaria = require('./controller/faixaEtaria/controllerFaixaEtaria.js')
const controllerPlataforma = require('./controller/plataforma/controllerPlataforma.js')
const controllerVersaoJogo = require('./controller/versaoJogo/controllerVersaoJogo.js')
const controllerAssinatura = require('./controller/assinatura/controllerAssinatura.js')
const controllerCategoria = require('./controller/categoria/controllerCategoria.js')
const controllerDesenvolvedor = require('./controller/desenvolvedor/controllerDesenvolvedor.js')
const controllerAvaliacao = require('./controller/avaliacao/controllerAvaliacao.js')

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

'==================================================================== CRUD ATUALIZACAO ================================================================================='

//EndPoint para inserir uma atualizacao no Banco de Dados 
app.post('/v1/controle-jogos/atualizacao', cors(), bodyParserJSON, async function (request,response) {
        
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
app.get('/v1/controle-jogos/atualizacao', cors(), async function (request, response) {
        
        //Chama a função para listar os jogos 
        let resultAtualizacao = await controllerAtualizacao.listarAtualizacao()

        response.status(resultAtualizacao.status_code)
        response.json(resultAtualizacao)

})

//EndPoint para buscar atualizacao no Banco de Dados pelo ID
app.get('/v1/controle-jogos/atualizacao/:id', cors(), async function (request, response) {
        
        let idAtualizacao = request.params.id

        //Chama a função para listar as atualizacoes
        let resultAtualizacao = await controllerAtualizacao.buscarAtualizacao(idAtualizacao)

        response.status(resultAtualizacao.status_code)
        response.json(resultAtualizacao)

})

//EndPoint para deletar atualizacao no Banco de Dados pelo ID
app.delete('/v1/controle-jogos/atualizacao/:id', cors(), async function (request, response) {
        
        let idAtualizacao = request.params.id

        //Chama a função para listar os jogos 
        let resultAtualizacao = await controllerAtualizacao.excluirAtualizacao(idAtualizacao)

        response.status(resultAtualizacao.status_code)
        response.json(resultAtualizacao)

})

//EndPoint para atualizar atualizacao no Banco de Dados pelo ID
app.put('/v1/controle-jogos/atualizacao/:id', cors(), bodyParserJSON, async function (request,response) {
        
        
        //Recebe content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe o ID do jogo
        let idAtualizacao = request.params.id

        //Recebe os dados da atualizacao encainhado no body da requisição
        let dadosBody = request.body

        let resultAtualizacao = await controllerAtualizacao.atualizarAtualizacao(dadosBody, idAtualizacao, contentType)

        response.status(resultAtualizacao.status_code)  
        response.json(resultAtualizacao)
})


'==================================================================== CRUD FAIXAS ETÁRIAS ================================================================================='

//EndPoint para inserir uma faixa etaria no Banco de Dados 
app.post('/v1/controle-jogos/faixa-etaria', cors(), bodyParserJSON, async function (request,response) {
        
        //Recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do body da requisição para a controller inserir no Banco de Dados 
        let resultFaixaEtaria =  await controllerFaixaEtaria.inserirFaixaEtaria(dadosBody,contentType)


        response.status(resultFaixaEtaria.status_code)  
        response.json(resultFaixaEtaria)

})

//EndPoint para listar todas faixas etárias no Banco de Dados
app.get('/v1/controle-jogos/faixa-etaria', cors(), async function (request, response) {
        
        //Chama a função para listar oas faixas etárias
        let resultFaixaEtaria = await controllerFaixaEtaria.listarFaixaEtaria() 

        response.status(resultFaixaEtaria .status_code)
        response.json(resultFaixaEtaria )

})

//EndPoint para buscar faixa etária no Banco de Dados pelo ID
app.get('/v1/controle-jogos/faixa-etaria/:id', cors(), async function (request, response) {
        
        let idFaixaEtaria = request.params.id

        //Chama a função para listar os jogos 
        let resultFaixaEtaria = await controllerFaixaEtaria.buscarFaixaEtaria(idFaixaEtaria)

        response.status(resultFaixaEtaria.status_code)
        response.json(resultFaixaEtaria)

})

//EndPoint para deletar faixa etária no Banco de Dados pelo ID
app.delete('/v1/controle-jogos/faixa-etaria/:id', cors(), async function (request, response) {
        
        let idFaixaEtaria = request.params.id

        //Chama a função para listar as faixas etárias 
        let resultFaixaEtaria = await controllerFaixaEtaria.excluirFaixaEtaria(idFaixaEtaria)

        response.status(resultFaixaEtaria.status_code)
        response.json(resultFaixaEtaria)


})

//EndPoint para atualizar faixa etária no Banco de Dados pelo ID
app.put('/v1/controle-jogos/faixa-etaria/:id', cors(), bodyParserJSON, async function (request,response) {
        
        
        //Recebe content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe o ID da faixa etária
        let idFaixaEtaria = request.params.id

        //Recebe os dados da faixa etária encainhado no body da requisição
        let dadosBody = request.body

        let resultFaixaEtaria = await controllerFaixaEtaria.atualizarFaixaEtaria(dadosBody, idFaixaEtaria, contentType)

        response.status(resultFaixaEtaria.status_code)  
        response.json(resultFaixaEtaria)
})

'==================================================================== CRUD PLATAFORMA ================================================================================='

//EndPoint para inserir uma plataforma no Banco de Dados
app.post('/v1/controle-jogos/plataforma', cors(), bodyParserJSON, async function (request,response) {
        
        //Recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do body da requisição para a controller inserir no Banco de Dados 
        let resultPlataforma =  await controllerPlataforma.inserirPlataforma(dadosBody,contentType)

        response.status(resultPlataforma.status_code)  
        response.json(resultPlataforma)

})

//EndPoint para listar todas plataformas no Banco de Dados
app.get('/v1/controle-jogos/plataforma', cors(), async function (request, response) {
        
        //Chama a função para listar as plataformas
        let resultPlataforma = await controllerPlataforma.listarPlataforma() 

        response.status(resultPlataforma.status_code)
        response.json(resultPlataforma)

})

//EndPoint para buscar plataforma no Banco de Dados pelo ID
app.get('/v1/controle-jogos/plataforma/:id', cors(), async function (request, response) {
        
        let idPlataforma = request.params.id

        //Chama a função para listar as plataformas 
        let resultPlataforma = await controllerPlataforma.buscarPlataforma(idPlataforma)

        response.status(resultPlataforma.status_code)
        response.json(resultPlataforma)

})

//EndPoint para deletar plataforma no Banco de Dados pelo ID
app.delete('/v1/controle-jogos/plataforma/:id', cors(), async function (request, response) {
        
        let idPlataforma = request.params.id

        //Chama a função para listar as plataformas 
        let resultPlataforma = await controllerPlataforma.excluirPlataforma(idPlataforma)

        response.status(resultPlataforma.status_code)
        response.json(resultPlataforma)

})

//EndPoint para atualizar plataforma no Banco de Dados pelo ID
app.put('/v1/controle-jogos/plataforma/:id', cors(), bodyParserJSON, async function (request,response) {
        
        
        //Recebe content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe o ID da plataforma
        let idPlataforma = request.params.id

        //Recebe os dados da plataforma encainhado no body da requisição
        let dadosBody = request.body

        let resultPlataforma = await controllerPlataforma.atualizarPlataforma(dadosBody, idPlataforma, contentType)

        response.status(resultPlataforma.status_code)  
        response.json(resultPlataforma)
})

'==================================================================== CRUD VERSAO JOGO ================================================================================='

//EndPoint para inserir uma versao de jogo no Banco de Dados
app.post('/v1/controle-jogos/versao-jogo', cors(), bodyParserJSON, async function (request,response) {
        
        //Recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do body da requisição para a controller inserir no Banco de Dados 
        let resultVersaoJogo =  await controllerVersaoJogo.inserirVersaoJogo(dadosBody,contentType)

        response.status(resultVersaoJogo.status_code)  
        response.json(resultVersaoJogo)

})

//EndPoint para listar todas versoes de jogos no Banco de Dados
app.get('/v1/controle-jogos/versao-jogo', cors(), async function (request, response) {
        
        //Chama a função para listar as versoes de jogos
        let resultVersaoJogo = await controllerVersaoJogo.listarVersaoJogo() 

        response.status(resultVersaoJogo.status_code)
        response.json(resultVersaoJogo)

})

//EndPoint para buscar versao de jogo no Banco de Dados pelo ID
app.get('/v1/controle-jogos/versao-jogo/:id', cors(), async function (request, response) {
        
        let idVersaoJogo = request.params.id

        //Chama a função para listar as versoes de jogos 
        let resultVersaoJogo = await controllerVersaoJogo.buscarVersaoJogo(idVersaoJogo)

        response.status(resultVersaoJogo.status_code)
        response.json(resultVersaoJogo)

})

//EndPoint para deletar versao de jogo no Banco de Dados pelo ID
app.delete('/v1/controle-jogos/versao-jogo/:id', cors(), async function (request, response) {
        
        let idVersaoJogo = request.params.id

        //Chama a função para listar as versoes de jogos 
        let resultVersaoJogo = await controllerVersaoJogo.excluirVersaoJogo(idVersaoJogo)

        response.status(resultVersaoJogo.status_code)
        response.json(resultVersaoJogo)

})

//EndPoint para atualizar versao de jogo no Banco de Dados pelo ID
app.put('/v1/controle-jogos/versao-jogo/:id', cors(), bodyParserJSON, async function (request,response) {
        
        
        //Recebe content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe o ID da versao de jogo
        let idVersaoJogo = request.params.id

        //Recebe os dados da versao de jogo encainhado no body da requisição
        let dadosBody = request.body

        let resultVersaoJogo = await controllerVersaoJogo.atualizarVersaoJogo(dadosBody, idVersaoJogo, contentType)

        response.status(resultVersaoJogo.status_code)  
        response.json(resultVersaoJogo)
})


'==================================================================== CRUD ASSINATURA ================================================================================='

//EndPoint para inserir uma assinatura no Banco de Dados
app.post('/v1/controle-jogos/assinatura', cors(), bodyParserJSON, async function (request,response) {
        //Recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do body da requisição para a controller inserir no Banco de Dados 
        let resultAssinatura =  await controllerAssinatura.inserirAssinatura(dadosBody,contentType)

        response.status(resultAssinatura.status_code)  
        response.json(resultAssinatura)

})

//EndPoint para listar todas assinaturas no Banco de Dados
app.get('/v1/controle-jogos/assinatura', cors(), async function (request, response) {
        
        //Chama a função para listar as assinaturas
        let resultAssinatura = await controllerAssinatura.listarAssinatura() 

        response.status(resultAssinatura.status_code)
        response.json(resultAssinatura)

})

//EndPoint para buscar assinatura no Banco de Dados pelo ID
app.get('/v1/controle-jogos/assinatura/:id', cors(), async function (request, response) {
        let idAssinatura = request.params.id

        //Chama a função para listar as assinaturas 
        let resultAssinatura = await controllerAssinatura.buscarAssinatura(idAssinatura)

        response.status(resultAssinatura.status_code)
        response.json(resultAssinatura)

})

//EndPoint para deletar assinatura no Banco de Dados pelo ID
app.delete('/v1/controle-jogos/assinatura/:id', cors(), async function (request, response) {
        
        let idAssinatura = request.params.id

        //Chama a função para listar as assinaturas 
        let resultAssinatura = await controllerAssinatura.excluirAssinatura(idAssinatura)

        response.status(resultAssinatura.status_code)
        response.json(resultAssinatura)

})

//EndPoint para atualizar assinatura no Banco de Dados pelo ID
app.put('/v1/controle-jogos/assinatura/:id', cors(), bodyParserJSON, async function (request,response) {
        //Recebe content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe o ID da assinatura
        let idAssinatura = request.params.id

        //Recebe os dados da assinatura encainhado no body da requisição
        let dadosBody = request.body

        let resultAssinatura = await controllerAssinatura.atualizarAssinatura(dadosBody, idAssinatura, contentType)

        response.status(resultAssinatura.status_code)  
        response.json(resultAssinatura)
})

'==================================================================== CRUD CATEGORIA ================================================================================='

//EndPoint para inserir uma categoria no Banco de Dados 
app.post('/v1/controle-jogos/categoria', cors(), bodyParserJSON, async function (request,response) {
        
        //Recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do body da requisição para a controller inserir no Banco de Dados 
        let resultCategoria =  await controllerCategoria.inserirCategoria(dadosBody,contentType)

        response.status(resultCategoria.status_code)
        response.json(resultCategoria)

})

//EndPoint para listar todas categorias no Banco de Dados
app.get('/v1/controle-jogos/categoria', cors(), async function (request, response) {
        
        //Chama a função para listar as Categorias
        let resultCategoria = await controllerCategoria.listarCategoria()

        response.status(resultCategoria.status_code)
        response.json(resultCategoria)

})

//EndPoint para buscar categoria no Banco de Dados pelo ID
app.get('/v1/controle-jogos/categoria/:id', cors(), async function (request, response) {
        let idCategoria = request.params.id

        //Chama a função para listar as categorias
        let resultCategoria = await controllerCategoria.buscarCategoria(idCategoria)

        response.status(resultCategoria.status_code)
        response.json(resultCategoria)

})

//EndPoint para deletar categoria no Banco de Dados pelo ID
app.delete('/v1/controle-jogos/categoria/:id', cors(), async function (request, response) {
        
        let idCategoria = request.params.id

        //Chama a função para listar as categorias 
        let resultCategoria  = await controllerCategoria.excluirCategoria(idCategoria)

        response.status(resultCategoria .status_code)
        response.json(resultCategoria )

})

//EndPoint para atualizar categoria no Banco de Dados pelo ID
app.put('/v1/controle-jogos/categoria/:id', cors(), bodyParserJSON, async function (request,response) {
        //Recebe content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe o ID da assinatura
        let idCategoria = request.params.id

        //Recebe os dados da assinatura encainhado no body da requisição
        let dadosBody = request.body

        let resultCategoria  = await controllerCategoria.atualizarCategoria(dadosBody, idCategoria, contentType)

        response.status(resultCategoria.status_code)  
        response.json(resultCategoria)
})

'==================================================================== CRUD DESENVOLVEDOR ================================================================================='

//EndPoint para inserir um desenvolvedor no Banco de Dados 
app.post('/v1/controle-jogos/desenvolvedor', cors(), bodyParserJSON, async function (request,response) {
        
        //Recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do body da requisição para a controller inserir no Banco de Dados 
        let resultDesenvolvedor =  await controllerDesenvolvedor.inserirDesenvolvedor(dadosBody,contentType)

        response.status(resultDesenvolvedor.status_code)
        response.json(resultDesenvolvedor)

})

//EndPoint para listar todos desenvolvedores no Banco de Dados
app.get('/v1/controle-jogos/desenvolvedor', cors(), async function (request, response) {
        
        //Chama a função para listar os desenvolvedores
        let resultDesenvolvedor = await controllerDesenvolvedor.listarDesenvolvedor()

        response.status(resultDesenvolvedor.status_code)
        response.json(resultDesenvolvedor)

})

//EndPoint para buscar desenvolvedor no Banco de Dados pelo ID
app.get('/v1/controle-jogos/desenvolvedor/:id', cors(), async function (request, response) {
        
        let idDesenvolvedor = request.params.id

        //Chama a função para listar os desenvolvedores 
        let resultDesenvolvedor = await controllerDesenvolvedor.buscarDesenvolvedor(idDesenvolvedor)

        response.status(resultDesenvolvedor.status_code)
        response.json(resultDesenvolvedor)

})

//EndPoint para deletar desenvolvedor no Banco de Dados pelo ID
app.delete('/v1/controle-jogos/desenvolvedor/:id', cors(), async function (request, response) {
        
        let idDesenvolvedor = request.params.id

        //Chama a função para listar os Desenvolvedores 
        let resultDesenvolvedor = await controllerDesenvolvedor.excluirDesenvolvedor(idDesenvolvedor)

        response.status(resultDesenvolvedor.status_code)
        response.json(resultDesenvolvedor)

})

//EndPoint para atualizar desenvolvedor no Banco de Dados pelo ID
app.put('/v1/controle-jogos/desenvolvedor/:id', cors(), bodyParserJSON, async function (request,response) {
        
        
        //Recebe content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe o ID do desenvolvedor
        let idDesenvolvedor = request.params.id

        //Recebe os dados do jogo encainhado no body da requisição
        let dadosBody = request.body

        let resultDesenvolvedor = await controllerDesenvolvedor.atualizarDesenvolvedor(dadosBody, idDesenvolvedor, contentType)
        
        response.status(resultDesenvolvedor.status_code)
        response.json(resultDesenvolvedor)

})

'==================================================================== CRUD AVALIAÇÃO ================================================================================='

//EndPoint para inserir uma avaliação no Banco de Dados 
app.post('/v1/controle-jogos/avaliacao', cors(), bodyParserJSON, async function (request,response) {
        
        //Recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do body da requisição para a controller inserir no Banco de Dados 
        let resultAvaliacao =  await controllerAvaliacao.inserirAvaliacao(dadosBody,contentType)

        response.status(resultAvaliacao.status_code)
        response.json(resultAvaliacao)

})

//EndPoint para listar todos avaliações no Banco de Dados
app.get('/v1/controle-jogos/avaliacao', cors(), async function (request, response) {
        
        //Chama a função para listar as avaliações
        let resultAvaliacao = await controllerAvaliacao.listarAvaliacao()

        response.status(resultAvaliacao.status_code)
        response.json(resultAvaliacao)

})

//EndPoint para buscar avaliação no Banco de Dados pelo ID
app.get('/v1/controle-jogos/avaliacao/:id', cors(), async function (request, response) {
        
        let idAvaliacao = request.params.id

        //Chama a função para listar as avaliações
        let resultAvaliacao = await controllerAvaliacao.buscarAvaliacao(idAvaliacao)

        response.status(resultAvaliacao.status_code)
        response.json(resultAvaliacao)

})

//EndPoint para deletaravaliação no Banco de Dados pelo ID
app.delete('/v1/controle-jogos/avaliacao/:id', cors(), async function (request, response) {
        
        let idAvaliacao = request.params.id

        //Chama a função para listar as avaliações
        let resultAvaliacao = await controllerAvaliacao.excluirAvaliacao(idAvaliacao)

        response.status(resultAvaliacao.status_code)
        response.json(resultAvaliacao)

})

//EndPoint para atualizar avaliação no Banco de Dados pelo ID
app.put('/v1/controle-jogos/avaliacao/:id', cors(), bodyParserJSON, async function (request,response) {
        
        
        //Recebe content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe o ID da avaliação
        let idAvaliacao = request.params.id

        //Recebe os dados do jogo encainhado no body da requisição
        let dadosBody = request.body

        let resultAvaliacao = await controllerAvaliacao.atualizarAvaliacao(dadosBody, idAvaliacao, contentType)
        
        response.status(resultAvaliacao.status_code)
        response.json(resultAvaliacao)

})

app.listen('8080', function(){
        console.log('API aguardando Requisições...')
})
