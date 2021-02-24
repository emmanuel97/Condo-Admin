const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MensalidadeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required:true,
    },
    
});

MensalidadeSchema.plugin(mongoosePaginate);

mongoose.model('Mensalidade',MensalidadeSchema);