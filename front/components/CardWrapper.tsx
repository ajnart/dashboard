import { DeleteIcon, EditIcon,HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
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

function CardWrapper(props) {
	return (
		<WrapItem>
			<Center m={4}>
				<Box
					w={'full'}
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
							fontSize={'xl'}
							letterSpacing={1.1}>
							{props.name}
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
			</Center>
		</WrapItem>
	);
}

export default CardWrapper;