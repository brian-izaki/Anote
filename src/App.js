import React from 'react';

import './style.css';

import Header from './components/Header';
import Anotacao from './components/Anotacao';
import ButtonAdd from './components/ButtonAdd';

function App() {
  return (
    <>
      <Header titulo="Anotações de Livros"/>

      <section className="cards">
        <Anotacao />
        <Anotacao />
      </section>

      < ButtonAdd />

    </>
  );
}

export default App;
