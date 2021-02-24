const mongoose = require('mongoose');

//instancia da tabela desejada
const Receita = mongoose.model('Receita');


module.exports = {
    async index(req,res){
        //paginate
        const {page = 1}= req.query;
        const receitas = await Receita.paginate({},{page, limit:10});

        return res.json(receitas);
    },

    async indexConta(req,res){
        const receitas = await Receita.find({conta: req.params.id})      

        return res.json(receitas);
    },

    async store(req,res){
        const receita = await Receita.create(req.body);

        return res.json(receita);
    },
    
    async show(req,res){
        const receita = await Receita.findById(req.params.id);
                   
        return res.json(receita);
    },

    async update(req,res){
        const receita = await Receita.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(receita);
    },

    async destroy(req,res){
        await Receita.findByIdAndRemove(req.params.id);
        
        return res.send();
    },
}