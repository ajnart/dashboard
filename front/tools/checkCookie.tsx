import { useToast } from "@chakra-ui/react";
import { useCookies } from "react-cookie";

function checkCookie(name: string) {
	const toast = useToast()
	const [cookies, setCookie] = useCookies([name]);
	if (cookies[`${name}`] == undefined) {
		toast.closeAll();
		toast({
			variant: 'error',
			title: 'Spotify Service',
			description: 'Please login to Spotify',
			status: 'error',
			duration: 2000,
			position: 'top-right',
			isClosable: true,
		})
		return (null);
	}
	return (cookies);
}	

export default checkCookie;