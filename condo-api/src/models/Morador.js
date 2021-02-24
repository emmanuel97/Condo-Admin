const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MoradorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required:true,
    },
    unidade:{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unidade'
    },
    juridica:{
        type: String,
        required: true,
    },
    identificador:{
        type: String,
        required: true,
    },
    tel1:{
        type: String,
        required: true,
    },
    tel2:{
        type: String,
        required: false,
    },
    email1:{
        type: String,
        required: true,
    },
    email2:{
        type: String,
        required: false,
    },
});

MoradorSchema.plugin(mongoosePaginate);

mongoose.model('Morador',MoradorSchema);