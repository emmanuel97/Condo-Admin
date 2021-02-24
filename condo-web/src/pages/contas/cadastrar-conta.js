import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css';

export default class Cadastrarconta extends Component{

constructor() {
    super();
    this.state={
        conta:{id:"",nome:"",condominio:"",saldoInicial:"",saldoAtual:"", bancaria:"true"},
        condominio:{id:"",nome:""},
    };
  }

    async componentDidMount(){
        const {conta,condominio} = this.state;
        const {id} = this.props.match.params;
        conta.condominio = condominio.id = id;

        const res = await api.get(`/condominios/${condominio.id}`);
        condominio.nome= res.data.nome;
        this.setState({condominio,conta});

        document.querySelector("#bancaria").checked=true;
    }

    editar = (e) => {
        const {conta} = this.state;
        if(e.target.name==='nome')
            conta.nome=e.target.value;
        else if(e.target.name==='bancaria')
            conta.bancaria=e.target.value;
        else if(e.target.name==='saldoInicial')
            conta.saldoInicial=e.target.value;
        else if(e.target.name==='saldoAtual')
            conta.saldoAtual=e.target.value;
        this.setState({ conta });
    }

    cadastrar = (e) => {
        e.preventDefault();
        const {conta} = this.state;
        api.post('/contas', {"nome":conta.nome,
        "condominio":conta.condominio,
        "bancaria":conta.bancaria,
        "saldoInicial":conta.saldoInicial,
        "saldoAtual":conta.saldoAtual})
            .then(res => {
            console.log(res);
            if(res.status===200){
                alert("conta Cadastrada com sucesso com Sucesso!!!");
                this.props.history.push(`/contas/listar/${conta.condominio}`);
            }else
                alert("Erro ao cadastrar a conta!!!");
            })
        }

    render(){
        const {conta,condominio} = this.state;

        return (
            <div className='conta-info'>
                <Link to={`/contas/listar/${condominio.id}`}>Voltar ás Contas do condominio</Link><br/>
               <Link to={`/condominios/${condominio.id}`}>Voltar ao Condominio</Link><br/>
                <h1>Cadastrar conta para condominio {condominio.nome}</h1>
                <h1>Nome: {conta.nome}</h1>
                <h1>Saldo Inicial: {conta.saldoInicial}</h1>
                <h1>Saldo Atual: {conta.saldoAtual}</h1>
                {(conta.bancaria==="true") ? (<h1>Conta Bancaria</h1>):(<h1>Conta Não Bancaria</h1>)}

               <form onSubmit={this.cadastrar}>
                    <label>Nome:<input type="text" name='nome' value={conta.nome} onChange={this.editar}/></label><br/>
                   <label>Saldo Inicial:<input type="number" name='saldoInicial' value={conta.saldoInicial} onChange={this.editar}/></label><br/>
                    <label>Saldo Atual:<input type="number" name='saldoAtual' value={conta.saldoAtual} onChange={this.editar}/></label><br/>
                    <label>Conta Bancaria:<input type="radio" name='bancaria' id="bancaria" value={true} onChange={this.editar}/></label><br/>
                    <label>Conta Não Bancaria:<input type="radio" name="bancaria" id="nao-bancaria" value={false} onChange={this.editar}/></label><br/>
                    <input type="submit" value="Cadastrar" /><br/>
                </form>
                <Link to={`/contas/listar/${condominio.id}`}>Voltar ás Contas do condominio</Link><br/>
               <Link to={`/condominios/${condominio.id}`}>Voltar ao Condominio</Link><br/>
            </div>
        );
    }

}