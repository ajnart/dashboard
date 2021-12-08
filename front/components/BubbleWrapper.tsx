
import { AspectRatio, Box, Link, Text } from "@chakra-ui/layout";
import React from "react";

/**
 * Component used to wrap. CHILDREN props is required 
 * ```ts
 * <Bubble text="hello" color="red.400" link="http://google.com/"/>
 * ```
 */
function BubbleWrapper(props): JSX.Element {
	
	return (
		<AspectRatio maxH={50} maxW={50} ratio={1}>
			<Box p="10" borderRadius="90" boxShadow={'2xl'} backgroundColor={props.color ? props.color : "blue.500"} flex="">
				{
					props.link ? <Link href={props.link}>{props.children}</Link> : props.children
				}
			</Box>
		</AspectRatio>
	);
	
}

export default BubbleWrapper;