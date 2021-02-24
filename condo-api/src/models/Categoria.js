const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CategoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required:true,
    },
    condominio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Condominio'
    },
    categoria_pai:{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: false,
    },
});

CategoriaSchema.plugin(mongoosePaginate);

mongoose.model('Categoria',CategoriaSchema);