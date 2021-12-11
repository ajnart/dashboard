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
	Image,
	UnorderedList,
	ListItem,
	toast,
	useToast
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import GithubStars from './GithubStars';
import CardWrapper from '../CardWrapper';
import checkCookie from '../../tools/checkCookie';

function SpotifyPlaylists(props: any) {
	const [fetchedData, setData] = useState({ items: [] });
	const toast = useToast()
	const cookies = checkCookie("spotifyService", "Spotify");
	if (cookies == null)
		return null;
	useEffect(() => {
		console.log(cookies.spotifyService.token);
		async function fetchData() {
			try {
				const res = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
					headers: {
						Authorization: `Bearer ${cookies.spotifyService.token}`,
					}
				});
				setData(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);

	return (
		<CardWrapper name="Public spotify playlists" {...props}>
			{fetchedData.items.length > 0 ?
				<UnorderedList>{
					fetchedData.items.map((item: any) => (<ListItem key={item.name}>{item.name}</ListItem>))
				}
				</UnorderedList> : <Text>No playlists found</Text>
			}
		</CardWrapper>
	)
}

export default SpotifyPlaylists;