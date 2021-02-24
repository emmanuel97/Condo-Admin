import React, {Component} from "react";
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css';

export default class contas extends Component{
    constructor() {
        super();
        this.state = {
            contas : [], condominio:{id:"",nome:""},
        };
    }

    async componentDidMount(){
        const {condominio} = this.state;
        const {id} = await this.props.match.params;
        condominio.id=id;
        await api.get(`/contas/condominio/${condominio.id}`)
        .then(res => {
            console.log(res.data);
            condominio.nome=res.data.nome;
            this.setState({contas : res.data, condominio});
        })
    }
    

    render(){
        const {contas, condominio} = this.state;// abrevia acesso a state
        
        return (
            <div className="lista-contas">
               <Link to={`/condominios/${condominio.id}`}>Voltar ao Condominio</Link><br/>
               <Link to={`/contas/cadastrar/${condominio.id}`}>Cadastrar contas</Link>
                <h1>Contagem das contas cadastradas para {condominio.nome}: {this.state.contas.length}</h1>
                {contas.map(conta => (

                    <article key={conta._id}>
                        <h1>Nome: {conta.nome}</h1>
                        <h1>Saldo Inicial: {conta.saldoInicial}</h1>
                        <h1>Saldo Atual: {conta.saldoAtual}</h1>
                        {(conta.bancaria===true) ? (<h1>Conta Bancaria</h1>):(<h1>Conta Não Bancaria</h1>)}

                        <Link to={`/contas/${conta._id}`}>Ver conta</Link>
                    </article>
                ))}
                <Link to={`/condominios/${condominio.id}`}>Voltar ao Condominio</Link><br/>
            </div>
        );
    }
}