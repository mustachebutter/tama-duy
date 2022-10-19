import { Button, XStack } from "@my/ui"
import { usePlatform } from "app/features/hooks/usePlatform"
import React from "react"
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

      const formsScreenLinkProps = useLink({
        href: '/forms'
      })

      const { isWeb } = usePlatform()
    
    return(
        <XStack display={'flex'} flexWrap={'wrap'} p={'$0'} ai={'center'}>
            <NavBarButton {...linkProps}>User</NavBarButton>
            {
                isWeb 
                ? (<NavBarButton {...fiberScreenLinkProps}>React-Three-Fiber</NavBarButton>)
                : (<NavBarButton {...screenLinkProps}>Expo-Three</NavBarButton>)
            }
            <NavBarButton {...blogsScreenLinkProps}>Blogs</NavBarButton>
            <NavBarButton {...formsScreenLinkProps}>Forms</NavBarButton>
        </XStack>
    )
}

export const NavBarButton = ({ children, disabled = false, ...linkProps }) => {
  return (
    <Button 
      bc={'$yellow9'}
      ml={'$3'}
      mr={'$3'}
      mb={'$3'}
      miw={'$11'}
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