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
