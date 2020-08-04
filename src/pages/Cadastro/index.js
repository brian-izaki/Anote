import React from "react";
import Header from "../../components/Header";
import ButtonCadastro from "../../components/ButtonCadastro";

import './style.css';
import Input from "../../components/Input";

export default function Cadastro() {
  return (
    <>
      <Header titulo="Cadastro de anotações" />
      
      <form className="container pure-form pure-form-stacked">

        <div className="container inputs">
          <Input 
            name='Livro'
            id='livro'
            type='text'
          />

          <Input 
            name='Tags'
            id='tags'
            type='text'
          />

          <Input 
            name='Página'
            id='pagina'
            type='text'
            isPage
          />

          <Input 
            name='Autor'
            id='autor'
            type='text'
          />

          <Input 
            name='Observação'
            id='observacao'
            type='textarea'
          />

        </div>
        
        <div>
          <ButtonCadastro to="/" color="#87CC9E"> Salvar </ButtonCadastro>        
          <ButtonCadastro to="/" color="#ED636D"> Cancelar </ButtonCadastro>        
        </div>
      </form>
      
    </>
  );
}
