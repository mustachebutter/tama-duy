import { Button, XStack } from "@my/ui"
import React from "react"
import { Platform } from "react-native"
import { useLink } from "solito/link"

export const Header = () => {
    const linkProps = useLink({
        href: '/user/nate',
      })
    
      const sceneLinkProps = useLink({
        href: '/3d'
      })
    
      const fiberSceneLinkProps = useLink({
        href: '/fiber'
      })

      const isWeb = Platform.OS === 'web'
    
    return(
        <XStack display={'flex'} f={1} pos={'absolute'} t={'$0'} p={'$5'}>
            <NavBarButton {...linkProps}>User</NavBarButton>
            {
                isWeb 
                ? (<NavBarButton {...fiberSceneLinkProps}>React-Three-Fiber</NavBarButton>)
                : (<NavBarButton {...sceneLinkProps}>Expo-Three</NavBarButton>)
            }
            <NavBarButton disabled>Blogs</NavBarButton>
        </XStack>
    )
}

const NavBarButton = ({ children, disabled = false, ...linkProps }) => {
  return (
    <Button 
      bc={'$yellow9'}
      ml={'$3'}
      mr={'$3'}
      miw={'$10'}
      maw={'$20'}
      color={'black'}
      hoverStyle={{ 
        backgroundColor: '$yellow10'
      }}
      disabled={disabled}
      {...linkProps}
    >
      {children}
    </Button>
  )
}