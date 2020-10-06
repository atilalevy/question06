import React from 'react';
import './style.css';

const Personagem = (props) => {
    return(
        <div className="personagem-container">
            <p className="nome" style={{color:props.cor}}>{props.nome}</p>
        </div>
    )
};

export default Personagem;