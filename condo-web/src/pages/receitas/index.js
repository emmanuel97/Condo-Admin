import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css'

export default class Unidades extends Component{
    constructor() {
        super();
        this.state = {
            unidades : [], condominio:"",
        };
    }

    async componentDidMount(){
        const {id} = await this.props.match.params;
        this.setState({condominio:id});
        await this.getUnidades();
    }
    getUnidades = () => {
        const {condominio} = this.state;
        api.get(`/unidades/condominio/${condominio}`)
        .then(res => {
            console.log(res);
            this.setState({unidades : res.data});
        })
    }
    

    render(){
        const {unidades, condominio} = this.state;// abrevia acesso a state
        
        return (
            <div className="lista-unidades">
               
               <Link to={`/unidades/cadastrar/${condominio}`}>Cadastrar Unidades</Link>
                <h1>Contagem das Unidades cadastradas para {condominio}: {this.state.unidades.length}</h1>
                {unidades.map(unidade => (

                    <article key={unidade._id}>
                        <strong>{unidade.numero}</strong>
                        <h1>{unidade.valorMensalidade}</h1>
                        <h1>{unidade.fracaoIdeal}</h1>
                        
                        <Link to={`/unidades/${unidade._id}`}>Ver Unidade</Link>
                    </article>
                ))}
            </div>
        );
    }
}