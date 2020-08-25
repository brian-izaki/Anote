import React from "react";
import ButtonCamera from "../../../ButtonCamera";

import imgLixo from "../../../../imagens/icone_lixo.png";
import imgObturador from "../../../../imagens/icone_obturador.png";
import imgVirar from "../../../../imagens/icone_virar.png";

export default function CameraOptions({estado, clearPicture, createPicture, switchCamera}) {
  return (
    <div className="container-picture">
      <ButtonCamera
        onClick={estado.hasPicture ? clearPicture : createPicture}
        img={estado.hasPicture ? imgLixo : imgObturador}
      />
      <ButtonCamera
        className="btn-virar"
        onClick={(e) => {
          e.preventDefault();
          switchCamera();
        }}
        img={imgVirar}
      />
    </div>
  );
}
