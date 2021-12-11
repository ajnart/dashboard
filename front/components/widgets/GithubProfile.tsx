import {
  Box,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import axios from 'axios'
const emoji = require('country-to-emoji-flag')

export default function githubProfile(token) {
  const [cookies, setCookie] = useCookies(['githubService']);
  // const [config, setConfig]= useState({});
  const [user, setUser]: any | undefined = useState();
  
  // setConfig(axios.get('http://localhost:8080/widget/fetch', {
  //   data: {
  //     token: token,
  //     name: "GitHub Profile",
  //     serviceName: "GitHub"
  //   }
  // }));
  if (cookies.githubService.token) {
    useEffect(() => {
      console.log(cookies.githubService.token);
      async function fetchData() {
        try {
          const res = await axios.get(`https://api.github.com/user`, {
            headers: {
              Authorization: `Bearer ${cookies.githubService.token}`,
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
          <Text>Username: {user.login}</Text>
          <Text>Email: {user.email}</Text>
          <Image src={user.avatar_url} 
            borderRadius='full'
            alt='Github Pfp'/>
          <Text>Description: {user.bio}</Text>
          <Link href={user.html_url} isExternal>
              Github page direct link <ExternalLinkIcon mx='2px' />
          </Link>
          <Text> Followers : {user.followers}</Text>
        </Box>
      // : <div></div>
    );
  } else {
    return (
      <div>
        <Text> You need to connect to Github to display the widget</Text>
      </div>
    );
  }
}