//- 2 consultas com pelo menos filtros diversos (IN, GT, etc), sem projeção;
//Todos jogos de Aventura ou Ação lançados após 2017/05/31 
db.projeto.find(
    {dataPrevista : {$gte : "2017-05-31"},
     genero : {$in : ["Aventura", "Ação"]},
     etapa : "Lançado"}
    )

    //Funcionários entre 20 e 30 (inclusive) anos, que são ilustradores, designers, ou artistas 2D
db.funcionario.find(
    {idade: {$gte : 20} && {$lte : 30},
    cargo: {$in : ["Ilustradora", "Designer", "Artista 2D"]}},
    {_id: 0}
    )


//2 consultas com pelo menos filtros diversos e com projeção;
//Funcionários sem telefone cadastrado e que não tenham cargo 'Gerente'
db.funcionario.find({"telefone": [], "cargo": { "$ne": "Gerente" }},
    {'nome': 1, 'cpf':1, 'cargo':1}
    )
//Jogos que foram lançados com valor acima de $300 e possuindo notageral maior que 9.5
db.projeto.find(
  { "jogos.valor": { "$gt": 300 },
    "jogos.notageral": { "$gt": 9.5 }},
  { "jogos.titulo": 1,
    "jogos.publicadora": 1,
    "jogos.dataLancamento":1,
    "jogos.valor":1,
    "jogos.notageral":1}
)

//- 1 consulta com pelo menos acesso a elemento de array;
/*
Exibir o nome e o(s) telefone(s) dos usuários cujo DDD seja da Paraíba (83)
*/

db.funcionario.find(
    {
        "telefone.0": /^83+/
    },
    {
        "nome": 1,
        "telefone": 1,
        "_id": 0
    }
);

//- 1 consulta com pelo menos acesso a estrutura/objeto embutido; 
// Encontre dentro de projeto os jogos lançados no Nintendo Switch
db.projeto.find({
  "jogos.plataforma": "Nintendo Switch"
}, {
  "jogos.titulo": 1,
  _id: 0
})


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

//- 1 consulta com pelo menos aggregate e group by;
/*
Exibir a quantidade de jogos lançados em cada plataforma e o nome da plataforma
*/

db.projeto.aggregate([
    {
      $unwind: {
          path: "$jogos",
        }
    },
    {
      $unwind: {
          path: "$jogos.plataforma",
        }
    },
    {
      $group: {
          _id: "$jogos.plataforma",
          quantidade: {
            $sum: 1
          }
        }
    }
]); 

//1 consulta com pelo menos aggregate e match ou project ou ambos;
//Busca os Desenvolvedores que estão em projetos
db.projeto.aggregate([
  {
    $lookup: {
      from: "funcionario",
      localField: "funcionarios",
      foreignField: "_id",
      as: "desenvolvedores"
    }},{
    $unwind: "$desenvolvedores"
  },{
    $match: {
      "desenvolvedores.cargo": "Desenvolvedor"
    }},
  {
    $project: {
      _id: 0,
     desenvolvedores: {
        nome: 1,
        cargo: 1
      }
    }}
]) 

//- 1 consulta com pelo menos aggregate e lookup;
//Quantidade de projetos os quais cada funcionário participa
db.projeto.aggregate([
    {
        '$lookup': {
            'from': 'projeto', 
            'localField': 'projetos', 
            'foreignField': '_id', 
            'as': 'result'
        }
    }, {
        '$unwind': {
            'path': '$result', 
            'preserveNullAndEmptyArrays': True
        }
    }, {
        '$group': {
            '_id': '$_id', 
            'nome': {
                '$first': '$nome'
            }, 
            'quantidade_projetos': {
                '$sum': 1
            }
        }
    }
])

//- 1 outra consulta (robusta) a seu critério, dentro do contexto da aplicação.







