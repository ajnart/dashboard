import CardWrapper from '../CardWrapper';

function SpotifyEmbed(props: any) {
	return (
		<CardWrapper name="Spotify embed" {...props}>
			<iframe
			src={`https://open.spotify.com/embed/playlist/${props.playlistId}?utm_source=generator&theme=0`}
			width="100%" 
			height="380"
			frameBorder="0"
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
			</iframe>
		</CardWrapper>
	)
}

export default SpotifyEmbed;