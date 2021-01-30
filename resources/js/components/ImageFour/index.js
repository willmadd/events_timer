import { set } from "lodash";
import React, { useRef, useEffect, useState } from "react";
import * as images from "../../../img";
// import useImage from 'use-image';

const Imagerr = (props) => {
    const canvasRef = useRef(null);

    const handleBackgroundChange = (imagex) => {
        console.log("background change");
        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");

        let image = new Image();
        imagex.src =
            "https://picsum.photos/400/300";
        imagex.onload = function () {
            ctx.drawImage(image, 0, 0);
        };
    };

    return (
        <main>
            <button type="button" onClick={(e) => handleBackgroundChange(e)}>
                Add Image
            </button>
            <canvas ref={canvasRef} {...props} width={640} height={480} />
        </main>
    );
};

export default Imagerr;
