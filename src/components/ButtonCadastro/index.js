import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

export default function ButtonCadastro({children, color, to, onClick}){
  
  const style = {
    backgroundColor: color,
  }
  
  return(
    <Link onClick={onClick} className="buttonCadastro" style={style} to={to}>
      {children}
    </Link>
  )
}
