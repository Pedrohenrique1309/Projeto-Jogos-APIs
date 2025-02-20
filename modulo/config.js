/**********************************************************************************************
 * Objetivo: Arquivo de padronizacao de mensagens e status code do projeto
 * Data:20/03/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

/*********************************** MENSAGENS DE EROO ****************************************/

const ERRO_RIQUERIDE_FIELDES = {staus: false, status_code:400, message: "Existe campos obrigatório, que não foram preenchidos ou ultrapassara a quantidade de caracteres. A requisição não pode ser realizada!!!"}

const ERROR_INTERNAL_SERVER =  {status: false, status_code:500, message:"Não foi possível acessar a requisão, pois ocorreram erros internos no servior!!!"}



/*********************************** MENSAGENS DE  SUCESSO***********************************/

const SUCESS_CREATE_ITEM = {staus: true, status_code: 201, message: "Item criado com sucesso!!!"}



module.exports = {
    ERRO_RIQUERIDE_FIELDES,
    SUCESS_CREATE_ITEM,
    ERROR_INTERNAL_SERVER
}