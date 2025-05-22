/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de  Jogo Desenvolvedor
 * Data: 18/05/2025
 * Autor: Pedro
 * Versão: 1.0
 ******************************************************************************************************/

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo jogoDesenvolvedor
const insertJogoDesenvolvedor = async function(jogoDesenvolvedor){
  try {

      let sql = `insert into tbl_jogo_desenvolvedor  ( 
                                          id_desenvolvedor,
                                          id_jogo
                                        ) 
                                          values 
                                        (
                                          ${jogoDesenvolvedor.id_desenvolvedor},
                                          ${jogoDesenvolvedor.id_jogo}
                                        )`
      

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar um jogoDesenvolvedor existente
const updateJogoDesenvolvedor = async function(jogoDesenvolvedor){
  try {
      let sql = `update tbl_jogo_desenvolvedor set        
                                                    id_desenvolvedor  = ${jogoDesenvolvedor.id_desenvolvedor},
                                                    id_jogo           = ${jogoDesenvolvedor.id_jogo}
                                        
                            where id = ${jogoDesenvolvedor.id}                
                            `
      let resultJogoDesenvolvedor = await prisma.$executeRawUnsafe(sql)

      if(resultJogoDesenvolvedor)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um jogoDesenvolvedor existente
const deleteJogoDesenvolvedor = async function(id){
  try {
    let sql = `delete from tbl_jogo_desenvolvedor where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os jogoDesenvoldor existentes
const selectAllJogoDesenvolvedor = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_jogo_desenvolvedor order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}


//Função para buscar um jogoDesenvolvedor pelo ID
const selectByIdJogoDesenvolvedor = async function(id){
  try {
    let sql = `select * from tbl_jogo_desenvolvedor where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os dados do desenvolvedor filtrando pelo jogo
const selectDesenvolvedorByJogo = async function(idJogo){
  try {
      let sql = `select tbl_desenvolvedor.* from tbl_jogo 
                          inner join tbl_jogo_desenvolvedor
                            on tbl_jogo.id = tbl_jogo_desenvolvedor.id_jogo
                          inner join tbl_desenvolvedor
                            on tbl_desenvolvedor.id = tbl_jogo_desenvolvedor.id_desenvolvedor
                      where tbl_jogo.id = ${idJogo}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os dados do jogo filtrando pelo desenvolvedor
const selectJogoByDesenvolvedor = async function(idDesenvolvedor){
  try {
      let sql = `select tbl_desenvolvedor.* from tbl_jogo 
                          inner join tbl_jogo_desenvolvedor
                            on tbl_jogo.id = tbl_jogo_desenvolvedor.id_jogo
                          inner join tbl_jogo
                            on tbl_jogo.id = tbl_jogo_desenvolvedor.id_desenvolvedor
                      where tbl_desenvolvedor.id = ${idDesenvolvedor}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}

module.exports = {
    insertJogoDesenvolvedor,
    updateJogoDesenvolvedor,
    deleteJogoDesenvolvedor,
    selectAllJogoDesenvolvedor,
    selectByIdJogoDesenvolvedor,
    selectDesenvolvedorByJogo,
    selectJogoByDesenvolvedor,
}

