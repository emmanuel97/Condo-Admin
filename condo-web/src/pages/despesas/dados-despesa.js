import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './styles.css'

export default class Despesa extends Component{


constructor() {
    super();
    this.state={despesa:{id:"",valor: 0,fornecedor: "",conta: "",categoria: "",liquidada:"",
    competencia: "",data_vencimento: "",data_liquidada:""},
        id:"",liquidado:false,
        conta:{id:"",nome:""},
        fornecedor:{id:"",nome:""},
        categoria:{id:"",nome:""},
        condominio:{id:"",nome:""},
        categorias:[],
        contas:[],
        fornecedores:[],
    };
  }

    async componentDidMount(){
        const {id} = await this.props.match.params;
        const {despesa,conta,categoria,fornecedor,condominio} = this.state;
        await api.get(`/despesas/${id}`)
        .then(response => {
            despesa.id= response.data._id;
            despesa.valor= response.data.valor;
            despesa.conta = conta.id = response.data.conta;
            despesa.categoria=categoria.id= response.data.categoria;
            despesa.fornecedor =fornecedor.id= response.data.fornecedor;
            despesa.liquidada = response.data.liquidada;
            despesa.competencia = response.data.competencia;
            despesa.data_vencimento = response.data.data_vencimento;
            despesa.data_liquidada = response.data.data_liquidada;
        })

        await api.get(`/contas/${despesa.conta}`)
        .then(res => {
        console.log(res.data);
        condominio.id=res.data.condominio;
        conta.nome=res.data.nome;

        api.get(`/condominios/${condominio.id}`)
            .then(res => {
                console.log(res.data);
                condominio.nome=res.data.nome;
                this.setState({despesa,conta,categoria,fornecedor,condominio});
                this.getCategorias();
                this.getFornecedores(); 
                this.getContas(); 
            })
        })
        
        document.querySelector("#dataV").valueAsDate=new Date(despesa.data_vencimento);

        if(despesa.liquidada===true || despesa.liquidada==="true"){
            document.querySelector("#liquidada").checked = true;
            document.querySelector("#dataL").valueAsDate =new Date(despesa.data_liquidada);
            this.setState({liquidado:true});
        }else{
            document.querySelector("#pendente").checked = true;
            document.querySelector("#dataL").disabled=true;
            document.querySelector("#action").disabled=true;
            //document.getElementById(id).selected=true;
            this.setState({liquidado:false});
        }
   }

   selectElement = (id) => {    
    document.getElementById(id).selected=true;
    }

    getCategorias = () => {
        const {condominio,categoria,despesa} = this.state;
        api.get(`/categorias/condominio/${condominio.id}`)
        .then(res => {
            console.log(res.data);
            categoria.nome= res.data.find(x => despesa.categoria === x._id).nome; 
            this.setState({categorias:res.data,categoria});
        })
    }

    getFornecedores = () => {
        const {condominio,fornecedor,despesa} = this.state;
        api.get(`/fornecedores/condominio/${condominio.id}`)
        .then(res => {
            console.log(res.data);
            fornecedor.nome= res.data.find(x => despesa.fornecedor === x._id).nome; 
            this.setState({fornecedores:res.data,fornecedor});
        })
    }
    
    getContas = () => {
        const {condominio} = this.state;
        api.get(`/contas/condominio/${condominio.id}`)
        .then(res => {
            this.setState({contas:res.data});
        })
    }


    editar = (e) => {
        const {despesa} = this.state;
        if(e.target.name==='valor')
            despesa.valor=e.target.value;
        else if(e.target.name==='conta')
            despesa.conta=e.target.value;
        else if(e.target.name==='categoria')
            despesa.categoria=e.target.value;
        else if(e.target.name==='fornecedor')
            despesa.fornecedor=e.target.value;
        else if(e.target.name==='liquidada'){
            if(e.target.value==="true"){
                document.querySelector("#dataL").disabled=false;
                document.querySelector("#action").disabled=false;
            }else{
                document.querySelector("#dataL").disabled=true;
                document.querySelector("#action").disabled=true;
                }
                despesa.liquidada=e.target.value;
        }
        else if(e.target.name==='competencia')
            despesa.competencia=e.target.value;
        else if(e.target.name==='data_vencimento')
            despesa.data_vencimento=e.target.value;
        else if(e.target.name==='data_liquidada')
            despesa.data_liquidada=e.target.value;
        this.setState({ despesa });
    }

    atualizar = (e) => {
        e.preventDefault();
        const {despesa} = this.state;
        api.put(`despesas/${despesa.id}`, despesa)
            .then(res => {
            console.log(res);
            if(res.status===200)
                alert("Despesa Editada com Sucesso!!!");
            else
                alert("Erro ao editar a despesa!!!");
            })
        }

    estornar = () =>{
        const {despesa,liquidado} = this.state;
        if(liquidado===true){
            api.put(`despesas/${despesa.id}`, {
            "data_liquidada":null,
            "liquidada":false})
                .then(res => {
                console.log(res);
                if(res.status===200){
                    alert("Despesa Estornada com Sucesso!!!");
                    despesa.data_liquidada=null;
                    despesa.liquidada=false;
                    this.setState({despesa,liquidado:false});
                    document.querySelector("#dataV").valueAsDate=new Date(despesa.data_vencimento);
                    document.querySelector("#pendente").checked = true;
                    document.querySelector("#dataL").disabled=true;
                    document.querySelector("#action").disabled=true;
                }else
                    alert("Erro ao Estornar a despesa!!!");
                })
            }
        }

