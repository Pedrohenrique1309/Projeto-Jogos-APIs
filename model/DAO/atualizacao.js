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

//Função para adicionar no Banco de Dados uma atualizaca
const insertAtualizacao = async function(atualizacao){

    try{

        let sql = `insert into tbl_atualizacao (
                                                nome,
                                                versao,
                                                tamanho,
                                                link 
                                            )values(
                                            '${atualizacao.nome}',
                                            '${atualizacao.versao}',
                                            '${atualizacao.tamanho}',
                                            '${atualizacao.link}'
                                            );`

    //Executa o script SQL no BD e AGUARDA o retorno do BD
    let result = await prisma.$executeRawUnsafe(sql)

    if(result){
        return true
    }else{
        return false
    }   
                                            
    }catch(error){
        return false
    }

}

//Função para atualizar no Banco de Dados uma atualizacao existente
const updateAtualizacao = async function (atualizacao) {
    
    try{

        let sql = `update tbl_atualizacao set  nome = '${atualizacao.nome}',
                                        versao ='${atualizacao.versao }',
                                        tamanho = '${atualizacao.tamanho}',
                                        link = '${atualizacao.link}' 
                                        where id = ${atualizacao.id} `

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }                            

        
    }catch(error){
        return 
    }

}

//Função para excluir no Banco de Dados uma atualizacao existente
const deleteAtualizacao = async function(id){
    
    try{

        //Script SQL para retornar dados de um jogo pelo seu id
        let sql = `delete from tbl_atualizacao where id=${id}`

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

//Função para retornar do Banco de Dados uma lista de atualizacoes
const selectAllAtualizacao = async function(){
    
    try{

        //Script SQL para retornar os dados do banco
        let sql = 'select * from tbl_atualizacao order by id desc'
        
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

//Função para buscar no Banco de Dados uma atualizacao pelo ID
const selectByIdAtualizacao = async function(id){

    try{
        
        //Script SQL para retornar dados de um jogo pelo seu id
        let sql = `select * from tbl_atualizacao where id=${id}`
        
        //Executa o Script SQL e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result){
            return result
        }else{ 
            return false
        }


    }catch(error){
        return false
    }

}

module.exports = {
    insertAtualizacao,
    updateAtualizacao,
    deleteAtualizacao,
    selectAllAtualizacao,
    selectByIdAtualizacao
}