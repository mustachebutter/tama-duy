import { Button, XStack } from "@my/ui"
import React from "react"
import { Platform } from "react-native"
import { useLink } from "solito/link"

export const Header = () => {
    const linkProps = useLink({
        href: '/user/nate',
      })
    
      const screenLinkProps = useLink({
        href: '/3d'
      })
    
      const fiberScreenLinkProps = useLink({
        href: '/fiber'
      })

      const blogsScreenLinkProps = useLink({
        href: '/blogs'
      })

      const isWeb = Platform.OS === 'web'
    
    return(
        <XStack display={'flex'} f={1} pos={'absolute'} t={'$0'} p={'$5'}>
            <NavBarButton {...linkProps}>User</NavBarButton>
            {
                isWeb 
                ? (<NavBarButton {...fiberScreenLinkProps}>React-Three-Fiber</NavBarButton>)
                : (<NavBarButton {...screenLinkProps}>Expo-Three</NavBarButton>)
            }
            <NavBarButton {...blogsScreenLinkProps}>Blogs</NavBarButton>
        </XStack>
    )
}

export const NavBarButton = ({ children, disabled = false, ...linkProps }) => {
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