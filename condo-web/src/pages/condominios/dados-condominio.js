import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css'

export default  class Condominio extends Component{

constructor() {
    super();
    this.state={
        condominio:{id:"",nome:"",endereco:"",cnpj:"",email:"",tel:""}
    };
  }

async componentDidMount(){
    const {id} = this.props.match.params;

    const response = await api.get(`/condominios/${id}`);
    const {condominio} = this.state;

    condominio.id= response.data._id;
    condominio.nome = response.data.nome;
    condominio.cnpj= response.data.cnpj;
    condominio.tel = response.data.tel;
    condominio.email= response.data.email;
    condominio.endereco = response.data.endereco;

    this.setState({condominio});
    
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

    atualizar = (e) => {
        e.preventDefault();
        const {condominio} = this.state;
        api.put(`condominios/${condominio.id}`, {"nome":condominio.nome,
        "endereco":condominio.endereco,
        "cnpj":condominio.cnpj,
        "email":condominio.email,
        "tel":condominio.tel})
            .then(res => {
            console.log(res);
            if(res.status===200)
                alert("Condominio Editado com Sucesso!!!");
            else
                alert("Erro ao editar o condominio!!!");
            })
        }

    excluir = (e) =>{
        const {condominio} = this.state;
        api.delete(`condominios/${condominio.id}`)
            .then(res => {
                if(res.status===200){
                    alert("Condominio Excluido com Sucesso!!!");
                    this.props.history.push('/condominios/');
                }else{
                    alert("Erro ao excluir o condominio!!!");
                    console.log(res);
                }   
          })     
    }

    render(){
        const {condominio} = this.state;

        return (
            <div className='condominio-info'>
            <Link to={`/condominios`}>Listar Condominios</Link><br/>
            <Link to={`/`}>Menu Principal</Link><br/>
            <h1>Nome: {condominio.nome}</h1>
            <h1>CNPJ: {condominio.cnpj}</h1>
            <h1>Endereço: {condominio.endereco}</h1>
            <h1>Telefone: {condominio.tel}</h1>
            <h1>Email: {condominio.email}</h1>

               <form onSubmit={this.atualizar}>
                    <label>Nome:<input type="text" name='nome' value={condominio.nome} onChange={this.editar}/></label><br/>
                    <label>CNPJ:<input type="text" name='cnpj' value={condominio.cnpj} onChange={this.editar}/></label><br/>
                    <label>Endereço:<input type="text" name='endereco' value={condominio.endereco} onChange={this.editar}/></label><br/>
                    <label>Telefone:<input type="text" name='tel' value={condominio.tel} onChange={this.editar}/></label><br/>
                    <label>Email:<input type="text" name='email' value={condominio.email} onChange={this.editar}/></label><br/>
                    <input type="submit" value="Editar Condominio" /><br/>
                </form>
                <button onClick={this.excluir}>Excluir Condominio</button><br/>
                <Link to={`/unidades/listar/${condominio.id}`}>Listar Unidades</Link> - - - - - - - - 
                <Link to={`/unidades/cadastrar/${condominio.id}`}>Cadastrar Unidade</Link><br/>
                <Link to={`/contas/listar/${condominio.id}`}>Listar Contas</Link>- - - - - - - - - - 
                <Link to={`/contas/cadastrar/${condominio.id}`}>Cadastrar Conta</Link><br/>
                <Link to={`/fornecedores/listar/${condominio.id}`}>Listar Fornecedores</Link> - - - - - 
                <Link to={`/fornecedores/cadastrar/${condominio.id}`}>Cadastrar Fornecedor</Link><br/>
                <Link to={`/categorias/listar/${condominio.id}`}>Listar Categorias</Link> - - - - - - - 
                <Link to={`/categorias/cadastrar/${condominio.id}`}>Cadastrar Categoria</Link><br/>
                <Link to={`/despesas/listar/${condominio.id}`}>Listar Despesas</Link> - - - - - - - - 
                <Link to={`/despesas/cadastrar/${condominio.id}`}>Cadastrar Despesas</Link><br/>
            </div>
        );
    }

}