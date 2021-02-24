import React from 'react';

import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';

//rotas condominio
import Condominios from './pages/condominios/index';
import Condominio from './pages/condominios/dados-condominio';
import CadastrarCondominio from './pages/condominios/cadastrar-condominio';

//rotas unidades
import Unidades from './pages/unidades/index';
import Unidade from './pages/unidades/dados-unidade';
import CadastrarUnidade from './pages/unidades/cadastrar-unidade';

//rotas fornecedores
import Fornecedores from './pages/fornecedores/index';
import Fornecedor from './pages/fornecedores/dados-fornecedor';
import CadastrarFornecedor from './pages/fornecedores/cadastrar-fornecedor';

//rotas Categorias
import Categorias from './pages/categorias/index';
import Categoria from './pages/categorias/dados-categoria';
import CadastrarCategoria from './pages/categorias/cadastrar-categoria';

//rotas Contas
import Contas from './pages/contas/index';
import Conta from './pages/contas/dados-conta';
import CadastrarConta from './pages/contas/cadastrar-conta';

//rotas Despesas
import Despesas from './pages/despesas/index';
import Despesa from './pages/despesas/dados-despesa';
import CadastrarDespesa from './pages/despesas/cadastrar-despesa';

//rotas Receitas
import Receitas from './pages/receitas/index';
import Receita from './pages/receitas/dados-receita';
import CadastrarReceita from './pages/receitas/cadastrar-receita';


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Main}/>  

            <Route exact path='/condominios' component={Condominios}/>
            <Route path='/condominios/cadastrar' component={CadastrarCondominio}/> 
            <Route path='/condominios/:id' component={Condominio}/>

            <Route exact path='/unidades/:id' component={Unidade}/>
            <Route path='/unidades/listar/:id' component={Unidades}/>
            <Route path='/unidades/cadastrar/:id' component={CadastrarUnidade}/>

            <Route exact path='/fornecedores/:id' component={Fornecedor}/>
            <Route path='/fornecedores/listar/:id' component={Fornecedores}/>
            <Route path='/fornecedores/cadastrar/:id' component={CadastrarFornecedor}/>  

            <Route exact path='/categorias/:id' component={Categoria}/>
            <Route path='/categorias/listar/:id' component={Categorias}/>
            <Route path='/categorias/cadastrar/:id' component={CadastrarCategoria}/> 

            <Route exact path='/contas/:id' component={Conta}/>
            <Route path='/contas/listar/:id' component={Contas}/>
            <Route path='/contas/cadastrar/:id' component={CadastrarConta}/> 
            
            <Route exact path='/despesas/:id' component={Despesa}/>
            <Route path='/despesas/listar/:id' component={Despesas}/>
            <Route path='/despesas/cadastrar/:id' component={CadastrarDespesa}/> 

            <Route exact path='/receitas/:id' component={Receita}/>
            <Route path='/receitas/listar/:id' component={Receitas}/>
            <Route path='/receitas/cadastrar/:id' component={CadastrarReceita}/> 
            
            
        </Switch>
    </BrowserRouter>
);

export default Routes;