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
	useDisclosure,
	Box,
	Link,
	Image
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ExternalLinkIcon } from '@chakra-ui/icons';

function SpotifyProfile(props: any) {
	const [cookies, setCookie] = useCookies(['spotifyService']);
	const [user, setUser] = useState({});
	useEffect(() => {
		console.log(cookies.spotifyService.token);
		async function fetchData() {
			try {
				const res = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/labels/INBOX`, {
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
		<Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
			<Text>Username: {user["display_name"]}</Text>
			<Text>Email: {user["email"]}</Text>
			{/* <Image src={user["images"][0]["url"]} 
          borderRadius='full'
          alt='Spotify Pfp'/> */}
			<Link href={user["external_urls"]} isExternal>
				Spotify page direct link <ExternalLinkIcon mx='2px' />
			</Link>
			<Text> Followers : {user["followers"]}</Text>
		</Box>
	)
}

export default SpotifyProfile;