/**********************************************************************************************
 * Objetivo: Model reponsável pelo CRUD de dados referente a versao de jogos no Banco de Dados
 * Data:17/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Quando precisar do retorno de dados usar prisma.$queryRawUnsafe(), se for apenas executar usar prisma.$executeRawUnsafe()

//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco de Dados uma nova versao de jogo
const insertVersaoJogo = async function(versaoJogo){
    try{
        let sql = `insert into tbl_versao_jogo(
                                                nome
                                            )values(
                                                '${versaoJogo.nome}'
                                            );`
        //Executa o script SQL no BD e AGUARDA o retorno do BD
        let result = await prisma.$executeRawUnsafe(sql)
        if(result){
            return true
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return false
    }
}

//Função para atualizar no Banco de Dados uma versao de jogo existente
const updateVersaoJogo = async function(versaoJogo){
    try{
        let sql = `update tbl_versao_jogo set  nome = '${versaoJogo.nome}' 
                                    where id = ${versaoJogo.id} `
        let result = await prisma.$executeRawUnsafe(sql)
        if(result){
            return true
        }else{
            return false
        }                            
    }catch(error){
        console.log(error)
        return false
    }
}

//Função para excluir no Banco de Dados uma versao de jogo existente
const deleteVersaoJogo = async function(id){
    try{
        let sql = `delete from tbl_versao_jogo where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        if(result){
            return true
        }else{
            return false
        }                            
    }catch(error){
        console.log(error)
        return false
    }
}

//Função para buscar todos os dados de versao de jogo no Banco de Dados
const selectAllVersaoJogo = async function(){
    try{

        let sql = `select * from tbl_versao_jogo order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }                            
    }catch(error){
        console.log(error)
        return false
    }
}

//Função para buscar um jogo pelo seu id
const selectByIdVersaoJogo = async function(id){
    try{

        let sql = `select * from tbl_versao_jogo where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }                            
    }catch(error){
        console.log(error)
        return false
    }
}

module.exports = {
    insertVersaoJogo,
    updateVersaoJogo,
    deleteVersaoJogo,
    selectAllVersaoJogo,
    selectByIdVersaoJogo
}