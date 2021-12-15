import ServicePannel from '../components/ServicePannel'
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
    <SpotifyTrackEmbed songId="6Lvw6pbcXA4ugNMRQFlUaR" />,
    <SpotifyEmbed playlistId="37i9dQZF1DXcBWIGoYBM5M" />,
    <SpotifyPlaylists />,
    <spotifyProfile />,
    <githubProfile />,
    <YoutubeProfile />,
    <GmailSender />,
    <GithubStars repoUrl="ajnart/mynetflix" />,
    <GmailUnread />
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
        {widgets.map((widget, index) => {
          return <div key={index}>{widget}</div>
        })}
      </Wrap>
      <AddWidgetButton />
    </>
  )
}