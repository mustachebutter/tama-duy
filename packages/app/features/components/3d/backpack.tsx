import { useFrame } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import { useFBX, useTexture } from '@react-three/drei'
import { Loader } from "../loader";
import { Mesh, MeshStandardMaterial } from "three";

const domain = 'https://d3ahhox6lmapdc.cloudfront.net/models/backpack'
type ModelProps = {
    shouldSpin: boolean
}
export const Backpack = ({ shouldSpin = false }: ModelProps) => {
    const mesh = useRef(null)

    const fbx = useFBX(`${domain}/low_poly_bag_2.fbx`)
    const textureProps = useTexture({
        map: `${domain}/1001_albedo.jpg`,
        aoMap: `${domain}/1001_AO.xjpg`,
        metalnessMap: `${domain}/1001_metallic.xjpg`,
        normalMap: `${domain}/1001_normal.xpng`,
        roughnessMap: `${domain}/1001_roughness.xjpg`,
    })
    
    fbx.traverse((child) => {
        if(child instanceof Mesh) {
            child.material = new MeshStandardMaterial(textureProps)
        }
    })

    useFrame((state, delta) => { 
        shouldSpin && (mesh.current.rotation.y += 0.01)
    })

    console.log(fbx);

    return (
        <Suspense fallback={<Loader />}>
            <ambientLight />
            <mesh position={[0, 0, -900]} scale={[1, 1, 1]}>
                <primitive ref={mesh} object={fbx} />
            </mesh>
        </Suspense>
    )
}