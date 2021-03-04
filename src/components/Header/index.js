import React from "react";
import './style.css';
import imgArrowLeft from '../../imagens/icone_esquerda.png';
import { Link } from "react-router-dom";

export default function Header({principal, children}) {
  return (
    <div className="header">
      <div>
        {
          !principal
            ?(<Link className="link" to="/">
                <img src={imgArrowLeft} alt="Voltar"/>
              </Link>)
            : null
        }
        <h1 className="titulo">{children}</h1>
      </div>
    </div>
  );
}
