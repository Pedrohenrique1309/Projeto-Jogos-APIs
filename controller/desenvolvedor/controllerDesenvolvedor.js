/**********************************************************************************************
 * Objetivo: Controller responável pela regra de negócio do CRUD do desenvolvedor
 * Data:20/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Import do arquivo de consfiguração para menssagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar CRUD no banco de dados
const desenvolvedorDAO = require('../../model/DAO/desenvolvedor.js')

//Função para inserir um novo Desenvolvedor
const inserirDesenvolvedor = async function(desenvolvedor, contentType){

    try{
        
        if(contentType == 'application/json'){

            if( desenvolvedor.nome           == undefined ||  desenvolvedor.nome          == ''   || desenvolvedor.nome          == null   || desenvolvedor.nome.length   > 80         ||
                desenvolvedor.fundacao       == undefined ||  desenvolvedor.fundacao      == ''   || desenvolvedor.fundacao      == null   || desenvolvedor.fundacao.length > 10       ||
                desenvolvedor.email_suporte  == undefined ||  desenvolvedor.email_suporte == ''   || desenvolvedor.email_suporte == null   || desenvolvedor.email_suporte.length > 200 ||
                desenvolvedor.presidente     == undefined ||  desenvolvedor.presidente    == ''   || desenvolvedor.presidente    == null   || desenvolvedor.presidente.length > 100   
            ){
                return MESSAGE.ERROR_REQUIRED_FIELD //400
            }else{
                //encamnha os dados do novo Desenvolvedor para ser inserido no banco de dados
                let resultDesenvolvedor = await desenvolvedorDAO.insertDesenvolvedor(desenvolvedor)

                if(resultDesenvolvedor){
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

//Função para atualizar um Desenvolvedor
const atualizarDesenvolvedor = async function(desenvolvedor, id, contentType){

    try{

        if(contentType == 'application/json'){

            if( 
                desenvolvedor.nome           == undefined ||  desenvolvedor.nome          == ''   || desenvolvedor.nome          == null   || desenvolvedor.nome.length   > 80         ||
                desenvolvedor.fundacao       == undefined ||  desenvolvedor.fundacao      == ''   || desenvolvedor.fundacao      == null   || desenvolvedor.fundacao.length > 10       ||
                desenvolvedor.email_suporte  == undefined ||  desenvolvedor.email_suporte == ''   || desenvolvedor.email_suporte == null   || desenvolvedor.email_suporte.length > 200 ||
                desenvolvedor.presidente     == undefined ||  desenvolvedor.presidente    == ''   || desenvolvedor.presidente    == null   || desenvolvedor.presidente.length > 100    ||
                id == undefined || id == ''  || id  == null || isNaN(id) || id <= 0
            ){

                return MESSAGE.ERROR_REQUIRED_FIELD //400

            }else{

                //Validar se o id existe no Banco de Dados
                let resultDesenvolvedor = await buscarDesenvolvedor(parseInt(id))


                if(resultDesenvolvedor.status_code == 200){
                    //Update

                    let result = await desenvolvedorDAO.updatetDesenvolvedor(desenvolvedor, id)

                    if(result){
                        return MESSAGE.SUCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else if(resultDesenvolvedor.status_code == 404){
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

//Função para excluir um Desenvolvedor
const excluirDesenvolvedor= async function(id){

    try{
     
        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let resultDesenvolvedor = await buscarDesenvolvedor(parseInt(id))

            if(resultDesenvolvedor.status_code == 200){

                //Delete

                //Chama fução para deletar os dados do Desenvolvedor
                let result = await desenvolvedorDAO.deleteDesenvolvedor(id)

                if(result){
                    return MESSAGE.SUCESS_DELETE_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }

            }else if (resultDesenvolvedor.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }

            
        }else{
            return ERROR_REQUIRED_FIELD //400
        }

    }catch(error){
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todos os Desenvolvedores
const listarDesenvolvedor = async function (){

    try{

        let dadosDesenvolvedores = {}

        //Chama função para retornar os dados do Desenvolvedor
        let resultDesenvolvedor = await desenvolvedorDAO.selectAllDesenvolvedor()

        if(resultDesenvolvedor != false || typeof(resultDesenvolvedor) == 'object'){

            if(resultDesenvolvedor.length > 0){

                //Cria um objeto Json para retornar a lista de Desenvolvedores
                dadosDesenvolvedores.status = true
                dadosDesenvolvedores.status_code = 200
                dadosDesenvolvedores.Items = resultDesenvolvedor.length
                dadosDesenvolvedores.developers = resultDesenvolvedor

                return  dadosDesenvolvedores//200
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

//Função para buscar um Desenvolvedor
const buscarDesenvolvedor = async function (id){
     
    try{

        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let dadosDesenvolvedores= {}

            //Chama fução para retornar os dados do jogo
            let resultDesenvolvedor = await desenvolvedorDAO.selectByIdDesenvolvedor(id)

            if(resultDesenvolvedor !== String(resultDesenvolvedor)){
                
                if(resultDesenvolvedor != false || typeof(resultDesenvolvedor) == 'object'){

                    if(resultDesenvolvedor.length > 0){

                        //Cria um objeto Json para retornar a lista de Desenvolvedores
                        dadosDesenvolvedores.status = true
                        dadosDesenvolvedores.status_code = 200
                        dadosDesenvolvedores.Items = resultDesenvolvedor.length
                        dadosDesenvolvedores.developers = resultDesenvolvedor
        
                        return  dadosDesenvolvedores//200
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
    inserirDesenvolvedor,
    atualizarDesenvolvedor,
    excluirDesenvolvedor,
    listarDesenvolvedor,
    buscarDesenvolvedor
}