/**********************************************************************************************
 * Objetivo: Controller responável pela regra de negócio do CRUD de assinaturas
 * Data:17/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Import do arquivo de consfiguração para menssagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar CRUD no banco de dados
const assinaturaDAO = require('../../model/DAO/assinatura.js')

//Função para inserir uma nova assinatura
const inserirAssinatura = async function(assinatura, contentType){

    try{

        if(contentType == 'application/json'){

            if( assinatura.nome == undefined ||  assinatura.nome == ''   || assinatura.nome == null   || assinatura.nome.length > 80 ){

                return MESSAGE.ERROR_REQUIRED_FIELD //400

            }else{
                //encaminha os dados da nova assinatura para ser inserido no banco de dados
                let resultAssinatura = await assinaturaDAO.insertAssinatura(assinatura)

                if(resultAssinatura){
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


//Função para atualizar uma atualizacao
const atualizarAssinatura = async function(assinatura, id, contentType){

    try{

        if(contentType == 'application/json'){

            if( assinatura.nome            == undefined ||  assinatura.nome             == ''   || assinatura.nome            == null   || assinatura.nome.length   > 80   ||
                id == undefined || id == ''  || id  == null || isNaN(id) || id <= 0
            ){

                return MESSAGE.ERROR_REQUIRED_FIELD //400

            }else{

                //Validar se o id existe no Banco de Dados
                let resultAssinatura = await buscarAssinatura(parseInt(id))


                if(resultAssinatura.status_code == 200){
                    //Update

                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    assinatura.id = parseInt(id)
                    let result = await assinaturaDAO.updateAssinatura(assinatura)

                    if(result){
                        return MESSAGE.SUCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else if(resultAssinatura.status_code == 404){
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

//Função para excluir uma assinatura
const excluirAssinatura = async function(id){

    try{
     
        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let resultAssinatura = await buscarAssinatura(parseInt(id))

            if(resultAssinatura.status_code == 200){

                //Delete

                //Chama fução para deletar os dados da assinatura
                let result = await assinaturaDAO.deleteAssinatura(id)

                if(result){
                    return MESSAGE.SUCESS_DELETE_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }

            }else if (resultAssinatura.status_code == 404){
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

//Função para retornar todas assinaturas
const listarAssinatura = async function (){

    try{

        let dadosAssinaturas = {}

        //Chama função para retornar os dados da assinatura
        let resultAssinatura = await assinaturaDAO.selectAllAssinatura()

        if(resultAssinatura != false || typeof(resultAssinatura) == 'object'){

            if(resultAssinatura.length > 0){

                //Cria um objeto Json para retornar a lista de assinaturas
                dadosAssinaturas.status = true
                dadosAssinaturas.status_code = 200
                dadosAssinaturas.Items = resultAssinatura.length
                dadosAssinaturas.subscriptions = resultAssinatura
                
                return  dadosAssinaturas//200
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

//Função para buscar uma assinatura pelo ID
const buscarAssinatura = async function (id){
     
    try{

        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let dadosAssinaturas = {}

            //Chama fução para retornar os dados da Assinatura
            let resultAssinatura = await assinaturaDAO.selectByIdAssinatura(id)

            if(resultAssinatura !== String(resultAssinatura)){
                
                if(resultAssinatura != false || typeof(resultAssinatura) == 'object'){

                    if(resultAssinatura.length > 0){
        
                        //Cria um objeto Json para retornar a lista de Assinaturas
                        dadosAssinaturas.status = true
                        dadosAssinaturas.status_code = 200
                        dadosAssinaturas.subscriptions = resultAssinatura
                        
                        return  dadosAssinaturas//200

                        
    
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
    inserirAssinatura,
    atualizarAssinatura,
    excluirAssinatura,
    listarAssinatura,
    buscarAssinatura
}