import ServicePannel from './ServicePannel'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { BiLogOut } from 'react-icons/bi'
import {
	Button, IconButton, useToast, Wrap, Menu,
	MenuButton,
	MenuList,
	useColorMode,
	useColorModeValue,
	Box,
	Flex,
	Text,
	Stack,
	MenuItem,
	Link
} from "@chakra-ui/react";
import SpotifyEmbed from './widgets/SpotifyEmbed'
import SpotifyTrackEmbed from './widgets/SpotifyTrackEmbed';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import GithubStars from './widgets/GithubStars';
import GmailSender from './widgets/GmailSender';
import GmailUnread from './widgets/GmailUnread';
import SpotifyPlaylists from './widgets/SpotifyPlaylists';
import AddWidgetButton from './AddWidgetButton';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import spotifyProfile from './widgets/SpotifyProfile';
import githubProfile from './widgets/GithubProfile';
import YoutubeProfile from './widgets/YoutubeProfile';

export default function Header()
{
	const [cookies, setCookie, removeCookie] = useCookies(['name']);
	const { colorMode, toggleColorMode } = useColorMode();
	return (<Box p={5} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
		<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
			<Text
				bgGradient='linear(to-l, #7928CA, #FF0080)'
				bgClip='text'
				fontSize='6xl'
				fontWeight='extrabold'
			>
				Dashboard
			</Text>
			<Flex alignItems={'center'}>
				<Stack direction={'row'} spacing={7}></Stack>
				<Button mr="4" onClick={toggleColorMode}>
					{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
				</Button>
				<Link href='/login/'>
					<Button mr="4" onClick={(e) => {
						removeCookie('user');
					}}>
						{<BiLogOut />}
					</Button>
				</Link>
			</Flex>
		</Flex>
	</Box>)
}