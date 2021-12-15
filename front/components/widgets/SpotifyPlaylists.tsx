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
	useToast,
	AccordionItem,
	AccordionPanel,
	AccordionButton,
	AccordionIcon,
	Accordion
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
					fetchedData.items.map((item: any) => (
						<Accordion allowToggle>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box flex='1' textAlign='left'>
											{item.name}
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
									tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
									veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
									commodo consequat.
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					))
				}
				</UnorderedList> : <Text>No playlists found</Text>
			}
		</CardWrapper>
	)
}

export default SpotifyPlaylists;