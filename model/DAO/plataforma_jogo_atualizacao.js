/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de  Plataforma Jogo Atualização
 * Data: 18/05/2025
 * Autor: Pedro
 * Versão: 1.0
 ******************************************************************************************************/

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir uma nova plataformaJogoAtuazalizacao
const insertPlataformaJogoAtualizacao = async function(plataformaJogoAtualizacao){
  try {

      let sql = `insert into tbl_plataforma_jogo_atualizacao  ( 
                                          id_plataforma,
                                          id_jogo,
                                          id_atualizacao
                                        ) 
                                          values 
                                        (
                                          ${plataformaJogoAtualizacao.id_plataforma},
                                          ${plataformaJogoAtualizacao.id_jogo},
                                          ${plataformaJogoAtualizacao.id_atualizacao}
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

//Função para atualizar uma plataformaJogoAtuazalizacao existente
const updatePlataformaJogoAtuazalizacao = async function(plataformaJogoAtuazalizacao){
  try {
      let sql = `update tbl_plataforma_jogo_atualizacao set        
                                                            id_plataforma  = ${plataformaJogoAtualizacao.id_plataforma},
                                                            id_jogo        = ${plataformaJogoAtualizacao.id_jogo},
                                                            id_atualizacao = ${plataformaJogoAtualizacao.id_atualizacao}
                                        
                            where id = ${plataformaJogoAtuazalizacao.id}                
                            `
      let resultPlataformaJogoAtuazalizacao = await prisma.$executeRawUnsafe(sql)

      if(resultPlataformaJogoAtuazalizacao)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um plataformaJogoAtuazalizacao existente
const deletePlataformaJogoAtuazalizacao = async function(id){
  try {
    let sql = `delete from tbl_plataforma_jogo_atualizacao where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os plataformaJogoAtuazalizacao existentes
const selectAllPlataformaJogoAtuazalizacao = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_plataforma_jogo_atualizacao order by id desc'

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
const selectByIdPlataformaJogoAtuazalizacao = async function(id){
  try {
    let sql = `select * from tbl_plataforma_jogo_atualizacao where id = ${id}`

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
                          inner join tbl_plataforma_jogo_atualizacao
                            on tbl_jogo.id = tbl_plataforma_jogo_atualizacao.id_jogo
                          inner join tbl_plataforma
                            on tbl_plataforma.id = tbl_plataforma_jogo_atualizacao.id_plataforma
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
                          inner join tbl_plataforma_jogo_atualizacao
                            on tbl_jogo.id = tbl_plataforma_jogo_atualizacao.id_jogo
                          inner join tbl_plataforma
                            on tbl_jogo.id = tbl_plataforma_jogo_atualizacao.id_jogo
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

//Função para retornar os dados da atualizacao filtrando pelo jogo
const selectAtualizacaoByJogo = async function(idJogo){
  try {
      let sql = `select tbl_atualizacao.* from tbl_jogo 
                          inner join tbl_plataforma_jogo_atualizacao
                            on tbl_jogo.id = tbl_plataforma_jogo_atualizacao.id_jogo
                          inner join tbl_atualizacao
                            on tbl_atualizacao.id = tbl_plataforma_jogo_atualizacao.id_atualizacao
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

//Função para retornar os dados do jogo filtrando pela atualizacao
const selectJogoByAtualizacao = async function(idAtualizacao){
  try {
      let sql = `select tbl_jogo.* from tbl_jogo 
                          inner join tbl_plataforma_jogo_atualizacao
                            on tbl_jogo.id = tbl_plataforma_jogo_atualizacao.id_jogo
                          inner join tbl_atualizacao
                            on tbl_jogo.id = tbl_plataforma_jogo_atualizacao.id_jogo
                      where tbl_atualizacao.id = ${idAtualizacao}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os dados da atualizacao filtrando pela plataforma
const selectAtualizacaoByPlataforma = async function(idPlataforma){
  try {
      let sql = `select tbl_atualizacao.* from tbl_plataforma
                          inner join tbl_plataforma_jogo_atualizacao
                            on tbl_plataforma.id = tbl_plataforma_jogo_atualizacao.id_plataforma
                          inner join tbl_atualizacao
                            on tbl_atualizacao.id = tbl_plataforma_jogo_atualizacao.id_atualizacao
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

//Função para retornar os dados da plataforma filtrando pela atualizacao
const selectPlataformaByAtualizacao = async function(idAtualizacao){
  try {
      let sql = `select tbl_plataforma.* from tbl_plataforma 
                          inner join tbl_plataforma_jogo_atualizacao
                            on tbl_plataforma.id = tbl_plataforma_jogo_atualizacao.id_plataforma
                          inner join tbl_atualizacao
                            on tbl_atualizacao.id = tbl_plataforma_jogo_atualizacao.id_atualizacao
                      where tbl_atualizacao.id = ${idAtualizacao}`

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
    insertPlataformaJogoAtualizacao,
    updatePlataformaJogoAtuazalizacao,
    deletePlataformaJogoAtuazalizacao,
    selectAllPlataformaJogoAtuazalizacao,
    selectByIdPlataformaJogoAtuazalizacao,
    selectJogoByPlataforma,
    selectPlataformaByJogo,
    selectJogoByAtualizacao,
    selectAtualizacaoByJogo,
    selectAtualizacaoByPlataforma,
    selectPlataformaByAtualizacao
}