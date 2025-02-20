/**********************************************************************************************
 * Objetivo: Controller responável pela regra de negócio do CRUD do jogo
 * Data:13/03/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Import do arquivo de consfiguração para menssagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar CRUD no banco de dados
const jogoDAO = require('../../model/DAO/jogo.js')

//Função para inserir um novo jogo
const inserirJogo = async function(jogo){

    
    if( jogo.nome            == undefined ||  jogo.nome             == ''   || jogo.nome            == null   || jogo.nome.length   > 80   ||
        jogo.data_lancamento == undefined ||  jogo.data_lancamento  == ''   || jogo.data_lancamento == null   || jogo.versao.length > 10   ||
        jogo.versao          == undefined ||  jogo.versao           == ''   || jogo.versao          == null   || jogo.versao.length > 10   ||
        jogo.tamanho         == undefined ||  jogo.tamanho.length   > 10    ||
        jogo.descricao       == undefined || 
        jogo.foto_capa       == undefined ||  jogo.foto_capa.length > 200   ||
        jogo.link            == undefined ||  jogo.link.length      > 200      
    ){
        return MESSAGE.ERROR_REQUIRED_FIELD //400
    }else{
        //encamnha os dados do novo jogo para ser inserido no banco de dados
        let resultJogo = await jogoDAO.insertJogo(jogo)

        if(resultJogo){
            return MESSAGE.SUCESS_CREATE_ITEM //201
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER //500
        }
    }

}

//Função para atualizar um jogo
const atualizarJogo = async function(){

}

//Função para excluir um jogo
const excluirJogo = async function(){

}

//Função para retornar todos os jogos
const listarJogo = async function (){

}

//Função para buscar um jogo
const buscarJogo = async function (){

}

module.exports = {
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarJogo,
    buscarJogo
}