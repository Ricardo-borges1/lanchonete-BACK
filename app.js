/****************************************************************
 * Objetivo: Arquivo responsavel pelos endpoints
 * Data: 16/05/2024
 * Autor: Cauã, Ricardo, Gabrielle e Nathalia
 * Versão: 1.0
 ****************************************************************/

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) =>{

    // Permite especificar quem podera acessar a API ('*' = Liberar acesso público, 'IP' = Liberar acesso apenas para aquela maquina);
    response.header('Access-Control-Allow-Origin', '*')

    // Permite especificar como a API, sera requisitada ('GET', 'POST', 'PUT' e 'DELETE')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    // Ativa as confgurações de cors
    app.use(cors())


    next()
})

/*********************** Import dos arquivos de controller do projeto ***********************************/
    const controllerProduto = require('./controller/controller_produto.js')
const controllerCategoria = require('./controller/controller_categoria.js')
const controllerCliente = require('./controller/controller_cliente.js')
const controllerEndereco = require('./controller/controller_endereco.js')
/*******************************************************************************************************/

// Criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json()


//       --------------------   CRUD PRODUTOS  ---------------------        //


    // -> EndPoint: Versão 2.0 - Retorna os dados de produtos do Banco de Dados
    app.get('/v1/lanchonete/produtos', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosProduto = await controllerProduto.getListarProdutos()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosProduto.status_code)
        response.json(dadosProduto)
    })

    // //EndPoint: Ele retorna os dados do filme filtrado pelo nome
    // app.get('/v2/acmeFilmes/Filmes/Filtro', cors(), async function(request, response){
    //     let nome = request.query.nome
    //     let dadosFilmes = await controllerFilmes.getNomeFilme(nome)

    //     response.status(dadosFilmes.status_code)
    //     response.json(dadosFilmes)
    // })

    // // EndPoint: ele retorna os dados pelo id
    app.get('/v1/lanchonete/produto/:id', cors(), async function(request, response, next){

        // Recebe o id da requisição
        let idProduto = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosProduto = await controllerProduto.getBuscarProdutoId(idProduto)

        
        response.status(dadosProduto.status_code)
        response.json(dadosProduto)
    })

    // //EndPoint: Ele insere dados sobre o filme
    app.post('/v1/lanchonete/produto', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovoProduto = await controllerProduto.setInserirNovoProduto(dadosBody, contentType)
        
        response.status(resultDadosNovoProduto.status_code)
        response.json(resultDadosNovoProduto)
    })

     //EndPoint: Ele deleta os dados pelo id 
    app.delete('/v2/lanchonete/produto/:id', cors(), async function(request, response, next){
        let idProduto = request.params.id

        let dadosProduto = await controllerProduto.setExcluirProduto(idProduto)

        response.status(dadosProduto.status_code)
        response.json(dadosProduto)
    })

    // app.put('/v2/acmeFilmes/filme/:id', cors(), bodyParserJSON, async function(request, response){
    //     let contentType = request.headers['content-type']
    //     let dadosBody = request.body
    //     let idFilme = request.params.id

    //     let dadosFilme = await controllerFilmes.setAtualizarFilme(idFilme, dadosBody, contentType)

    //     response.status(dadosFilme.status_code)
    //     response.json(dadosFilme)
    // })



    //       --------------------   CRUD CATEGORIA  ---------------------        //

    app.get('/v1/lanchonete/categoria', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosCategoria = await controllerCategoria.getListarCategoria()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosCategoria.status_code)
        response.json(dadosCategoria)
    })


    app.get('/v1/lanchonete/categoria/:id', cors(), async function(request, response, next){

        // Recebe o id da requisição
        let idCategoria = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosCategoria = await controllerCategoria.getBuscarCategoriaId(idCategoria)

        
        response.status(dadosCategoria.status_code)
        response.json(dadosCategoria)
    })


    app.post('/v1/lanchonete/categoria', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovaCategoria = await controllerCategoria.setInserirNovaCategoria(dadosBody, contentType)
        
        response.status(resultDadosNovaCategoria.status_code)
        response.json(resultDadosNovaCategoria)
    })


    app.delete('/v1/lanchonete/categoria/:id', cors(), async function(request, response, next){
        let idCategoria = request.params.id

        let dadosCategoria = await controllerCategoria.setExcluirCategoria(idCategoria)

        response.status(dadosCategoria.status_code)
        response.json(dadosCategoria)
    })



     //       --------------------   CRUD CLIENTES  ---------------------        //


     app.get('/v1/lanchonete/cliente', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosCliente = await controllerCliente.getListarCLiente()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosCliente.status_code)
        response.json(dadosCliente)
    })


    app.get('/v1/lanchonete/cliente/:id', cors(), async function(request, response, next){

        // Recebe o id da requisição
        let idCliente = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosCliente = await controllerCliente.getBuscarClienteId(idCliente)

        
        response.status(dadosCliente.status_code)
        response.json(dadosCliente)
    })


    app.post('/v1/lanchonete/cliente', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovoCliente = await controllerCliente.setInserirNovoCliente(dadosBody, contentType)
        
        response.status(resultDadosNovoCliente.status_code)
        response.json(resultDadosNovoCliente)
    })


    app.delete('/v1/lanchonete/cliente/:id', cors(), async function(request, response, next){
        let idCliente = request.params.id

        let dadosCliente = await controllerCliente.setExcluirCliente(idCliente)

        response.status(dadosCliente.status_code)
        response.json(dadosCliente)
    })

     app.put('/v2/lanchonete/cliente/:id', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let idCliente = request.params.id

        let dadosCliente = await controllerCliente.setAtualizarCliente(idCliente, dadosBody, contentType)

        response.status(dadosCliente.status_code)
        response.json(dadosCliente)
    })



        //       --------------------   CRUD ENDERECO  ---------------------        //


        app.get('/v1/lanchonete/endereco', cors(), async function(request, response){

            // -> Chama a função da controller para retornar todos os filmes
            let dadosEndereco = await controllerEndereco.getListarEndereco()
    
            // -> validação para verificar se existem dados a serem retornados
            response.status(dadosEndereco.status_code)
            response.json(dadosEndereco)
        })
    
    
        app.get('/v1/lanchonete/endereco/:id', cors(), async function(request, response, next){
    
            // Recebe o id da requisição
            let idEndereco = request.params.id
            // Encaminha o ID para a controller buscar o Filme
            let dadosEndereco = await controllerEndereco.getBuscarEnderecoId(idEndereco)
    
            
            response.status(dadosEndereco.status_code)
            response.json(dadosEndereco)
        })
    
    
        app.post('/v1/lanchonete/endereco', cors(), bodyParserJSON, async function(request, response){
    
            // Recebe o content-type da requisição
            let contentType = request.headers['content-type']
    
            //Recebe todos os dados encaminhados na requisição pelo Body
            let dadosBody = request.body
    
            //Encaminha os dados para a controller enviar para o DAO
            let resultDadosNovoEndereco = await controllerEndereco.setInserirNovoEndereco(dadosBody, contentType)
            
            response.status(resultDadosNovoEndereco.status_code)
            response.json(resultDadosNovoEndereco)
        })
    
    
        app.delete('/v1/lanchonete/endereco/:id', cors(), async function(request, response, next){
            let idEndereco = request.params.id
    
            let dadosEndereco = await controllerEndereco.setExcluirEndereco(idEndereco)
    
            response.status(dadosEndereco.status_code)
            response.json(dadosEndereco)
        })
    
         app.put('/v1/lanchonete/endereco/:id', cors(), bodyParserJSON, async function(request, response){
            let contentType = request.headers['content-type']
            let dadosBody = request.body
            let idEndereco = request.params.id
    
            let dadosEndereco = await controllerEndereco.setAtualizaEndereco(idEndereco, dadosBody, contentType)
    
            response.status(dadosEndereco.status_code)
            response.json(dadosEndereco)
        })
    


    app.listen('8080', function(){
        console.log('API funcionando!!')
    })







    