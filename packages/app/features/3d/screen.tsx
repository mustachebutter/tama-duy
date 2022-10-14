import React, { useEffect } from "react";
import { GLView } from "expo-gl"
import { THREE, Renderer, loadObjAsync, loadTextureAsync } from "expo-three"

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
    Object3D,
    Vector3,
  } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Asset } from 'expo-asset'
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { resolveAsync } from 'expo-asset-utils';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

const onProgress = function ( xhr ) {

    if ( xhr.lengthComputable ) {

        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round( percentComplete ) + '% downloaded' );

    }

};

const onError = function(error) {
    console.error(error);
}

export const MainScreen = () => {    
    return null
    // return(
    //     <GLView
    //         style={{ flex: 1 }}
    //         onContextCreate={async gl => {
    //             const scene = new Scene();
    //             const camera = new PerspectiveCamera(90, gl.drawingBufferWidth/gl.drawingBufferHeight, 0.1, 1000);

    //             camera.position.z = 300;

    //             const renderer = new Renderer({ gl });
    //             renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    //             const light = new AmbientLight(0xffffff);
    //             scene.add(light);

    //             const spotLight = new SpotLight(0xffffff);
    //             spotLight.position.set(0, 1000, 900);
    //             spotLight.castShadow = true;
    //             spotLight.shadow.camera.near = 500;
    //             spotLight.shadow.camera.far = 4000;
    //             spotLight.shadow.camera.fov = 30;
    //             scene.add(spotLight);


    //             const geometry = new BoxGeometry(1, 1, 1);
    //             const material = new MeshBasicMaterial({
    //                 color: 'cyan',
    //             })
    //             // const cube = new Mesh(geometry, material);
    //             // scene.add(cube);


    //             let tv = new Object3D();

    //             const obj = await loadObjAsync({
    //                 asset: require('../assets/p4-tv/test/p4-tv.obj'),
    //                 mtlAsset: require('../assets/p4-tv/test/p4-tv.mtl'),
    //             })

    //             tv = obj;
    //             tv.rotateOnWorldAxis(new Vector3(0, 0, 1), -Math.PI / 8);
    //             tv.rotateOnWorldAxis(new Vector3(0, 1, 0), -Math.PI / 2);

    //             // scene.add(tv)

    //             let demonGirl = new Object3D()
    //             const obj2 = await loadObjAsync({
    //                 asset: require('../assets/flashlight/flashlight.obj'),
    //                 mtlAsset: require('../assets/flashlight/flashlight.mtl'),
    //             })
    //             console.log(obj2);
    //             demonGirl = obj2;
    //             demonGirl.position.set(0, -5, 290);
    //             scene.add(demonGirl);

    //             const obj4 = await loadFbxAsync({
    //                 asset: require('../assets/backpack/low_poly_bag_2.fbx'),
    //                 onAssetRequested: () => {}
    //             })
    //             const diffuse = await loadTextureAsync({ asset: require('../assets/backpack/1001_albedo.xjpg') });
    //             const ambientOcclusion = await loadTextureAsync({ asset: require('../assets/backpack/1001_AO.xjpg') });
    //             const metallic = await loadTextureAsync({ asset: require('../assets/backpack/1001_metallic.xjpg') });
    //             const normal = await loadTextureAsync({ asset: require('../assets/backpack/1001_normal.xpng') });
    //             const roughness = await loadTextureAsync({ asset: require('../assets/backpack/1001_roughness.xjpg') });

    //             const backpackMaterial = new MeshStandardMaterial({
    //                 map: diffuse,
    //                 aoMap: ambientOcclusion,
    //                 metalnessMap: metallic,
    //                 normalMap: normal,
    //                 roughnessMap: roughness
    //             })

    //             obj4?.traverse((child) => {
    //                 if(child instanceof THREE.Mesh) {
    //                     child.material = backpackMaterial;
    //                 }
    //             })
    //             obj4?.position.set(0, 0, -200);
    //             scene.add(obj4);

    //             const render = () => {
    //                 requestAnimationFrame(render);
    //                 tv.rotation.y += 0.01;
    //                 // tv.rotation.z += 0.02;
    //                 // tv.rotateOnWorldAxis(new Vector3(0, 1, 0), -(Math.PI / 2));
    //                 demonGirl.rotateOnWorldAxis(new Vector3(0, 0, 1), 0.01);
    //                 obj4?.rotateY(0.01);

    //                 renderer.render(scene, camera);

    //                 gl.endFrameEXP();
    //             };

    //             render();

    //         }} 
    //     />
    // )
}

async function loadFileAsync({ asset, funcName }) {
    if (!asset) {
      throw new Error(`ExpoTHREE.${funcName}: Cannot parse a null asset`);
    }
    return (await resolveAsync(asset)).localUri ?? null;
  }
  
  // newly added method 
  export async function loadFbxAsync({ asset, onAssetRequested }) {
    const uri = await loadFileAsync({
      asset,
      funcName: 'loadFbxAsync',
    });
    if (!uri) return;
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const arrayBuffer = decode(base64);
    const loader = new FBXLoader();
    return loader.parse(arrayBuffer, onAssetRequested);
  }
  
  // newly added method
  export async function loadGLTFAsync({ asset, onAssetRequested }) {
    const uri = await loadFileAsync({
      asset,
      funcName: 'loadGLTFAsync',
    });
    if (!uri) return;
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const arrayBuffer = decode(base64);
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.parse(
        arrayBuffer,
        onAssetRequested,
        result => {
          resolve(result);
        },
        err => {
          reject(err);
        },
      );
    });
  }