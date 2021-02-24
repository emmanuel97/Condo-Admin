import React, {Component} from "react";
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css';

export default class Despesas extends Component{
    constructor() {
        super();
        this.state = {
            despesas : [],
            despesasFiltradas : [],
            fornecedores : [],
            categorias : [],
            contas : [],
            contaF:{id:"null",nome:""},
            categoriaF:{id:"null",nome:""},
            fornecedorF:{id:"null",nome:""},
            estadoF:{estado:""},
            condominio:{id:"",nome:""},

        };
    }

    async componentDidMount(){
        const {id} = await this.props.match.params;
        const {condominio} = this.state;
        condominio.id=id;

        await  api.get(`/condominios/${condominio.id}`)
        .then(res => {
            condominio.nome=res.data.nome;
        })   
        const res = await api.get(`/despesas/condominio/${condominio.id}`);
        const res1 = await api.get(`/contas/condominio/${condominio.id}`);
        const res2 = await api.get(`/categorias/condominio/${condominio.id}`);
        const res3 = await api.get(`/fornecedores/condominio/${condominio.id}`);
        console.log(res.data);
        console.log(res1.data);
        console.log(res2.data);
        console.log(res3.data);
        this.setState({condominio,despesas:res.data,despesasFiltradas:res.data,contas:res1.data,categorias:res2.data,fornecedores:res3.data});
    }

    
    editar = (e) => {
        const {categoriaF,fornecedorF,contaF,estadoF} = this.state;

        if(e.target.name==='contaF'){
            contaF.id=e.target.value;
        }
        else if(e.target.name==='categoriaF'){
            categoriaF.id=e.target.value;
        }
        else if(e.target.name==='fornecedorF'){
            fornecedorF.id=e.target.value;
        }
        else if(e.target.name==='estadoF'){
            estadoF.estado=e.target.value;
            console.log(estadoF.estado);
        }
       this.setState({categoriaF,fornecedorF,contaF,estadoF});
    }

    listar = (e) => {
        e.preventDefault();
        const  {despesas,contaF,categoriaF,fornecedorF, estadoF} = this.state;
        var despesasFiltradas=despesas.filter(x => (categoriaF.id === x.categoria || categoriaF.id==="null") && 
        (fornecedorF.id === x.fornecedor || fornecedorF.id==="null") && 
        (contaF.id === x.conta || contaF.id==="null"));
        if(estadoF.estado==="true")despesasFiltradas=despesasFiltradas.filter(x => x.liquidada===true);
        else if(estadoF.estado==="false")despesasFiltradas=despesasFiltradas.filter(x => x.liquidada===false);
        console.log(despesasFiltradas);
        this.setState({despesasFiltradas});
        }

        formatarData = (d) =>{
            const data = new Date(d);
            return `${data.getDate()}-${data.getMonth()+1}-${data.getFullYear()}`;
        }

    render(){
        const {despesasFiltradas,contas,categorias,fornecedores,condominio} = this.state;// abrevia acesso a state
        return (
            <div className="lista-despesas">
               <Link to={`/despesas/cadastrar/${condominio.id}`}>Cadastrar despesas</Link><br/>
               <Link to={`/condominios/${condominio.id}`}>Voltar ao Condominio</Link><br/>
               <form onSubmit={this.listar}>
                    <label>Conta: - - - - 
                        <select name="contaF" onChange={this.editar}>
                            <option key={-1} value={"null"}>Todas as Contas</option>
                            {contas.map(con => (
                                <option key={con._id} value={con._id}>{con.nome}</option>
                            ))}
                        </select>
                    </label><br/>

                    <label>Categoria: - - - - 
                        <select name="categoriaF" onChange={this.editar}>
                        <option key={-2} value={"null"}>Todas as Categorias</option>
                            {categorias.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.nome}</option>
                            ))}
                        </select>
                    </label><br/>

                    <label>Fornecedor: - - - - 
                        <select name="fornecedorF" onChange={this.editar}>
                        <option key={-3} value={"null"}>Todos os Fornecedores</option>
                            {fornecedores.map(fornece => (
                                <option key={fornece._id} value={fornece._id}>{fornece.nome}</option>
                            ))}
                        </select>
                    </label><br/>

                    <label>Estado: - - - - 
                        <select name="estadoF" onChange={this.editar}>
                        <option key={-4} value={0}>Todas as Despesas</option>
                        <option key={-5} value={true}>Despesas Liquidadas</option>
                        <option key={-6} value={false}>Despesas Pendentes</option>
                        </select>
                    </label><br/>
                    <input type="submit" value="Filtrar Despesas" /><br/>
                </form>
               
                <h1>Contagem das despesas cadastradas o condominio {condominio.nome}: {this.state.despesasFiltradas.length}</h1>

                {despesasFiltradas.map(despesa => (
                    <article key={despesa._id}>
                        <h1>Valor: {despesa.valor}</h1>
                        <h1>Conta: {contas.find(x => despesa.conta === x._id).nome}</h1>
                        <h1>Categoria: {categorias.find(x => despesa.categoria === x._id).nome}</h1>  
                        <h1>Fornecedor: {fornecedores.find(x => despesa.fornecedor === x._id).nome}</h1>
                        <h1>Competencia: {despesa.competencia}</h1>
                        <h1>Data vencimento: {this.formatarData(despesa.data_vencimento)}</h1>
                        
                        <Link to={`/despesas/${despesa._id}`}>Ver despesa</Link>
                    </article>
                ))}
            </div>
        );
    }
}