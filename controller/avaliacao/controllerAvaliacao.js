/**********************************************************************************************
 * Objetivo: Controller responável pela regra de negócio do CRUD da avaliacao
 * Data:15/05/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Import do arquivo de consfiguração para menssagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar CRUD no banco de dados
const avaliacaoDAO = require('../../model/DAO/avaliacao.js')

//Import da controller de jogo para criar a relacao com a avaliacao
const controllerJogo = require('../jogo/controllerJogo.js')

//Função para inserir uma nova avaliacao
const inserirAvaliacao = async function(avaliacao, contentType){

    try{
    
        
        if(contentType == 'application/json'){
           
            
            if(
                avaliacao.comentario  == undefined || avaliacao.comentario  == ''  || avaliacao.comentario == null || typeof avaliacao.comentario !== 'string'  || 
                avaliacao.pontuacao   == undefined || avaliacao.pontuacao   == ''  || avaliacao.pontuacao  == null || isNaN(avaliacao.pontuacao) ||
                avaliacao.id_jogo     == undefined || avaliacao.id_jogo     == ''  || avaliacao.id_jogo    == null || isNaN(avaliacao.id_jogo)   || avaliacao.id_jogo   <= 0    
            ){
                return MESSAGE.ERROR_REQUIRED_FIELD //400
            }else{
                
                
                //encamnha os dados da nova avaliacao para ser inserido no banco de dados
                let resultAvaliacao = await avaliacaoDAO.insertAvaliacao(avaliacao)
                
                if(resultAvaliacao){
                    return MESSAGE.SUCESS_CREATE_ITEM //201
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        

        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    
    } catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }   

}

//Função para atualizar uma avaliação
const atualizarAvaliacao = async function(avaliacao, id, contentType){

    try{

        if(contentType == 'application/json'){

            if( 
                id == undefined || id == ''  || id  == null || isNaN(id) || id <= 0 ||
                avaliacao.comentario  == undefined || avaliacao.comentario  == ''  || avaliacao.comentario == null || typeof avaliacao.comentario !== 'string'  || 
                avaliacao.pontuacao   == undefined || avaliacao.pontuacao   == ''  || avaliacao.pontuacao  == null || isNaN(avaliacao.pontuacao) ||
                avaliacao.id_jogo     == undefined || avaliacao.id_jogo     == ''  || avaliacao.id_jogo    == null || isNaN(avaliacao.id_jogo)   || avaliacao.id_jogo   <= 0    
            ){

                return MESSAGE.ERROR_REQUIRED_FIELD //400

            }else{

                //Validar se o id existe no Banco de Dados
                let resultAvaliacao = await buscarAvaliacao(parseInt(id))


                if(resultAvaliacao.status_code == 200){
                    //Update

                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    avaliacao.id = parseInt(id)
                    let result = await avaliacaoDAO.updatetAvaliacao(avaliacao)

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

//Função para excluir uma avaliacao
const excluirAvaliacao = async function(id){

    try{
     
        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let resultAvaliacao = await buscarAvaliacao(parseInt(id))

            if(resultAvaliacao.status_code == 200){

                //Delete
                //Chama fução para deletar os dados da avaliacao
                let result = await avaliacaoDAO.deleteAvaliacao(id)

                if(result){
                    return MESSAGE.SUCESS_DELETE_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }

            }else if (resultAvaliacao.status_code == 404){
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }

        }else{
            return ERROR_REQUIRED_FIELD //400
        }

    }catch(error){
        console.log(error);
        
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todas as avaliações
const listarAvaliacao = async function (){

    try{

        //Objeto array para utilizar forEach para carregar os dados da avaliacao e do jogo
        const arrayAvaliacoes = []

        let dadosAvaliacoes = {}

        //Chama função para retornar os dados da avaliacao
        let resultAvaliacao = await avaliacaoDAO.selectAllAvaliacao()
        
        if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){

            if(resultAvaliacao.length > 0){

                //Cria um objeto Json para retornar a lista de avaliacoes
                dadosAvaliacoes.status = true
                dadosAvaliacoes.status_code = 200
                dadosAvaliacoes.Items = resultAvaliacao.length

                //substitui o forEach para trabalhar com await e async
                for(itemAvaliacao of resultAvaliacao){

                    /************* RETORNA DADOS DO JOGO PARA COLOCAR NO RETORNO DA AVALIACAO****************/
                        
                        //Busca os dados do jogo na controller de avaliacao
                        //utilizando o ID do jogo (chave estrangeira)
                        let dadosJogo = await controllerJogo.buscarJogo(itemAvaliacao.id_jogo)

                        //Adicionao um atributo "jogo" no JSON de jogo
                        itemAvaliacao.jogo = dadosJogo.games

                        delete itemAvaliacao.id_jogo
                        
                        arrayAvaliacoes.push(itemAvaliacao)
                }

                dadosAvaliacoes.assessments = arrayAvaliacoes
                
                return  dadosAvaliacoes//200

            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }

        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
        
        
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}


//Função para buscar uma avaliação
const buscarAvaliacao = async function (id){
     
    try{

        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

        //Objeto array para utilizar forEach para carregar os dados da avaliacao e do jogo
        let arrayAvaliacoes = []

        let dadosAvaliacoes = {}

        //Chama função para retornar os dados da avaliacao
        let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(id)
            
        
        if(resultAvaliacao !== String(resultAvaliacao)){
            
            if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
            
                if(resultAvaliacao.length > 0){
            
                    //Cria um objeto Json para retornar a lista de avaliacoes
                    dadosAvaliacoes.status = true
                    dadosAvaliacoes.status_code = 200
                    dadosAvaliacoes.Items = resultAvaliacao.length

                    //substitui o forEach para trabalhar com await e async
                    for(itemAvaliacao of resultAvaliacao){

                        /************* RETORNA DADOS DO JOGO PARA COLOCAR NO RETORNO DA AVALIACAO****************/
                            
                            //Busca os dados do jogo na controller de avaliacao
                            //utilizando o ID do jogo (chave estrangeira)
                            let dadosJogo = await controllerJogo.buscarJogo(itemAvaliacao.id_jogo)

                            //Adicionao um atributo "jogo" no JSON de jogo
                            itemAvaliacao.jogo = dadosJogo.games

                            delete itemAvaliacao.id_jogo

                            arrayAvaliacoes.push(itemAvaliacao)

                    }

                    dadosAvaliacoes.assessments = arrayAvaliacoes
                    
                    return  dadosAvaliacoes//200

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
    inserirAvaliacao,
    atualizarAvaliacao,
    excluirAvaliacao,
    listarAvaliacao,
    buscarAvaliacao
}