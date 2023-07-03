//- 2 consultas com pelo menos filtros diversos (IN, GT, etc), sem projeção;
//Todos jogos lançados após 2017/05/31 
db.projeto.find({dataPrevista : {$gte : "2017-05-31"},
                etapa : "Lançado"})
//Funcionários com 20 ou mais anos, que são ilustradores, designers, ou artistas 2D
db.funcionario.find({idade: {$gte : 20},
                    cargo: {$in : ["Ilustradora", "Designer", "Artista 2D"]}})

//- 1 consulta com pelo menos aggregate e lookup;
db.projeto.find({})

