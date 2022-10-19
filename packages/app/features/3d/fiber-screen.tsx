import React, { Suspense, useRef, useState } from "react";
import { useFrame, Canvas } from "@react-three/fiber"
import { Backpack } from "../components/3d/backpack"
import { Image } from "tamagui";
import { Button, Label, Select, Slider, XStack, YGroup, YStack } from "@my/ui";
import { Loader } from "../components/loader";
import { Check } from "@tamagui/feather-icons";
import { ambientColors } from "../constants/ambient-color";
  
export const FiberScreen = () => {
  const [shouldSpin, setShouldSpin] = useState(false)
  const [scale, setScale] = useState(1)
  const [color, setColor] = useState(0x003300)
  const handleScaleValueChange = (newVal: number[]) => {
    newVal.length > 0 && setScale(newVal[0])
  }

  const handleSelectValueChange = (newVal) => {
    newVal && setColor(newVal)
  }

  const objectScale = scale ? [scale, scale, scale] : [1, 1, 1]


  return (
    <YStack f={1} jc={'center'} ai={'center'} p={'$4'} fullscreen >
      <YStack pos={'absolute'} zIndex={-1000}>
        <Image src={'https://d3ahhox6lmapdc.cloudfront.net/images/ffviir-zoom-park.jpg'} width={1920} height={1080} />
      </YStack>
      <YStack width={1920} height={1080}>
        <Canvas>
          <Suspense fallback={<Loader />}>
            <ambientLight color={color} intensity={10}/>
            <Backpack shouldSpin={shouldSpin} scale={objectScale}/>
          </Suspense>
        </Canvas>
      </YStack>
      <YStack pos={'absolute'} t={'$0'} r={'$0'} pt={'$4'} pr={'$10'} space={'$2'}>
        <Button  onClick={() => setShouldSpin(!shouldSpin)}>Spin the model!!!</Button>

        <Label>Object Scale</Label>
        <Slider defaultValue={[1]} min={1} max={2} step={.1} onValueChange={handleScaleValueChange} >
          <Slider.Track>
            <Slider.TrackActive />
          </Slider.Track>
          <Slider.Thumb size={'$3'} bordered circular elevate index={0} />
        </Slider>

        <Label>Ambient Light Color</Label>
        <Select onValueChange={handleSelectValueChange}>
            <Select.Trigger>
                <Select.Value placeholder="Choose a light color" />
            </Select.Trigger>

            <Select.Sheet modal dismissOnSnapToBottom>
                <Select.Sheet.Frame>
                    <Select.SheetContents />
                </Select.Sheet.Frame>
                <Select.Sheet.Overlay />
            </Select.Sheet>

            <Select.Content>
                <Select.Viewport minWidth={200}>
                    <Select.Group>
                        {ambientColors.map((p, i) => {
                            return (
                                <Select.Item index={i} key={p.name} value={p.value}>
                                    <Select.ItemText>{p.name}</Select.ItemText>
                                    <Select.ItemIndicator ml={'auto'}>
                                        <Check size={16} />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            )
                        })}
                    </Select.Group>
                </Select.Viewport>
            </Select.Content>
        </Select>    
      </YStack>
    </YStack>
  )
}

export const AmbientColorSelector = () => {
  return (
      <Select>
          
      </Select>
  )
}