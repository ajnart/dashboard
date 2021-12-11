import {
  Box,
  Link,
  Image,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { ExternalLinkIcon } from '@chakra-ui/icons'
const emoji = require('country-to-emoji-flag')

export default function youtubeProfile(token) {
  const [cookies, setCookie] = useCookies(['gmailService']);
  // const [config, setConfig]= useState({});
  const [user, setUser] : any | undefined = useState();
  
  // setConfig(axios.get('http://localhost:8080/widget/fetch', {
  //   data: {
  //     token: token,
  //     name: "Youtube Profile",
  //     serviceName: "Youtube"
  //   }
  // }));
  if (cookies.gmailService.token) {
    useEffect(() => {
      console.log(cookies.gmailService.token);
      async function fetchData() {
        try {
          const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json`, {
            headers: {
              Authorization: `Bearer ${cookies.gmailService.token}`,
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
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
          <Image src={user.picture} 
            borderRadius='full'
            alt='Youtube Pfp'/>
          <Link href={user.external_urls.spotify} isExternal>
              Spotify page direct link <ExternalLinkIcon mx='2px' />
          </Link>
          <Text> Followers : {user.followers.total}</Text>
        </Box>
      // : <div></div>
    );
  } else {
    return (
      <div>
        <Text> You need to connect to Gmail or Youtube to display the widget</Text>
      </div>
    );
  }
}