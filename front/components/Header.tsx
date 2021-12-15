import { useCookies } from 'react-cookie'
import { BiLogOut } from 'react-icons/bi'
import {
	Button, useColorMode,
	useColorModeValue,
	Box,
	Flex,
	Text,
	Stack,
	Link
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Header() {
	const [cookies, setCookie, removeCookie] = useCookies();
	const { colorMode, toggleColorMode } = useColorMode();
	return (<Box p={5} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
		<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
			<Text
				bgGradient='linear(to-l, #7928CA, #FF0080)'
				bgClip='text'
				fontSize='6xl'
				fontWeight='extrabold'
			>
				Chadboard
			</Text>
			<Flex alignItems={'center'}>
				<Stack direction={'row'} spacing={7}></Stack>
				<Button mr="4" onClick={toggleColorMode}>
					{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
				</Button>
				<Link href='/login/'>
					<Button mr="4" onClick={(e) => {
						removeCookie("user");
					}}>
						{<BiLogOut />}
					</Button>
				</Link>
			</Flex>
		</Flex>
	</Box>)
}
