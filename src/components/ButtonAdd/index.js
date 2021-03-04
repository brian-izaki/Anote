import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
// import imgAdd from '../../imagens/icone_mais.png';


export default function ButtonAdd(props){
  return(
    // style={{backgroundImage: `URL(${imgAdd})`}}
    <Link to="/cadastro">
      <div className="btn-add">
      
      </div>

    </Link>
  )
}