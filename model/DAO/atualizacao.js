/**********************************************************************************************
 * Objetivo: Model reponsável pelo CRUD de dados referente a atualizações no Banco de Dados
 * Data:03/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/


//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

const insertAtualizacao = async function(atualizacao){

    try{

        let sql = `insert into table tbl_atualizacao (
                                                nome,
                                                versao,
                                                tamanho,
                                                link 
                                            );`

    }catch(error){
        console.log(error)
        return false
    }

}