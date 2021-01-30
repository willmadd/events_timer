import React, {useRef, useEffect} from 'react';
import Whammy from 'react-whammy'

const Image = props => {
  
    const canvasRef = useRef(null)
    
    
    const  counter = (ctx, num, intvl) => {
      const canvas = canvasRef.current;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.font="75px Helvetica";
      ctx.fillStyle = "grey";
      ctx.textAlign = "center";
      ctx.fillText(""+num, canvas.width/2, canvas.height/2);
      if(num == 0){
        clearInterval(intvl);
      }

    } 
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')
      //Our first draw
      // ctx.fillStyle = '#000000'
      // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      // ctx.fillText('0:12:56', 10, 50);
      var num=600;
      var intvl = setInterval(function(){counter(ctx,num--, intvl);},10);
    }, [])
    
const download = () => {
  // console.log('hello');
  // const canvas = canvasRef.current;
  // var encoder = new Whammy.Video(15);
  // encoder.add(canvas);
  // encoder.compile(false, (output) => {
  //   const video = URL.createObjectURL(output)
  // })
  console.log('download hit');
  startRecording();
}

const startRecording = () => {

  var options = {
    audioBitsPerSecond : 128000,
    videoBitsPerSecond : 6500000,
    // mimeType : 'video/mp4'
  }

  console.log('start recordering');
  const canvas = canvasRef.current;
  const chunks = []; // here we will store our recorded media chunks (Blobs)
  const stream = canvas.captureStream(); // grab our canvas MediaStream
  const rec = new MediaRecorder(stream, options); // init the recorder
  // every time the recorder has new data, we will store it in our array
  // console.log(rec);

  // rec.setVideoSize(640, 480);
  // rec.setVideoFrameRate(60); //might be auto-determined due to lighting
  // rec.setVideoEncodingBitRate(3000000);
  // rec.setVideoEncoder(MediaRecorder.VideoEncoder.H264);// MPEG_4_SP
  // rec.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);

  rec.ondataavailable = e => chunks.push(e.data);
  // only when the recorder stops, we construct a complete Blob from all the chunks
  rec.onstop = e => exportVid(new Blob(chunks, {type: 'video/webm'}));
  
  rec.start();
  setTimeout(()=>rec.stop(), 6000); // stop recording in 3s
}


const exportVid = (blob) => {
  console.log('export vid');
  const vid = document.createElement('video');
  vid.src = URL.createObjectURL(blob);
  vid.controls = true;
  document.body.appendChild(vid);
  
  const a = document.createElement('a');
  a.download = 'myvid.webm';
  a.href = vid.src;
  a.click();
}

    return <div><canvas ref={canvasRef} {...props}/>
    <button onClick={()=>download()}>Download</button></div>
  }

export default Image;


////     //   ctx.drawImage(background,0,0);   
//     ctx.fillStyle = 'red'
//     ctx.save()
//     ctx.font = '48px serif';
//     ctx.fillText('0:12:56', 10, 50);
//     ctx.restore()