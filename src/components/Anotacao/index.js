import React from "react";

import Informacao from '../Informacao';
import InformacaoFoto from "../InformacaoFoto";

import "./style.css";
import img from '../../imagens/imgTeste.jpeg';

export default function Anotacao(props) {
  return (
    <div className="card">
      <Informacao
        tipo="principal"
        nome="Livro"
        descricao="Oportunidades invisíveis Oportun idades invisíveis"
      />
      <Informacao
        tipo="tag"
        nome="Tag"
        descricaoArray={["ola", "tchau", "vindo"]}
      />
      <Informacao tipo="basico" nome="Página" descricao="39" />
      <Informacao tipo="basico" nome="Autor" descricao="Paulo Rogério Nunes" />
      <Informacao
        tipo="basico"
        nome="Observação"
        descricao="diversidade é um elemento importante para empreendimentos inovadores"
      />
      < InformacaoFoto img={img} alt="imagem"/>
    </div>
  );
}
