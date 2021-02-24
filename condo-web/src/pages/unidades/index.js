import React, {Component} from "react";
import api from '../../services/api';
import {Link} from 'react-router-dom';

//import './style.css';

export default class Unidades extends Component{
    constructor() {
        super();
        this.state = {
            unidades : [], condominio:{id:"",nome:""},
        };
    }

    async componentDidMount(){
        const {id} = await this.props.match.params;
       
        const response = await api.get(`/condominios/${id}`);
        const {condominio} = this.state;
        condominio.id= response.data._id;
        condominio.nome= response.data.nome;
        this.setState({condominio});

        await this.getUnidades();
    }
    getUnidades = () => {
        const {condominio} = this.state;
        api.get(`/unidades/condominio/${condominio.id}`)
        .then(res => {
            console.log(res);
            this.setState({unidades : res.data});
        })
    }
    

    render(){
        const {unidades, condominio} = this.state;// abrevia acesso a state
        
        return (
            <div className="lista-unidades">
            <Link to={`/unidades/cadastrar/${condominio.id}`}>Cadastrar Unidades</Link><br/> 
            <Link to={`/condominios/${condominio.id}`}>Ir ao Condominio</Link><br/> 
                <h1>Contagem das Unidades cadastradas para {condominio.nome}: {this.state.unidades.length}</h1>
                {unidades.map(unidade => (

                    <article key={unidade._id}>
                        <h1>Condominio: {condominio.nome}</h1>
                        <h1>Unidade: {unidade.numero}</h1>
                        <h1>Fração Ideal: {unidade.fracaoIdeal}</h1>
                        <h1>Mensalidade: {unidade.valorMensalidade}</h1>
                        
                        <Link to={`/unidades/${unidade._id}`}>Ver Unidade</Link>
                    </article>
                ))}
             <Link to={`/condominios/${condominio.id}`}>Ir ao Condominio</Link><br/>    
            </div>
        );
    }
}