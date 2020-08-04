import React, { useEffect, useState } from 'react';
import ButtonCamera from './components/ButtonCamera';

import imgCamera from '../../imagens/icone_camera.png';
import imgSemCamera from '../../imagens/icone_sem_camera.png';

import './style.css';

export default function Camera(){
  
  const [video, setVideo] = useState({});
  const canvas = document.querySelector('canvas');
  
  /**
   * Necessário refatorar
   * o componente renderiza duas vezes 
   * (provavelmente por causa do setState dentro do useEffect) 
   */
  useEffect(() => {
    // useEffect renderiza antes de todo o componente
    // por isso precisa que estas variaveis fiquem dentro dele 
    setVideo(document.querySelector('#camera'));
    
    // funcionalidades do video
    const constraints = {
      audio: false,
      video: true,
    }
    
    function handleSucces(stream){
      console.log('sucesso')
      
      window.stream = stream;
      video.srcObject = stream;
    }
    
    function handleErrors(error){
      console.log('Erro: ', error.message)
    }
    
    // permissão de acesso e constraints do que será acessado
    navigator.mediaDevices.getUserMedia(constraints).then(handleSucces).catch(handleErrors)
    
  }, [video.srcObject])
  
  function createPicture(e){
    e.preventDefault();

    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    
    console.log('teste camera video:', video.width)
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  }
  
  function clearPicture(e){
    e.preventDefault();

    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="camera-container">
      <p><b>Anotação:</b></p>
      <video id="camera" playsInline autoPlay></video>
      <canvas></canvas>
      <div>
        <div>

          <ButtonCamera onClick={clearPicture} img={imgSemCamera} />
          <ButtonCamera onClick={createPicture} img={imgCamera}/>
        </div>
      </div>
    </div>
  );
}
