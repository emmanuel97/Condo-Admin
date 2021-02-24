import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css'

export default class Unidade extends Component{


constructor() {
    super();
    this.state={
        unidade:{id:"",numero:"",condominio:"",fracaoIdeal:"",valorMensalidade:""},
        condominio:{id:"",nome:""},
    };
  }

    async componentDidMount(){
        const {id} = await this.props.match.params;
        const {condominio,unidade} = this.state;
        const response = await api.get(`/unidades/${id}`);
        unidade.id= response.data._id;
        unidade.numero= response.data.numero;
        unidade.condominio = response.data.condominio;
        unidade.fracaoIdeal= response.data.fracaoIdeal;
        unidade.valorMensalidade = response.data.valorMensalidade;

        const res = await api.get(`/condominios/${unidade.condominio}`);
        condominio.id= unidade.condominio;
        condominio.nome= res.data.nome;

        this.setState({unidade,condominio});
        
    }

    editar = (e) => {
        const {unidade} = this.state;
        if(e.target.name==='numero')
            unidade.numero=e.target.value;
        else if(e.target.name==='fracaoIdeal')
            unidade.fracaoIdeal=e.target.value;
        else if(e.target.name==='valorMensalidade')
            unidade.valorMensalidade=e.target.value;
        this.setState({ unidade });
    }

    atualizar = (e) => {
        e.preventDefault();
        const {unidade} = this.state;
        api.put(`unidades/${unidade.id}`, {"numero":unidade.numero,
        "fracaoIdeal":unidade.fracaoIdeal,
        "valorMensalidade":unidade.valorMensalidade})
            .then(res => {
            console.log(res);
            if(res.status===200)
                alert("Unidade Editada com Sucesso!!!");
            else
                alert("Erro ao editar a unidade!!!");
            })
        }

    excluir = (e) =>{
        const {unidade} = this.state;
        api.delete(`unidades/${unidade.id}`)
            .then(res => {
                console.log(res);
                if(res.status===200){
                    alert("Unidade Excluida com Sucesso!!!");
                    this.props.history.push(`/unidades/listar/${unidade.condominio}`);
                }else{
                    alert("Erro ao excluir a unidade!!!");
                    console.log(res);
                }   
          })     
    }

    render(){
        const {unidade, condominio} = this.state;

        return (
            <div className='unidade-info'>
                <Link to={`/unidades/listar/${condominio.id}`}>Voltar as unidades do Condominio</Link><br/>
                <Link to={`/condominios/${condominio.id}`}>Ir ao Condominio</Link><br/>
                <h1>Condominio: {condominio.nome}</h1>
                <h1>Unidade: {unidade.numero}</h1>
                <h1>Fração Ideal: {unidade.fracaoIdeal}</h1>
                <h1>Mensalidade: {unidade.valorMensalidade}</h1>
                
               <form onSubmit={this.atualizar}>
                    <label>Numero:<input type="text" name='numero' value={unidade.numero} onChange={this.editar}/></label><br/>
                    <label>Fração Ideal:<input type="text" name='fracaoIdeal' value={unidade.fracaoIdeal} onChange={this.editar}/></label><br/>
                    <label>Valor Mensalidade:<input type="text" name='valorMensalidade' value={unidade.valorMensalidade} onChange={this.editar}/></label><br/>
                    <input type="submit" value="Editar" /><br/>
                </form>
            <button onClick={this.excluir}>Excluir Unidade</button><br/>
            <Link to={`/unidades/listar/${condominio.id}`}>Voltar as unidades do Condominio</Link><br/>
            <Link to={`/condominios/${condominio.id}`}>Ir ao Condominio</Link><br/>
            </div>
        );
    }

}