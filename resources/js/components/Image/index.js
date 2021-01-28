import React, {useRef, useEffect} from 'react';

const Image = props => {
  
    const canvasRef = useRef(null)
  
    useEffect(() => {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      //Our first draw
      context.fillStyle = '#000000'
      context.fillRect(0, 0, context.canvas.width, context.canvas.height)
      context.fillText('0:12:56', 10, 50);
    }, [])
    
    return <canvas ref={canvasRef} {...props}/>
  }

export default Image;


////     //   ctx.drawImage(background,0,0);   
//     ctx.fillStyle = 'red'
//     ctx.save()
//     ctx.font = '48px serif';
//     ctx.fillText('0:12:56', 10, 50);
//     ctx.restore()