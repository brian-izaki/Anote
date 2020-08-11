import React from "react";

import Informacao from '../Informacao';
import InformacaoFoto from "../InformacaoFoto";
import "./style.css";
import ButtonCamera from "../ButtonCamera";

import imgLixo from '../../imagens/icone_lixo.png';

export default function Anotacao({ anotacao, deletarAnotacao }) {  

  // console.log('dentro de anotacao', anotacao)

  const mensagem = '😓 Sem informação';
  const hasTags = anotacao.tags.split(', ')[0]

  return (
    <div className="card">

      <ButtonCamera onClick={deletarAnotacao} className='btn-excluir-card' img={imgLixo}/>

      <input type="hidden" value='0'/>
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
