const express = require('express');
const routes = express.Router();

const CondominioController = require('./controllers/CondominioController');
const UnidadeController = require('./controllers/UnidadeController');
const MoradorController = require('./controllers/MoradorController');
const FornecedorController = require('./controllers/FornecedorController');
const ContaController = require('./controllers/ContaController');
const MensalidadeController = require('./controllers/MensalidadeController');
const ReceitaController = require('./controllers/ReceitaController');
const DespesaController = require('./controllers/DespesaController');
const CategoriaController = require('./controllers/CategoriaController');

//rotas condominio  
routes.get('/condominios',CondominioController.index);
routes.get('/condominios/:id',CondominioController.show);
routes.post('/condominios',CondominioController.store);
routes.put('/condominios/:id',CondominioController.update);
routes.delete('/condominios/:id',CondominioController.destroy);

//rotas unidades
routes.get('/unidades',UnidadeController.index);
routes.get('/unidades/condominio/:id',UnidadeController.indexCondo);
routes.get('/unidades/:id',UnidadeController.show);
routes.post('/unidades',UnidadeController.store);
routes.put('/unidades/:id',UnidadeController.update);
routes.delete('/unidades/:id',UnidadeController.destroy);

//rotas moradores
routes.get('/moradores',MoradorController.index);
routes.get('/moradores/:id',MoradorController.show);
routes.post('/moradores',MoradorController.store);
routes.put('/moradores/:id',MoradorController.update);
routes.delete('/moradores/:id',MoradorController.destroy);

//rotas fornecedores
routes.get('/fornecedores',FornecedorController.index);
routes.get('/fornecedores/condominio/:id',FornecedorController.indexCondo);
routes.get('/fornecedores/:id',FornecedorController.show);
routes.post('/fornecedores',FornecedorController.store);
routes.put('/fornecedores/:id',FornecedorController.update);
routes.delete('/fornecedores/:id',FornecedorController.destroy);

//rotas contas
routes.get('/contas',ContaController.index);
routes.get('/contas/condominio/:id',ContaController.indexCondo);
routes.get('/contas/:id',ContaController.show);
routes.post('/contas',ContaController.store);
routes.put('/contas/:id',ContaController.update);
routes.delete('/contas/:id',ContaController.destroy);

//rotas mensalidades
routes.get('/mensalidades',MensalidadeController.index);
routes.get('/mensalidades/:id',MensalidadeController.show);
routes.post('/mensalidades',MensalidadeController.store);
routes.put('/mensalidades/:id',MensalidadeController.update);
routes.delete('/mensalidades/:id',MensalidadeController.destroy);

//rotas categorias
routes.get('/categorias',CategoriaController.index);
routes.get('/categorias/condominio/:id',CategoriaController.indexCondo);
routes.get('/categorias/:id',CategoriaController.show);
routes.post('/categorias',CategoriaController.store);
routes.put('/categorias/:id',CategoriaController.update);
routes.delete('/categorias/:id',CategoriaController.destroy);

//rotas receitas
routes.get('/receitas',ReceitaController.index);
routes.get('/receitas/conta/:id',ReceitaController.indexConta);
routes.get('/receitas/:id',ReceitaController.show);
routes.post('/receitas',ReceitaController.store);
routes.put('/receitas/:id',ReceitaController.update);
routes.delete('/receitas/:id',ReceitaController.destroy);

//rotas despesas
routes.get('/despesas',DespesaController.index);
routes.get('/despesas/condominio/:id',DespesaController.indexCondo);
routes.get('/despesas/:id',DespesaController.show);
routes.post('/despesas',DespesaController.store);
routes.put('/despesas/:id',DespesaController.update);
routes.delete('/despesas/:id',DespesaController.destroy);


module.exports = routes;
