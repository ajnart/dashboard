import { DeleteIcon, EditIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import {
	Text,
	Box,
	useColorModeValue,
	Center,
	MenuList,
	Menu,
	MenuItem,
	MenuButton,
	IconButton,
	HStack,
	Spacer,
	WrapItem,

} from "@chakra-ui/react"
import React from "react";

/**
 * Component used to wrap. (includes a WrapItem)  
 * ``children`` props is **required**
 * ```ts
 * <CardWrapper name="Hello world!"><Text>Bonjour a tout•e•s</Text></CardWrapper>
 * ```
 */
function CardWrapper(props) {
	return (
		<WrapItem>
			<Box
				bg={useColorModeValue('white', 'gray.900')}
				boxShadow={'2xl'}
				rounded={'md'}
				p={6}
				overflow={'hidden'}
			>
				<HStack m="4">
					<Text
						color={'green.500'}
						textTransform={'uppercase'}
						fontWeight={800}
						fontSize={'l'}
						letterSpacing={1.1}
						>{props.name}
					</Text>
					<Spacer />
					<Menu>
						<MenuButton
							as={IconButton}
							aria-label='Options'
							icon={<HamburgerIcon />}
							variant='outline'
						/>
						<MenuList>
							<MenuItem icon={<EditIcon />}>
								Rename Widget
							</MenuItem>
							<MenuItem icon={<RepeatIcon />}>
								Reload
							</MenuItem>
							<MenuItem icon={<DeleteIcon />} color="red">
								Delete
							</MenuItem>
						</MenuList>
					</Menu>
				</HStack>
				{props.children}
			</Box>
		</WrapItem>

	);
}

export default CardWrapper;