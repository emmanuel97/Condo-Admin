import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css'

export default class Fornecedores extends Component{
    constructor() {
        super();
        this.state = {
            fornecedores : [], condominio:{id:"",nome:""},
        };
    }

    async componentDidMount(){
        const {condominio} = this.state;
        const {id} = await this.props.match.params;
        condominio.id=id;
        const res = await api.get(`/condominios/${condominio.id}`);
        condominio.nome=res.data.nome;
        this.setState({condominio});
        this.getFornecedores();
    }
    getFornecedores = () => {
        const {condominio} = this.state;
        api.get(`/fornecedores/condominio/${condominio.id}`)
        .then(res => {
            console.log(res);
            this.setState({fornecedores : res.data});
        })
    }
    

    render(){
        const {fornecedores, condominio} = this.state;// abrevia acesso a state
        
        return (
            <div className="lista-unidades"> 
               <Link to={`/fornecedores/cadastrar/${condominio.id}`}>Cadastrar Fornecedores</Link><br/>
               <Link to={`/condominios/${condominio.id}`}>Voltar ao Condominio</Link><br/>
                <h1>Contagem dos Fornecedores cadastrados para {condominio.nome}: {this.state.fornecedores.length}</h1>
                {fornecedores.map(fornecedor => (

                    <article key={fornecedor._id}>
                        <h1>Fornecedor: {fornecedor.nome}</h1>
                        <h1>Endereço: {fornecedor.endereco}</h1>
                        {(fornecedor.juridica==="true") ? (<h1>Pessoa Juridica<br/>CNPJ: {fornecedor.identificador}</h1>) :
                        (<h1>Pessoa Fisica<br/>CPF: {fornecedor.identificador}</h1>)}
                        
                        <Link to={`/fornecedores/${fornecedor._id}`}>Ver Fornecedor</Link>
                    </article>
                ))}
                <Link to={`/condominios/${condominio.id}`}>Voltar ao Condominio</Link><br/>
            </div>
        );
    }
}