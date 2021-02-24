const expresss = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const requireDir = require('require-dir');
//faz require das tabelas no diretorio fornecido em todos os arquivos js

//iniciando o app
const app = expresss();
app.use(expresss.json());
app.use(cors());

// iniciando o DB
mongoose.connect(
    "mongodb://localhost:27017/condoapi",
     {useNewUrlParser: true, useUnifiedTopology: true },
     );
//chama tabela do banco
//require('./src/models/Condominio.js');
requireDir('./src/models');

//rotas
app.use('/api',require("./src/routes"));
//use aceita qualquer tipo de requisisao


app.listen(3050); 
//configura a porta do projeto