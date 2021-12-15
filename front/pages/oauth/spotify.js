import { providers } from '../../components/Providers'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';

export default () => {
  const Receiver = providers.find(({ name }) => name === "spotify").receive
  const [_, setCookie] = useCookies();
  const router = useRouter()

  function handleSuccess(response) {
    axios.post("localhost:8080/service/new", {
      name: "spotify",
      position: 0,
      token: response.access_token,
      refreshToken: response.refresh_token
    })
    setCookie('spotifyService', {
      token: response.access_token,
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      refreshToken: response.refresh_token
    }, { path: '/' });
    console.log('Successfully authorized spotify. access token:' + response)
    router.replace('/')
  };

  function handleError(error) {
    console.error('An error occurred');
    console.error(error.message);
  };
  console.log("query:", router.query)

  return !router.query.code ? <></> : (
    <Receiver
      handleSuccess={handleSuccess}
      handleError={handleError}
      code={router.query.code}
    />
  );
}

