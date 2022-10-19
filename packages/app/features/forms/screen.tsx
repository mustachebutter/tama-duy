import { Button, H1, Input, Label, Paragraph, ScrollView, Select, Separator, Slider, Switch, TextArea, XStack, YStack } from "@my/ui"
import { Check, Clipboard } from "@tamagui/feather-icons"
// Lucide Icons doesn't work on mobile for now
// import { ClipboardList } from "@tamagui/lucide-icons"
import React, { useEffect, useState } from "react"
import { publishers } from "../constants/publisher"
import { usePlatform } from "../hooks/usePlatform"

export const FormScreen = () => {
    const [formValues, setFormValues] = useState()
    const [shouldShowResults, setShouldShowResults] = useState(false)

    const handleSubmit = (values) => {
        setFormValues(values)
        setShouldShowResults(true)
    }

    return (
        <ScrollView>
            <YStack w={300} $gtSm={{ width: 500 }} m={'$4'}>
                <H1><Clipboard /> Forms</H1>
                {
                    !shouldShowResults 
                        ? (<GamesForm onSubmit={handleSubmit}/>)
                        : (
                            <YStack 
                                borderColor={'black'}
                                $gtSm={{
                                    borderWidth: '1px',
                                    borderRadius: '10px',
                                    backgroundColor: '$yellow10',
                                    padding: '$4',
                                }}
                                space={'$3'}
                            >
                                <Paragraph color={'black'}>
                                    {`
                                        {
                                            name: ${formValues?.name ?? 'N/A'},
                                            description: ${formValues?.desc ?? 'N/A'},
                                            price: ${formValues?.price ?? '00.00'},
                                            publisher: ${formValues?.publisher ?? 'N/A'},
                                            isBundle: ${formValues?.isBundle ?? 'false'},
                                        }
                                    `}
                                </Paragraph>
                                <Button onClick={() => setShouldShowResults(false)}>Go back to form</Button>
                            </YStack>
                        )
                }
            </YStack>
        </ScrollView>
    )
}

const GamesForm = ({ onSubmit }) => {
    const [data, setData] = useState('0')
    const [formValues, setFormValues] = useState({})
    const { isWeb } = usePlatform()
    useEffect(() => {
        // onSubmit(formValues)
    }, [formValues])

    const handlePriceValueChange = (newVal: number[]) => {
        if (newVal.length > 0) {
            setData(newVal[0])
            setFormValues(value => ({
                ...value,
                price: newVal[0]
            }))
        }
    }

    const handleSelectValueChange = (newVal) => {
        setFormValues(value => ({
            ...value,
            publisher: newVal
        }))
    }

    return (
        <YStack space={'$2'} m={'$4'}>
            <Label htmlFor={'name'}>Title</Label>
            <Input 
                id={'name'} 
                f={1} 
                size={'$4'} 
                placeholder={'Title of the game'} 
                onChangeText={(val) => {
                    setFormValues(value => ({
                        ...value,
                        name: val
                    }))
                }}
            />

            <Label htmlFor={'desc'}>Description</Label>
            <TextArea 
                id={'desc'} 
                f={1} 
                size={'$4'} 
                placeholder={'Description'}
                onChangeText={(val) => {
                    setFormValues(value => ({
                        ...value,
                        desc: val
                    }))
                }}
            ></TextArea>
            
            <Label htmlFor={'priceSlider'}>Price Slider</Label>
            <Slider defaultValue={[10]} min={0} max={500} step={1} onValueChange={handlePriceValueChange}>
                <Slider.Track>
                    <Slider.TrackActive />
                </Slider.Track>
                <Slider.Thumb size={"$2"} bordered circular elevate index={0}/>
            </Slider>
            <Paragraph mt={'$3'}>
                {`$${data}.00`}
            </Paragraph>

            <Label htmlFor={'publisherSelect'}>Publisher</Label>
            {
                isWeb
                ? (
                    <Select id={'publisherSelect'} onValueChange={handleSelectValueChange}>
                        <Select.Trigger>
                            <Select.Value placeholder="Choose a publisher" />
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
                                    {publishers.map((p, i) => {
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
                )
                : <Input id={'publisherSelect'} placeholder={'Enter publisher name'} onChangeText={handleSelectValueChange}/>
            }

            <XStack space={'$4'} ai={'center'}>
                <Label size={'$3'} htmlFor={'bundleSwitch'}>
                    Is a bundle?
                </Label>
                <Switch 
                    id={'bundleSwitch'} 
                    size={'$3'} 
                    onCheckedChange={(isBundle) => {
                        setFormValues(value => ({
                            ...value,
                            isBundle
                        }))
                    }}
                >
                    <Switch.Thumb animation={'quick'} size={'$3'} />
                </Switch>
            </XStack>
            <Button 
                    size={'$3'} 
                    bc={'yellow'} 
                    color={'black'}
                    mb={'$10'}
                    ml={'$2'}
                    $gtSm={{
                        marginTop: '$0',
                        marginLeft: '$0'
                    }}
                    hoverStyle={{
                        bc: '$yellow9'
                    }}
                    onClick={() => onSubmit(formValues)}
                >
                    Submit
            </Button>
        </YStack>
    )
}