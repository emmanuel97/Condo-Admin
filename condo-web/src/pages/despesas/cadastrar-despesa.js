import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './styles.css'

export default class CadastrarDespesa extends Component{

    constructor() {
        super();
        this.state={despesa:{id:"",valor: 0,fornecedor: "",conta: "",categoria: "",liquidada: false,
        competencia: "",data_vencimento: "",data_liquidada:""},
        condominio:{id:"",nome:""},
        categoria:{id:"",nome:""},
        fornecedor:{id:"",nome:""},
        conta:{id:"",nome:""},
        categorias:[],
        fornecedores:[],
        contas:[],
        };
      }
    
    async componentDidMount(){
        const {id} = this.props.match.params;
        const {condominio} = this.state;
        condominio.id=id;

        await api.get(`/condominios/${condominio.id}`)
        .then(res => {
            condominio.nome=res.data.nome;
        })
        await this.getCategorias();
        await this.getFornecedores();
        await this.getContas();

        this.setState({condominio});
        document.querySelector("#pendente").checked=true;
        document.querySelector("#dataL").disabled=true;
        
    }

    getContas = () => {
        const {condominio,despesa,conta} = this.state;
        api.get(`/contas/condominio/${condominio.id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.length>0)
                despesa.conta = conta.id = res.data[0]._id;
                conta.nome=res.data[0].nome;
            this.setState({contas:res.data,despesa,conta});
        })
    }

    getCategorias = () => {
        const {condominio,despesa,categoria} = this.state;
        api.get(`/categorias/condominio/${condominio.id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.length>0)
                despesa.categoria = categoria.id = res.data[0]._id;
                categoria.nome=res.data[0].nome;
            this.setState({categorias:res.data,despesa,categoria});
        })
    }

    getFornecedores = () => {
        const {condominio,despesa,fornecedor} = this.state;
        api.get(`/fornecedores/condominio/${condominio.id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.length>0)
                despesa.fornecedor = fornecedor.id = res.data[0]._id;
                fornecedor.nome=res.data[0].nome;
            this.setState({fornecedores:res.data,despesa,fornecedor});
        })
    }

    editar = (e) => {
        const {despesa,categoria,fornecedor,conta,contas,fornecedores,categorias} = this.state;
        if(e.target.name==='valor')
            despesa.valor=e.target.value;
        else if(e.target.name==='categoria'){
            despesa.categoria=categoria.id=e.target.value;
            categoria.nome=categorias.find(x => despesa.categoria === x._id).nome;  
        }
        else if(e.target.name==='conta'){
            despesa.conta=conta.id=e.target.value;
            conta.nome=contas.find(x => despesa.conta === x._id).nome;  
        }
        else if(e.target.name==='fornecedor'){
            despesa.fornecedor=fornecedor.id=e.target.value;
            fornecedor.nome=fornecedores.find(x => despesa.fornecedor === x._id).nome;
        }
        else if(e.target.name==='liquidada'){
            if(e.target.value==="true"){
                document.querySelector("#dataL").disabled=false;
                document.querySelector("#liquidada").checked=true;
            }else{
                document.querySelector("#dataL").disabled=true;
                document.querySelector("#pendente").checked=true;
                }
                despesa.liquidada=e.target.value;
        }
        else if(e.target.name==='competencia')
            despesa.competencia=e.target.value;
        else if(e.target.name==='data_vencimento')
            despesa.data_vencimento=e.target.value;
        else if(e.target.name==='data_liquidada')
            despesa.data_liquidada=e.target.value;
        this.setState({ despesa,categoria,fornecedor});
    }

    cadastrar = (e) => {
        e.preventDefault();
        const {despesa,condominio} = this.state;
            if(despesa.liquidada==="true" && despesa.data_liquidada!==""){
                despesa.liquidada="true";
            }else{
                despesa.liquidada="false";
                despesa.data_liquidada=null;
            }

        api.post('/despesas', despesa)
        .then(() =>{
            alert("despesa Cadastrada com sucesso com Sucesso!!!");
            this.props.history.push(`/despesas/listar/${condominio.id}`);
        })
        .catch(err => 
            alert(
                "Despesa Não Cadastrada"
            ))
        }

    render(){
        const {despesa,condominio,contas,categorias,fornecedores,categoria,fornecedor,conta} = this.state;
        
        return(
            <div className='despesa-info'>
                <Link to={`/despesas/listar/${condominio.id}`}>Voltar ás Despesas do Condominio</Link><br/>
                <Link to={`/contas/${despesa.conta}`}>Ver dados da Conta</Link><br/>
                <Link to={`/fornecedores/${despesa.fornecedor}`}>Ver dados do Fornecedor </Link><br/>
                <Link to={`/categorias/${despesa.categoria}`}>Ver dados da Categoria </Link><br/>
                <h1>Condominio: {condominio.nome}</h1>
                <h1>Conta: {conta.nome}</h1>
                <h1>Valor: {despesa.valor}</h1>
                <h1>Fornecedores: {fornecedor.nome}</h1> 
                <h1>Categorias: {categoria.nome}</h1>
                <h1>Data Vencimento: {despesa.data_vencimento}</h1>
                <h1>Competencia: {despesa.competencia}</h1>
                
                {(despesa.liquidada==="true")?(<h1>Data Liquidada em: {despesa.data_liquidada}</h1>):(<h1>Data Pendente</h1>)}

                    <form onSubmit={this.cadastrar}>
                        <label>valor:<br/>
                        <input type="number" required name='valor' value={despesa.valor} onChange={this.editar}/></label><br/>
                        <label>competencia:<br/>
                        <input type="text" required name='competencia' value={despesa.competencia} onChange={this.editar}/></label><br/><br/>
                        
                        <label>Conta:
                            <select name="conta" required onChange={this.editar}>
                                {contas.map(con => (
                                    <option key={con._id} value={con._id}>
                                    {con.nome}
                                    </option>
                                ))}
                            </select>
                        </label><br/> 

                        <label>Fornecedor:
                            <select name="fornecedor" required onChange={this.editar}>
                                {fornecedores.map(fornece => (
                                    <option key={fornece._id} value={fornece._id}>
                                    {fornece.nome}
                                    </option>
                                ))}
                            </select>
                        </label><br/>

                        <label>Categoria:
                            <select name="categoria" required onChange={this.editar}>
                                {categorias.map(cat => (
                                    <option key={cat._id} value={cat._id}>
                                    {cat.nome}
                                    </option>
                                ))}
                            </select>
                        </label><br/>

                        

                        <label>data_vencimento:
                            <input type="date" id="dataV" required name='data_vencimento' defaultValue={despesa.data_vencimento} onChange={this.editar}/></label><br/>
                        <label>Data Liquidada:
                            <input type="date" id="dataL" required name='data_liquidada' defaultValue={despesa.data_liquidada} onChange={this.editar}/></label><br/>               
                        <label>
                            <input type="radio" id="liquidada" name='liquidada' value={true} onChange={this.editar}/>Liquidada</label><br/>
                        <label>
                            <input type="radio" id="pendente" name='liquidada' value={false} onChange={this.editar}/>Não-Liquidada</label><br/>
                        <input type="submit" value="Cadastrar Despesa" /><br/>
                    </form>
                    <Link to={`/despesas/listar/${condominio.id}`}>Voltar ás Despesas do Condominio</Link><br/>
            </div>                
        );
    }

}