/**********************************************************************************************
 * Objetivo: Model reponsável pelo CRUD de dados referente a plataforma no Banco de Dados
 * Data: 17/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Quando precisar do retorno de dados usar prisma.$queryRawUnsafe(), se for apenas executar usar prisma.$executeRawUnsafe()

//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco de Dados uma nova plataforma
const insertPlataforma = async function(plataforma){

    try{

        let sql = `insert into tbl_plataforma(
                                            nome
                                        )values(
                                            '${plataforma.nome}'
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

//Função para atualizar no Banco de Dados uma plataforma existente
const updatetPlataforma = async function(plataforma){
    
    try{

        let sql = `update tbl_plataforma set  nome = '${plataforma.nome}' 
                                    where id = ${plataforma.id} `

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

//Função para excluir no Banco de Dados uma plataforma existente
const deletePlataforma = async function(id){
    
    try{

        //Script SQL para retornar dados de uma plataforma where pelo seu id
        let sql = `delete from tbl_plataforma where id=${id}`

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


//Função para retornar do Banco de Dados uma lista de plataformas
const selectAllPlataforma = async function(){
    
    try{

        //Script SQL para retornar os dados do banco
        let sql = 'select * from tbl_plataforma order by id desc'
        
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

//Função para buscar no Banco de Dados uma plataforma pelo ID
const selectByIdPlataforma = async function(id){

    try{

        //Script SQL para retornar dados de um jogo pelo seu id
        let sql = `select * from tbl_plataforma where id=${id}`

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
    insertPlataforma,
    updatetPlataforma,
    deletePlataforma,
    selectAllPlataforma,
    selectByIdPlataforma
}