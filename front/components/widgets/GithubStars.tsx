
import { AspectRatio, Box, Link, Text } from "@chakra-ui/layout";
import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import BubbleWrapper from "../BubbleWrapper";
import { useState, useEffect } from "react"
import { Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

/**
 * Component used to display a github repo's stars.
 * _Needs oauth token if the repo is private._  
 * ``repoUrl`` props is **required**
 * ```ts
 * <GithubStars repoUrl="ajnart/mynetflix"></GithubStars>
 * ```
 */
function GithubStars(props): JSX.Element {
	const [fetchedData, setData] = useState([]);
	const [cookies, setCookie] = useCookies(['githubService']);
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`https://api.github.com/repos/${props.repoUrl}`, {
					data: {
						token: cookies["token"]
					}});
				setData(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);
	return (
		<Link href={`https://github.com/${props.repoUrl}`}><Button {...props} leftIcon={<StarIcon/>}>{`${fetchedData["stargazers_count"]} `}</Button></Link>
	)
}

export default GithubStars;