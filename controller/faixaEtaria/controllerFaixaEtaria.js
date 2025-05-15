/**********************************************************************************************
 * Objetivo: Controller responável pela regra de negócio do CRUD da faixa etária
 * Data:17/04/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Import do arquivo de consfiguração para menssagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar CRUD no banco de dados
const faixaEtariaDAO = require('../../model/DAO/faixaEtaria.js')

//Função para inserir uma nova faixa etária
const inserirFaixaEtaria = async function(faixaEtaria, contentType){

    try{
        
        if(contentType == 'application/json'){

            if( 
                faixaEtaria.idade_indicativa == undefined ||  faixaEtaria.idade_indicativa  == ''   || faixaEtaria.idade_indicativa  == null   || isNaN(faixaEtaria.idade_indicativa) || faixaEtaria.idade_indicativa <= 0  
            ){
                return MESSAGE.ERROR_REQUIRED_FIELD //400
            }else{
                //encamnha os dados da nova faixa etária para ser inserido no banco de dados
                let resultFaixaEtaria = await faixaEtariaDAO.insertFaixaEtaria(faixaEtaria)
                
                if(resultFaixaEtaria){
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

//Função para atualizar uma faixa etária
const atualizarFaixaEtaria = async function(faixaEtaria, id, contentType){

    try{

        if(contentType == 'application/json'){

            if( 
                
                faixaEtaria.idade_indicativa   == undefined ||  faixaEtaria.idade_indicativa             == ''   || faixaEtaria.idade_indicativa          == null   || isNaN(faixaEtaria.idade_indicativa) || faixaEtaria.idade_indicativa <= 0    ||
                id == undefined || id == ''  || id  == null || isNaN(id) || id <= 0
            ){

                return MESSAGE.ERROR_REQUIRED_FIELD //400

            }else{

                //Validar se o id existe no Banco de Dados
                let resultFaixaEtaria = await buscarFaixaEtaria(parseInt(id))


                if(resultFaixaEtaria.status_code == 200){
               
                    //Adiciona um atributo id no JSON para encaminhar id da requisição 
                    faixaEtaria.id = parseInt(id)
                    let result = await faixaEtariaDAO.updateFaixaEtaria(faixaEtaria)

                    if(result){
                        return MESSAGE.SUCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else if(resultFaixaEtaria.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //400
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    }catch(error){
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para excluir uma faixa etária
const excluirFaixaEtaria = async function(id){

    try{
     
        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let resultFaixaEtaria = await buscarFaixaEtaria(parseInt(id))

            if(resultFaixaEtaria.status_code == 200){

                //Chama fução para deletar os dados da faixa etária
                let result = await faixaEtariaDAO.deleteFaixaEtaria(id)

                if(result){
                    return MESSAGE.SUCESS_DELETE_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }

            }else if (resultFaixaEtaria.status_code == 404){
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

//Função para retornar todas as faixas etárias
const listarFaixaEtaria = async function (){

    try{

        let dadosFaixasEtarias = {}

        //Chama função para retornar os dados da faixa etária
        let resultFaixaEtaria = await faixaEtariaDAO.selectAllFaixaEtaria()

        if(resultFaixaEtaria!= false || typeof(resultFaixaEtaria) == 'object'){

            if(resultFaixaEtaria.length > 0){

                //Cria um objeto Json para retornar a lista de faixas etárias
                dadosFaixasEtarias.status = true
                dadosFaixasEtarias.status_code = 200
                dadosFaixasEtarias.Items = resultFaixaEtaria.length
                dadosFaixasEtarias.ageGroups = resultFaixaEtaria
                
                return  dadosFaixasEtarias//200
            }else{
    
                return MESSAGE.ERROR_NOT_FOUND //404
            }

        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
        
        
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER

    }

}

//Função para buscar uma faixa etária pelo ID
const buscarFaixaEtaria = async function (id){
     
    try{

        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let dadosFaixasEtarias = {}

            //Chama fução para retornar os dados da faixa etária

            let resultFaixaEtaria = await faixaEtariaDAO.selectByIdFaixaEtaria(id)

            if(resultFaixaEtaria !== String(resultFaixaEtaria)){
                
                if(resultFaixaEtaria != false || typeof(resultFaixaEtaria) == 'object'){

                    if(resultFaixaEtaria.length > 0){
        
                        //Cria um objeto Json para retornar a faixa etária
                        dadosFaixasEtarias.status = true
                        dadosFaixasEtarias.status_code = 200
                        dadosFaixasEtarias.ageGroups = resultFaixaEtaria
                        
                        return  dadosFaixasEtarias//200

                        
    
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
    inserirFaixaEtaria,
    atualizarFaixaEtaria,
    excluirFaixaEtaria,
    listarFaixaEtaria,
    buscarFaixaEtaria
}
