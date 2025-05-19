/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de  Plataforma Assinatura
 * Data: 19/05/2025
 * Autor: Pedro
 * Versão: 1.0
 ******************************************************************************************************/

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir uma nova plataformaAssinatura
const insertPlataformaAssinatura = async function(plataformaAssinatura){
  try {

      let sql = `insert into tbl_plataforma_assinatura  ( 
                                          id_plataforma,
                                          id_assinatura
                                        ) 
                                          values 
                                        (
                                          ${plataformaAssinatura.id_plataforma},
                                          ${plataformaAssinatura.id_assinatura}
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

//Função para atualizar uma plataformaAssinatura existente
const updatePlataformaAssinatura = async function(plataformaAssinatura){
  try {
      let sql = `update tbl_plataforma_assinatura set        
                                                    id_plataforma  = ${plataformaAssinatura.plataforma},
                                                    id_assinatura  = ${plataformaAssinatura.assinatura}
                                        
                            where id = ${plataformaAssinatura.id}                
                            `
      let resultPlataformaAssinatura = await prisma.$executeRawUnsafe(sql)

      if(resultPlataformaAssinatura)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um plataformaAssinatura existente
const deletePlataformaAssinatura = async function(id){
  try {
    let sql = `delete from tbl_plataforma_assinatura where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os plataformaAssinatura existentes
const selectAllPlataformaAssinatura = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_plataforma_assinatura order by id desc'

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


//Função para buscar um plataformaAssinatura pelo ID
const selectByIdPlataformaAssinatura = async function(id){
  try {
    let sql = `select * from tbl_plataforma_assinatura where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os dados da assinatura filtrando pela plataforma
const selectAssinaturaByPlataforma = async function(idPlataforma){
  try {
      let sql = `select tbl_assinatura.* from tbl_plataforma 
                          inner join tbl_plataforma_assinatura
                            on tbl_plataforma .id = tbl_plataforma_assinatura.id_plataforma 
                          inner join tbl_assinatura
                            on tbl_assinatura.id = tbl_plataforma_assinatura.id_assinatura
                      where tbl_plataforma .id = ${idPlataforma}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os dados da assinatura filtrando pela plataforma
const selectPlataformaByAssinatura = async function(idPlataforma){
  try {
      let sql = `select tbl_assinatura.* from tbl_assinatura
                          inner join tbl_plataforma_assinatura
                            on tbl_assinatura.id = tbl_plataforma_assinatura.id_assinatura
                          inner join tbl_assinatura
                            on tbl_assinatura.id = tbl_plataforma_assinatura.id_plataforma
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

module.exports = {
    insertPlataformaAssinatura,
    updatePlataformaAssinatura,
    deletePlataformaAssinatura,
    selectAllPlataformaAssinatura,
    selectByIdPlataformaAssinatura,
    selectPlataformaByAssinatura,
    selectAssinaturaByPlataforma
}