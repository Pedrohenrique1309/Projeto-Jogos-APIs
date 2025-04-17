/**********************************************************************************************
 * Objetivo: Controller responável pela regra de negócio do CRUD da versao de jogos
 * Data:17/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Import do arquivo de consfiguração para menssagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar CRUD no banco de dados
const versaoJogoDAO = require('../../model/DAO/versaoJogo.js')


//Função para inserir uma nova versao de jogo
const inserirVersaoJogo = async function(versaoJogo, contentType){

    try{
        
        if(contentType == 'application/json'){

            if( versaoJogo.nome == undefined ||  versaoJogo.nome == ''   ||  versaoJogo.nome  == null   ||  versaoJogo.nome.length   > 45      
            ){
                return MESSAGE.ERROR_REQUIRED_FIELD //400
            }else{
                //encamnha os dados do novo jogo para ser inserido no banco de dados
                let resultVersaoJogo = await versaoJogoDAO.insertVersaoJogo(versaoJogo)

                if(resultVersaoJogo){
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

//Função para atualizar uma versao de jogo

const atualizarVersaoJogo = async function(versaoJogo, id, contentType){
    try{

        if(contentType == 'application/json'){

            if( 
                versaoJogo.nome == undefined ||  versaoJogo.nome == ''   ||  versaoJogo.nome  == null   ||  versaoJogo.nome.length   > 45  ||
                id == undefined || id == ''  || id  == null || isNaN(id) || id <= 0   
            ){
                return MESSAGE.ERROR_REQUIRED_FIELD //400
            }else{
                //encaminha os dados da nova versao de jogo para ser inserido no banco de dados
                let resultVersaoJogo = await versaoJogoDAO.updateVersaoJogo(versaoJogo)

                if(resultVersaoJogo){
                    return MESSAGE.SUCESS_UPDATE_ITEM //200
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

//Função para excluir uma versao de jogo
const excluirVersaoJogo = async function(id){

    try{

            if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){
    
                let resultVersaoJogo = await buscarVersaoJogo(parseInt(id))
    
                if(resultVersaoJogo.status_code == 200){
    
                    //Delete
    
                    //Chama fução para deletar os dados da versao do jogo
                    let result = await versaoJogoDAO.deleteVersaoJogo(id)
    
                    if(result){
                        return MESSAGE.SUCESS_DELETE_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
    
                }else if (resultVersaoJogo.status_code == 404){
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

//Função para retornar todas as versoes de jogos
const listarVersaoJogo = async function (){

    try{

        let dadosVersaoJogo = {}

        //Chama função para retornar os dados da versao do jogo
        let resultVersaoJogo = await versaoJogoDAO.selectAllVersaoJogo()

        if(resultVersaoJogo != false || typeof(resultVersaoJogo) == 'object'){

            if(resultVersaoJogo.length > 0){

                //Cria um objeto Json para retornar a lista de versoes de jogos
                dadosVersaoJogo.status = true
                dadosVersaoJogo.status_code = 200
                dadosVersaoJogo.Items = resultVersaoJogo.length
                dadosVersaoJogo.gameVersions = resultVersaoJogo
                
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

//Função para buscar uma versao de jogo
const buscarVersaoJogo = async function (id){
     
    try{

        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let dadosVersaoJogo = {}

            //Chama fução para retornar os dados da versao de jogo
            let resultVersaoJogo = await versaoJogoDAO.selectByIdVersaoJogo(id)

            if(resultVersaoJogo !== String(resultVersaoJogo)){
                
                if(resultVersaoJogo != false || typeof(resultVersaoJogo) == 'object'){

                    if(resultVersaoJogo.length > 0){
        
                        //Cria um objeto Json para retornar a lista de versao de jogo
                        dadosVersaoJogo.status = true
                        dadosVersaoJogo.status_code = 200
                        dadosVersaoJogo.gameVersions = dadosVersaoJogo
                        
                        return  dadosVersaoJogo//200

                        
    
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

