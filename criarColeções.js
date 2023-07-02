db.createCollection("projeto", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nome", "dataInicio", "etapa", "genero", "possui"],
      properties: {
        nome: {
          bsonType: "string",
          description: "O campo 'nome' é obrigatório e deve ser do tipo string."
        },
        dataInicio: {
          bsonType: "string",
          description: "O campo 'data' é obrigatório e deve ser do tipo string."
        },
        etapa: {
          bsonType: "string",
          description: "O campo 'etapa' é obrigatório e deve ser do tipo string."
        },
        genero: {
          bsonType: "array",
          description: "O campo 'genero' é obrigatório e deve ser do tipo array.",
          items: {
            bsonType: "string",
            description: "Cada elemento do array 'genero' deve ser do tipo string.",
            minLength: 1
          }
        },
        possui: {
          bsonType: "array",
          description: "O campo 'possui' é obrigatório e deve ser do tipo array.",
          items: {
            bsonType: "objectId",
            description: "Cada elemento do array 'possui' deve ser do tipo objectId.",
            minLength: 1
          }
        }
      }
    }
  }
})

db.createCollection("funcionario", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["cpf", "nome", "telefone", "endereco", "cargo", "salario"],
      properties: {
        cpf : {
          bsonType: "string",
          description: "O campo 'cpf' é obrigatório e dever ser do tipo string."
        },
        nome: {
          bsonType: "string",
          description: "O campo 'nome' é obrigatório e deve ser do tipo string."
        },
        telefone: {
          bsonType: "array",
          description: "O campo 'telefone' é obrigatório e deve ser do tipo array.",
          items : {
            bsonType : "string",
            description : "Cada elemento do array 'telefone' deve ser do tipo string."
          }
        },
        endereco: {
          bsonType: "object",
          description: "O campo 'endereco' é obrigatório e deve ser do tipo object."
        },
        cargo: {
          bsonType: "string",
          description: "O campo 'cargo' é obrigatório e deve ser do tipo string."
        },
        salario: {
          bsonType: "int",
          description: "O campo 'salario' é obrigatório e deve ser do tipo int."
        }
      }
    }
  }
})