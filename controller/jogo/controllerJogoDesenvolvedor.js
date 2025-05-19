/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Jogo Desenvolvedor
 * Data: 18/05/2025
 * Autor: Pedro
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const jogoDesenvolvedorDAO = require('../../model/DAO/jogo_desenvolvedor.js')

//Função para tratar a inserção de um novo desenvolvedor no DAO
const inserirJogoDesenvolvedor = async function(jogoDesenvoldor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    jogoDesenvoldor.id_desenvolvedor == ''  || jogoDesenvoldor.id_desenvolvedor  == undefined    || jogoDesenvoldor.id_desenvolvedor  == null || isNaN(jogoDesenvoldor.id_desenvolvedor)  || jogoDesenvoldor.id_desenvolvedor <=0 ||
                    jogoDesenvoldor.id_jogo          == ''  || jogoDesenvoldor.id_jogo           == undefined    || jogoDesenvoldor.id_jogo           == null || isNaN(jogoDesenvoldor.id_jogo)           || jogoDesenvoldor.id_jogo          <=0
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELD //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultDesenvolvedor = await jogoDesenvolvedorDAO.insertJogoDesenvolvedor(jogoDesenvoldor)

                    if(resultDesenvolvedor)
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

//Função para tratar a atualização de um desenvolvedor no DAO
const atualizarJogoDesenvolvedor = async function(id, jogoDesenvoldor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                               == ''  || id                                == undefined    || id                                == null || isNaN(id)                                || id                               <= 0 ||
                    jogoDesenvoldor.id_desenvolvedor == ''  || jogoDesenvoldor.id_desenvolvedor  == undefined    || jogoDesenvoldor.id_desenvolvedor  == null || isNaN(jogoDesenvoldor.id_desenvolvedor)  || jogoDesenvoldor.id_desenvolvedor <= 0 ||
                    jogoDesenvoldor.id_jogo          == ''  || jogoDesenvoldor.id_jogo           == undefined    || jogoDesenvoldor.id_jogo           == null || isNaN(jogoDesenvoldor.id_jogo)           || jogoDesenvoldor.id_jogo          <= 0
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultDesenvolvedor = await jogoDesenvoldorDAO.selectByIdJogoDesenvolvedor(parseInt(id))

                    if(resultDesenvolvedor != false || typeof(resultDesenvolvedor) == 'object'){
                        if(resultDesenvolvedor.length > 0 ){
                            //Update
                            //Adiciona o ID do desenvolvedor no JSON com os dados
                            desenvolvedor.id = parseInt(id)

                            let result = await jogoDesenvoldorDAO.updateJogoDesenvolvedor(jogoDesenvoldor)

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

//Função para excluir um JogoDesenvolvedor  
const excluirJogoDesenvolvedor = async function(id){
    try{

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{

            //função que verifica se o id existe no banco de dados
            let resultJogoDesenvolvedor = await jogoDesenvolvedorDAO.selectByIdJogoDesenvolvedor(parseInt(id)) 

            if (resultJogoDesenvolvedor != false || typeof(resultJogoDesenvolvedor) == 'object'){
                if (resultJogoDesenvolvedor.length == 0){
                    //chama a função para excluir no Banco de Dados e aguarda o retorno o retorno da função
                    let result = await jogoDesenvolvedorDAO.deleteJogoDesenvolvedor(parseInt(id))

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


//Função para tratar o retorno de uma lista de desenvolvedores do DAO
const listarJogoDesenvolvedor = async function(id){

    try{
            dadosJogoDesenvolvedor = {}

            let resultDesenvolvedor = await jogoDesenvolvedorDAO.selectByIdJogoDesenvolvedor(parseInt(id))
            if (resultDesenvolvedor != false || typeof(resultDesenvolvedor) == 'object'){
                if (resultDesenvolvedor.length > 0){

                    //Criando JSON de retorno de dados da API
                    dadosJogoDesenvolvedor.status = true
                    dadosJogoDesenvolvedor.status_code = 200
                    dadosJogoDesenvolvedor.desenvolvedor = resultDesenvolvedor

                    return dadosJogoDesenvolvedor //200

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

//Função para tratar o retono de um desenvolvedor filtrando pelo ID do DAO
const buscarJogoDesenvolvedor = async function(id){

    try{

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{
           
            dadosJogoDesenvolvedor = {}

            let resultDesenvolvedor = await jogoDesenvolvedorDAO.selectByIdJogoDesenvolvedor(parseInt(id))
            if (resultDesenvolvedor != false || typeof(resultDesenvolvedor) == 'object'){
                if (resultDesenvolvedor.length > 0){

                    //Criando JSON de retorno de dados da API
                    dadosJogoDesenvolvedor.status = true
                    dadosJogoDesenvolvedor.status_code = 200
                    dadosJogoDesenvolvedor.desenvolvedor = resultDesenvolvedor

                    return dadosJogoDesenvolvedor //200

                }else{
                    dadosJogoDesenvolvedorr = resultDesenvolvedor                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const buscarJogoPorDesenvolvedor = async function(idDesenvolvedor){

    try{

        if(idDesenvolvedor == '' || idDesenvolvedor == undefined || idDesenvolvedor == null || isNaN(idDesenvolvedor) || idDesenvolvedor <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{

            dadosJogoDesenvolvedor = {}
            let resultDesenvolvedor = await jogoDesenvolvedorDAO.selectJogoByDesenvolvedor(parseInt(idDesenvolvedor))

            if (resultDesenvolvedor != false || typeof(resultDesenvolvedor) == 'object'){
                if (resultDesenvolvedor.length > 0){

                    //Criando JSON de retorno de dados da API
                    dadosJogoDesenvolvedor.status = true
                    dadosJogoDesenvolvedor.status_code = 200
                    dadosJogoDesenvolvedor.desenvolvedor = resultDesenvolvedor

                    return dadosJogoDesenvolvedor //200

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
    inserirJogoDesenvolvedor,
    atualizarJogoDesenvolvedor,
    excluirJogoDesenvolvedor,
    listarJogoDesenvolvedor,
    buscarJogoDesenvolvedor,
    buscarJogoPorDesenvolvedor
}

