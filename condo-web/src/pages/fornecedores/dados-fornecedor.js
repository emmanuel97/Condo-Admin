import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css'

export default class Fornecedor extends Component{


constructor() {
    super();
    this.state={
        fornecedor:{id:"",nome:"",condominio:"",juridica:false,identificador:"",
        endereco:"",tel1:"",tel2:"",email1:"",email2:""},
        condominio:{id:"",nome:""},
    };
  }

    async componentDidMount(){
        const {id} = await this.props.match.params;
        const {fornecedor,condominio} = this.state;
        const response = await api.get(`/fornecedores/${id}`);
        
        fornecedor.id= response.data._id;
        fornecedor.nome= response.data.nome;
        fornecedor.condominio = condominio.id = response.data.condominio;
        fornecedor.endereco= response.data.endereco;
        fornecedor.tel1 = response.data.tel1;
        fornecedor.tel2 = response.data.tel2;
        fornecedor.email1 = response.data.email1;
        fornecedor.email2 = response.data.email2;
        fornecedor.juridica = response.data.juridica;
        fornecedor.identificador = response.data.identificador;

        const res = await api.get(`/condominios/${fornecedor.condominio}`);
        condominio.nome=res.data.nome;

        if(fornecedor.juridica==="true")
            document.querySelector("#pj").checked = true;
        else
            document.querySelector("#pf").checked = true;

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

    atualizar = (e) => {
        e.preventDefault();
        const {fornecedor} = this.state;
        api.put(`fornecedores/${fornecedor.id}`, {"nome":fornecedor.nome,
        "endereco":fornecedor.endereco,
        "tel1":fornecedor.tel1,
        "tel2":fornecedor.tel2,
        "email1":fornecedor.email1,
        "email2":fornecedor.email2,
        "juridica":fornecedor.juridica,
        "identificador":fornecedor.identificador})
            .then(res => {
            console.log(res);
            if(res.status===200)
                alert("fornecedor Editado com Sucesso!!!");
            else
                alert("Erro ao editar o fornecedor!!!");
            })
        }

    excluir = (e) =>{
        const {fornecedor} = this.state;
        api.delete(`fornecedores/${fornecedor.id}`)
            .then(res => {
                console.log(res);
                if(res.status===200){
                    alert("fornecedor Excluido com Sucesso!!!");
                    this.props.history.push(`/fornecedores/listar/${fornecedor.condominio}`);
                }else{
                    alert("Erro ao excluir a fornecedor!!!");
                    console.log(res);
                }   
          })     
    }

    render(){
        const {fornecedor,condominio} = this.state;

        return (
            <div className='fornecedor-info'>
                <Link to={`/fornecedores/listar/${condominio.id}`}>Voltar aos Fornecedores do Condominio</Link><br/>
                <Link to={`/condominios/${condominio.id}`}>Ir ao Condominio</Link><br/>
                <h1>Condominio: {[condominio.nome]}</h1>
                <h1>Fornecedor: {fornecedor.nome}</h1>
                <h1>Endereço: {fornecedor.endereco}</h1>
                <h1>Telelefone 1: {fornecedor.tel1}</h1>
                <h1>Telefone 2{fornecedor.tel2}</h1>
                <h1>Email 1: {fornecedor.email1}</h1>
                <h1>Email 2: {fornecedor.email2}</h1>
                {(fornecedor.juridica==="true") ? (<h1>Pessoa Juridica<br/>CNPJ: {fornecedor.identificador}</h1>) :
                 (<h1>Pessoa Fisica<br/>CPF: {fornecedor.identificador}</h1>)}

               <form onSubmit={this.atualizar}>
                    <label>nome:<input type="text" name='nome' value={fornecedor.nome} onChange={this.editar}/></label><br/>
                    <label>endereco:<input type="text" name='endereco' value={fornecedor.endereco} onChange={this.editar}/></label><br/>
                    <label>tel1:<input type="text" name='tel1' value={fornecedor.tel1} onChange={this.editar}/></label><br/>
                    <label>tel2:<input type="text" name='tel2' value={fornecedor.tel2} onChange={this.editar}/></label><br/>
                    <label>email1:<input type="text" name='email1' value={fornecedor.email1} onChange={this.editar}/></label><br/>
                    <label>email2:<input type="text" name='email2' value={fornecedor.email2} onChange={this.editar}/></label><br/>
                    <label>Pessoa Juridica:<input type="radio" name='juridica' id="pj" value={true} onChange={this.editar}/></label><br/>
                    <label>Pessoa Fisica:<input type="radio" name="juridica" id="pf" value={false} onChange={this.editar}/></label><br/>
                    <label>identificador:<input type="text" name='identificador' value={fornecedor.identificador} onChange={this.editar}/></label><br/>
                    <input type="submit" value="Editar Fornecedor"/><br/>
                </form>
                <button onClick={this.excluir}>Excluir Fornecedor</button><br/>
                <Link to={`/fornecedores/listar/${condominio.id}`}>Voltar aos Fornecedores do Condominio</Link><br/>
                <Link to={`/condominios/${condominio.id}`}>Ir ao Condominio</Link><br/>
            </div>
        );
    }

}