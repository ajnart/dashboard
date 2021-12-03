import { providers } from '../../components/Providers'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';

export default () => {
  const Receiver = providers.find(({ name }) => name === "youtube").receive
  const [_, setCookie] = useCookies();
  const router = useRouter()

  function handleSuccess(accessToken, { response }) {
    setCookie('youtubeService', {
      token: accessToken,
      expiresIn: response.expires_in,
      refreshToken: response.refresh_token
    }, { path: '/' });
    setCookie('gmailService', {
      token: accessToken,
      expiresIn: response.expires_in,
      refreshToken: response.refresh_token
    }, { path: '/' });
    console.log('Successfully authorized. access token:' + response)
    router.replace('/')
  };

  function handleError(error) {
    console.error('An error occurred');
    console.error(error.message);
  };

  return (
    <Receiver
      handleSuccess={handleSuccess}
      handleError={handleError}
    />
  );
}
