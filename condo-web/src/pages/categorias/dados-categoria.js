import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css'

export default class Categoria extends Component{


constructor() {
    super();
    this.state={
        categoria:{id:"",nome:"",condominio:"",categoria_pai:"",valorMensalidade:""},
        condominio:{id:"",nome:""},
        categorias : [],
        nome_cat_pai:"",
    };
  }

    async componentDidMount(){
        const {id} = await this.props.match.params;
        const {categoria,condominio} = this.state;
        const response = await api.get(`/categorias/${id}`);
 
        categoria.id= id;
        categoria.nome= response.data.nome;
        categoria.condominio= condominio.id = response.data.condominio;
        categoria.categoria_pai= response.data.categoria_pai;
        
        await api.get(`/condominios/${condominio.id}`)
        .then(res => {
            condominio.nome= res.data.nome;
            console.log(res.data);
            this.setState({categoria,condominio});
            this.getCategorias();   
                     
        })
    }

    getCategorias = () => {
        const {condominio,categoria} = this.state;
        api.get(`/categorias/condominio/${condominio.id}`)
        .then(res => {
            console.log(res.data);
            this.setState({categorias:res.data});
            this.editarCategoria_pai(categoria.categoria_pai);  
        })
    }

    editar = (e) => {
        const {categoria} = this.state;
        if(e.target.name==='nome')
            categoria.nome=e.target.value;
        if(e.target.name==='categoria_pai')
            this.editarCategoria_pai(e.target.value);
        this.setState({categoria});
    }

    editarCategoria_pai = (id) => {
        const {categoria,categorias} = this.state;
        if(categoria.id!==id){
            categoria.categoria_pai=id;
            this.setState({nome_cat_pai:`Categoria Superior: ${categorias.find(x => id === x._id).nome}`});
        }
        else if(categoria.id===id){
            categoria.categoria_pai=null;
            this.setState({nome_cat_pai:"Está Categoria é uma Categoria Superior"});
            }
        }

    atualizar = (e) => {
        e.preventDefault();
        const {categoria} = this.state;
            api.put(`categorias/${categoria.id}`, {"nome":categoria.nome,
            "categoria_pai":categoria.categoria_pai})
                .then(res => {
                console.log(res);
                if(res.status===200)
                    alert("categoria Editada com Sucesso!!!");
                else
                    alert("Erro ao editar a categoria!!!");
                })
        
        }

    excluir = (e) =>{
        const {categoria} = this.state;
        api.delete(`categorias/${categoria.id}`)
            .then(res => {
                console.log(res);
                if(res.status===200){
                    alert("categoria Excluida com Sucesso!!!");
                    this.props.history.push(`/categorias/listar/${categoria.condominio}`);
                }else{
                    alert("Erro ao excluir a categoria!!!");
                    console.log(res);
                }   
          })     
    }


    render(){
        const {categoria,condominio,categorias,nome_cat_pai} = this.state;

        return (
            <div className='categoria-info'>
                <Link to={`/categorias/listar/${condominio.id}`}>Voltar á lista de categorias</Link>
                <Link to={'/condominios'}>Voltar ao Condominio</Link>
                <h1>{condominio.nome}</h1>
                <h1>Nome: {categoria.nome}</h1>
                <h1>{nome_cat_pai}</h1>
                            
                <form onSubmit={this.atualizar}>
                    <label>Nome:<input type="text" name='nome' value={categoria.nome} onChange={this.editar}/></label><br/>
                    <label>Categoria Pai:<br/>
                    <select name="categoria_pai" onChange={this.editar}>
                        {categorias.map(cat => (
                            <option key={cat._id}value={cat._id}>
                            {(cat._id===categoria.id) ? ("---"):(cat.nome) }
                            </option>
                        ))}
                    </select>
                    </label><br/>
                    <input type="submit" value="Editar Categoria" /><br/>
                </form>
                <button onClick={this.excluir}>Excluir categoria</button><br/>
                <Link to={`/categorias/listar/${condominio.id}`}>Voltar á lista de categorias</Link><br/>
                <Link to={'/condominios'}>Voltar ao Condominio</Link><br/>
            </div>
        );
    }

}