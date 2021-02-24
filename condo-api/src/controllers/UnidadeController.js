const mongoose = require('mongoose');

//instancia da tabela desejada
const Unidade = mongoose.model('Unidade');


module.exports = {
    async index(req,res){
        //paginate
        const {page = 1}= req.query;
        const unidades = await Unidade.paginate({},{page, limit:10});

        return res.json(unidades);
    },

    async indexCondo(req,res){
        const unidades = await Unidade.find({condominio: req.params.id})      

        return res.json(unidades);
    },

    async store(req,res){
        const unidade = await Unidade.create(req.body);

        return res.json(unidade);
    },
    
    async show(req,res){
        const unidade = await Unidade.findById(req.params.id);
                   
        return res.json(unidade);
    },

    async update(req,res){
        const unidade = await Unidade.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(unidade);
    },

    async destroy(req,res){
        await Unidade.findByIdAndRemove(req.params.id);
        
        return res.send();
    },
}