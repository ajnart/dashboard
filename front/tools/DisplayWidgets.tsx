import servicesFetch from "./FetchUpdateTools";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import GithubProfile from "../components/widgets/GithubProfile";
import GithubStars from "../components/widgets/GithubStars";
import GmailUnread from "../components/widgets/GmailUnread";
import GmailSender from "../components/widgets/GmailSender";
import SpotifyEmbed from "../components/widgets/SpotifyEmbed";
import SpotifyPlaylists from "../components/widgets/SpotifyPlaylists";
import SpotifyProfile from "../components/widgets/SpotifyProfile";
import SpotifyTrackEmbed from "../components/widgets/SpotifyTrackEmbed";
import YoutubeProfile from "../components/widgets/YoutubeProfile";

function NameToWidgets(name :string, params :any, index: string)
{
    if (params.isEnable || 1) {
        switch (name.substr(0, name.indexOf('_'))) {
            case "GithubProfile":
                return <GithubProfile key={index} />;
            case "GithubStars":
                return <GithubStars repoUrl={params.repoUrl} key={index} />;
            case "GmailSender":
                return <GmailSender key={index} />;
            case "GmailUnread":
                return <GmailUnread key={index} />;
            case "SpotifyEmbed":
                return <SpotifyEmbed playlistId={params.playlistId} key={index} />;
            case "SpotifyPlaylists":
                return <SpotifyPlaylists/>
            case "SpotifyProfile":
                return <SpotifyProfile key={index} />;
            case "SpotifyTrackEmbed":
                return <SpotifyTrackEmbed playlistId={params.songId} key={index} />;
            case "YoutubeProfile":
                return <YoutubeProfile key={index} />;
            default:
                return <Text>Can't load the widget (not Uwu)</Text>
        }
    }
    return null;
}

export default function DisplayWidgets(token :string)
{
    const [widgetsList, setWidgetList] = useState([]);
    
    useEffect(() => {
        servicesFetch(token).then((response) => {
            setWidgetList(response);
        })
    }, []);

    return (
        <Box>
            {
                widgetsList ? widgetsList.map((widgets, idx1) => widgets.map((widget, idx2) => NameToWidgets(widget.name, JSON.parse(widget.params), `${idx1}-${idx2}`)))
                : null
            }
        </Box>
    );
}