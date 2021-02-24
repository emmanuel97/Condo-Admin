const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UnidadeSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required:true,
    },
    condominio:{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Condominio'
    },
    fracaoIdeal:{
        type: Number,
        required: true,
    },
    valorMensalidade:{
        type: Number,
        required: true,
    },
});

UnidadeSchema.plugin(mongoosePaginate);

mongoose.model('Unidade',UnidadeSchema);