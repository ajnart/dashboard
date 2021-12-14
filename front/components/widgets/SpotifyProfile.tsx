import {
    Box,
	Image,
	Link,
    Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import axios from 'axios'
import CardWrapper from '../CardWrapper'
import checkCookie from '../../tools/checkCookie'

export default function spotifyProfile() {
    const [user, setUser] : any | undefined = useState();
	const cookies = checkCookie("spotifyService", "Spotify");
	if (cookies == null)
		return null;
	useEffect(() => {
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
	<CardWrapper name=" Spotify Profile">
		{user ?
		<>
        <Text>Nationality and username: {user.flag_country + ' ' + user.display_name}</Text>
        <Text>Email: {user.email}</Text>
        {user.images.url ? <Image src={user.images.url} 
          borderRadius='full'
          alt='Spotify Pfp'/> : <Text> Couldn't load profile picture</Text>}
        <Link href={user.external_urls.spotify} isExternal>
            Spotify page direct link <ExternalLinkIcon mx='2px' />
        </Link>
        <Text> Followers : {user.followers.total}</Text> 
		</>: null}
	</CardWrapper>
  )
}