const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ReceitaSchema = new mongoose.Schema({
    valor: {
        type: Number,
        required:true,
    },
    fornecedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conta'
    },
    conta:{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fornecedor'
    },
    categoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    liquidada:{
        type: Boolean,
        required: true,
    },
    competencia:{
        type: String,
        required: true,
    },
    data_vencimento:{
        type: Date,
        required: true,
    },
    data_liquidada:{
        type: Date,
        required: false,
    },
});

ReceitaSchema.plugin(mongoosePaginate);

mongoose.model('Receita',ReceitaSchema);