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
      <Header principal> Anotações de Livros </Header>
      
      {
        listaAnotacoes
          ? listaAnotacoes.map((anotacao) => {
              // console.log('dentro do map', anotacao);
              return <Anotacao key={anotacao.id} anotacao={anotacao}/>
            })
          : (<p>ainda não há registros</p>)
      }
      
      <ButtonAdd />
    </>
  );
}

export default Home;
