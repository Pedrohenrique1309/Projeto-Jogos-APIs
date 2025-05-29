/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Plataforma Jogo Atualizacao
 * Data: 18/05/2025
 * Autor: Pedro
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const plataformaJogoAtualizacaoDAO = require('../../model/DAO/plataforma_jogo_atualizacao.js')
const { buscarPlataformaPorJogo } = require('./controllerJogoPlataformaVersao.js')

//Função para tratar a inserção de uma nova plataforma e atualizacao no DAO
const inserirPlataformaJogoAtualizacao = async function(plataformaJogoAtualizacao, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    plataformaJogoAtualizacao.id_plataforma  == ''  || plataformaJogoAtualizacao.id_plataforma  == undefined    || plataformaJogoAtualizacao.id_plataforma  == null || isNaN(plataformaJogoAtualizacao.id_plataforma)  || plataformaJogoAtualizacao.id_plataforma  <=0 ||
                    plataformaJogoAtualizacao.id_jogo        == ''  || plataformaJogoAtualizacao.id_jogo        == undefined    || plataformaJogoAtualizacao.id_jogo        == null || isNaN(plataformaJogoAtualizacao.id_jogo)        || plataformaJogoAtualizacao.id_jogo        <=0 ||
                    plataformaJogoAtualizacao.id_atualizacao == ''  || plataformaJogoAtualizacao.id_atualizacao == undefined    || plataformaJogoAtualizacao.id_atualizacao == null || isNaN(plataformaJogoAtualizacao.id_atualizacao) || plataformaJogoAtualizacao.id_atualizacao <=0
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELD //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultPlataformaJogoAtuazalizacao = await plataformaJogoAtualizacaoDAO.insertPlataformaJogoAtualizacao(plataformaJogoAtualizacao)

                    if(resultPlataformaJogoAtuazalizacao)
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

//Função para tratar a atualização de uma plataforma e de uma atualizacao no DAO
const atualizarPlataformaJogoAtualizacao= async function(id, plataformaJogoAtualizacao, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                               == ''  || id                                == undefined    || id                                == null || isNaN(id)                                || id                               <= 0 ||
                    plataformaJogoAtualizacao.id_plataforma  == ''  || plataformaJogoAtualizacao.id_plataforma  == undefined    || plataformaJogoAtualizacao.id_plataforma  == null || isNaN(plataformaJogoAtualizacao.id_plataforma)  || plataformaJogoAtualizacao.id_plataforma  <=0 ||
                    plataformaJogoAtualizacao.id_jogo        == ''  || plataformaJogoAtualizacao.id_jogo        == undefined    || plataformaJogoAtualizacao.id_jogo        == null || isNaN(plataformaJogoAtualizacao.id_jogo)        || plataformaJogoAtualizacao.id_jogo        <=0 ||
                    plataformaJogoAtualizacao.id_atualizacao == ''  || plataformaJogoAtualizacao.id_atualizacao == undefined    || plataformaJogoAtualizacao.id_atualizacao == null || isNaN(plataformaJogoAtualizacao.id_atualizacao) || plataformaJogoAtualizacao.id_atualizacao <=0
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultPlataformaJogoAtuazalizacao = await plataformaJogoAtualizacaoDAO.selectByIdPlataformaJogoAtuazalizacao(parseInt(id))

                    if(resultPlataformaJogoAtuazalizacao != false || typeof(resultPlataformaJogoAtuazalizacao) == 'object'){
                        if(resultPlataformaJogoAtuazalizacao.length > 0 ){
                            //Update
                            //Adiciona o ID do desenvolvedor no JSON com os dados
                            plataformaAtualizacao.id = parseInt(id)

                            let result = await plataformaJogoAtualizacaoDAO.updatePlataformaJogoAtuazalizacao(plataformaAtualizacao)

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

//Função para excluir uma plataformaJogoAtualizacao
const excluirPlataformaJogoAtualizacao = async function(id){
    try{

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{

            //função que verifica se o id existe no banco de dados
            let resultPlataformaJogoAtualizacao = await plataformaJogoAtualizacaoDAO.selectByIdPlataformaJogoAtuazalizacao(parseInt(id)) 

            if (resultPlataformaJogoAtualizacao != false || typeof(resultPlataformaJogoAtualizacao) == 'object'){
                if (resultPlataformaJogoAtualizacao.length > 0){
                    //chama a função para excluir no Banco de Dados e aguarda o retorno o retorno da função
                    let result = await plataformaJogoAtualizacaoDAO.deletePlataformaJogoAtuazalizacao(parseInt(id))

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

//Função para tratar o retorno de uma lista de plataformas e atualizacoes do DAO
const listarPlataformaJogoAtualizacao = async function(id){

    try{
            dadosPlataformaJogoAtualizacao = {}

            let resultPlataformaJogoAtualizacao = await plataformaJogoAtualizacaoDAO.selectByIdPlataformaJogoAtuazalizacao(parseInt(id))
            if (resultPlataformaJogoAtualizacao != false || typeof(resultPlataformaJogoAtualizacao) == 'object'){
                if (resultPlataformaJogoAtualizacao.length > 0){

                    //Criando JSON de retorno de dados da API
                    dadosPlataformaJogoAtualizacao.status = true
                    dadosPlataformaJogoAtualizacao.status_code = 200
                    dadosPlataformaJogoAtualizacao.plataformaAtualizacao = resultPlataformaJogoAtualizacao

                    return dadosPlataformaJogoAtualizacao //200

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
            let resultPlataforma = await plataformaJogoAtualizacaoDAO.selectJogoByPlataforma(parseInt(idPlataforma))

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

const buscarAtualizacaoPorJogo = async function(idJogo){

    try{

        if(idJogo == '' || idJogo == undefined || idJogo == null || isNaN(idJogo) || idJogo <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{

            dadosJogoAtualizacao = {}
            let resultAtualizacao = await plataformaJogoAtualizacaoDAO.selectAtualizacaoByJogo(parseInt(idJogo))

            if (resultAtualizacao != false || typeof(resultAtualizacao) == 'object'){
                if (resultAtualizacao.length > 0){

                    //Criando JSON de retorno de dados da API
                    dadosJogoAtualizacao.status = true
                    dadosJogoAtualizacao.status_code = 200
                    dadosJogoAtualizacao.atualizacao= resultAtualizacao

                    return dadosJogoAtualizacao //200

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
    inserirPlataformaJogoAtualizacao,
    atualizarPlataformaJogoAtualizacao,
    excluirPlataformaJogoAtualizacao,
    listarPlataformaJogoAtualizacao,
    buscarJogoPorPlataforma,
    buscarPlataformaPorJogo,
    buscarAtualizacaoPorJogo
}