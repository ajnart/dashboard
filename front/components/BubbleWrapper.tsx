
import { AspectRatio, Box, Center, Link, Text, WrapItem } from "@chakra-ui/layout";
import React from "react";

/**
 * Component used to wrap. CHILDREN props is required 
 * ```ts
 * <Bubble text="hello" color="red.400" link="http://google.com/"/>
 * ```
 */
function BubbleWrapper(props): JSX.Element {
	
	return (
		<WrapItem>
			<Box p="5" borderRadius="90" boxShadow={'2xl'} backgroundColor={props.color ? props.color : "blue.500"}>
				{
					props.link ? <Link href={props.link}>{props.children}</Link> : props.children
				}
			</Box>
		</WrapItem >
	);
	
}

export default BubbleWrapper;