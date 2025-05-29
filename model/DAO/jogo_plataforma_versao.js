/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de Jogo Plataforma Versão
 * Data: 19/05/2025
 * Autor: Pedro
 * Versão: 1.0
 ******************************************************************************************************/

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir uma nova jogoPlataformaVersao
const insertJogoPlataformaVersao = async function(jogoPlataformaVersao){
  try {

      let sql = `insert into tbl_jogo_plataforma_versao  (
                                          id_jogo, 
                                          id_plataforma,
                                          id_versao
                                        ) 
                                          values 
                                        (
                                          ${jogoPlataformaVersao.id_jogo},
                                          ${jogoPlataformaVersao.id_plataforma},
                                          ${jogoPlataformaVersao.id_versao}
                                        )`
      

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)
      
      if(result)
          return true
      else
          return false
  } catch (error) {
    console.log(error);
    return false
  }
}

//Função para atualizar um jogoPlataformaVersao existente
const updateJogoPlataformaVersao = async function(jogoPlataformaVersao){
  try {
      let sql = `update tbl_jogo_plataforma_versao set        
                                                            id_jogo       = ${jogoPlataformaVersao.id_jogo},
                                                            id_plataforma = ${jogoPlataformaVersao.id_plataforma},
                                                            id_versao     = ${jogoPlataformaVersao.id_versao}
                                        
                            where id = ${jogoPlataformaVersao.id}                
                            `
      let resultJogoPlataformaVersao = await prisma.$executeRawUnsafe(sql)

      if(resultJogoPlataformaVersao)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um jogoPlataformaVersao existente
const deleteJogoPlataformaVersao = async function(id){
  try {
    let sql = `delete from tbl_jogo_plataforma_versao where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os JogoPlataformaVersao existentes
const selectAllJogoPlataformaVersao = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_jogo_plataforma_versao order by id desc'

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

//Função para buscar um plataformaJogoAtuazalizacao pelo ID
const selectByIdJogoPlataformaVersao = async function(id){
  try {
    let sql = `select * from tbl_jogo_plataforma_versao where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os dados da plataforma filtrando pelo jogo
const selectPlataformaByJogo = async function(idJogo){
  try {
      let sql = `select tbl_plataforma.* from tbl_jogo 
                          inner join tbl_jogo_plataforma_versao
                            on tbl_jogo.id = tbl_jogo_plataforma_versao.id_jogo
                          inner join tbl_plataforma
                            on tbl_plataforma.id = tbl_jogo_plataforma_versao.id_plataforma
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

//Função para retornar os dados do jogo filtrando pela plataforma 
const selectJogoByPlataforma = async function(idPlataforma){
  try {
      let sql = `select tbl_jogo.* from tbl_jogo 
                          inner join tbl_jogo_plataforma_versao
                            on tbl_jogo.id = tbl_jogo_plataforma_versao.id_jogo
                          inner join tbl_plataforma
                            on tbl_jogo.id = tbl_jogo_plataforma_versao.id_jogo
                      where tbl_plataforma.id = ${idPlataforma}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os dados da versao filtrando pelo jogo
const selectVersaoByJogo = async function(idJogo){
  try {
      let sql = `select tbl_versao_jogo.* from tbl_jogo 
                          inner join tbl_jogo_plataforma_versao
                            on tbl_jogo.id = tbl_jogo_plataforma_versao.id_jogo
                          inner join tbl_versao_jogo
                            on tbl_versao_jogo.id = tbl_jogo_plataforma_versao.id_versao
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

//Função para retornar os dados do jogo filtrando pela versao
const selectJogoByVersao = async function(idVersao){
  try {
      let sql = `select tbl_jogo.* from tbl_jogo 
                          inner join tbl_jogo_plataforma_versao
                            on tbl_jogo.id = tbl_jogo_plataforma_versao.id_jogo
                          inner join tbl_versao
                            on tbl_jogo.id = tbl_jogo_plataforma_versao.id_jogo
                      where tbl_versao.id = ${idVersao}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os dados da versao filtrando pela plataforma
const selectVersaoByPlataforma = async function(idPlataforma){
  try {
      let sql = `select tbl_versao.* from tbl_plataforma
                          inner join tbl_jogo_plataforma_versao
                            on tbl_plataforma.id = tbl_jogo_plataforma_versao.id_plataforma
                          inner join tbl_versao
                            on tbl_versao.id = tbl_jogo_plataforma_versao.id_versao
                      where tbl_plataforma.id = ${idPlataforma}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os dados da plataforma filtrando pela versao
const selectPlataformaByVersao = async function(idVersao){
  try {
      let sql = `select tbl_versao.* from tbl_plataforma
                          inner join tbl_jogo_plataforma_versao
                            on tbl_plataforma.id = tbl_jogo_plataforma_versao.id_plataforma
                          inner join tbl_versao
                            on tbl_versao.id = tbl_jogo_plataforma_versao.id_versao
                      where tbl_versao.id = ${idVersao}`

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
    insertJogoPlataformaVersao,
    updateJogoPlataformaVersao,
    deleteJogoPlataformaVersao,
    selectAllJogoPlataformaVersao,
    selectByIdJogoPlataformaVersao,
    selectJogoByPlataforma,
    selectJogoByVersao,
    selectPlataformaByJogo,
    selectPlataformaByVersao,
    selectVersaoByJogo,
    selectVersaoByPlataforma
}