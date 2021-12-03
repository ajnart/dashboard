import { providers } from '../../components/Providers'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';

export default () => {
  const Receiver = providers.find(({ name }) => name === "deezer").receive
  const [_, setCookie] = useCookies();
  const router = useRouter()

  function handleSuccess(accessToken, { response }) {
    setCookie('deezerService', {
      token: accessToken,
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      refreshToken: response.refresh_token
    }, { path: '/' });
    console.log('Successfully authorized deezer. access token:' + response)
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


