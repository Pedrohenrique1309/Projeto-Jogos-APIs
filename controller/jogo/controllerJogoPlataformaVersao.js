/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Jogo Plataforma Versao
 * Data: 18/05/2025
 * Autor: Pedro
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const jogoPlataformaVersaoDAO = require('../../model/DAO/jogo_plataforma_versao.js')
const { buscarAtualizacaoPorJogo } = require('./controllerPlataformaJogoAtualizacao.js')

//Função para tratar a inserção de uma nova plataforma e versao no DAO
const inserirJogoPlataformaVersao = async function(jogoPlataformaVersao, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    jogoPlataformaVersao.id_jogo       == ''  || jogoPlataformaVersao.id_jogo       == undefined    || jogoPlataformaVersao.id_jogo       == null || isNaN(jogoPlataformaVersao.id_jogo)       || jogoPlataformaVersao.id_jogo      <=0 ||
                    jogoPlataformaVersao.id_plataforma == ''  || jogoPlataformaVersao.id_plataforma == undefined    || jogoPlataformaVersao.id_plataforma == null || isNaN(jogoPlataformaVersao.id_plataforma) || plataformaJogoAtualizacao.id_jogo <=0 ||
                    jogoPlataformaVersao.id_versao     == ''  || jogoPlataformaVersao.id_versao     == undefined    || jogoPlataformaVersao.id_versao     == null || isNaN(jogoPlataformaVersao.id_versao)     || jogoPlataformaVersao.id_versao    <=0
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELD //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultJogoPlataformaVersao = await jogoPlataformaVersaoDAO.insertJogoPlataformaVersao(jogoPlataformaVersao)

                    if(resultJogoPlataformaVersao)
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

//Função para tratar a atualização de uma plataforma e de uma versao no DAO
const atualizarJogoPlataformaVersao = async function(id, jogoPlataformaVersao, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                 == ''  || id                                 == undefined    || id                                 == null || isNaN(id)                                 || id                                <=0 ||
                    jogoPlataformaVersao.id_jogo       == ''  || jogoPlataformaVersao.id_jogo       == undefined    || jogoPlataformaVersao.id_jogo       == null || isNaN(jogoPlataformaVersao.id_jogo)       || jogoPlataformaVersao.id_jogo      <=0 ||
                    jogoPlataformaVersao.id_plataforma == ''  || jogoPlataformaVersao.id_plataforma == undefined    || jogoPlataformaVersao.id_plataforma == null || isNaN(jogoPlataformaVersao.id_plataforma) || plataformaJogoAtualizacao.id_jogo <=0 ||
                    jogoPlataformaVersao.id_versao     == ''  || jogoPlataformaVersao.id_versao     == undefined    || jogoPlataformaVersao.id_versao     == null || isNaN(jogoPlataformaVersao.id_versao)     || jogoPlataformaVersao.id_versao    <=0
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultJogoPlataformaVersao = await jogoPlataformaVersaoDAO.selectByIdJogoPlataformaVersao(parseInt(id))

                    if(resultJogoPlataformaVersao != false || typeof(resultJogoPlataformaVersao) == 'object'){
                        if(resultJogoPlataformaVersao.length > 0 ){
                            //Update
                            //Adiciona o ID do desenvolvedor no JSON com os dados
                            plataformaVersao.id = parseInt(id)

                            let result = await jogoPlataformaVersaoDAO.updateJogoPlataformaVersao(jogoPlataformaVersao)

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

//Função para excluir uma jogoPlataformaVersao
const excluirJogoPlataformaVersao = async function(id){
    try{

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{

            //função que verifica se o id existe no banco de dados
            let resultJogoPlataformaVersao = await jogoPlataformaVersaoDAO.selectByIdJogoPlataformaVersao(parseInt(id)) 

            if (resultJogoPlataformaVersao != false || typeof(resultJogoPlataformaVersao) == 'object'){
                if (resultJogoPlataformaVersao.length > 0){
                    //chama a função para excluir no Banco de Dados e aguarda o retorno o retorno da função
                    let result = await jogoPlataformaVersaoDAO.deleteJogoPlataformaVersao(parseInt(id))

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

//Função para tratar o retorno de uma lista de plataformas e versoes do DAO
const listarJogoPlataformaVersao = async function(id){

    try{
            dadosJogoPlataformaVersao = {}

            let resultJogoPlataformaVersao = await jogoPlataformaVersaoDAO.selectByIdJogoPlataformaVersao(parseInt(id))
            if (resultJogoPlataformaVersao != false || typeof(resultJogoPlataformaVersao) == 'object'){
                if (resultJogoPlataformaVersao.length > 0){

                    //Criando JSON de retorno de dados da API
                    dadosJogoPlataformaVersao.status = true
                    dadosJogoPlataformaVersao.status_code = 200
                    dadosJogoPlataformaVersao.plataformaVersao = resultJogoPlataformaVersao

                    return dadosJogoPlataformaVersao //200

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


const buscarJogoPorPlataforma = async function(idPlataforma){

    try{

        if(idPlataforma == '' || idPlataforma == undefined || idPlataforma == null || isNaN(idPlataforma) || idPlataforma <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{

            dadosJogoPlataforma = {}
            let resultPlataforma = await jogoPlataformaVersaoDAO.selectJogoByPlataforma(parseInt(idPlataforma))

            if (resultPlataforma != false || typeof(resultPlataforma) == 'object'){
                if (resultPlataforma.length > 0){

                    //Criando JSON de retorno de dados da API
                    dadosJogoPlataforma.status = true
                    dadosJogoPlataforma.status_code = 200
                    dadosJogoPlataforma.plataforma = resultPlataforma

                    return dadosJogoPlataforma //200

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

const buscarVersaoPorJogo = async function(idJogo){

    try{

        if(idJogo == '' || idJogo == undefined || idJogo == null || isNaN(idJogo) || idJogo <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{

            dadosJogoVersao = {}
            let resultVersao = await jogoPlataformaVersaoDAO.selectVersaoByJogo(parseInt(idJogo))

            if (resultVersao != false || typeof(resultVersa) == 'object'){
                if (resultVersao.length > 0){

                    //Criando JSON de retorno de dados da API
                    dadosJogoVersao.status = true
                    dadosJogoVersao.status_code = 200
                    dadosJogoVersao.versao= resultVersao

                    return dadosJogoVersao //200

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
    inserirJogoPlataformaVersao,
    atualizarJogoPlataformaVersao,
    excluirJogoPlataformaVersao,
    listarJogoPlataformaVersao,
    buscarJogoPorPlataforma,
    buscarVersaoPorJogo
}