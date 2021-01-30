import React, {useRef, useEffect, useState} from 'react';
import Script from 'react-load-script'
import Whammy from 'react-whammy';

const ImageTwo = props => {
  
    const canvasRef = useRef(null)
    
    const [loaded, setLoaded] = useState(false);

    const  counter = (ctx, num, intvl) => {
      const canvas = canvasRef.current;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.font="75px Comic Sans MS";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText(""+num, canvas.width/2, canvas.height/2);
      if(num == 0){
        clearInterval(intvl);
      }

    } 

    // const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')
      //Our first draw
      // ctx.fillStyle = '#000000'
      // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      // ctx.fillText('0:12:56', 10, 50);
      var num=500;
      var intvl = setInterval(function(){counter(ctx,num--, intvl);},10);




    }, [])
    
useEffect(()=>{
          console.log('loaded things');
},[loaded])

const download = () => {
  console.log('download hit');
  startRecording();
}


    return <div>
            <Script
      url="https://rawgit.com/spite/ccapture.js/master/build/CCapture.all.min.js"
      onCreate={()=>console.log('create')}
      onError={()=>console.log('error')}
      onLoad={()=>setLoaded(true)}
    />
      <canvas ref={canvasRef} {...props}/>
    <button onClick={()=>download()}>Download two</button></div>
  }

export default ImageTwo;


////     //   ctx.drawImage(background,0,0);   
//     ctx.fillStyle = 'red'
//     ctx.save()
//     ctx.font = '48px serif';
//     ctx.fillText('0:12:56', 10, 50);
//     ctx.restore()