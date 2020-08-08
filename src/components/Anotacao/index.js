import React from "react";

import Informacao from '../Informacao';
import InformacaoFoto from "../InformacaoFoto";

import "./style.css";
//import AnotacaoDAO from '../../DAO/AnotacoesDAO';

export default function Anotacao({ anotacao }) {  

  // console.log('dentro de anotacao', anotacao)

  const mensagem = '😓 Sem informação';
  const hasTags = anotacao.tags.split(', ')[0]

  return (
    <div className="card">
      <Informacao
        tipo="principal"
        nome="Livro"
        descricao={anotacao.livro || mensagem}
      />
      <Informacao
        tipo="tag"
        nome="Tag"
        descricaoArray={ hasTags !== '' ? anotacao.tags.split(', ') : [mensagem]}
      />
      <Informacao 
        tipo="basico" 
        nome="Página" 
        descricao={anotacao.pagina || mensagem} 
      />
      <Informacao 
        tipo="basico" 
        nome="Autor" 
        descricao={anotacao.autor || mensagem} 
      />
      <Informacao
        tipo="basico"
        nome="Observação"
        descricao={anotacao.observacao || mensagem}
      />

      {
        anotacao.anotacaoImagem 
          ? <InformacaoFoto src={anotacao.anotacaoImagem} alt="imagem"/>
          : null
      }

    </div>
  );
}
