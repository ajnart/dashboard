import ServicePannel from '../components/ServicePannel';
import DisplayWidgets from '../tools/DisplayWidgets';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { BiLogOut} from 'react-icons/bi'
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
import SpotifyEmbed from '../components/widgets/SpotifyEmbed'
import SpotifyTrackEmbed from '../components/widgets/SpotifyTrackEmbed';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import GithubStars from '../components/widgets/GithubStars';
import GmailSender from '../components/widgets/GmailSender';
import GmailUnread from '../components/widgets/GmailUnread';
import SpotifyPlaylists from '../components/widgets/SpotifyPlaylists';
import AddWidgetButton from '../components/AddWidgetButton';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import spotifyProfile from '../components/widgets/SpotifyProfile';
import githubProfile from '../components/widgets/GithubProfile';
import YoutubeProfile from '../components/widgets/YoutubeProfile';

export default function Home() {

  const widgets = [
    <SpotifyTrackEmbed songId="6eHKoMFFoMJ4cWwPscl382" />,
    <SpotifyTrackEmbed songId="7H3bV5VsjmGfXdZHRqxH89" />,
    <SpotifyEmbed playlistId="71q50lo9uXiLFGr13ztQaw" />,
    <SpotifyPlaylists />,
    <spotifyProfile />,
    <githubProfile />,
    <YoutubeProfile />,
    <GmailSender />,
    <GithubStars rounded={'md'} position="fixed" right={5} bottom={20} repoUrl="ajnart/mynetflix" />,
    <GmailUnread rounded={'md'} position="fixed" right={5} bottom={5}/>
  ]
  const router = useRouter()
  const toast = useToast()
  const [widets, setWidgets] = useState(widgets)
  const [service, setService] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(process.env.GOOGLE_ID)
  useEffect(() => {
    if (!cookies["user"] /* check cookie expiration */) {
      toast({
        title: "Please log in",
        status: "error",
        duration: 9000,
        isClosable: true
      });
      router.push("/login");
    }
  }, []);

  return !cookies["user"] ? <div></div> : (
    <>
      <ServicePannel service={service} setService={setService} />
      <Wrap justify={'center'} spacing={5}>
      <DisplayWidgets token = {cookies.user.token}  />
      </Wrap>
      <AddWidgetButton />
    </>
  )
}
