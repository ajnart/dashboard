import CardWrapper from '../CardWrapper';

function SpotifyTrackEmbed(props: any) {
	return (
		<CardWrapper name="Spotify song embed" {...props}>
			<iframe
				src={`https://open.spotify.com/embed/track/${props.songId}?utm_source=generator`}
				width="100%"
				height={props.height ? props.height : '400'}
				frameBorder="0"
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
			</iframe>
		</CardWrapper>
	)
}

export default SpotifyTrackEmbed;