import React from "react";
import { GLView } from "expo-gl"
import { Renderer } from "expo-three"

import {
    AmbientLight,
    SphereGeometry,
    BoxGeometry,
    Fog,
    GridHelper,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    SpotLight,
    MeshBasicMaterial,
  } from "three";


export const MainScene = () => {
    return(
        <GLView
            style={{ flex: 1 }}
            onContextCreate={async gl => {
                const scene = new Scene();
                const camera = new PerspectiveCamera(90, gl.drawingBufferWidth/gl.drawingBufferHeight, 0.1, 1000);

                camera.position.z = 2;

                const renderer = new Renderer({ gl });
                renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

                const geometry = new BoxGeometry(1, 1, 1);
                const material = new MeshBasicMaterial({
                    color: 'cyan',
                })
                const cube = new Mesh(geometry, material);

                scene.add(cube);

                const render = () => {
                    requestAnimationFrame(render);

                    cube.rotation.x += 0.01;
                    cube.rotation.y += 0.02;

                    renderer.render(scene, camera);

                    gl.endFrameEXP();
                };

                render();

            }} 
        />
    )
}