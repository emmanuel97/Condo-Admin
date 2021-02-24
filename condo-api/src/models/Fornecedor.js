const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const FornecedorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required:true,
    },
    condominio:{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Condominio'
    },
    juridica:{
        type: String,
        required: true,
    },
    identificador:{
        type: String,
        required: true,
    },
    endereco:{
        type: String,
        required: false,
    },
    tel1:{
        type: String,
        required: false,
    },
    tel2:{
        type: String,
        required: false,
    },
    email1:{
        type: String,
        required: false,
    },
    email2:{
        type: String,
        required: false,
    },
});

FornecedorSchema.plugin(mongoosePaginate);

mongoose.model('Fornecedor',FornecedorSchema);

