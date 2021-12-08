import { AddIcon, CheckIcon, CloseIcon, DeleteIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	Text,
	ModalHeader,
	ModalFooter,
	Box,
	Heading,
	Stack,
	Avatar,
	useColorModeValue,
	ModalBody,
	Center,
	MenuList,
	Menu,
	MenuItem,
	MenuButton,
	IconButton,
	VStack,
	HStack,
	Spacer,
	Wrap,
	WrapItem,
	ButtonGroup,
	Flex,
	useEditableControls,
	EditablePreview,
	Editable,
	EditableInput,
} from "@chakra-ui/react"
import Image from 'next/image';
import React from "react";

import { providers } from "./Providers"

function WidgetCards(arg0: {}) {
	// TODO: Fetch all the widgets from the database
	const items = [
		["Widget 1", <Box height="200px" width="450px" backgroundColor="green" />],
		["Widget 2", <Box height="400px" width="350px" backgroundColor="blue" />],
		["Widget 3", <Box height="100px" width="450px" backgroundColor="red" />],
		["Widget 1", <Box height="300" width="300px" backgroundColor="teal" />],
		["Widget 2", <Box height="400px" width="350px" backgroundColor="blue" />],
		["Widget 3", <Box height="100px" width="450px" backgroundColor="red" />]
	]
	return (
		<Wrap justify='center'>{
			items.map((e) => {
				return WidgetCard(e);
			})}
		</Wrap>
	)
}

function WidgetCard(item) {
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
							{item[0]}
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
					{item[1]}
				</Box>
			</Center>
		</WrapItem>
	);
}

export default WidgetCards;