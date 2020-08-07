import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ButtonCadastro from "../../components/ButtonCadastro";
import ButtonCamera from "../../components/ButtonCamera";
import Input from "../../components/Input";

import "./style.css";

import imgCamera from "../../imagens/icone_camera.png";
import imgSemCamera from "../../imagens/icone_sem_camera.png";
import imgLixo from "../../imagens/icone_lixo.png";
import imgObturador from "../../imagens/icone_obturador.png";

export default function Cadastro() {
  const [video, setVideo] = useState({});
  const [estado, setEstado] = useState({ hasVideo: false, hasPicture: false });
  const canvas = document.querySelector("canvas");
  
  useEffect(() => {
    // o video é pego primeiro para que o canvas pegar a referencia
    setVideo(document.querySelector("#camera"));
  }, []);

  function stopVideo(stream) {
    const videoTracks = stream.getVideoTracks();
    const mediaAtual = videoTracks[0];

    mediaAtual.stop();
  }

  async function startVideo() {
    // funcionalidades do video
    function handleSucces(stream) {
      console.log("sucesso");
      window.stream = stream;
      video.srcObject = stream;
    }

    function handleErrors(error) {
      console.log("Erro: ", error.message);
    }

    // permissão de acesso e constraints do que será acessado
    // retorna uma promisse
    // método utilizando async e await
    try {
      // stream rescepe uma promessa respondida pois "await" por ela
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      handleSucces(stream);
    } catch (e) {
      handleErrors(e);
    }
    // opção utilizando then e catch para pegar promisse
    // navigator.mediaDevices
    //   .getUserMedia(constraints)
    //   .then(handleSucces)
    //   .catch(handleErrors);
  }

  function toogleVideo() {
    if (estado.hasVideo) {
      stopVideo(video.srcObject);
    } else {
      startVideo();
    }
  }

  function createPicture(e) {
    e.preventDefault();
    setEstado({ ...estado, hasPicture: true });
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  function clearPicture(e) {
    e.preventDefault();
    setEstado({ ...estado, hasPicture: false });
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }

  function cadastrar() {
    if (estado.hasVideo) stopVideo(video.srcObject);
  }

  function cancelar() {
    if (estado.hasVideo) stopVideo(video.srcObject);
  }

  return (
    <>
      <Header titulo="Cadastro de anotações" />

      <form className="container pure-form pure-form-stacked">
        <div className="container inputs">
          <Input name="Livro" id="livro" type="text" />

          <Input name="Tags" id="tags" type="text" />

          <Input name="Página" id="pagina" type="text" isPage />

          <Input name="Autor" id="autor" type="text" />

          <Input name="Observação" id="observacao" type="textarea" />

          <div>
            <p>
              <b>Anotação:</b>
            </p>

            <div className="camera-container">
              { !estado.hasVideo ? (<p className="info"> Não será cadastrado uma imagem como anotação </p>) : null }
              <video id="camera" playsInline autoPlay></video>
              <canvas></canvas>
              {
                estado.hasVideo ? (
                  <div className="btn-picture">
                    <ButtonCamera
                      onClick={estado.hasPicture ? clearPicture : createPicture}
                      img={estado.hasPicture ? imgLixo : imgObturador}
                    />
                  </div>
                ) : null
              }
            </div>

            <div>
              <ButtonCamera
                onClick={(e) => {
                  e.preventDefault();
                  clearPicture(e);
                  setEstado({ ...estado, hasVideo: !estado.hasVideo });
                  toogleVideo();
                }}
                img={estado.hasVideo ? imgSemCamera : imgCamera}
              />
            </div>
          </div>
        </div>

        <div>
          <ButtonCadastro onClick={cadastrar} to="/" color="#87CC9E">
            Salvar
          </ButtonCadastro>
          <ButtonCadastro onClick={cancelar} to="/" color="#ED636D">
            Cancelar
          </ButtonCadastro>
        </div>
      </form>
    </>
  );
}
