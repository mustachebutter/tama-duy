import { Anchor, Button, H1, Paragraph, Separator, Sheet, XStack, YStack } from '@my/ui'
import { Slider } from 'tamagui'
import { ChevronDown, ChevronUp } from '@tamagui/feather-icons'
import React, { useState } from 'react'
import { useLink } from 'solito/link'
import * as Device from 'expo-device'
import { Header } from '../components/home/header'

export function HomeScreen() {

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <Header />
      <YStack space="$4" maw={600}>
        <H1 ta="center">Welcome to Tama-DUY (TamaGUI).</H1>
        <Paragraph ta="center">
          This is the main navigation hub for all the screens in this app! Click any of the buttons from above to start.
        </Paragraph>
        <Separator />
      </YStack>
      <Paragraph ta="center">
        Check out
        {' '}
        <Anchor href="https://github.com/tamagui/tamagui" target="_blank" rel="noreferrer">
          TamaGUI
        </Anchor>
        {' and '}
        <Anchor href="https://github.com/mustachebutter/tama-duy" target="_blank" rel="noreferrer">
          this app.
        </Anchor>
      </Paragraph>
      <SheetDemo />
    </YStack>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
