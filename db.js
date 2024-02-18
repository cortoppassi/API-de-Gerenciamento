const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('TESTE', 'root', 'admin', {
    host: "localhost",
    dialect: "mysql"

});

const Postagem = sequelize.define("postagem", {
    titulo: {
        type:   Sequelize.STRING
    },
    conteudo: {
        type:   Sequelize.TEXT
    },
 });

Postagem.sync({force: true});

const Usuario = sequelize.define("usuarios", {
    nome: {
        type:   Sequelize.STRING
    },
    sobrenome: {
        type:   Sequelize.STRING
    },
    idade: {
        type:   Sequelize.INTEGER
    },
    email: {
        type:   Sequelize.STRING
    }
});

Usuario.sync({force: true});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão estabelecida com sucesso.");
  })
  .catch((error) => {
    console.error("Não foi possível conectar ao banco de dados:", error);
  });
