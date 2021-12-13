import CardWrapper from '../CardWrapper';

function SpotifyEmbed(props: any) {
	return (
		<CardWrapper name="Spotify embed" {...props}>
			<iframe
			src={`https://open.spotify.com/embed/playlist/${props.playlistId}?utm_source=generator&theme=0`}
			width="100%" 
			height={props.height ? props.height : '400'}
			frameBorder="1"
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
			</iframe>
		</CardWrapper>
	)
}

export default SpotifyEmbed;