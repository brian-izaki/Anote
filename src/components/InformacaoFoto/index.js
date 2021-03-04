import React from "react";

import "./style.css";

export default function InformacaoFoto(props) {
  return (
    <div className="informacao-img">
      <p>
        <b> Anotação: </b>
      </p>
      
      <img className="pure-img" src={props.src} alt="imagem" />
      
    </div>
  );
}
