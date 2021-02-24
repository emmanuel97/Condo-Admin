import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css'

export default class Unidade extends Component{


constructor() {
    super();
    this.state={
        unidade:{id:"",numero:"",condominio:"",fracaoIdeal:"",valorMensalidade:""},
        id:"",
    };
  }

    async componentDidMount(){
        const {id} = await this.props.match.params;

        const response = await api.get(`/unidades/${id}`);
        
        const {unidade} = this.state;

        unidade.id= response.data._id;
        unidade.numero= response.data.numero;
        unidade.condominio = response.data.condominio;
        unidade.fracaoIdeal= response.data.fracaoIdeal;
        unidade.valorMensalidade = response.data.valorMensalidade;

        this.setState({unidade,id});
        
    }

    editar = (e) => {
        const {unidade} = this.state;
        if(e.target.name==='numero')
            unidade.numero=e.target.value;
        else if(e.target.name==='condominio')
            unidade.condominio=e.target.value;
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
        const {unidade} = this.state;

        return (
            <div className='unidades-info'>
                <h1>{[unidade.id]}</h1>
                <h1>{unidade.numero}</h1>
                <h1>{unidade.fracaoIdeal}</h1>
                <h1>{unidade.valorMensalidade}</h1>
                <h1>{unidade.condominio}</h1>

               <form onSubmit={this.atualizar}>
                    <label>Numero:<input type="text" name='numero' value={unidade.numero} onChange={this.editar}/></label><br/>
                    <label>Fração Ideal:<input type="text" name='fracaoIdeal' value={unidade.fracaoIdeal} onChange={this.editar}/></label><br/>
                    <label>Valor Mensalidade:<input type="text" name='valorMensalidade' value={unidade.valorMensalidade} onChange={this.editar}/></label><br/>
                    <label>Condominio:<input type="text" name='condominio' value={unidade.condominio} onChange={this.editar}/></label><br/>
                    <input type="submit" value="Enviar" /><br/>
                </form>
                <button onClick={this.excluir}>Excluir Unidade</button><br/>
            </div>
        );
    }

}