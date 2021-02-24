import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css'

export default class CadastrarUnidade extends Component{

constructor() {
    super();
    this.state={
        unidade:{id:"",numero:"",condominio:"",fracaoIdeal:"",valorMensalidade:""},
        idCondominio:"",
    };
  }

    async componentDidMount(){
        const {id} = this.props.match.params;
        this.setState({idCondominio:id});
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

    cadastrar = (e) => {
        e.preventDefault();
        const {unidade,idCondominio} = this.state;
        api.post('/unidades', {"numero":unidade.numero,
        "condominio":unidade.condominio,
        "fracaoIdeal":unidade.fracaoIdeal,
        "valorMensalidade":unidade.valorMensalidade})
            .then(res => {
            console.log(res);
            if(res.status===200){
                alert("Unidade Cadastrada com sucesso com Sucesso!!!");
                this.props.history.push(`/unidades/listar/${idCondominio}`);
            }else
                alert("Erro ao cadastrar a Unidade!!!");
            })
        }

    render(){
        const {unidade,idCondominio} = this.state;

        return (
            <div className='unidade-form'>
                
                <h1>Cadastrar Unidade para condominio {idCondominio}</h1>
                <h1>{unidade.numero}</h1>
                <h1>{unidade.condominio}</h1>
                <h1>{unidade.fracaoIdeal}</h1>
                <h1>{unidade.valorMensalidade}</h1>

               <form onSubmit={this.cadastrar}>
                    <label>numero:<input type="text" name='numero' value={unidade.numero} onChange={this.editar}/></label>
                    <label>condominio:<input type="text" name='condominio' value={unidade.condominio} onChange={this.editar}/></label>
                    <label>fracaoIdeal:<input type="text" name='fracaoIdeal' value={unidade.fracaoIdeal} onChange={this.editar}/></label>
                    <label>valorMensalidade:<input type="text" name='valorMensalidade' value={unidade.valorMensalidade} onChange={this.editar}/></label>
                    <input type="submit" value="Enviar" />
                </form>
            </div>
        );
    }

}