// importa o express
const express = require('express');
// cria uma variável chamada server que chama a função express
const server = express();

// faz com que o express entenda JSON
server.use(express.json());

// As informações ficaram armazenadas dentro deste array 
const geeks = [];

// Middleware Genérico
// Podemos fazer com que um middleware seja utilizado por vários métodos.
server.use((req,res,next) => {
    console.time('Request');
    console.log(`Método: ${req.method};\nURL: ${req.url};`);

    next();

    console.log('Finalizou');
    console.timeEnd('Request');
})


// Cria a rota /teste com o método GET, o console.log retornará no terminal ‘teste’ caso tenha executado com sucesso.
server.get( '/teste' ,() => {
    console.log('teste')
});


// criar rotas do tipo POST, PUT e DELETE, vamos precisar instalar um software chamado Insomnia.

//Agora vamos criar o CRUD


//Agora vamos adicionar dois parâmetros na nossa função, dessa forma:

server.get('/geeks', (req, res) => {
    // req ➔ representa todos os dados da requisição.

    // res ➔ todas as informações necessárias para informar uma resposta para o front-end.
    return res.json(geeks)
}); // Rota para listar todos os geeks



// Agora vamos criar uma rota para criar Geeks

server.post('/geeks',checkGeekExists ,(req, res) => {
    // assim esperamos buscar o name informado dentro do body da requisição
    const { name } = req.body;

    geeks.push(name);

    // retorna a informação da variável geeks
    return res.json(geeks);
});


// Agora vamos agora incluir a ação de Editar

server.put('/geeks/:index', checkGeekExists, checkGeekInArray, (req, res) => {
    // recupera o index com os dados
    const { index } = req.params;
    const { name } = req.body;

    // sobrepõe o index obtido na rota de acordo com o novo valor
    geeks[index] = name;

    // retorna novamente os geeks atualizados após o update
    return res.json(geeks);
});


// Agora vamos excluir

server.delete('/geeks/:index', (req, res) => {
    // recupera o index com os dados
    const { index } = req.params;

    // percorre o vetor até o index selecionado e deleta uma posição no array
    geeks.splice(index, 1);

    // retorna os dados após exclusão
    return res.send('Usuário excluído com sucesso!');
});

// Agora vamos buscar um único usuário

server.get('/geeks/:index', checkGeekInArray, (req, res) => {
    const { index } = req.params;


    return res.json(geeks[index]);
});



// MIDDLEWARES

// assim esperamos buscar se a propriedade name foi informada corretamente 
function checkGeekExists (req, res, next) {

    // middleware local que irá checar se a propriedade name foi informada corretamente,
    // caso negativo, irá retornar um erro 400 – BAD REQUEST

    if(!req.body.name) {
        return res.status(400).json({error: 'geek name is required.'});
    }

    // se o nome for informado corretamente, a função next() chama as próximas ações
    return next();

}

function checkGeekInArray (req, res, next) {
    const geek = geeks[req.params.index]

    if (!geek) {
        return res.status(400).json({error: 'geek does not exists.'})
    }

    req.geek = geek;

    return next();

}

 // faz com que o servidor seja executado na porta 3000 do seu localhost:3000
 server.listen('3000', () => {
    console.log('O servidor está rodando!')
});




