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
import CardWrapper from '../CardWrapper'
import checkCookie from '../../tools/checkCookie'

export default function YoutubeProfile(token) {
  const [user, setUser] : any | undefined = useState();
  const cookies = checkCookie("gmailService", "Gmail");
	if (cookies == null)
		return null;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json`, {
          headers: {
            Authorization: `Bearer ${cookies.youtubeService.token}`,
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
    <CardWrapper name="Google Profile">
        { user ?
        <> 
        <Text>Name and ISO 3166:{user.locale + ' ' + user.name}</Text>
        <Text>Displayed Name: {user.given_name}</Text>
        <Text>ID Google: {user.id}</Text>
        <Text>Email: {user.email}</Text>
        <Image src={user.picture} 
        borderRadius='full'
        alt='Youtube and GMail Pfp'/>
        </>
        : <Text>Couldn't load your Google Profile</Text>}
        
    </CardWrapper>
  );
}