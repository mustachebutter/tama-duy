import { H1, H3, H4, H5, Paragraph, ScrollView, YStack } from "@my/ui"
import React from "react"
import { createParam } from "solito"
import { usePost } from "../hooks/usePosts"

const { useParam } = createParam<{id: string}>()

export const BlogDetailScreen = () => {
    const [id] = useParam('id')
    const data = usePost(id)
    console.log('id', id)
    console.log('detail', data)

    return (
        data && (
            <ScrollView>
                <YStack m={'$4'}>
                    <H1 textAlign={'center'}>{data.title}</H1>
                    <Paragraph>{data.description}</Paragraph>
                    <YStack>
                        <H3>Comments: </H3>
                        {
                            data.comments.map(c => {
                                return (
                                    <YStack>
                                        <H5>{c.title}</H5>
                                        <Paragraph>
                                            {c.description}
                                        </Paragraph>
                                    </YStack>
                                )
                            })
                        }
                </YStack>
            </YStack>

            </ScrollView>
        )
    )
}