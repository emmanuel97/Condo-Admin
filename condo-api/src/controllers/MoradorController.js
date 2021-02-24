const mongoose = require('mongoose');

//instancia da tabela desejada
const Morador = mongoose.model('Morador');


module.exports = {
    async index(req,res){
        //paginate
        const {page = 1}= req.query;
        const moradores = await Morador.paginate({},{page, limit:10});

        return res.json(moradores);
    },

    async store(req,res){
        const morador = await Morador.create(req.body);

        return res.json(morador);
    },
    
    async show(req,res){
        const morador = await Morador.findById(req.params.id);
                   
        return res.json(morador);
    },

    async update(req,res){
        const morador = await Morador.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(morador);
    },

    async destroy(req,res){
        await Morador.findByIdAndRemove(req.params.id);
        
        return res.send();
    },
}