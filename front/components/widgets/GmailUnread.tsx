
import { AspectRatio, Box, Link, Text } from "@chakra-ui/layout";
import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import BubbleWrapper from "../BubbleWrapper";
import { useState, useEffect } from "react"

/**
 * Component used to display a user unread mails.
 * _Needs oauth token_  (see [Gmail API](https://developers.google.com/gmail/api/v1/reference/users/messages/list))	
 * ```ts
 * <GmailUnread/>
 * ```
 */
function GmailUnread(props): JSX.Element {
	const [fetchedData, setData] = useState([]);
	const [cookies, setCookie] = useCookies(['gmailService']);
	useEffect(() => {
		console.log(cookies.gmailService.token);
		async function fetchData() {
			try {
				const res = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/labels/INBOX`, {
					headers: {
						Authorization: `Bearer ${cookies.gmailService.token}`,
					}
				});
				setData(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);
	return (
		<BubbleWrapper {...props}>
			<Link href="https://mail.google.com/#inbox"><Text>{`${fetchedData["messagesUnread"]}`} unread</Text></Link>
		</BubbleWrapper>
	)
}

export default GmailUnread;