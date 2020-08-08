import React from 'react';

import Header from '../../components/Header';
import ButtonAdd from '../../components/ButtonAdd';
// import Anotacoes from '../../components/Anotacoes';
import AnotacaoDAO from '../../DAO/AnotacoesDAO';
import Anotacao from '../../components/Anotacao';

function Home() {

  const listaAnotacoes = new AnotacaoDAO().listar();

  return (
    <>
      <Header titulo="Anotações de Livros"/>
      
      {
        listaAnotacoes.map((anotacao) => {
          // console.log('dentro do map', anotacao);
          return <Anotacao key={anotacao.id} anotacao={anotacao}/>
        })
      }
      
      <ButtonAdd />
    </>
  );
}

export default Home;
