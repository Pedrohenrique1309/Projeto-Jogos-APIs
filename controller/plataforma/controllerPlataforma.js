/**********************************************************************************************
 * Objetivo: Controller responável pela regra de negócio do CRUD da plataforma
 * Data:17/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Import do arquivo de consfiguração para menssagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar CRUD no banco de dados
const plataformaDAO = require('../../model/DAO/plataforma.js')
const controllerPlataformaAssinatura = require('./controllerPlataformaAssinatura.js')

//Função para inserir uma nova plataforma
const inserirPlataforma = async function(plataforma, contentType){

    try{
        
        if(contentType == 'application/json'){

            if( 
                plataforma.nome == undefined ||  plataforma.nome == ''   || plataforma.nome == null   || plataforma.nome.length   > 30     
            ){
                return MESSAGE.ERROR_REQUIRED_FIELD //400
            }else{
                //encamnha os dados da nova platafoRma para ser inserido no banco de dados
                let resultPlataforma = await plataformaDAO.insertPlataforma(plataforma)

                if(resultPlataforma){
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

//Função para atualizar uma plataforma
const atualizarPlataforma = async function(plataforma, id, contentType){

    try{

        if(contentType == 'application/json'){

            if(
                 plataforma.nome == undefined ||  plataforma.nome == ''   || plataforma.nome == null   || plataforma.nome.length   > 30   
            ){

                return MESSAGE.ERROR_REQUIRED_FIELD //400

            }else{

                //Validar se o id existe no Banco de Dados
                let resultPlataforma = await buscarPlataforma(parseInt(id))


                if(resultPlataforma.status_code == 200){
                    //Update

                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    plataforma.id = parseInt(id)
                    let result = await plataformaDAO.updatetPlataforma(plataforma)

                    if(result){
                        return MESSAGE.SUCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else if(resultPlataforma.status_code == 404){
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

//Função para excluir uma plataforma
const excluirPlataforma = async function(id){

    try{
     
        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let resultPlataforma = await buscarPlataforma(parseInt(id))

            if(resultPlataforma.status_code == 200){


                //Chama fução para deletar os dados da plataforma
                let result = await plataformaDAO.deletePlataforma(id)

                if(result){
                    return MESSAGE.SUCESS_DELETE_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }

            }else if (resultPlataforma .status_code == 404){
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

//Função para retornar todas as plataformas
const listarPlataforma  = async function (){

    try{

        let dadosPlataforma  = {}

        //Chama função para retornar os dados da plataforma 
        let resultPlataforma  = await plataformaDAO.selectAllPlataforma()

        
        if(resultPlataforma  != false || typeof(resultPlataforma ) == 'object'){

            if(resultPlataforma.length > 0){

                //Cria um objeto Json para retornar a lista de plataformas
                dadosPlataforma.status = true
                dadosPlataforma.status_code = 200
                dadosPlataforma.Items = resultPlataforma.length

                for (itemPlataforma of resultPlataforma){

                    let dadosAssinatura = await controllerPlataformaAssinatura.buscarPlataformaPorAssinatura(itemPlataforma.id_assinatura)

                    itemPlataforma.ssinatura = dadosAssinatura.signatures

                }

                dadosPlataforma.platforms = resultPlataforma
                
                return  dadosPlataforma//200
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

//Função para buscar uma plataforma
const buscarPlataforma = async function (id){
     
    try{

        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let dadosPlataforma = {}

            //Chama fução para retornar os dados da Plataforma
            let resultPlataforma = await plataformaDAO.selectByIdPlataforma(id)

            if(resultPlataforma !== String(resultPlataforma)){
                
                if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){

                    if(resultPlataforma.length > 0){
        
                        dadosPlataforma.status = true
                        dadosPlataforma.status_code = 200
                        dadosPlataforma.Items = resultPlataforma.length

                        for (itemPlataforma of resultPlataforma){

                            let dadosAssinatura = await controllerPlataformaAssinatura.buscarPlataformaPorAssinatura(itemPlataforma.id_assinatura)

                            itemPlataforma.ssinatura = dadosAssinatura.signatures

                        }

                        dadosPlataforma.platforms = resultPlataforma
                        
                        return  dadosPlataforma//200
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
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}

module.exports = {
    inserirPlataforma,
    atualizarPlataforma,
    excluirPlataforma,
    listarPlataforma,
    buscarPlataforma
}