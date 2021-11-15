import { Box, Spacer, Center, ButtonGroup, Button, InputGroup, Input, InputRightElement } from "@chakra-ui/react"
import React, { useState } from 'react';

export default function Home() {
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	return (
		<>
		<Box padding="40" paddingBottom="10">
				<Input placeholder="Username" />
			<InputGroup>
				<Input
					type={show ? "text" : "password"}
					placeholder="Password"
				/>
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={handleClick}>
						{show ? "Hide" : "Show"}
					</Button>
				</InputRightElement>
			</InputGroup>
			<Spacer my="5"/>
			<Center>
				<ButtonGroup variant="outline" spacing="6">
					<Button colorScheme="blue">Login</Button>
					<Button>Signup</Button>
				</ButtonGroup>
			</Center>
			</Box>

		</>
	)
}
