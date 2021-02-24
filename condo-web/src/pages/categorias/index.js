import React, {Component} from "react";
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css';

export default class Categorias extends Component{
    constructor() {
        super();
        this.state = {
            categorias : [], condominio:{id:"",nome:""},
        };
    }

    async componentDidMount(){
        const {condominio} = this.state;
        const {id} = await this.props.match.params;
        condominio.id=id;
        const res = await api.get(`/condominios/${condominio.id}`);
        condominio.nome= res.data.nome;
        this.setState({condominio});
        await this.getCategorias();
    }
    getCategorias = () => {
        const {condominio} = this.state;
        api.get(`/categorias/condominio/${condominio.id}`)
        .then(res => {
            console.log(res);
            this.setState({categorias : res.data});
        })
    }
    //

    render(){
        const {categorias, condominio} = this.state;// abrevia acesso a state
        return (
                <div className="lista-categorias">
                <Link to={`/condominios/${condominio.id}`}>Voltar ao Condominio</Link>
                <Link to={`/categorias/cadastrar/${condominio.id}`}>Cadastrar categorias</Link>
                    <h1>Contagem das categorias cadastradas para {condominio.nome}: {this.state.categorias.length}</h1>
                    {categorias.map(categoria => (

                        <article key={categoria._id}>
                            <h1>Nome: {categoria.nome}</h1>
                            {(categoria.categoria_pai) ? 
                            (<h1>Categoria Superior: {(categorias.find(x => categoria.categoria_pai === x._id)).nome}</h1>)
                            : (<h1>Está Categoria é uma Categoria Superior</h1>)}
                            
                            <Link to={`/categorias/${categoria._id}`}>Ver categoria</Link>
                        </article>
                    ))}
                    <Link to={`/condominios/${condominio.id}`}>Voltar ao Condominio</Link>
                </div>
        );
    }
}