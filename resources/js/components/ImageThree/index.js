import { set } from "lodash";
import React, { useRef, useEffect, useState } from "react";
import * as images from "../../../img";
// import useImage from 'use-image';

const Main = (props) => {
    const canvasRef = useRef(null);

    const imgRef = useRef(null);

    const [time, setTime] = useState(100);

    const definitions = {
        sd: {
            height: 480,
            width: 852,
        },
        hd: {
            height: 720,
            width: 1280,
        },
    };

    const handleRadioChange = (e) => {
        setResolution(e.target.value);
    };

    const [resolution, setResolution] = useState("sd");

    const counter = (ctx, num, intvl) => {
        const canvas = canvasRef.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "75px Helvetica";
        ctx.fillStyle = "grey";
        ctx.textAlign = "center";
        ctx.fillText("" + num, canvas.width / 2, canvas.height / 2);
        if (num == 0) {
            clearInterval(intvl);
        }
    };

    const startAnimation = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        var num = time;
        var intvl = setInterval(function () {
            counter(ctx, num--, intvl);
        }, 10);
    };

    const download = () => {
        startRecording();
        startAnimation();
    };

    const startRecording = () => {
        var options = {
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 6500000,
        };

        const canvas = canvasRef.current;
        const chunks = []; // here we will store our recorded media chunks (Blobs)
        const stream = canvas.captureStream(); // grab our canvas MediaStream
        const rec = new MediaRecorder(stream, options); // init the recorder
        rec.ondataavailable = (e) => chunks.push(e.data);
        rec.onstop = (e) => exportVid(new Blob(chunks, { type: "video/webm" }));
        rec.start();
        setTimeout(() => rec.stop(), time * 10); // stop recording in 3s
    };

    const exportVid = (blob) => {
        console.log("export vid");
        const vid = document.createElement("video");
        vid.src = URL.createObjectURL(blob);
        vid.controls = true;
        document.body.appendChild(vid);

        const a = document.createElement("a");
        a.download = "myvid.webm";
        a.href = vid.src;
        a.click();
    };

    const handleBackgroundChange = (base64) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let imageObj1 = new Image();
        imageObj1.src = base64;
        imageObj1.onload = function () {
            ctx.drawImage(imageObj1, 0, 0);
        };
    };

    return (
        <main>
            <div className="control__area">
                <fieldset>
                    <h3>Resolution</h3>
                    <input
                        type="radio"
                        id="sd"
                        name="resolution"
                        value="sd"
                        checked={resolution === "sd"}
                        onChange={(e) => handleRadioChange(e)}
                    />
                    <label htmlFor="sd">SD</label>
                    <br />
                    <input
                        type="radio"
                        id="hd"
                        name="resolution"
                        value="hd"
                        checked={resolution === "hd"}
                        onChange={(e) => handleRadioChange(e)}
                    />
                    <label htmlFor="hd">HD</label>
                    <br />
                </fieldset>
                {/* <fieldset> */}
                <div className="background__area">
                    <h3>Background</h3>
                    <input
                        type="radio"
                        id="sd"
                        name="backgroundImage"
                        value="sd"
                        // checked={backgroundImage === "sd"}
                        onChange={(e) => handleBackgroundChange(e)}
                    />
                    <label htmlFor="sd">Nonex</label>
                    <br />
                    <input
                        type="radio"
                        id="mrbear"
                        name="backgroundImage"
                        value="mrbear"
                        // checked={backgroundImage === "mrbear"}
                        onChange={(e) => handleBackgroundChange(images.mrbear)}
                    />
                    <label htmlFor="mrbear">
                        <img src={images.mrbear} />
                    </label>
                    <br />
                    <input
                        type="radio"
                        id="biggles"
                        name="backgroundImage"
                        value="biggles"
                        // checked={backgroundImage === "biggles"}
                        onChange={(e) => handleBackgroundChange(images.biggles)}
                    />
                    <label htmlFor="biggles">
                        <img src={images.biggles} />
                    </label>
                    <br />
                </div>
                {/* </fieldset> */}
                <label>
                    Enter the number of seconds:
                    <input
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        type="text"
                        id="time"
                        name="time"
                    />
                </label>
                <div className="button__wrapper">
                    <button
                        className="primary"
                        onClick={() => startAnimation()}
                    >
                        Preview
                    </button>
                    <button className="secondary" onClick={() => download()}>
                        Download
                    </button>
                </div>
            </div>
            <div className="canvas__wrapper">
                <canvas
                    ref={canvasRef}
                    {...props}
                    width={definitions[resolution].width}
                    height={definitions[resolution].height}
                />
                <img ref={imgRef} src={images.biggles} className="hidden" />
            </div>
        </main>
    );
};

export default Main;

////     //   ctx.drawImage(background,0,0);
//     ctx.fillStyle = 'red'
//     ctx.save()
//     ctx.font = '48px serif';
//     ctx.fillText('0:12:56', 10, 50);
//     ctx.restore()
