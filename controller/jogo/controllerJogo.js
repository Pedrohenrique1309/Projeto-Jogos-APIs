/**********************************************************************************************
 * Objetivo: Controller responável pela regra de negócio do CRUD do jogo
 * Data:13/03/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Import do arquivo de consfiguração para menssagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar CRUD no banco de dados
const jogoDAO = require('../../model/DAO/jogo.js')

//Import de controllers para criar as relações com o jogo
const controllerFaixaEtaria = require('../faixaEtaria/controllerFaixaEtaria.js')
const controllerJogoCategoria = require('./controllerJogoCategoria.js')
const controllerJogoDesenvolvedor = require('./controllerJogoDesenvolvedor.js')
const controllerPlataformaJogoAtualizacao = require('./controllerPlataformaJogoAtualizacao.js')
const controllerJogoPlataformaVersao = require('./controllerJogoPlataformaVersao.js')

//Função para inserir um novo jogo
const inserirJogo = async function(jogo, contentType){

    try{
        
        if(contentType == 'application/json'){

            if( jogo.nome            == undefined  ||  jogo.nome             == ''   || jogo.nome            == null   || jogo.nome.length   > 80   ||
                jogo.data_lancamento == undefined  ||  jogo.data_lancamento  == ''   || jogo.data_lancamento == null   || jogo.versao.length > 10   ||
                jogo.versao          == undefined  ||  jogo.versao           == ''   || jogo.versao          == null   || jogo.versao.length > 10   ||
                jogo.tamanho         == undefined  ||  jogo.tamanho.length   > 10    ||
                jogo.descricao       == undefined  || 
                jogo.foto_capa       == undefined  ||  jogo.foto_capa.length > 200   ||
                jogo.link            == undefined  ||  jogo.link.length      > 200   ||
                jogo.id_faixa_etaria == undefined ||  jogo.id_faixa_etaria == ''    || jogo.id_faixa_etaria  == null || isNaN(jogo.id_faixa_etaria) || jogo.id_faixa_etaria <= 0 
            ){
                return MESSAGE.ERROR_REQUIRED_FIELD //400
            }else{
                //encamnha os dados do novo jogo para ser inserido no banco de dados
                let resultJogo = await jogoDAO.insertJogo(jogo)

                if(resultJogo){
                    
                    for(itemCategoria of jogo.categoria){
                            itemCategoria.id_jogo = resultJogo.id

                            let resultItemCategoria = await controllerJogoCategoria.inserirJogoCategoria(itemCategoria, contentType)

                            if(!resultItemCategoria){
                                return MESSAGE.ERROR_CONTENT_TYPE
                            }
                    }

                    for(itemDesenvolvedor of jogo.desenvolvedor){
                        itemDesenvolvedor.id_jogo = resultJogo.id

                        let resultItemDesenvolvedor = await controllerJogoDesenvolvedor.inserirJogoDesenvolvedor(itemDesenvolvedor, contentType)

                        if(!resultItemDesenvolvedor){
                            return MESSAGE.ERROR_CONTENT_TYPE
                        }
                    }

                    for(plataformaVersao of jogo.plataforma_versao){

                        plataformaVersao.id_jogo = resultJogo.id

                        let resultItemPlataformaVersao = await controllerJogoPlataformaVersao.inserirJogoPlataformaVersao( plataformaVersao, contentType)

                        if(!resultItemPlataformaVersao){
                            return MESSAGE.ERROR_CONTENT_TYPE
                        }
                    }

                    for(itemPlataformaAtualizacao of jogo.plataforma_atualizacao){
                        itemPlataformaAtualizacao.id_jogo = resultJogo.id

                        let resultItemPlataformaAtualizacao = await controllerPlataformaJogoAtualizacao.inserirPlataformaJogoAtualizacao(itemPlataformaAtualizacao, contentType)

                        if(!resultItemPlataformaAtualizacao){
                            return MESSAGE.ERROR_CONTENT_TYPE
                        }
                    }




                    return MESSAGE.SUCESS_CREATE_ITEM //201
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        

        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    
    } catch(error){
        console.log(error);
        
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }   

}

//Função para atualizar um jogo
const atualizarJogo = async function(jogo, id, contentType){

    try{

        if(contentType == 'application/json'){

            if( 
                id == undefined || id == ''  || id  == null || isNaN(id) || id <= 0 ||
                jogo.nome            == undefined ||  jogo.nome             == ''   || jogo.nome            == null   || jogo.nome.length   > 80   ||
                jogo.data_lancamento == undefined ||  jogo.data_lancamento  == ''   || jogo.data_lancamento == null   || jogo.versao.length > 10   ||
                jogo.versao          == undefined ||  jogo.versao           == ''   || jogo.versao          == null   || jogo.versao.length > 10   ||
                jogo.tamanho         == undefined ||  jogo.tamanho.length   > 10    ||
                jogo.descricao       == undefined || 
                jogo.foto_capa       == undefined ||  jogo.foto_capa.length > 200   ||
                jogo.link            == undefined ||  jogo.link.length      > 200   ||
                jogo.id_faixa_etaria == undefined ||  jogo.id_faixa_etaria == ''    || jogo.id_faixa_etaria  == null || isNaN(jogo.id_faixa_etaria) || jogo.id_faixa_etaria <= 0 
            ){

                return MESSAGE.ERROR_REQUIRED_FIELD //400

            }else{

                //Validar se o id existe no Banco de Dados
                let resultJogo = await buscarJogo(parseInt(id))


                if(resultJogo.status_code == 200){
                    //Update

                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    jogo.id = parseInt(id)
                    let result = await jogoDAO.updatetJogo(jogo)

                    if(result){
                        return MESSAGE.SUCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else if(resultJogo.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //400
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para excluir um jogo
const excluirJogo = async function(id){

    try{
     
        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let resultJogo = await buscarJogo(parseInt(id))

            if(resultJogo.status_code == 200){

                //Delete

                //Chama fução para deletar os dados do jogo
                let result = await jogoDAO.deleteJogo(id)

                if(result){
                    return MESSAGE.SUCESS_DELETE_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }

            }else if (resultJogo.status_code == 404){
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }

            /*
            //chama a função para verificar se o id existe no bd
            let verificacao = await jogoDAO.selectByIdJogo(id)

            if(verificacao!== String(verificacao) ){

                if(verificacao != false || typeof(verificacao) == 'object'){

                    if(verificacao.length> 0){

                        //Chama fução para deletar os dados do jogo
                        let resultJogo = await jogoDAO.deleteJogo(id)

                        if(resultJogo){

                            return MESSAGE.SUCESS_DELETE_ITEM //200
        
                        }else{
                
                            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                        
                    }else{
                        return MESSAGE.ERROR_RIQUERIDE_VALUE //400
                    }    
        
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE//415
            }*/
            
        }else{
            return ERROR_REQUIRED_FIELD //400
        }

    }catch(error){
        console.log(error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todos os jogos
const listarJogo = async function (){

    try{

        //Objeto array para utilizar forEach para carregar os dados do jogo e faixa etária
        let arrayJogos = []

        let dadosJogos = {}

        //Chama função para retornar os dados do jogo
        let resultJogo = await jogoDAO.selectAllJogo()

        if(resultJogo != false || typeof(resultJogo) == 'object'){

            if(resultJogo.length > 0){

                //Cria um objeto Json para retornar a lista de jogos
                dadosJogos.status = true
                dadosJogos.status_code = 200
                dadosJogos.Items = resultJogo.length
                //dadosJogos.games = resultJogo

                //substitui o forEach para trabalhar com await e async
                for(itemJogo of resultJogo){

                    delete itemJogo.versao

                    /************* RETORNA DADOS DA FAIXA ETARIA PARA COLOCAR NO RETORNO DO JOGO****************/
                        
                    //Busca os dados da faixa etária na controller de faixa etaria
                        //utilizando o ID da faixa etária (chave estrangeira)
                        let dadosFaixaEtaria = await controllerFaixaEtaria.buscarFaixaEtaria(itemJogo.id_faixa_etaria)

                        //Adicionao um atributo "faixa_etaria" no JSON de jogo
                        itemJogo.faixa_etaria = dadosFaixaEtaria.ageGroups
                        
                        //Remove o atributo id_faixa_etaria do JSON de jogo, pois ja temos o ID dentro dos dados da faixa etária
                        delete itemJogo.id_faixa_etaria

                    /**************  RETORNA OS DADOS DA CATEGORIA PARA COLOCAR NO RETORNO DO JOGO **********/
                    
                        let dadosJogoCategoria = await controllerJogoCategoria.buscarCategoriaPorJogo(itemJogo.id)  
                        itemJogo.categoria = dadosJogoCategoria.categoria

                    
                    /**************  RETORNA OS DADOS DO DESENVOLVEDOR PARA COLOCAR NO RETORNO DO JOGO **********/

                        let dadosJogoDesenvolvedor = await controllerJogoDesenvolvedor.buscarDesenvolvedorPorJogo(itemJogo.id)
                        itemJogo.desenvolvedor = dadosJogoDesenvolvedor.desenvolvedor

                    /**************  RETORNA OS DADOS DA PLATAFORMA PARA COLOCAR NO RETORNO DO JOGO **********/

                        let dadosPlataforma = await controllerPlataformaJogoAtualizacao.buscarPlataformaPorJogo(itemJogo.id)
                        itemJogo.plataforma = dadosPlataforma.plataforma

                    /**************  RETORNA OS DADOS DA ATUALIZACAO PARA COLOCAR NO RETORNO DO JOGO **********/

                        let dadosAtualizacao = await controllerPlataformaJogoAtualizacao.buscarAtualizacaoPorJogo(itemJogo.id)
                        itemJogo.atualizacao = dadosAtualizacao.atualizacao

        
                    /**************  RETORNA OS DADOS DA VERSÃO PARA COLOCAR NO RETORNO DO JOGO **********/

                        let dadosVersao = await controllerJogoPlataformaVersao.buscarVersaoPorJogo(itemJogo.id)                    
                        itemJogo.versao = dadosVersao.versao

                        
                    arrayJogos.push(itemJogo)

                }

                //Adiciona o novo objeto array de jogos no JSON para retornar ao APP
                dadosJogos.games = arrayJogos
                
                return  dadosJogos//200

            }else{
    
                return MESSAGE.ERROR_NOT_FOUND //404
            }

        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
        
        
    }catch(erro){

        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER

    }

}

//Função para buscar um jogo
const buscarJogo = async function (id){
     
    try{

        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let arrayJogos = []

            let dadosJogos = {}

            //Chama fução para retornar os dados do jogo
            let resultJogo = await jogoDAO.selectByIdJogo(id)

            if(resultJogo !== String(resultJogo)){
                
                if(resultJogo != false || typeof(resultJogo) == 'object'){

                    if(resultJogo.length > 0){

                        //Cria um objeto Json para retornar a lista de jogos
                        dadosJogos.status = true
                        dadosJogos.status_code = 200
                        dadosJogos.Items = resultJogo.length
                        //dadosJogos.games = resultJogo
        
                        //substitui o forEach para trabalhar com await e async
                        for(itemJogo of resultJogo){
        
                            delete itemJogo.versao

                            /************* RETORNA DADOS DA FAIXA ETARIA PARA COLOCAR NO RETORNO DO JOGO****************/
                                
                            //Busca os dados da faixa etária na controller de faixa etaria
                                //utilizando o ID da faixa etária (chave estrangeira)
                                let dadosFaixaEtaria = await controllerFaixaEtaria.buscarFaixaEtaria(itemJogo.id_faixa_etaria)
        
                                //Adicionao um atributo "faixa_etaria" no JSON de jogo
                                itemJogo.faixa_etaria = dadosFaixaEtaria.ageGroups
                                
                                //Remove o atributo id_faixa_etaria do JSON de jogo, pois ja temos o ID dentro dos dados da faixa etária
                                delete itemJogo.id_faixa_etaria
        
                            /**************  RETORNA OS DADOS DA CATEGORIA PARA COLOCAR NO RETORNO DO JOGO **********/
                            
                                let dadosJogoCategoria = await controllerJogoCategoria.buscarCategoriaPorJogo(itemJogo.id)  
                                itemJogo.categoria = dadosJogoCategoria.categoria
        
                            
                            /**************  RETORNA OS DADOS DO DESENVOLVEDOR PARA COLOCAR NO RETORNO DO JOGO **********/
        
                                let dadosJogoDesenvolvedor = await controllerJogoDesenvolvedor.buscarDesenvolvedorPorJogo(itemJogo.id)
                                itemJogo.desenvolvedor = dadosJogoDesenvolvedor.desenvolvedor
        
                            /**************  RETORNA OS DADOS DA PLATAFORMA PARA COLOCAR NO RETORNO DO JOGO **********/
        
                                let dadosPlataforma = await controllerPlataformaJogoAtualizacao.buscarPlataformaPorJogo(itemJogo.id)
                                itemJogo.plataforma = dadosPlataforma.plataforma
        
                            /**************  RETORNA OS DADOS DA ATUALIZACAO PARA COLOCAR NO RETORNO DO JOGO **********/
        
                                let dadosAtualizacao = await controllerPlataformaJogoAtualizacao.buscarAtualizacaoPorJogo(itemJogo.id)
                                itemJogo.atualizacao = dadosAtualizacao.atualizacao
        
                
                            /**************  RETORNA OS DADOS DA VERSÃO PARA COLOCAR NO RETORNO DO JOGO **********/
        
                                let dadosVersao = await controllerJogoPlataformaVersao.buscarVersaoPorJogo(itemJogo.id)                    
                                itemJogo.versao = dadosVersao.versao
        
                                
                            arrayJogos.push(itemJogo)
        
                        }
        
                        //Adiciona o novo objeto array de jogos no JSON para retornar ao APP
                        dadosJogos.games = arrayJogos
                        
                        return  dadosJogos//200        
                        
    
                    }else{
            
                        return MESSAGE.ERROR_NOT_FOUND //404
                    }
        
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE//415
            }
            
        }else{
            return ERROR_REQUIRED_FIELD //400
        }


    }catch(result){

    }
    
}

module.exports = {
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarJogo,
    buscarJogo
}