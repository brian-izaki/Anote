import React from "react";

import './style.css';

export default function Input({ name, id, type, isPage }) {
  
  const isTextArea = type === 'textarea'; 

  return (
    <div className='pure-control-group'>
      <label htmlFor={id}> <b>{name}:</b></label>
      {
        isTextArea  
          ? <textarea className="pure-input-1" />
          : <input className={isPage ? 'pure-input-1-5' : 'pure-u-1'} type={type} id={id} />
      }
    </div>
  );
}
