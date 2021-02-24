import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css'

export default class CadastrarCondominio extends Component{

constructor() {
    super();
    this.state={
        condominio:{nome:"",endereco:"",cnpj:"",email:"",tel:""}
    };
  }

    async componentDidMount(){

    }

    editar = (e) => {
        const {condominio} = this.state;
        if(e.target.name==='nome')
            condominio.nome=e.target.value;
        else if(e.target.name==='endereco')
            condominio.endereco=e.target.value;
        else if(e.target.name==='tel')
            condominio.tel=e.target.value;
        else if(e.target.name==='email')
            condominio.email=e.target.value;
        else if(e.target.name==='cnpj')
            condominio.cnpj=e.target.value;
        this.setState({ condominio });
    }

    cadastrar = (e) => {
        e.preventDefault();
        const {condominio} = this.state;
        api.post('/condominios', {"nome":condominio.nome,
        "endereco":condominio.endereco,
        "cnpj":condominio.cnpj,
        "email":condominio.email,
        "tel":condominio.tel})
            .then(res => {
            console.log(res);
            if(res.status===200){
                alert("Condominio Cadastrado com sucesso com Sucesso!!!");
                this.props.history.push(`/condominios/${res.data._id}`);
            }else
                alert("Erro ao cadastrar o condominio!!!");
            })
        }

    render(){
        const {condominio} = this.state;

        return (
            <div className='condominio-info'>   
                <Link to={'/condominios/'}>Voltar á lista de Condominios</Link>
                <Link to={'/'}>Menu Principal</Link>
                <h1>Cadastrar Condominio</h1>
                <h1>Nome: {condominio.nome}</h1>
                <h1>CNPJ: {condominio.cnpj}</h1>
                <h1>Endereço: {condominio.endereco}</h1>
                <h1>Telefone: {condominio.tel}</h1>
                <h1>Email: {condominio.email}</h1>

               <form onSubmit={this.cadastrar}>
                    <label>Nome:<input type="text" name='nome' value={condominio.nome} onChange={this.editar}/></label><br/>
                    <label>CNPJ:<input type="text" name='cnpj' value={condominio.cnpj} onChange={this.editar}/></label><br/>
                    <label>Endereço:<input type="text" name='endereco' value={condominio.endereco} onChange={this.editar}/></label><br/>
                    <label>Telefone:<input type="text" name='tel' value={condominio.tel} onChange={this.editar}/></label><br/>
                    <label>Email:<input type="text" name='email' value={condominio.email} onChange={this.editar}/></label><br/>
                    <input type="submit" value="Enviar"/><br/>
                </form>
                <Link to={'/condominios/'}>Voltar á lista de Condominios</Link><br/>
                <Link to={'/'}>Menu Principal</Link><br/>
            </div>
        );
    }

}