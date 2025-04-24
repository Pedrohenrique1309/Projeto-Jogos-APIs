/**********************************************************************************************
 * Objetivo: Controller responável pela regra de negócio do CRUD de categoria
 * Data:20/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/


//Import do arquivo de consfiguração para menssagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar CRUD no banco de dados
const categoriaDAO = require('../../model/DAO/categoria.js')

//Função para inserir uma nova categoria
const inserirCategoria= async function(categoria, contentType){

    try{
        
        if(contentType == 'application/json'){

            if( 
                categoria.nome  == undefined ||  categoria.nome == ''   || categoria.nome   == null   || categoria.nome.length   > 80     
            ){
                return MESSAGE.ERROR_REQUIRED_FIELD //400
            }else{
                //encamnha os dados da nova categoria para ser inserido no banco de dados
                let resultCategoria = await categoriaDAO.insertCategoria(categoria)

                if(resultCategoria){
                    return MESSAGE.SUCESS_CREATE_ITEM //201
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }

        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    } catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }   

}

//Função para atualizar uma categoria
const atualizarCategoria= async function(categoria, id, contentType){

    try{

        if(contentType == 'application/json'){

            if( 
                categoria.nome  == undefined ||  categoria.nome    == ''   ||categoria.nome         == null   || categoria.nome.length   > 80   ||
                id == undefined || id == ''  || id  == null || isNaN(id) || id <= 0
            ){

                return MESSAGE.ERROR_REQUIRED_FIELD //400

            }else{

                //Validar se o id existe no Banco de Dados
                let resultCategoria = await buscarCategoria(parseInt(id))


                if(resultCategoria.status_code == 200){
                    //Update

                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    categoria.id = parseInt(id)
                    let result = await categoriaDAO.updatetCategoria(categoria)

                    if(result){
                        return MESSAGE.SUCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else if(resultCategoria.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //400
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para excluir uma categoria
const excluirCategoria = async function(id){

    try{
     
        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let resultCategoria = await buscarCategoria(parseInt(id))

            if(resultCategoria.status_code == 200){

                //Delete

                //Chama fução para deletar os dados da Categoria
                let result = await categoriaDAO.deleteCategoria(id)

                if(result){
                    return MESSAGE.SUCESS_DELETE_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }

            }else if (resultCategoriastatus_code == 404){
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }

            
        }else{
            return ERROR_REQUIRED_FIELD //400
        }

    }catch(result){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todas as Categoria
const listarCategoria = async function (){

    try{

        let dadosCategorias = {}

        //Chama função para retornar os dados da Categoria
        let resultCategoria= await categoriaDAO.selectAllCategoria()

        if(resultCategoria != false || typeof(resultCategoria) == 'object'){

            if(resultCategoria.length > 0){

                //Cria um objeto Json para retornar a lista de categorias
                dadosCategorias.status = true
                dadosCategorias.status_code = 200
                dadosCategorias.Items = resultCategoria.length
                dadosCategorias.categorys = resultCategoria
                
                return  dadosCategorias//200
            }else{
    
                return MESSAGE.ERROR_NOT_FOUND //404
            }

        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
        
        
    }catch(erro){      
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER

    }

}

//Função para buscar uma categoria
const buscarCategoria = async function (id){
     
    try{

        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let dadosCategoria = {}

            //Chama fução para retornar os dados da Categoria
            let resultCategoria = await categoriaDAO.selectByIdCategoria(id)

            if(resultCategoria !== String(resultCategoria)){
                
                if(resultCategoria != false || typeof(resultCategoria) == 'object'){

                    if(resultCategoria.length > 0){
        
                        //Cria um objeto Json para retornar a lista de Categorias
                        dadosCategoria.status = true
                        dadosCategoria.status_code = 200
                        dadosCategoria.categorys = resultCategoria
                        
                        return  dadosCategoria//200

    
                    }else{
            
                        return MESSAGE.ERROR_NOT_FOUND //404
                    }
        
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE//415
            }
            
        }else{
            return ERROR_REQUIRED_FIELD //400
        }


    }catch(result){

    }
    
}

module.exports = {
    inserirCategoria,
    atualizarCategoria,
    excluirCategoria,
    listarCategoria,
    buscarCategoria
}