import { providers } from '../../components/Providers'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';

export default () => {
  const Receiver = providers.find(({ name }) => name === "youtube").receive
  const [_, setCookie] = useCookies();
  const router = useRouter()

  function handleSuccess(accessToken, { response }) {
    axios.post("localhost:8080/service/new", {
      name: "youtube",
      position: 0,
      token: accessToken,
      refreshToken: response.refresh_token
    })
      .then(() => {
        setCookie('youtubeService', {
          token: accessToken,
          expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          refreshToken: response.refresh_token
        }, { path: '/' });
      })
    axios.post("localhost:8080/service/new", {
      name: "gmail",
      position: 0,
      token: accessToken,
      refreshToken: response.refresh_token
    })
      .then(() => {
        setCookie('gmailService', {
          token: accessToken,
          expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          refreshToken: response.refresh_token
        }, { path: '/' });
      })
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
