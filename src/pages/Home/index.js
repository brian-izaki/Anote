import React, { useState } from 'react';

import Header from '../../components/Header';
import ButtonAdd from '../../components/ButtonAdd';
import AnotacaoDAO from '../../DAO/AnotacaoDAO';
import Anotacao from '../../components/Anotacao';


function Home() {

  const [listaAnotacoes, setListaAnotacoes] = useState(new AnotacaoDAO().listar())

  function deletarAnotacao(id) {
    const dao = new AnotacaoDAO();
    dao.deletar(id);
    setListaAnotacoes(new AnotacaoDAO().listar())
  }

  // const listaAnotacoes = new AnotacaoDAO().listar();

  return (
    <>
      <Header principal> Anotações de Livros </Header>
      
      {
        listaAnotacoes
          ? listaAnotacoes.map((anotacao) => {
              // console.log('dentro do map', anotacao);
              return <Anotacao key={anotacao.id} deletarAnotacao={() => {deletarAnotacao(anotacao.id)}} anotacao={anotacao}/>
            })
          : (<p>ainda não há registros</p>)
      }
      
      <ButtonAdd />
    </>
  );
}

export default Home;
