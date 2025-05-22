/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de Jogo_Categoria
 * Data: 08/05/2025
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************************/

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo JogoCategoria no banco de dados
const insertJogoCategoria = async function(jogoCategoria) {
    try {
        let sql = `insert into tbl_jogo_categoria  ( 
                                            id_jogo,
                                            id_categoria
                                          ) 
                                            values 
                                          (
                                            ${jogoCategoria.id_jogo},
                                            ${jogoCategoria.id_categoria}
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

//Função para atualizar um JogoCategoria existente
const updateJogoCategoria = async function(jogoCategoria){
  try {
      let sql = `update tbl_jogo_categoria set      id_jogo           = ${jogoCategoria.id_jogo},
                                                    id_categoria      = ${jogoCategoria.id_categoria}
                                        
                            where id = ${jogoCategoria.id}                
                            `
      let resultJogoCategoria = await prisma.$executeRawUnsafe(sql)

      if(resultJogoCategoria)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um JogoCategoria existente
const deleteJogoCategoria = async function(id){
  try {
      let sql = `delete from tbl_jogo_categoria where id = ${id}`

      let resultJogoCategoria = await prisma.$executeRawUnsafe(sql)

      if(resultJogoCategoria)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os JogoCategorias existentes
const selectAllJogoCategoria = async function(){
  try {
      let sql = `select * from tbl_jogo_categoria`

      let resultJogoCategoria = await prisma.$queryRawUnsafe(sql)

      if(resultJogoCategoria)
        return resultJogoCategoria
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para buscar um JogoCategoria existente pelo ID
const selectByIdJogoCategoria = async function(id){
  try {
      let sql = `select * from tbl_jogo_categoria where id = ${id}`

      let resultJogoCategoria = await prisma.$queryRawUnsafe(sql)

      if(resultJogoCategoria)
        return resultJogoCategoria
      else
        return false
  } catch (error) {
    return false
  }
}

//Função que retornar os dados do Jogo filtrado pela categoria
const selectJogoByCategoria = async function(idCategoria){
  try {
      let sql = `SELECT tbl_.* 
                          FROM tbl_jogo 
                          INNER JOIN tbl_jogo_categoria 
                              ON tbl_jogo.id = tbl_jogo_categoria.id_jogo
                          INNER JOIN tbl_categoria 
                              ON tbl_categoria.id = tbl_jogo_categoria.id_categoria
                          WHERE tbl_categoria.id = 1;`

      let resultJogoCategoria = await prisma.$queryRawUnsafe(sql)

      if(resultJogoCategoria)
        return resultJogoCategoria
      else
        return false
  } catch (error) {
    return false
  }
}

//Exporta as funções para serem utilizadas em outros módulos
module.exports = {
    insertJogoCategoria,
    updateJogoCategoria,
    deleteJogoCategoria,
    selectAllJogoCategoria,
    selectByIdJogoCategoria,
    selectJogoByCategoria
}

