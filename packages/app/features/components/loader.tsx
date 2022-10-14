import { Progress, YStack } from "@my/ui"
import { Html, useProgress } from "@react-three/drei"

export const Loader = () => {
    const { progress } = useProgress()
    return (
        <Html center>
            <YStack>
                {progress}% loaded
                <Progress value={progress}/>
            </YStack>
        </Html>
    )
}