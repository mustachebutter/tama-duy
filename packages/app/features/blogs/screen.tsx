import { Avatar, Button, Card, H1, H2, Paragraph, ScrollView, Text, XGroup, XStack, YStack } from "@my/ui"
import { Image } from "tamagui";
import { Book, ChevronLeft, ChevronRight } from "@tamagui/feather-icons"
import React, { useState } from "react"
import { usePostLink, usePosts } from "../hooks/usePosts"
import { backgroundIndex } from "../constants/background-index";
import { useLink } from "solito/link";

export const BlogsScreen = () => {
    const [page, setPage] = useState(1)
    const limit = 5

    const [postLinkProps, setPostLinkProps] = useState(null)
    
    const data = usePosts(page, limit)

    const handleNext = () => {
        data.length == limit && setPage(page + 1)
    }

    const handlePrev = () => {
        page > 1 && setPage(page - 1)
    }

    return (
        <ScrollView>
            <YStack m={'$4'}>
                <H1><Book /> Blogs</H1>
                {
                    data ? data.map((post, i) => (
                        <Card key={i} size={'$4'} elevate bordered m={'$4'}>
                            <Card.Header padded>
                                <H2>{post.title}</H2>
                                <YStack>
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
                                </YStack>
                            </Card.Header>
                            <Card.Footer>
                                <DetailButton id={post.id}/>
                                {/* Share functionality */}
                            </Card.Footer>
                            <YStack m={'$4'} zIndex={3}>
                                <Paragraph>{post.description}</Paragraph>
                            </YStack>
                            <Card.Background>
                                <Image pos={'absolute'} zIndex={-100} opacity={.6} src={backgroundIndex[i % 4]} width={1920} height={1080} />
                            </Card.Background>
                        </Card>
                    )) : <Paragraph>No posts are available right now :(</Paragraph>
                }
                
                <XStack display={'flex'} f={1} alignItems={'center'} justifyContent={'space-evenly'}>
                    <Button 
                        miw={'$12'}
                        icon={ChevronLeft}
                        onClick={handlePrev}
                    >
                        Previous
                    </Button>
                    <Button 
                        miw={'$12'}
                        iconAfter={ChevronRight}
                        onClick={handleNext}
                        alignSelf={'flex-end'}
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
        <Button iconAfter={ChevronRight} {...linkProps}>
            Read More
        </Button>
    )
}