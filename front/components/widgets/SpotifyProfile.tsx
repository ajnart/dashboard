import {
    Box,
	Image,
	Link,
    Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import axios from 'axios'
const emoji = require('country-to-emoji-flag')

export default function spotifyProfile(token) {
    const [cookies, setCookie] = useCookies(['spotifyService']);
    // const [config, setConfig]= useState({});
    const [user, setUser] : any | undefined = useState();
    

    // setConfig(axios.get('http://localhost:8080/widget/fetch', {
    //   data: {
    //     token: token,
    //     name: "Spotify Profile",
    //     serviceName: "Spotify"
    //   }
    // }));
    
    if (cookies.spotifyService.token) {
      useEffect(() => {
        console.log(cookies.spotifyService.token);
        async function fetchData() {
          try {
            const res = await axios.get(`https://api.spotify.com/v1/me`, {
              headers: {
                Authorization: `Bearer ${cookies.spotifyService.token}`,
              }
            });
            setUser(res.data);
          } catch (err) {
            console.log(err);
          }
        }
        fetchData();
      }, []);
      return (
        // config.params.isEnabled ?
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Text>Username: {emoji(user.country) + user.display_name}</Text>
            <Text>Email: {user.email}</Text>
            <Image src={user.images.url} 
              borderRadius='full'
              alt='Spotify Pfp'/>
            <Link href={user.external_urls.spotify} isExternal>
                Spotify page direct link <ExternalLinkIcon mx='2px' />
            </Link>
            <Text> Followers : {user.followers.total}</Text>
          </Box>
        // : <div></div>
      )
  } else {
    return (
      <div>
        <Text> You need to connect to Spotify to display the widget</Text>
      </div>
    );
  }
}