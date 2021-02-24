const mongoose = require('mongoose');

//instancia da tabela desejada
const Conta = mongoose.model('Conta');


module.exports = {
    async index(req,res){
        //paginate
        const {page = 1}= req.query;
        const contas = await Conta.paginate({},{page, limit:10});

        return res.json(contas);
    },

    async indexCondo(req,res){
        const contas = await Conta.find({condominio: req.params.id})      

        return res.json(contas);
    },

    async store(req,res){
        const conta = await Conta.create(req.body);

        return res.json(conta);
    },
    
    async show(req,res){
        const conta = await Conta.findById(req.params.id);
                   
        return res.json(conta);
    },

    async update(req,res){
        const conta = await Conta.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(conta);
    },

    async destroy(req,res){
        await Conta.findByIdAndRemove(req.params.id);
        
        return res.send();
    },
}