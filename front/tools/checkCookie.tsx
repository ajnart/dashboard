import { useToast } from "@chakra-ui/react";
import { useCookies } from "react-cookie";

function checkCookie(cookieName: string, servicename: string) {
	const toast = useToast()
	const [cookies, setCookie] = useCookies([cookieName]);
	if (cookies[`${cookieName}`] == undefined) {
		toast.closeAll();
		toast({
			title: `${servicename} Service`,
			description: `Please login to ${servicename}`,
			status: 'error',
			variant: 'left-accent',
			duration: 2000,
			position: 'top-right',
			isClosable: true,
		})
		return (null);
	}
	return (cookies);
}	

export default checkCookie;