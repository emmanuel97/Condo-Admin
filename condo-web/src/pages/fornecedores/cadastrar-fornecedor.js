import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css'

export default class CadastrarFornecedor extends Component{

constructor() {
    super();
    this.state={
        fornecedor:{id:"",nome:"",condominio:"",juridica:false,identificador:"",
        endereco:"",tel1:"",tel2:"",email1:"",email2:""},
        condominio:{id:"",nome:""},
    };
  }

    async componentDidMount(){
        const {fornecedor, condominio} = this.state;
        const {id} = this.props.match.params;

        condominio.id=fornecedor.condominio=id;
        const res = await api.get(`/condominios/${fornecedor.condominio}`);
        condominio.nome=res.data.nome;

        this.setState({fornecedor});
    }

    editar = (e) => {
        const {fornecedor} = this.state;
        if(e.target.name==='nome')
            fornecedor.nome=e.target.value;
        else if(e.target.name==='tel1')
            fornecedor.tel1=e.target.value;
        else if(e.target.name==='tel2')
            fornecedor.tel2=e.target.value;
        else if(e.target.name==='email1')
            fornecedor.email1=e.target.value;
        else if(e.target.name==='email2')
            fornecedor.email2=e.target.value;
        else if(e.target.name==='endereco')
            fornecedor.endereco=e.target.value;
        else if(e.target.name==='juridica')
            fornecedor.juridica=e.target.value;
        else if(e.target.name==='identificador')
            fornecedor.identificador=e.target.value;

        this.setState({ fornecedor });
    }

    cadastrar = (e) => {
        e.preventDefault();
        const {fornecedor} = this.state;
        api.post('/fornecedores', {"nome":fornecedor.nome,
        "condominio":fornecedor.condominio,
        "endereco":fornecedor.endereco,
        "tel1":fornecedor.tel1,
        "tel2":fornecedor.tel2,
        "email1":fornecedor.email1,
        "email2":fornecedor.email2,
        "juridica":fornecedor.juridica,
        "identificador":fornecedor.identificador})
            .then(res => {
            console.log(res);
            if(res.status===200){
                alert("fornecedor Cadastrado com sucesso com Sucesso!!!");
                this.props.history.push(`/fornecedores/listar/${[fornecedor.condominio]}`);
            }else
                alert("Erro ao cadastrar o fornecedor!!!");
            })
        }

    render(){
        const {fornecedor,condominio} = this.state;

        return (
            <div className='fornecedor-info'>
                <Link to={`/fornecedores/listar/${condominio.id}`}>Voltar aos Fornecedores do condominio</Link><br/>
                <Link to={`/condominios/${condominio.id}`}>Voltar ao Condominio</Link><br/>
                <h1>Condominio: {[condominio.nome]}</h1>
                <h1>Fornecedor: {fornecedor.nome}</h1>
                <h1>Endereço: {fornecedor.endereco}</h1>
                <h1>Telelefone 1: {fornecedor.tel1}</h1>
                <h1>Telefone 2{fornecedor.tel2}</h1>
                <h1>Email 1: {fornecedor.email1}</h1>
                <h1>Email 2: {fornecedor.email2}</h1>
                {(fornecedor.juridica==="true") ? (<h1>Pessoa Juridica<br/>CNPJ: {fornecedor.identificador}</h1>) :
                 (<h1>Pessoa Fisica<br/>CPF: {fornecedor.identificador}</h1>)}

               <form onSubmit={this.cadastrar}>
                    <label>nome:<input type="text" name='nome' value={fornecedor.nome} onChange={this.editar}/></label><br/>
                    <label>endereco:<input type="text" name='endereco' value={fornecedor.endereco} onChange={this.editar}/></label><br/>
                    <label>tel1:<input type="text" name='tel1' value={fornecedor.tel1} onChange={this.editar}/></label><br/>
                    <label>tel2:<input type="text" name='tel2' value={fornecedor.tel2} onChange={this.editar}/></label><br/>
                    <label>email1:<input type="text" name='email1' value={fornecedor.email1} onChange={this.editar}/></label><br/>
                    <label>email2:<input type="text" name='email2' value={fornecedor.email2} onChange={this.editar}/></label><br/>
                    <label>Pessoa Juridica:<input type="radio" name='juridica' value={true} onChange={this.editar}/></label><br/>
                     <label>Pessoa Fisica:<input type="radio" name="juridica" value={false} onChange={this.editar}/></label><br/>
                    <label>identificador:<input type="text" name='identificador' value={fornecedor.identificador} onChange={this.editar}/></label><br/>
                    <input type="submit" value="Cadastrar Fornecedor"/><br/>
                </form>
                <Link to={`/fornecedores/listar/${condominio.id}`}>Voltar aos Fornecedores do condominio</Link><br/>
               <Link to={`/condominios/${condominio.id}`}>Voltar ao Condominio</Link><br/>
            </div>
        );
    }

}