import React from 'react';

import './style.css';

export default function ButtonCamera({ onClick, img }){
  return(
    <button className="button-photo" onClick={onClick}> 
      <div>

        <img src={img} alt=""/>
      </div>
    </button>
  );
}