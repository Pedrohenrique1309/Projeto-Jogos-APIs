/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Plataforma Assinatura
 * Data: 19/05/2025
 * Autor: Pedro
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const plataformaAssinaturaDAO = require('../../model/DAO/plataforma_assinatura.js')
const { excluirCategoria } = require('../categoria/controllerCategoria.js')

//Função para tratar a inserção de uma nova assinatura no DAO
const inserirPlataformaAssinatura = async function(plataformaAssinatura, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    plataformaAssinatura.id_plataforma == ''  || plataformaAssinatura.id_plataforma  == undefined    || plataformaAssinatura.id_plataforma  == null || isNaN(plataformaAssinatura.id_plataforma)  || plataformaAssinatura.id_plataforma <=0 ||
                    plataformaAssinatura.id_assinatura == ''  ||  plataformaAssinatura.id_assinatura == undefined    ||  plataformaAssinatura.id_assinatura == null || isNaN( plataformaAssinatura.id_assinatura) || plataformaAssinatura.id_assinatura <=0
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELD //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultAssinatura = await plataformaAssinaturaDAO.insertPlataformaAssinatura(plataformaAssinatura)

                    if(resultAssinatura)
                        return MESSAGE.SUCESS_CREATE_ITEM //201
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de uma assinatura no DAO
const atualizarPlataformaAssinatura = async function(id, plataformaAssinatura, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                               == ''  || id                                == undefined    || id                                == null || isNaN(id)                                || id                               <= 0 ||
                    plataformaAssinatura.id_plataforma == ''  || plataformaAssinatura.id_plataforma  == undefined    || plataformaAssinatura.id_plataforma  == null || isNaN(plataformaAssinatura.id_plataforma)  || plataformaAssinatura.id_plataforma <=0 ||
                    plataformaAssinatura.id_assinatura == ''  || plataformaAssinatura.id_assinatura  == undefined    ||  plataformaAssinatura.id_assinatura == null || isNaN( plataformaAssinatura.id_assinatura) || plataformaAssinatura.id_assinatura <=0
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultAssinatura = await plataformaAssinaturaDAO.selectByIdPlataformaAssinatura(parseInt(id))

                    if(resultAssinatura != false || typeof(resultAssinatura) == 'object'){
                        if(resultAssinatura.length > 0 ){
                            //Update
                            //Adiciona o ID do desenvolvedor no JSON com os dados
                            assinatura.id = parseInt(id)

                            let result = await plataformaAssinaturaDAO.updatePlataformaAssinatura(plataformaAssinatura)

                            if(result){
                                return MESSAGE.SUCESS_UPDATE_ITEM //200
                            }else{
                                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return MESSAGE.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para excluir uma plataformaAssinatura 
const excluirPlataformaAssinatura  = async function(id){
    try{

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{

            //função que verifica se o id existe no banco de dados
            let resultPlataformaAssinatura = await plataformaAssinaturaDAO.selectByIdPlataformaAssinaturar(parseInt(id)) 

            if (resultPlataformaAssinatura != false || typeof(resultPlataformaAssinatura) == 'object'){
                if (resultPlataformaAssinatura.length == 0){
                    //chama a função para excluir no Banco de Dados e aguarda o retorno o retorno da função
                    let result = await plataformaAssinaturaDAO.deletePlataformaAssinatura(parseInt(id))

                    if(result)
                        return MESSAGE.SUCESS_DELETE_ITEM //200
                    else 
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500

                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404  
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }

        }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


//Função para tratar o retorno de uma lista de assinaturas do DAO
const listarPlataformaAssinatura = async function(id){

    try{
            dadosPlataformaAssinatura = {}

            let resultAssinatura = await plataformaAssinaturaDAO.selectByIdPlataformaAssinatura(parseInt(id))
            if (resultAssinatura != false || typeof(resultAssinatura) == 'object'){
                if (resultAssinatura.length > 0){

                    //Criando JSON de retorno de dados da API
                    dadosPlataformaAssinatura.status = true
                    dadosPlataformaAssinatura.status_code = 200
                    dadosPlataformaAssinatura.assinatura = resultAssinatura

                    return dadosPlataformaAssinatura //200

                }else{
                     return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para tratar o retono de uma assinatura filtrando pelo ID do DAO
const buscarPlataformaAssinatura = async function(id){

    try{

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{
           
            dadosPlataformaAssinatura = {}

            let resultAssinatura = await plataformaAssinaturaDAO.selectByIdPlataformaAssinatura(parseInt(id))
            if (resultDesenvolvedor != false || typeof(resultDesenvolvedor) == 'object'){
                if (resultDesenvolvedor.length > 0){

                    //Criando JSON de retorno de dados da API
                    dadosPlataformaAssinatura.status = true
                    dadosPlataformaAssinatura.status_code = 200
                    dadosPlataformaAssinatura.desenvolvedor = resultAssinatura

                    return dadosPlataformaAssinatura //200

                }else{
                    dadosPlataformaAssinatura = resultAssinatura                
                }

            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const buscarPlataformaPorAssinatura = async function(idAssinatura){

    try{

        if(idAssinatura == '' || idAssinatura == undefined || idAssinatura == null || isNaN(idAssinatura) || idAssinatura <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{

            dadosPlataformaAssinatura = {}
            let resultAssinatura = await plataformaAssinaturaDAO.selectPlataformaByAssinatura(parseInt(idAssinatura))

            if (resultAssinatura != false || typeof(resultAssinatura) == 'object'){
                if (resultAssinatura.length > 0){

                    //Criando JSON de retorno de dados da API
                    dadosPlataformaAssinatura.status = true
                    dadosPlataformaAssinatura.status_code = 200
                    dadosPlataformaAssinatura.desenvolvedor = resultAssinatura

                    return dadosPlataformaAssinatura //200

                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

module.exports = {
    inserirPlataformaAssinatura,
    atualizarPlataformaAssinatura,
    excluirPlataformaAssinatura,
    listarPlataformaAssinatura,
    buscarPlataformaAssinatura,
    buscarPlataformaPorAssinatura
}