/**********************************************************************************************
 * Objetivo: Model reponsável pelo CRUD de dados referente a categoria no Banco de Dados
 * Data:20/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Quando precisar do retorno de dados usar prisma.$queryRawUnsafe(), se for apenas executar usar prisma.$executeRawUnsafe()

//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco de Dados uma nova categoria
const insertCategoria = async function(categoria){

    try{

        let sql = `insert into tbl_categoria(
                                            nome 
                                        )values(
                                            '${categoria.nome}'
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


//Função para atualizar no Banco de Dados uma categoria existente
const updatetCategoria = async function(categoria){
    
    try{

        let sql = `update tbl_categoria set  nome = '${categoria.nome}'
                                    where id = ${categoria.id} `

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

//Função para excluir no Banco de Dados uma categoria existente
const deleteCategoria = async function(id){
    
    try{


        //Script SQL para deletr dados de um jogo pelo seu id
        let sql = `delete from tbl_categoria where id=${id}`

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

//Função para retornar do Banco de Dados uma lista de categorias
const selectAllCategoria = async function(){
    
    try{

        //Script SQL para retornar os dados do banco
        let sql = 'select * from tbl_categoria order by id desc'
        
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

//Função para buscar no Banco de Dados uma categoria pelo ID
const selectByIdCategoria = async function(id){

    try{

        //Script SQL para retornar dados de um jogo pelo seu id
        let sql = `select * from tbl_categoria where id=${id}`

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
    insertCategoria,
    updatetCategoria,
    deleteCategoria,
    selectAllCategoria,
    selectByIdCategoria
}