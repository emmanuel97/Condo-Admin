import React, {Component} from "react";
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css';

export default class Condominios extends Component{
    //state é um objeto onde serão armazenhadas as
    //variaveis da pagina
    state = {
        condominios : [],
    };

    componentDidMount(){
        this.getCondominios();
    }

    getCondominios = async () => {
        const response = await api.get(`/condominios`);

        const {docs} = response.data;
        //set state é uma função para setar mudar 
        //o valor de uma variavel em state
        this.setState({condominios : docs});
        console.log(response.data.docs);
    }

    

    render(){
        const {condominios} = this.state;// abrevia acesso a state
        
        return (
            <div className="lista-condominios">
                <Link to={'/condominios/cadastrar'}>Cadastrar Condominio</Link>
                <Link to={'/'}>Menu Principal</Link>
                <h1>Contagem dos Condominios cadastrados: {this.state.condominios.length}</h1>
                {condominios.map(condominio => (

                    <article key={condominio._id}>
                        <h1>{condominio.nome}</h1>
                        <h1>{condominio.endereco}</h1>
                        <h1>{condominio.cnpj}</h1>
                        
                        <Link to={`/condominios/${condominio._id}`}>Ver Condominio</Link>
                    </article>
                ))}
            </div>
        );
    }
}