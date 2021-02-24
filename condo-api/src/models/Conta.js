const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ContaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required:true,
    },
    condominio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Condominio'
    },
    bancaria:{  
        type: Boolean,
        required: true,
    },
    saldoInicial:{
        type: Number,
        required: true,
    },
    saldoAtual:{
        type: Number,
        required: false,
    },
});

ContaSchema.plugin(mongoosePaginate);

mongoose.model('Conta',ContaSchema);