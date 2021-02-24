import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css'

export default class CadastrarCategoria extends Component{

constructor() {
    super();
    this.state={
        categoria:{id:"",nome:"",condominio:"",categoria_pai:""},
        categorias:[],
        condominio:{id:"",nome:""},
        nome_cat_pai:"",
    };
  }

    async componentDidMount(){
        const {categoria,condominio} = this.state;
        const {id} = this.props.match.params;
        categoria.condominio= condominio.id =id;
        this.setState({categoria});
        const res=await api.get(`/condominios/${condominio.id}`);
        condominio.nome= res.data.nome;
        this.setState({categoria,condominio});
        this.getCategorias();
        this.editarCategoria_pai("null");
    }

    getCategorias = () => {
        const {condominio} = this.state;
        api.get(`/categorias/condominio/${condominio.id}`)
        .then(res => {
            console.log(res.data);
            this.setState({categorias:res.data});
        })
    }

    editar = (e) => {
        const {categoria} = this.state;
        if(e.target.name==='nome')
            categoria.nome=e.target.value;
        if(e.target.name==='categoria_pai'){
            this.editarCategoria_pai(e.target.value);
        }
        this.setState({categoria});
    }

    editarCategoria_pai = (id) => {
        const {categorias,categoria} = this.state;
        if(id==="null"){
            categoria.categoria_pai=null;
            this.setState({nome_cat_pai:"Está Categoria é uma Categoria Superior"});
        }else{
            categoria.categoria_pai=id;
            this.setState({categoria,nome_cat_pai:`Categoria Superior: ${categorias.find(x => id === x._id).nome}`});
        }
    }

    cadastrar = (e) => {
        e.preventDefault();
        const {categoria} = this.state;
        api.post('/categorias', {"nome":categoria.nome,
        "condominio":categoria.condominio,
        "categoria_pai":categoria.categoria_pai})
            .catch()
            .then(res => {
            console.log(res);
            if(res.status===200){
                alert("categoria Cadastrada com sucesso com Sucesso!!!");
                this.props.history.push(`/categorias/listar/${categoria.condominio}`);
            }else
                alert("Erro ao cadastrar a categoria!!!");
            })
    }

    render(){
        const {categoria,condominio,categorias,nome_cat_pai} = this.state;

        return (
            <div className='categoria-info'>
                <Link to={`/categorias/listar/${condominio.id}`}>Voltar á lista de categorias</Link>
                <Link to={'/condominios'}>Voltar ao Condominio</Link>
                <h1>Página de cadastro de categoria para: {condominio.nome}</h1>
                <h1>Nome: {categoria.nome}</h1>
                <h1>{nome_cat_pai}</h1>
                            
                <form onSubmit={this.cadastrar}>
                    <label>Nome:<br/><input type="text" name='nome' value={categoria.nome} onChange={this.editar}/></label><br/>
                    <label>Categoria Superior:<br/>
                    <select name="categoria_pai" onChange={this.editar}>
                    <option key={-1}value={"null"}>---</option>
                        {categorias.map(cat => (
                            <option key={cat._id}value={cat._id}>
                            {(cat.nome)}
                            </option>
                        ))}
                    </select>
                    </label>
                    <input type="submit" value="Cadastrar Categoria" /><br/>
                </form>
                <Link to={`/categorias/listar/${condominio.id}`}>Voltar á lista de categorias</Link><br/>
                <Link to={'/condominios'}>Voltar ao Condominio</Link><br/>
            </div>
        );
    }

}