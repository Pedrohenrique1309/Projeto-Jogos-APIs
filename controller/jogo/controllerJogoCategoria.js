/**********************************************************************************************
 * Objetivo: Controller responável pela regra de negócio do CRUD da JogoCategoria
 * Data:15/05/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Import do arquivo de consfiguração para menssagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar CRUD no banco de dados
const jogoCategoriaDAO = require('../../model/DAO/jogo_categoria.js')

//Função para inserir um novo JogoCategoria
const inserirJogoCategoria = async function(jogoCategoria, contentType){

    try{
     
        if (String(contentType).toLocaleLowerCase() == 'application/json'){

            if (
                jogoCategoria.id_jogo       == ''          || jogoCategoria.id_jogo      == undefined    || jogoCategoria.id_jogo       == null || isNaN(jogoCategoria.id_jogo )      || jogoCategoria.id_jogo       <=0 ||
                jogoCategoria.id_categoria  == ''          || jogoCategoria.id_categoria == undefined    || jogoCategoria.id_categoria  == null || isNaN(jogoCategoria.id_categoria ) || jogoCategoria.id_categoria  <=0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELD //400

                }else{
                    //chama a função para inserir no Banco de Dados e aguarda o retorno o retorno da função
                    let resultJogoCategoria = await jogoCategoriaDAO.insertJogoCategoria(jogoCategoria)

                    if(resultJogoCategoria)
                        return MESSAGE.SUCESS_CREATE_ITEM //201
                    else 
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500

                }

        }
          
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para atualizar um JogoCategoria
const atualizarFaixaEtaria = async function(jogoCategoria, id, contentType){

    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json'){
            
            if (
                jogoCategoria.id_jogo       == ''          || jogoCategoria.id_jogo      == undefined    || jogoCategoria.id_jogo       == null || isNaN(jogoCategoria.id_jogo )      || jogoCategoria.id_jogo       <=0 ||
                jogoCategoria.id_categoria  == ''          || jogoCategoria.id_categoria == undefined    || jogoCategoria.id_categoria  == null || isNaN(jogoCategoria.id_categoria ) || jogoCategoria.id_categoria  <=0 ||
                id                          == ''          || id                         == undefined    || id                         == null || isNaN(id)                      || id <=0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELD //400

            }else{
                
                let resultCategoria = await jogoCategoriaDAO.selectByIdJogoCategoria(parseInt(id))

                if (resultCategoria != false || typeof(resultCategoria) == 'object'){
                    if (resultCategoria.length == 0){
                        //update
                        //adiciona o ID da categoria no JSON com os dados

                        categoria.id = parseInt(id)

                        let result = await jogoCategoriaDAO.updateJogoCategoria(jogoCategoria)

                        if(result)
                            return MESSAGE.SUCESS_UPDATE_ITEM //200
                        else
                            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500   

                    }else{
                        return MESSAGE.ERROR_NOT_FOUND_ITEM //404  
                    }
                }else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para excluir um JogoCategoria  
const excluirJogoCategoria = async function(id){
    try{

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{

            //função que verifica se o id existe no banco de dados
            let resultJogoCategoria = await jogoCategoriaDAO.selectByIdJogoCategoria(parseInt(id)) 

            if (resultJogoCategoria != false || typeof(resultJogoCategoria) == 'object'){
                if (resultJogoCategoria.length == 0){
                    //chama a função para excluir no Banco de Dados e aguarda o retorno o retorno da função
                    let result = await jogoCategoriaDAO.deleteJogoCategoria(parseInt(id))

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

//Função para tratar o retono de um genero filtrando pelo ID do DAO
const buscarJogoCategoria = async function(id){

    try{

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{
           
            dadosJogoCategoria = {}

            let resultCategoria = await jogoCategoriaDAO.selectByIdJogoCategoria(parseInt(id))
            if (resultCategoria != false || typeof(resultCategoria) == 'object'){
                if (resultCategoria.length == 0){

                    //Criando JSON de retorno de dados da API
                    dadosJogoCategoria.status = true
                    dadosJogoCategoria.status_code = 200
                    dadosJogoCategoria.categoria = resultCategoria

                    return dadosJogoCategoria //200

                }else{
                    dadosJogoCategoria = resultCategoria
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

} 

const buscarJogoPorCategoria = async function(idCategoria){

    try{

        if(idCategoria == '' || idCategoria == undefined || idCategoria == null || isNaN(idCategoria) || idCategoria <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELD //400
        }else{

            dadosJogoCategoria = {}
            let resultCategoria = await jogoCategoriaDAO.selectJogoByCategoria(parseInt(idCategoria))

            if (resultCategoria != false || typeof(resultCategoria) == 'object'){
                if (resultCategoria.length == 0){

                    //Criando JSON de retorno de dados da API
                    dadosJogoCategoria.status = true
                    dadosJogoCategoria.status_code = 200
                    dadosJogoCategoria.categoria = resultCategoria

                    return dadosJogoCategoria //200

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

//exportando as funções para serem utilizadas em outros arquivos
module.exports = {
    inserirJogoCategoria,
    atualizarFaixaEtaria,
    excluirJogoCategoria,
    buscarJogoCategoria,
    buscarJogoPorCategoria
}   