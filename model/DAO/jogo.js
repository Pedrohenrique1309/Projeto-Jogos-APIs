/**********************************************************************************************
 * Objetivo: Model reponsável pelo CRUD de dados referente a jogos no Banco de Dados
 * Data:13/03/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Quando precisar do retorno de dados usar prisma.$queryRawUnsafe(), se for apenas executar usar prisma.$executeRawUnsafe()

//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco de Dados um novo jogo
const insertJogo = async function(jogo){

    try{

        let sql = `insert into tbl_jogo(
                                            nome,
                                            data_lancamento,
                                            versao,
                                            tamanho,
                                            descricao,
                                            foto_capa,
                                            link,
                                            id_faixa_etaria
                                        )values(
                                            '${jogo.nome}',
                                            '${jogo.data_lancamento}',
                                            '${jogo.versao}',
                                            '${jogo.tamanho}',
                                            '${jogo.descricao}',
                                            '${jogo.foto_capa}',
                                            '${jogo.link}',
                                            ${jogo.id_faixa_etaria}
                                        );`

        //Executa o script SQL no BD e AGUARDA o retorno do BD
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            let sqlSelectId = `SELECT * FROM tbl_jogo WHERE nome = '${jogo.nome}' ORDER BY id DESC LIMIT 1`
            let criar = await prisma.$queryRawUnsafe(sqlSelectId)
            return criar[0]
        }else{
            return false
        }

    }catch(error){
        console.log(error)
        return false
    }


}

//Função para atualizar no Banco de Dados um jogo existente
const updatetJogo = async function(jogo){
    
    try{

        let sql = `update tbl_jogo set  nome = '${jogo.nome}',
                                        data_lancamento ='${jogo.data_lancamento}',
                                        versao ='${jogo.versao }',
                                        tamanho = '${jogo.tamanho}',
                                        descricao = '${jogo.descricao}',
                                        foto_capa = '${jogo.foto_capa}',
                                        link = '${jogo.link}',
                                        id_faixa_etaria = '${jogo.id_faixa_etaria}' 
                                    where id = ${jogo.id} `

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

//Função para excluir no Banco de Dados um jogo existente
const deleteJogo = async function(id){
    
    try{


        //Script SQL para deletr dados de um jogo pelo seu id
        let sql = `delete from tbl_jogo where id=${id}`

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

//Função para retornar do Banco de Dados uma lista de jogos
const selectAllJogo = async function(){
    
    try{

        //Script SQL para retornar os dados do banco
        let sql = 'select * from tbl_jogo order by id desc'
        
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

//Função para buscar no Banco de Dados um jogo pelo ID
const selectByIdJogo = async function(id){

    try{

        //Script SQL para retornar dados de um jogo pelo seu id
        let sql = `select * from tbl_jogo where id=${id}`

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
    insertJogo,
    updatetJogo,
    deleteJogo,
    selectAllJogo,
    selectByIdJogo
}