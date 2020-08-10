import React from 'react';

import './style.css';

export default function ButtonCamera({ onClick, img, className }){
  return(
    <button className={`button-photo ${className}`} onClick={onClick}> 
      <div>

        <img src={img} alt=""/>
      </div>
    </button>
  );
}