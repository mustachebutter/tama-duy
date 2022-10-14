import React, { Suspense, useRef, useState } from "react";
import { useFrame, Canvas } from "@react-three/fiber"
import { Backpack } from "../components/3d/backpack"
import { Image } from "tamagui";
import { View, Dimensions } from "react-native";
import { Button, Select, Slider, YGroup, YStack } from "@my/ui";
import { Loader } from "../components/loader";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
  
export const FiberScreen = () => {
  const windowHeight = Dimensions.get('window').height
  const windowWidth = Dimensions.get('window').width
  console.log(windowWidth, windowHeight)
  const [shouldSpin, setShouldSpin] = useState(false)

  return (
    <YStack f={1} jc={'center'} ai={'center'} p={'$4'} fullscreen >
      <View style={{ position: 'absolute' }}>
        <Image src={'https://d3ahhox6lmapdc.cloudfront.net/images/ffviir-zoom-park.jpg'} width={1920} height={1080} />
      </View>
      <View style={{ width: 1920, height: 1080 }}>
        <Canvas>
          <Suspense fallback={<Loader />}>
            <ambientLight color={0x003300} intensity={10}/>
            <Backpack shouldSpin={shouldSpin}/>
          </Suspense>
        </Canvas>
      </View>
      <View style={{ position: 'absolute', top: 0, right: 0 }}>
        <YStack pt={'$4'} pr={'$4'}>
          <Button  onClick={() => setShouldSpin(!shouldSpin)}>Spin the model!!!</Button>
          <AmbientColorSelector />
          <ScaleSlider />
        </YStack>
      </View>
    </YStack>
  )
}

export const AmbientColorSelector = () => {
  return (
      <Select>
          
      </Select>
  )
}

export const ScaleSlider = () => {
  return(
    <Slider defaultValue={[50]} max={100} step={1} >
      <Slider.Track>
        <Slider.TrackActive />
      </Slider.Track>
      <Slider.Thumb bordered circular elevate index={0} />
    </Slider>
  )
}