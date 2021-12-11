import {
    Button,
    Circle,
    VStack,
    HStack,
    IconButton,
    Text,
    Img,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useCookies } from 'react-cookie';
import { providers } from './Providers'
import ConnectionModal from './ConnectionModale'
const emoji = require('country-to-emoji-flag')

export default function githubProfile(token) {
    const [cookies, setCookie] = useCookies(['githubService']);
    const [config, setConfig]= useState({});
    const [user, setUser]= useState({});
    
    setConfig(axios.get('http://localhost:8080/widget/fetch', {
      data: {
        token: token,
        name: "GitHub Profile",
        serviceName: "GitHub"
      }
    }));
    
    setUser(axios.get('https://api.github.com/user', {
        data: {
          token: cookies.token
        }
    }));

    return (
      config.params.isEnabled ?
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Text>Username: {user.login}</Text>
          <Text>Email: {user.email}</Text>
          <Image src={user.avatar_url} 
            borderRadius='full'
            alt='Spotify Pfp'/>
          <Text>Description: {user.bio}</Text>
          <Link href={user.html_url} isExternal>
              Github page direct link <ExternalLinkIcon mx='2px' />
          </Link>
          <Text> Followers : {user.followers}</Text>
        </Box>
      : <div></div>
    )
}