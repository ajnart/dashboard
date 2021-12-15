
import { AspectRatio, Box, Center, Link, Text, VStack, WrapItem } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
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
		<Button p="5" isRound boxShadow={'xl'}  {...props} backgroundColor={props.color ? props.color : "teal"}>
			{props.showTitle ? <Text textAlign={"center"}>{props.name}</Text> : null}
			{props.link ? <Link href={props.link}>{props.children}</Link> : props.children}
		</Button>
	);

}

export default BubbleWrapper;