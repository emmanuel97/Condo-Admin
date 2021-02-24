const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CondominioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required:true,
    },
    endereco: {
        type: String,
        required: true,
    },
    tel:{  
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    cnpj:{
        type: String,
        required: true,
    },
    data_cadastro:{
        type: Date,
        default: Date.now(),
    },
});

CondominioSchema.plugin(mongoosePaginate);

mongoose.model('Condominio',CondominioSchema);