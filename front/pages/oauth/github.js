import { providers } from '../../components/Providers'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';
import axios from 'axios'

export default () => {
  const Receiver = providers.find(({ name }) => name === "github").receive
  const [_, setCookie] = useCookies();
  const router = useRouter()

  function handleSuccess(response) {
    axios.post("localhost:8080/service/new", {
      name: "github",
      position: 0,
      token: response.access_token,
      refreshToken: response.refresh_token
    })
      .then(() => {
        setCookie('githubService', {
          token: response.access_token,
          expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          refreshToken: response.refresh_token
        }, { path: '/' });
        console.log('Successfully authorized github. access token:' + response)
        router.replace('/')
      })
  };

  function handleError(error) {
    console.error('An error occurred');
    console.error(error.message);
  };

  return (
    <Receiver
      handleSuccess={handleSuccess}
      handleError={handleError}
      code={router.query.code}
    />
  );
}


