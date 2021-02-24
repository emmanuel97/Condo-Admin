const mongoose = require('mongoose');

//instancia da tabela desejada
const Categoria = mongoose.model('Categoria');


module.exports = {
    async index(req,res){
        //const products = await Condominio.find();
        //paginate
        const {page = 1}= req.query;
        const categorias = await Categoria.paginate({},{page, limit:10});

        return res.json(categorias);
    },

    async indexCondo(req,res){
        const categorias = await Categoria.find({condominio: req.params.id})      

        return res.json(categorias);
    },

    async store(req,res){
        const categoria = await Categoria.create(req.body);

        return res.json(categoria);
    },
    
    async show(req,res){
        const categoria = await Categoria.findById(req.params.id);
                   
        return res.json(categoria);
    },

    async update(req,res){
        const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(categoria);
    },

    async destroy(req,res){
        await Categoria.findByIdAndRemove(req.params.id);
        
        return res.send();
    },
}