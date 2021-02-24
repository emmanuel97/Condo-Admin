import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css'

export default class CadastrarUnidade extends Component{

constructor() {
    super();
    this.state={
        unidade:{id:"",numero:"",condominio:"",fracaoIdeal:"",valorMensalidade:""},
        condominio:{id:"",nome:""},
    };
  }

    async componentDidMount(){
        const {id} = this.props.match.params;
        
        const response = await api.get(`/condominios/${id}`);
        const {condominio} = this.state;
        condominio.id= response.data._id;
        condominio.nome= response.data.nome;

        this.setState({condominio});
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

    cadastrar = (e) => {
        e.preventDefault();
        const {unidade,condominio} = this.state;
        api.post('/unidades', {"numero":unidade.numero,
        "condominio":condominio.id,
        "fracaoIdeal":unidade.fracaoIdeal,
        "valorMensalidade":unidade.valorMensalidade})
            .then(res => {
            console.log(res);
            if(res.status===200){
                alert("Unidade Cadastrada com sucesso com Sucesso!!!");
                this.props.history.push(`/unidades/listar/${condominio.id}`);
            }else
                alert("Erro ao cadastrar a Unidade!!!");
            })
        }

    render(){
        const {unidade,condominio} = this.state;

        return (
            <div className='unidade-info'>
                 <Link to={`/unidades/listar/${condominio.id}`}>Voltar ás unidades do Condominio</Link><br/>
                <Link to={`/condominios/${condominio.id}`}>Ir ao Condominio</Link><br/>
                <h1>Cadastrar Unidade para condominio {condominio.nome}</h1>
                <h1>Unidade: {unidade.numero}</h1>
                <h1>Fração Ideal: {unidade.fracaoIdeal}</h1>
                <h1>Mensalidade: {unidade.valorMensalidade}</h1>

               <form onSubmit={this.cadastrar}>
                    <label>numero:<br/><input type="text" name='numero' value={unidade.numero} onChange={this.editar}/></label><br/>
                    <label>fracaoIdeal:<br/><input type="text" name='fracaoIdeal' value={unidade.fracaoIdeal} onChange={this.editar}/></label><br/>
                    <label>valorMensalidade:<br/><input type="text" name='valorMensalidade' value={unidade.valorMensalidade} onChange={this.editar}/></label><br/>
                    <input type="submit" value="Enviar" /><br/>
                </form>
                <Link to={`/unidades/listar/${condominio.id}`}>Voltar ás unidades do Condominio</Link><br/>
                <Link to={`/condominios/${condominio.id}`}>Ir ao Condominio</Link><br/>
            </div>
        );
    }

}