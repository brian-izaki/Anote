import React from "react";
import './style.css';

export default function Header(props) {
  return (
    <div className="header">
      <h1>{props.titulo}</h1>
    </div>
  );
}
