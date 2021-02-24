const mongoose = require('mongoose');

//instancia da tabela desejada
const Condominio = mongoose.model('Condominio');


module.exports = {
    async index(req,res){
        //const products = await Condominio.find();
        //paginate
        const {page = 1}= req.query;
        const condominios = await Condominio.paginate({},{page, limit:10});

        return res.json(condominios);
    },

    async store(req,res){
        const condominio = await Condominio.create(req.body);

        return res.json(condominio);
    },
    
    async show(req,res){
        const condominio = await Condominio.findById(req.params.id);
                   
        return res.json(condominio);
    },

    async update(req,res){
        const condominio = await Condominio.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(condominio);
    },

    async destroy(req,res){
        await Condominio.findByIdAndRemove(req.params.id);
        
        return res.send();
    },
}