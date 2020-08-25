import React, { useEffect, useState } from "react";
import ButtonCamera from "../ButtonCamera";


import imgCamera from "../../imagens/icone_camera.png";
import imgNegaCamera from "../../imagens/icone_sem_camera.png";


import "./style.css";
import CameraOptions from "./components/CameraOptions";

export default function Camera() {
  const canvas = document.querySelector("canvas");
  const [video, setVideo] = useState({});
  const [devicesList, setDevicesList] = useState([]);
  const [deviceAtual, setDeviceAtual] = useState({
    id: '', 
    index: 0,
  });
  const [estado, setEstado] = useState({ 
    hasVideo: false, 
    hasPicture: false,  
  });

  useEffect(() => {
    setVideo(document.querySelector("#camera"));
  }, []);

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
  }
  
  function stopVideo(stream) {
    const videoTracks = stream.getVideoTracks();
    const mediaAtual = videoTracks[0];

    mediaAtual.stop();
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
  }

  function clearPicture(e) {
    e.preventDefault();
    setEstado({ ...estado, hasPicture: false });
    video.src = '';
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    
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

  return (
    <div>
      <div>
        <p>
          <b>Anotação em imagem:</b>
        </p>

        <div className="camera-container">
          {!estado.hasVideo ? (
            <p className="info"> Não será cadastrado uma anotação em imagem</p>
          ) : null}

          <video id="camera" playsInline autoPlay></video>
          <canvas></canvas>
          {estado.hasVideo ? 
            <CameraOptions 
              estado={estado} 
              clearPicture={clearPicture} 
              createPicture={createPicture} 
              switchCamera={switchCamera}/>   
            : null
          }
        </div>

        <div>
          <ButtonCamera
            onClick={(e) => {
              e.preventDefault();
              clearPicture(e);
              toogleVideo()
            }}
            img={estado.hasVideo ? imgNegaCamera : imgCamera}
          />
        </div>
      </div>
    </div>
  );
}
