import React from 'react';
import './styles.css';
const Header = () => (
<div id="main-header">
    <header id="header"><h1>CondoAdmin</h1></header><br/>

    <div className="nav-links">
        <h1><a href={`/`}>Pagina Inicial</a></h1>
        <h1><a href={`/condominios`}>Meus Condominios</a></h1>
    </div>
</div>
);

export default Header;