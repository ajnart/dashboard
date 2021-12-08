
import { AspectRatio, Box, Text } from "@chakra-ui/layout";
import React from "react";

function Bubble() {
	return (
		<AspectRatio ratio={1}>
			<Box p="10" borderRadius="90" backgroundColor="green" flex="">
				<Text m="2" fontWeight="bold" color="white">1830⭐</Text>
			</Box>
		</AspectRatio>
	);

}

export default Bubble;