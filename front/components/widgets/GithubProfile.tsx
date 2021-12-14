import {
  Box,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import CardWrapper from '../CardWrapper'
import checkCookie from '../../tools/checkCookie'
import axios from 'axios'
const emoji = require('country-to-emoji-flag')

export default function githubProfile(token) {
  const [user, setUser]: any | undefined = useState();
  const cookies = checkCookie("GithubService", "Github");
	if (cookies == null)
		return null;

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
    <CardWrapper name="Github Profile">
      { user ? 
        <>
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
        </>
        : null}
    </CardWrapper>
  );
}