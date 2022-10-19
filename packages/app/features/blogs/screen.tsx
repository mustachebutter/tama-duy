import { Avatar, Button, Card, H1, H2, Label, Paragraph, Popover, ScrollView, XStack, YStack } from "@my/ui"
import { Image, Spinner } from "tamagui";
import { Book, ChevronLeft, ChevronRight, MessageSquare, Share2 } from "@tamagui/feather-icons"
import React, { useEffect, useRef, useState } from "react"
import { usePosts } from "../hooks/usePosts"
import { backgroundIndex } from "../constants/background-index";
import { useLink } from "solito/link";

export const BlogsScreen = () => {
    const scrollRef = useRef()
    const [page, setPage] = useState(1)
    const limit = 5
    
    const data = usePosts(page, limit)
    const shouldDisablePrevBtn = page <= 1
    const shouldDisableNextBtn = data?.length != limit

    const handleNext = () => {
        setPage(page + 1)
        scrollToTop()    
    }

    const handlePrev = () => {
        setPage(page - 1)
        scrollToTop()    
    }

    const scrollToTop = () => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true
        })
    }

    return (
        <ScrollView ref={scrollRef}>
            <YStack m={'$4'}>
                <H1><Book /> Blogs</H1>
                {
                    data ? data.map((post, i) => (
                        <XStack m={'$4'} alignItems={'flex-end'}>
                            <Card key={i} size={'$4'} elevate bordered f={1}>
                                <Card.Header padded>
                                    <H2>{post.title}</H2>
                                    <XStack
                                        flexDirection={'column'}
                                        $gtSm={{
                                            flexDirection: 'row'
                                        }}
                                    >
                                        {
                                            post.authors.map((a, aIndex) => (
                                                <XStack key={aIndex} pl={'$2'}>
                                                    <Avatar circular size={'$2'} mr={'$2'}>
                                                        <Avatar.Image src={'https://placekitten.com/200/300'}/>
                                                    </Avatar>
                                                    <Paragraph size={'$2'} fontStyle={'italic'}>{`${a.name}`}</Paragraph>
                                                </XStack>
                                            ))
                                        }
                                    </XStack>
                                </Card.Header>
                                <YStack m={'$4'} zIndex={3}>
                                    <Paragraph>{post.description}</Paragraph>
                                </YStack>
                                <Card.Footer>
                                    <XStack>
                                        <Paragraph pr={'$2'}>{`${post.comments.length} `}</Paragraph>
                                        <MessageSquare />
                                    </XStack>
                                    {/* Share functionality */}
                                </Card.Footer>
                                <Card.Background>
                                    <Image pos={'absolute'} zIndex={-100} opacity={.6} src={backgroundIndex[i % 4]} width={1920} height={1080} />
                                </Card.Background>
                            </Card>
                            <DetailButton id={1}/>
                        </XStack>
                    )) : <Spinner size={'large'} color={'$yellow9'} />
                }
                
                <XStack display={'flex'} f={1} alignItems={'center'} justifyContent={'space-evenly'}>
                    <Button 
                        miw={'$12'}
                        icon={ChevronLeft}
                        onClick={handlePrev}
                        disabled={shouldDisablePrevBtn}
                    >
                        Previous
                    </Button>
                    <Paragraph>- {page} -</Paragraph>
                    <Button 
                        miw={'$12'}
                        iconAfter={ChevronRight}
                        onClick={handleNext}
                        alignSelf={'flex-end'}
                        disabled={shouldDisableNextBtn}
                    >
                        Next
                    </Button>
                </XStack>
            </YStack>
        </ScrollView>
    )
}

const DetailButton = ({ id }) => {
    const linkProps = useLink({
        href: `/blogs/${id}`
    })

    return (
        <XStack
            pos={'absolute'}
            zIndex={100}
            right={'$2'}
            pb={'$4'}
            mr={'$1'}
            $gtSm={{
                right: '$5',
                marginRight: '$5',
            }}
            space={'$2'}
        >
            <ShareButton />
            <Button
                bc={'yellow'} 
                color={'black'}
                iconAfter={<ChevronRight color={'black'}/>} 
                hoverStyle={{
                    bc: '$yellow9'
                }}
                {...linkProps}
            >
                Read More
            </Button>
        </XStack>
    )
}

const ShareButton = () => {
    return (
        <Popover sheetBreakpoint={'lg'} placement={'left'}>
            <Popover.Trigger asChild>
                <Button icon={Share2}/>
            </Popover.Trigger>

            <Popover.Sheet modal dismissOnSnapToBottom>
                <Popover.Sheet.Overlay />
                <Popover.Sheet.Frame padding={'$4'}>
                    <Popover.SheetContents />
                </Popover.Sheet.Frame>
            </Popover.Sheet>

            <Popover.Content
                bw={1}
                boc={'$borderColor'}
                enterStyle={{ x:0, y: -10, o: 0 }}
                exitStyle={{ x:0, y: -10, o: 0 }}
                x={0}
                y={0}
                o={1}
                animation={'bouncy'}
                elevate
            >
                <Popover.Arrow bw={1} boc="$borderColor" />
                <XStack space={'$3'}>
                    <Label size={'$3'} htmlFor={'link'}>
                        URL
                    </Label>
                    <Button size={'$3'} id="link">
                        https://tactable.io
                    </Button>
                </XStack>
            </Popover.Content>
        </Popover>
    )
}