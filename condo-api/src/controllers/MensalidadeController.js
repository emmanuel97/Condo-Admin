const mongoose = require('mongoose');

//instancia da tabela desejada
const Mensalidade = mongoose.model('Mensalidade');


module.exports = {
    async index(req,res){
        //paginate
        const {page = 1}= req.query;
        const mensalidades = await Mensalidade.paginate({},{page, limit:10});

        return res.json(mensalidades);
    },

    async store(req,res){
        const mensalidade = await Mensalidade.create(req.body);

        return res.json(mensalidade);
    },
    
    async show(req,res){
        const mensalidade = await Mensalidade.findById(req.params.id);
                   
        return res.json(mensalidade);
    },

    async update(req,res){
        const mensalidade = await Mensalidade.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(mensalidade);
    },

    async destroy(req,res){
        await Mensalidade.findByIdAndRemove(req.params.id);
        
        return res.send();
    },
}