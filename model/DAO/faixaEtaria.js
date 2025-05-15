/**********************************************************************************************
 * Objetivo: Model reponsável pelo CRUD de dados referente a faixa etária no Banco de Dados
 * Data:17/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Quando precisar do retorno de dados usar prisma.$queryRawUnsafe(), se for apenas executar usar prisma.$executeRawUnsafe()

//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco de Dados uma nova faixa etária
const insertFaixaEtaria = async function(faixaEtaria){

    try{
        
        let sql = `insert into tbl_faixa_etaria(
                                            idade_indicativa
                                        )values(
                                           '${faixaEtaria.idade_indicativa}'
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

//Função para atualizar no Banco de Dados uma faixa etaria existente
const updateFaixaEtaria = async function(faixaEtaria){
    
    try{

        let sql = `update tbl_faixa_etaria set  
                                            idade_indicativa = ${faixaEtaria.idade_indicativa}
                                        where id = ${faixaEtaria.id} `

        //Executa o script SQL no BD e AGUARDA o retorno do BD                                
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }                            

        
    }catch(error){
        console.log(error)
        return 
    }

}

//Função para excluir no Banco de Dados uma faixa etária existente
const deleteFaixaEtaria = async function(id){
    
    try{

        //Script SQL para retornar dados de um jogo pelo seu id
        let sql = `delete from tbl_faixa_etaria where id=${id}`

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

//Função para retornar do Banco de Dados uma lista de faixas etárias
const selectAllFaixaEtaria = async function(){
    
    try{

        //Script SQL para retornar os dados do banco
        let sql = 'select * from tbl_faixa_etaria order by id desc'
        
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

//Função para buscar no Banco de Dados uma faixa etária pelo ID
const selectByIdFaixaEtaria = async function(id){

    try{

        //Script SQL para retornar dados de uma faixa etária pelo seu id
        let sql = `select * from tbl_faixa_etaria where id=${id}`

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
    insertFaixaEtaria,
    updateFaixaEtaria,
    deleteFaixaEtaria,
    selectAllFaixaEtaria,
    selectByIdFaixaEtaria
}