import React from "react";

import Informacao from '../Informacao';
import InformacaoFoto from "../InformacaoFoto";

import "./style.css";
//import AnotacaoDAO from '../../DAO/AnotacoesDAO';

export default function Anotacao({ anotacao }) {  

  // console.log('dentro de anotacao', anotacao)
  
  return (
    <div className="card">
      <Informacao
        tipo="principal"
        nome="Livro"
        descricao={anotacao.livro}
      />
      <Informacao
        tipo="tag"
        nome="Tag"
        descricaoArray={anotacao.tags.split(', ')}
      />
      <Informacao tipo="basico" nome="Página" descricao={anotacao.pagina} />
      <Informacao tipo="basico" nome="Autor" descricao={anotacao.autor} />
      <Informacao
        tipo="basico"
        nome="Observação"
        descricao={anotacao.observacao}
      />
      < InformacaoFoto src={anotacao.anotacaoImagem} alt="imagem"/>

    </div>
  );
}
