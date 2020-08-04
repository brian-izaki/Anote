import React from 'react';

export default function ButtonCamera({ onClick, img }){
  return(
    <button onClick={onClick}> 
      <img src={img} alt=""/>
    </button>
  );
}