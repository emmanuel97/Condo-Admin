import React, {Component} from "react";
import {Link} from 'react-router-dom';
import './styles.css';

export default class Main extends Component{

   

    render(){
        return (
            <div className="main-page">
                <h1>CondoAdmin</h1>
                <p>Soluções para administração de condominio</p>
                <div className="actions">
                <Link to={`/condominios`}>Ir á lista de Condominios</Link>
                 </div>
            </div>
        );
    }
}