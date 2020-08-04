import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

export default function ButtonCadastro({children, color, to}){
  
  const style = {
    backgroundColor: color,
  }
  
  return(
    <Link className="buttonCadastro" style={style} to={to}>
      {children}
    </Link>
  )
}
