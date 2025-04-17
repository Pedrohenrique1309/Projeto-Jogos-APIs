/**********************************************************************************************
 * Objetivo: Controller responável pela regra de negócio do CRUD da atualização
 * Data:03/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Import do arquivo de consfiguração para menssagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar CRUD no banco de dados
const atualizacaoDAO = require('../../model/DAO/atualizacao.js')

//Função para inserir uma nova atualizacao
const inserirAtualizacao = async function(atualizacao, contentType){

    try{
        
        if(contentType == 'application/json'){

            if( atualizacao.nome            == undefined ||  atualizacao.nome             == ''   || atualizacao.nome            == null   || atualizacao.nome.length   > 80   ||
                atualizacao.versao          == undefined ||  atualizacao.versao           == ''   || atualizacao.versao          == null   || atualizacao.versao.length > 10   ||
                atualizacao.tamanho         == undefined ||  atualizacao.tamanho.length   > 10    ||
                atualizacao.link            == undefined ||  atualizacao.link.length      > 200      
            ){
                return MESSAGE.ERROR_REQUIRED_FIELD //400
            }else{
                //encamnha os dados da nova atualizacao para ser inseridos no banco de dados
                let resultAtualizacao = await atualizacaoDAO.insertAtualizacao(atualizacao)

                if(resultAtualizacao){
                    return MESSAGE.SUCESS_CREATE_ITEM //201
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }

        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415 
        }

    } catch(error){
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }   

}

//Função para atualizar uma atualizacao
const atualizarAtualizacao = async function(atualizacao, id, contentType){

    try{

        if(contentType == 'application/json'){

            if( atualizacao.nome            == undefined ||  atualizacao.nome             == ''   || atualizacao.nome            == null   || atualizacao.nome.length   > 80   ||
                atualizacao.versao          == undefined ||  atualizacao.versao           == ''   || atualizacao.versao          == null   || atualizacao.versao.length > 10   ||
                atualizacao.tamanho         == undefined ||  atualizacao.tamanho.length   > 10    ||
                atualizacao.link            == undefined ||  atualizacao.link.length      > 200   ||
                id == undefined || id == ''  || id  == null || isNaN(id) || id <= 0
            ){

                return MESSAGE.ERROR_REQUIRED_FIELD //400

            }else{

                //Validar se o id existe no Banco de Dados
                let resultAtualizacao = await buscarAtualizacao(parseInt(id))


                if(resultAtualizacao.status_code == 200){
                    //Update

                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    atualizacao.id = parseInt(id)
                    let result = await atualizacaoDAO.updateAtualizacao(atualizacao)

                    if(result){
                        return MESSAGE.SUCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else if(resultAtualizacao.status_code == 404){
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

//Função para excluir uma atualizacao
const excluirAtualizacao = async function(id){

    try{
     
        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let resultAtualizacao = await buscarAtualizacao(parseInt(id))

            if(resultAtualizacao.status_code == 200){

                //Chama fução para deletar os dados da atualizacao
                let result = await atualizacaoDAO.deleteAtualizacao(id)

                if(result){
                    return MESSAGE.SUCESS_DELETE_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }

            }else if (resultAtualizacao.status_code == 404){
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
            
        }else{
            return ERROR_REQUIRED_FIELD //400
        }

    }catch(result){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todas as atualizacoes
const listarAtualizacao = async function (){

    try{

        let dadosAtualizacao = {}

        //Chama função para retornar os dados da atualizacao
        let resultAtualizacao = await atualizacaoDAO.selectAllAtualizacao()

        if(resultAtualizacao != false || typeof(resultAtualizacao) == 'object'){

            if(resultAtualizacao.length > 0){

                //Cria um objeto Json para retornar a lista de jogos
                dadosAtualizacao.status = true
                dadosAtualizacao.status_code = 200
                dadosAtualizacao.Items = resultAtualizacao.length
                dadosAtualizacao.updates = resultAtualizacao
                
                return  dadosAtualizacao//200
            }else{
    
                return MESSAGE.ERROR_NOT_FOUND //404
            }

        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
        
        
    }catch(error){
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER

    }

}

//Função para buscar uma atualizacao
const buscarAtualizacao = async function (id){
     
    try{

        
        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let dadosAtualizacao = {}

            //Chama fução para retornar os dados da atualizacao
            let resultAtualizacao = await atualizacaoDAO.selectByIdAtualizacao(id)

            if(resultAtualizacao !== String(resultAtualizacao)){                

                if(resultAtualizacao != false || typeof(resultAtualizacao) == 'object'){

                    if(resultAtualizacao.length > 0){
        
                        //Cria um objeto Json para retornar a atulizacao
                        dadosAtualizacao.status = true
                        dadosAtualizacao.status_code = 200
                        dadosAtualizacao.updates = resultAtualizacao
                        dadosAtualizacao.id = id
                        
                        return  dadosAtualizacao//200

                        
    
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
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    
}

module.exports = {
    inserirAtualizacao,
    atualizarAtualizacao,
    excluirAtualizacao,
    listarAtualizacao,
    buscarAtualizacao
}