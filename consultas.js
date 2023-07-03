//- 2 consultas com pelo menos filtros diversos (IN, GT, etc), sem projeção;
//Todos jogos lançados após 2017/05/31 
db.projeto.find(
    {dataPrevista : {$gte : "2017-05-31"},
     etapa : "Lançado"}, 
    {_id: 0}
    )
//Funcionários com 20 ou mais anos, que são ilustradores, designers, ou artistas 2D
db.funcionario.find(
    {idade: {$gte : 20},
    cargo: {$in : ["Ilustradora", "Designer", "Artista 2D"]}},
    {_id: 0}
    )

//- 1 consulta com pelo menos aggregate e lookup;
db.projeto.aggregate({})

//- 1 consulta com pelo menos sort e limit e filtros e projeções;

/*
Exibir o nome e a data prevista de 2 projetos cuja data prevista seja maior do que 2020-01-01 e que
um dos seus gêneros seja 'Mundo aberto'. Posteriormente, ordenar pela data prevista 
*/

// exemplo com ISODate
db.projeto.find(
    {
        "dataPrevista": {$gte: ISODate("2020-01-01")},
        "genero": {$in: ["Mundo Aberto"]}
    },
    {
        "nome": 1,
        "dataPrevista": 1,
        "_id": 0
    }
).sort({"dataPrevista": 1}).limit(2);

// exemplo sem ISODate
db.projeto.find(
    {
        "dataPrevista": {$gte: "2020-01-01"},
        "genero": {$in: ["Mundo Aberto"]}
    },
    {
        "nome": 1,
        "dataPrevista": 1,
        "_id": 0
    }
).sort({"dataPrevista": 1}).limit(2);

//- 1 consulta com pelo menos acesso a elemento de array;

/*
Exibir o nome e o primeiro telefone dos usuários cujo DDD seja da Paraíba (83)
*/

db.funcionario.find(
    {
        "telefones.0": /^83+/
    },
    {
        "nome": 1,
        "telefones.0": 1,
        "_id": 0
    }
);
