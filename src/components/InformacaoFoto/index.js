import React from "react";

import "./style.css";

export default function InformacaoFoto(props) {
  return (
    <div>
      <p>
        <b> Anotação: </b>
      </p>
      <div className="imagem">
        <img src={props.img} alt="imagem" />
      </div>
    </div>
  );
}
