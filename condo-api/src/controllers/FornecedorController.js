const mongoose = require('mongoose');

//instancia da tabela desejada
const Fornecedor = mongoose.model('Fornecedor');


module.exports = {
    async index(req,res){
        //paginate
        const {page = 1}= req.query;
        const fornecedores = await Fornecedor.paginate({},{page, limit:10});

        return res.json(fornecedores);
    },

    async indexCondo(req,res){
        const fornecedores = await Fornecedor.find({condominio: req.params.id})      

        return res.json(fornecedores);
    },


    async store(req,res){
        const fornecedor = await Fornecedor.create(req.body);

        return res.json(fornecedor);
    },
    
    async show(req,res){
        const fornecedor = await Fornecedor.findById(req.params.id);
                   
        return res.json(fornecedor);
    },

    async update(req,res){
        const fornecedor = await Fornecedor.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(fornecedor);
    },

    async destroy(req,res){
        await Fornecedor.findByIdAndRemove(req.params.id);
        
        return res.send();
    },
}