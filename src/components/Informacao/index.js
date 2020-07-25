import React, { useState, useEffect } from "react";

import "./style.css";

export default function Informacao(props) {
  const [tipo, setTipo] = useState({});

  const style = {
    flexFlow: "column nowrap",
    marginBottom: "10px",
  };

  useEffect(() => {
    setTipo({
      principal: <b>{props.descricao}</b>,
      tag: tag(),
      basico: props.descricao,
      
    });

    function tag() {
      if (!Array.isArray(props.descricaoArray)) return null;

      return (
        <>
          {props.descricaoArray.map((tag) => {
            return (
              <span className="tag" key={tag}>
                {tag}
              </span>
            );
          })}
        </>
      );
    }
  }, [props.descricao, props.descricaoArray]);

  return (
    <>
      <div className="informacao" style={props.nome === "Observação" ? style : null}>
        <p>
          <b> {props.nome}: </b>
        </p>
        <p>{tipo[props.tipo]}</p>
      </div>
    </>
  );
}
