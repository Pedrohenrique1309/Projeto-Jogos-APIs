/**********************************************************************************************
 * Objetivo: Model reponsável pelo CRUD de dados referente a desenvolvedores no Banco de Dados
 * Data:20/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Quando precisar do retorno de dados usar prisma.$queryRawUnsafe(), se for apenas executar usar prisma.$executeRawUnsafe()

//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco de Dados um novo desenvolvedor
const insertDesenvolvedor = async function(desenvolvedor){

    try{

        let sql = `insert into tbl_desenvolvedor(
                                            nome,
                                            fundacao,
                                            email_suporte,
                                            presidente
                                        )values(
                                            '${desenvolvedor.nome}',
                                            '${desenvolvedor.fundacao}',
                                            '${desenvolvedor.email_suporte}',
                                            '${desenvolvedor.presidente}'
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

//Função para atualizar no Banco de Dados um desenvolvedor existente
const updatetDesenvolvedor = async function(desenvolvedor, id){
    
    try{

        let sql = `update tbl_desenvolvedor set  nome = '${desenvolvedor.nome}',
                                        fundacao = '${desenvolvedor.fundacao}',
                                        email_suporte ='${desenvolvedor.email_suporte}',
                                        presidente = '${desenvolvedor.presidente}'
                                    where id = ${id} `

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }                            

        
    }catch(error){
        console.log(error);
        
        return false
    }

}


//Função para excluir no Banco de Dados um desenvolvedor existente
const deleteDesenvolvedor = async function(id){
    
    try{


        //Script SQL para deletar dados de um desenvolvedor  pelo seu id
        let sql = `delete from tbl_desenvolvedor  where id=${id}`

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

//Função para retornar do Banco de Dados uma lista de desenvolvedores
const selectAllDesenvolvedor = async function(){
    
    try{

        //Script SQL para retornar os dados do banco
        let sql = 'select * from tbl_desenvolvedor order by id desc'
        
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

//Função para buscar no Banco de Dados um desenvolvedor pelo ID
const selectByIdDesenvolvedor = async function(id){

    try{

        //Script SQL para retornar dados de um desenvolvedorpelo seu id
        let sql = `select * from tbl_desenvolvedor where id=${id}`

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
    insertDesenvolvedor,
    updatetDesenvolvedor,
    deleteDesenvolvedor,
    selectAllDesenvolvedor,
    selectByIdDesenvolvedor
}
