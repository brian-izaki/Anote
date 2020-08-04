import React from 'react';

import Header from '../../components/Header';
import ButtonAdd from '../../components/ButtonAdd';
import Anotacoes from '../../components/Anotacoes';

function Home() {
  return (
    <>
      <Header titulo="Anotações de Livros"/>
      <Anotacoes />
      <ButtonAdd />
    </>
  );
}

export default Home;
