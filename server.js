const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};
// app.use(cors(corsOptions));
app.use(cors());
// analisar solicitações de content-type - application/json
app.use(express.json());
// analisar solicitações de content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//conexão com MongoDB
const db = require("./app/models");
const Role = db.role;
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexão com MongoDB estabelecidade com sucesso");
    initial();
  })
  .catch((err) => {
    console.error("Falha na conexão", err);
    process.exit();
  });

// rotas
app.get("/", (req, res) => {
  res.json({ message: "Teste API Express." });
});
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set porta, escuta as requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
