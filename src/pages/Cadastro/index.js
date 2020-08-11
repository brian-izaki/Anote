import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ButtonCadastro from "../../components/ButtonCadastro";
import ButtonCamera from "../../components/ButtonCamera";
import Input from "../../components/Input";

import "./style.css";

import imgCamera from "../../imagens/icone_camera.png";
import imgNegaCamera from "../../imagens/icone_sem_camera.png";
import imgLixo from "../../imagens/icone_lixo.png";
import imgObturador from "../../imagens/icone_obturador.png";
import imgVirar from "../../imagens/icone_virar.png";

// import Anotacoes from '../../model/Anotacoes';
import AnotacoesDAO from "../../DAO/AnotacoesDAO";

export default function Cadastro() {
  const [anotacao, setAnotacao] = useState({
    id: new Date().getTime(),
    livro: '',
    tags: '',
    pagina: '',
    autor: '',
    observacao: '',
    anotacaoImagem: '',
  });
  const [video, setVideo] = useState({});
  const [devicesList, setDevicesList] = useState([]);
  const [estado, setEstado] = useState({ 
    hasVideo: false, 
    hasPicture: false,  
  });
  const [deviceAtual, setDeviceAtual] = useState({
    id: '', 
    index: 0,
  });
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
    const hasDevices = Boolean(devicesList.length);
    
    if(!hasDevices){
      getDevices();
    }

    // funcionalidades do video
    function handleSuccess(stream) {
      // console.log("sucesso");
      window.stream = stream;
      video.srcObject = stream;
    }

    function handleErrors(error) {
      console.log("Erro: ", error);
    }

    // permissão de acesso e constraints do que será acessado
    try {
      const constraints = {
        audio: false,
        video: {deviceId: deviceAtual.id},

      }
      // stream rescepe uma promessa respondida pois "await" por ela
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    } catch (e) {
      handleErrors(e);
    }
    // opção utilizando then e catch para pegar promisse
    // navigator.mediaDevices
    //   .getUserMedia(constraints)
    //   .then(handleSucces)
    //   .catch(handleErrors);
  }

  async function getDevices(){
    const devices = await navigator.mediaDevices.enumerateDevices();

    const arrayDevice = [];
    
    devices.forEach((device) => {
      if (device.kind === "videoinput") {
        arrayDevice.push(device.deviceId);
      }
    });
    
    console.log(arrayDevice)
    console.log(devices)

    setDevicesList(arrayDevice);
    setDeviceAtual({...deviceAtual, id: arrayDevice[0]});
  }

  function switchCamera(){
    let indice = deviceAtual.index + 1;

    // caso o indice no array exista retorna true.
    const hasDevice = Boolean(devicesList[indice]);
    // console.log(hasDevice);

    if (hasDevice) {
      setDeviceAtual({ id: devicesList[indice], index: indice })
    } else {
      setDeviceAtual({ id: devicesList[0], index: 0 })
    }

    // console.log("video atual", deviceAtual);
    // console.log("lista de video", devicesList);

    stopVideo(video.srcObject);
    startVideo();
    
  }

  function toogleVideo() {
    if (estado.hasVideo) {
      stopVideo(video.srcObject);
    } else {
      startVideo();
    }
    setEstado({...estado, hasVideo: !estado.hasVideo}) 
  }

  function createPicture(e) {
    e.preventDefault();
    setEstado({ ...estado, hasPicture: true });
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    // a escolha da extensão .jpeg é por causa do tamanho da imagem.
    const image = canvas.toDataURL('image/jpeg', 0.2);
    setAnotacao({...anotacao, anotacaoImagem: image})
    // console.log(image)
  }

  function clearPicture(e) {
    e.preventDefault();
    setEstado({ ...estado, hasPicture: false });
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }

  function cadastrar() {
    if (estado.hasVideo) stopVideo(video.srcObject);
    
    const tagsList = anotacao.tags.split(', ') 
    setAnotacao({...anotacao, 'tags': tagsList})

    const dao = new AnotacoesDAO();
    const dadosDoStorage = dao.listar();

    dadosDoStorage.push(anotacao);

    dao.cadastrar(dadosDoStorage)

  }

  function setValue(e){
    const idInput = e.target.getAttribute('id');
    const valorAtributo = e.target.value;

    setAnotacao({...anotacao, [idInput]: valorAtributo})
  }

  function cancelar() {
    if (estado.hasVideo) stopVideo(video.srcObject);
  }

  return (
    <>
      <Header> Cadastro de anotações </Header>

      <form className="container pure-form pure-form-stacked">
        <div className="container inputs">
          <Input 
            label="Livro" 
            id="livro" 
            type="text" 
            placeholder="Ex: Alice no país das maravilhas"
            value={anotacao.livro}
            onChange={setValue}
          />
          <Input 
            label="Tags" 
            id="tags" 
            type="text" 
            placeholder="Ex: tag1, tag2"
            value={anotacao.tags}
            onChange={setValue}
            />

          <Input 
            label="Página" 
            id="pagina" 
            type="text" 
            placeholder="Ex: 95"
            isPage
            value={anotacao.pagina}
            onChange={setValue}
          />

          <Input 
            label="Autor" 
            id="autor" 
            type="text" 
            placeholder="Ex: Lewis Carroll"
            value={anotacao.autor}
            onChange={setValue}
          />

          <Input 
            label="Anotação escrita" 
            id="observacao" 
            type="textarea" 
            placeholder="Ex: Uma menina, um coelho e uma história capazes de fazer qualquer um de nós voltar a sonhar."
            value={anotacao.observacao}
            onChange={setValue}
          />

          <div>
            <p>
              <b>Anotação em imagem:</b>
            </p>

            <div className="camera-container">
              { !estado.hasVideo ? (<p className="info"> Não será cadastrado uma anotação em imagem</p>) : null }
              
              <video id="camera" playsInline autoPlay></video>
              <canvas></canvas>
              {
                estado.hasVideo ? (
                  <div className="container-picture">
                    <ButtonCamera
                      onClick={estado.hasPicture ? clearPicture : createPicture}
                      img={estado.hasPicture ? imgLixo : imgObturador}
                    />
                    <ButtonCamera
                      className="btn-virar"
                      onClick={(e) => {
                        e.preventDefault();
                        switchCamera()
                      }}
                      img={ imgVirar }
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
                  toogleVideo();
                }}
                img={estado.hasVideo ? imgNegaCamera : imgCamera}
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