        liquidar = () =>{
            const {despesa,liquidado} = this.state;
            console.log(despesa);
            console.log(liquidado);
            if(despesa.data_liquidada!=="" && despesa.data_liquidada!==null && despesa.liquidada==="true" && liquidado===false){
                console.log("entrou");
                api.put(`despesas/${despesa.id}`, {
                "data_liquidada":despesa.data_liquidada,
                "liquidada":despesa.liquidada})
                .then(res => {
                console.log(res.data);
                if(res.status===200){
                    alert("despesa Liquidada com Sucesso!!!");
                    this.setState({liquidado:true});
                }else
                    alert("Erro ao Liquidar a despesa!!!");
                })
            }else
                alert("Erro ao Liquidar a despesa!!!");
        }

        action = () =>{
            const {liquidado} = this.state;
            if(liquidado===true){
                console.log("estornar");
                this.estornar();        
            }else{
                console.log("liquidar");
                this.liquidar();
            }
        }

    excluir = (e) =>{
        const {despesa,condominio} = this.state;
        api.delete(`despesas/${despesa.id}`)
            .then(res => {
                console.log(res);
                if(res.status===200){
                    alert("despesa Excluida com Sucesso!!!");
                    this.props.history.push(`/despesas/listar/${condominio.id}`);
                }else{
                    alert("Erro ao excluir a despesa!!!");
                    console.log(res);
                }   
          })     
    }

    formatarData = (d) =>{
        const data = new Date(d);
        return `${data.getDate()}-${data.getMonth()+1}-${data.getFullYear()}`;
    }

    render(){
        const {despesa,condominio,conta,contas,categoria,categorias,fornecedor,fornecedores,liquidado} = this.state;

        return (
            <div className='despesa-info'>
                <Link to={`/despesas/listar/${condominio.id}`}>Voltar ás Despesas do condominio</Link><br/>
                <Link to={`/contas/${conta.id}`}>Ver dados da Conta </Link><br/>
                <Link to={`/fornecedores/${fornecedor.id}`}>Ver dados do Fornecedor </Link><br/>
                <Link to={`/categorias/${categoria.id}`}>Ver dados da Categoria </Link><br/>
                <h1>Condominio: {condominio.nome}</h1>
                <h1>Valor: {despesa.valor}</h1>
                <h1>Categoria: {categoria.nome}</h1>
                <h1>Fornecedor: {fornecedor.nome}</h1>
                <h1>Conta: {conta.nome}</h1>
                <h1>Data Vencimento: {this.formatarData(despesa.data_vencimento)}</h1>
                <h1>Competencia: {despesa.competencia}</h1>
                
                {liquidado===true ? (
                <div>
                    <h1>Despesa Liquidada</h1>
                    <h1>Data Liquidada: {this.formatarData(despesa.data_liquidada)}</h1>
                    Para Editar ou Excluir a Despesa, a mesma deve ser Estornada!!!
                </div>)
                :
                (<div> 
                    <h1>Despesa Pendente</h1>
                    <form onSubmit={this.atualizar}>
                        <label>valor:<br/>
                        <input type="number" name='valor' value={despesa.valor} onChange={this.editar}/></label><br/>
                        <label>competencia:<br/>
                        <input type="text" name='competencia' value={despesa.competencia} onChange={this.editar}/></label><br/><br/>
                        
                        <label>Categoria:<br/>
                            <select name="categoria" id="categoria" onChange={this.editar}>
                                {categorias.map(cat => (
                                    <option key={cat._id} id={cat._id} value={cat._id}>
                                    {cat.nome}
                                    </option>
                                ))}
                            </select>
                        </label><br/>

                        <label>Fornecedor:<br/>
                            <select name="fornecedor" id="fornecedor" onChange={this.editar}>
                                {fornecedores.map(fornece => (
                                    <option key={fornece._id} id={fornece._id} value={fornece._id}>
                                    {fornece.nome}
                                    </option>
                                ))}
                            </select>
                        </label><br/>

                        <label>Conta:<br/>
                            <select name="conta" id="conta" onChange={this.editar}>
                                {contas.map(con => (
                                    <option key={con._id} id={con._id} value={con._id}>
                                    {con.nome}
                                    </option>
                                ))}
                            </select>
                        </label><br/><br/>

                        <label>data_vencimento:<br/>
                            <input type="date" id="dataV" name='data_vencimento' defaultValue={despesa.data_vencimento} onChange={this.editar}/></label><br/>
                        <label>Data Liquidada:<br/>
                            <input type="date" id="dataL" name='data_liquidada' defaultValue={despesa.data_liquidada} onChange={this.editar}/></label><br/>               
                        
                        <label>
                            <input type="radio" id="liquidada" name='liquidada' value={true} onChange={this.editar}/>Liquidada</label><br/>
                        <label>
                            <input type="radio" id="pendente" name='liquidada' value={false} onChange={this.editar}/>Não-Liquidada</label><br/>
                        <input type="submit" value="Editar Despesa" /><br/>
                    </form>
                    <button id="excluir" onClick={this.excluir}>Excluir Despesa</button><br/>
                </div> 
                )}
                <button id="action" onClick={this.action}>{(liquidado===true) ? ("Estornar Despesa"):("Liquidar Despesa")}</button><br/>
               <Link to={`/despesas/listar/${condominio.id}`}>Voltar ás Despesas do condominio</Link>
            </div>
        );
    }

}