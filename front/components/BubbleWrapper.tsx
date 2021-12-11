
import { AspectRatio, Box, Center, Link, Text, WrapItem } from "@chakra-ui/layout";
import React from "react";

/**
 * Component used to wrap. (includes a WrapItem)  
 * ``children`` props is **required**
 * ```ts
 * <BubbleWrapper><Link href="https://github.com/"><Text>1650🌟</Text></Link></BubbleWrapper>
 * ```
 */
function BubbleWrapper(props): JSX.Element {
	
	return (
		<WrapItem>
			<Box p="5" borderRadius="90" boxShadow={'2xl'} backgroundColor={props.color ? props.color : "blue.500"}>
				{
					<>
					{props.showTitle ? <Text textAlign={"center"}>{props.name}</Text> : null}
					{props.link ? <Link href={props.link}>{props.children}</Link> : props.children}
					</>
				}
			</Box>
		</WrapItem >
	);
	
}

export default BubbleWrapper;