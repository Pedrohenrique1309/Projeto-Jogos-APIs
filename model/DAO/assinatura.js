/**********************************************************************************************
 * Objetivo: Model reponsável pelo CRUD de dados referente a assinaturas no Banco de Dados
 * Data:17/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Quando precisar do retorno de dados usar prisma.$queryRawUnsafe(), se for apenas executar usar prisma.$executeRawUnsafe()

//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco de Dados uma nova assinatura
const insertAssinatura = async function(assinatura){

    try{

        let sql = `insert into tbl_assinatura(
                                            nome
                                        )values(
                                            '${assinatura.nome}'
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

//Função para atualizar no Banco de Dados uma assinatura existente
const updateAssinatura = async function(assinatura){

    try{

        let sql = `update tbl_assinatura set
                                            nome = '${assinatura.nome}'
                                        where
                                            id = ${assinatura.id};`

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

//Função para excluir no Banco de Dados uma assinatura existente
const deleteAssinatura = async function(id){
    
    try{

        //Script SQL para deletar dados de uma assinatura pelo seu id
        let sql = `delete from tbl_assinatura where id=${id}`

        //Executa o Script SQL e aguarda o retorno dos dados
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{ 
            return false
        }

    }catch(result){
        return false
    }

}

//Função para retornar do Banco de Dados uma lista de assinaturas
const selectAllAssinatura = async function(){
    
    try{

        //Script SQL para retornar os dados do banco
        let sql = 'select * from tbl_assinatura order by id desc'
        
        //Executa o Script SQL e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql) 

        if(result){
            return result
        }else{ 
            return false
        }
            
    }catch(error) {
        return false
    } 

}

//Função para buscar no Banco de Dados uma assinatura pelo ID
const selectByIdAssinatura = async function(id){

    try{

        //Script SQL para retornar dados de uma assinatura pelo seu id
        let sql = `select * from tbl_assinatura where id=${id}`

        //Executa o Script SQL e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{ 
            return false
        }

    }catch(result){
        return false
    }

}

module.exports = {
    insertAssinatura,
    updateAssinatura,
    deleteAssinatura,
    selectAllAssinatura,
    selectByIdAssinatura
}