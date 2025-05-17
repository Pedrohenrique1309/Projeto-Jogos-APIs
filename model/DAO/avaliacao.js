/**********************************************************************************************
 * Objetivo: Model reponsável pelo CRUD de dados referente a avaliações no Banco de Dados
 * Data:17/05/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Quando precisar do retorno de dados usar prisma.$queryRawUnsafe(), se for apenas executar usar prisma.$executeRawUnsafe()

//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco de Dados ma nova avaliação
const insertAvaliacao = async function(avaliacao){
    try{

        let sql = `insert into tbl_avaliacao(
                                            comentario,
                                            pontuacao,
                                            id_jogo
                                        )values(
                                            '${avaliacao.comentario}',
                                            ${avaliacao.pontuacao},
                                            ${avaliacao.id_jogo}
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


//Função para atualizar no Banco de Dados uma avaliação existente
const updatetAvaliacao = async function(avaliacao){
    
    try{

        let sql = `update tbl_avaliacao set  
                                        comentario = '${avaliacao.comentario}',
                                        pontuacao = ${avaliacao.pontuacao},
                                        id_jogo = ${avaliacao.id_jogo}
                                    where id = ${avaliacao.id} `

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


//Função para excluir no Banco de Dados uma avaliacao existente
const deleteJogo = async function(id){
    
    try{


        //Script SQL para deletr dados de um jogo pelo seu id
        let sql = `delete from tbl_avaliacao where id=${id}`

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

//Função para retornar do Banco de Dados uma lista de avaliacoes
const selectAllAvaliacao = async function(){
    
    try{

        //Script SQL para retornar os dados do banco
        let sql = 'select * from tbl_avaliacao order by id desc'
        
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

//Função para buscar no Banco de Dados uma avaliacao pelo ID
const selectByIdAvaliacao = async function(id){

    try{

        //Script SQL para retornar dados de um jogo pelo seu id
        let sql = `select * from tbl_avaliacao where id=${id}`

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
    insertAvaliacao,
    updatetAvaliacao,
    deleteJogo,
    selectAllAvaliacao,
    selectByIdAvaliacao
}
