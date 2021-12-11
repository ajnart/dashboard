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

export default function youtubeProfile(token) {
    const [cookies, setCookie] = useCookies(['youtubeService']);
    const [config, setConfig]= useState({});
    const [user, setUser]= useState({});
    
    setConfig(axios.get('http://localhost:8080/widget/fetch', {
      data: {
        token: token,
        name: "Youtube Profile",
        serviceName: "Youtube"
      }
    }));
    
    setUser(axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        data: {
          token: cookies.youtubeToken
        }
    }));
    
    return (
      config.params.isEnabled ?
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
          <Image src={user.picture} 
            borderRadius='full'
            alt='Youtube Pfp'/>
          {/* <Link href={user.external_urls.spotify} isExternal>
              Spotify page direct link <ExternalLinkIcon mx='2px' />
          </Link>
          <Text> Followers : {user.followers.total}</Text> */}
        </Box>
      : <div></div>
    );
}