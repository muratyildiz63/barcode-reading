import { useEffect, useRef, useState } from "react";


function App() {
  const _video =  useRef(null)
  const _canvas  =  useRef(null)
  const [barcode, setBarcode] = useState(null)


const openCam = ()=>{



  navigator.mediaDevices.getUserMedia({video:{width:750,height:750}}).then(stream=>{
  const video =_video.current

    video.srcObject=stream
    video.play()

  const canvas =_canvas.current
  const ctx =canvas.getContext("2d")


  var barcodeDetector = new window.BarcodeDetector({
    formats: ["code_39", "codabar", "ean_13"],
  });
  setInterval(() => {
    
    canvas.width=video.videoWidth
    canvas.height=video.videoHeight
    ctx.drawImage(video,0,0,video.videoWidth,video.videoHeight)
    barcodeDetector.detect(canvas).then(([data])=>{
      if(data){
        setBarcode(data.rawValue)
      }

    }).catch(err=>console.log(err))

  }, 100);


  }).catch(err => console.log(err))

}




  return (
    <div className="App d-flex j-center a-center h-100" >
      <button onClick={openCam}>Kamerayı aç</button>
          <div>Barcod:{barcode}</div>

          <video ref={_video} muted hidden/>
          <canvas ref={_canvas}/>
    </div>
  );
}

export default App;
