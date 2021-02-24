import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css';

export default class conta extends Component{


constructor() {
    super();
    this.state={
    conta:{id:"",nome:"",condominio:"",saldoInicial:"",saldoAtual:"", bancaria:""},
        condominio:{id:"",nome:""},bancaria:"",
    };
  }

    async componentDidMount(){
        const {conta,condominio} = this.state;
        const {id} = await this.props.match.params;
        conta.id=id;

        const response = await api.get(`/contas/${conta.id}`);
        conta.nome= response.data.nome;
        conta.condominio = condominio.id=response.data.condominio;
        conta.saldoInicial= response.data.saldoInicial;
        conta.saldoAtual = response.data.saldoAtual;
        conta.bancaria = response.data.bancaria;

        await api.get(`/condominios/${condominio.id}`)
        .then(res => {
            console.log(res.data);
            condominio.nome=res.data.nome;
            this.setState({contas : res.data, condominio});
        })
        if(conta.bancaria===true){
            document.getElementById("bancaria").checked = true;
            this.setState({bancaria : true});
        }else if(conta.bancaria!==true){
            document.getElementById("nao-bancaria").checked = true;
            this.setState({bancaria : false});
        }
    }

    editar = (e) => {
        const {conta} = this.state;
        if(e.target.name==='nome')
            conta.nome=e.target.value;
        else if(e.target.name==='bancaria'){
            conta.bancaria=e.target.value;
            this.setState({bancaria : e.target.value});       
        }
        else if(e.target.name==='saldoInicial')
            conta.saldoInicial=e.target.value;
        else if(e.target.name==='saldoAtual')
            conta.saldoAtual=e.target.value;
        this.setState({conta});
    }

    atualizar = (e) => {
        e.preventDefault();
        const {conta} = this.state;
        api.put(`contas/${conta.id}`, {"nome":conta.nome,
        "bancaria":conta.bancaria,
        "saldoInicial":conta.saldoInicial,
        "saldoAtual":conta.saldoAtual})
            .then(res => {
            console.log(res.data);
            if(res.status===200)
                alert("conta Editada com Sucesso!!!");
            else
                alert("Erro ao editar a conta!!!");
            })
        }

    excluir = (e) =>{
        const {conta} = this.state;
        api.delete(`contas/${conta.id}`)
            .then(res => {
                console.log(res);
                if(res.status===200){
                    alert("conta Excluida com Sucesso!!!");
                    this.props.history.push(`/contas/listar/${conta.condominio}`);
                }else{
                    alert("Erro ao excluir a conta!!!");
                    console.log(res);
                }   
          })     
    }

    render(){
        const {conta,condominio,bancaria} = this.state;

        return (
            <div className='conta-info'>
                <Link to={`/contas/listar/${condominio.id}`}>Voltar á lista de Contas do Condominio</Link>
                <h1>Condominio: {condominio.nome}</h1>
                <h1>Nome: {conta.nome}</h1>
                <h1>Saldo Inicial: {conta.saldoInicial}</h1>
                <h1>Saldo Atual: {conta.saldoAtual}</h1>
                {(bancaria==="true") ? (<h1>Conta Bancaria</h1>):(<h1>Conta Não Bancaria</h1>)}

               <form onSubmit={this.atualizar}>
                    <label>nome:<input type="text" name='nome' value={conta.nome} onChange={this.editar}/></label><br/>
                    <label>Saldo Inicial:<input type="number" name='saldoInicial' value={conta.saldoInicial} onChange={this.editar}/></label><br/>
                    <label>Saldo Atual:<input type="number" name='saldoAtual' value={conta.saldoAtual} onChange={this.editar}/></label><br/>
                    <label>Conta Bancaria:<input type="radio" name='bancaria' id="bancaria" value={true} onChange={this.editar}/></label><br/>
                    <label>Conta Não Bancaria:<input type="radio" name="bancaria" id="nao-bancaria" value={false} onChange={this.editar}/></label><br/>
                    <input type="submit" value="Editar Conta" /><br/>
                </form>
                <button onClick={this.excluir}>Excluir Conta</button><br/>
                <Link to={`/despesas/listar/${condominio.id}`}>Listar Despesas</Link><br/>
                <Link to={`/despesas/cadastrar/${condominio.id}`}>Cadastrar Despesas</Link><br/>
                <Link to={`/contas/listar/${condominio.id}`}>Voltar á lista de Contas do Condominio</Link><br/>
            </div>
        );
    }

}