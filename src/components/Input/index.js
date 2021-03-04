import React from "react";

import "./style.css";

export default function Input({ label, id, type, isPage, value, onChange, placeholder }) {
  const isTextArea = type === "textarea";

  return (
    <div className="pure-control-group">
      <label htmlFor={id}>
        <b>{label}:</b>
      </label>
      {isTextArea ? (
        <textarea 
          className="pure-input-1" 
          id={id} 
          placeholder={placeholder}
          value={value} 
          onChange={onChange} 
        />
      ) : (
        <input
          className={isPage ? "pure-input-1-5" : "pure-u-1"}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
