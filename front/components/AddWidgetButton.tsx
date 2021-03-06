import { AddIcon, ChevronDownIcon, EmailIcon } from "@chakra-ui/icons"
import {
	Button, IconButton, Box,
	Text, Menu, MenuButton, MenuItem, MenuList, Modal,
	ModalBody, ModalCloseButton, ModalContent, ModalFooter,
	ModalHeader, ModalOverlay, useDisclosure, VStack, FormControl,
	FormLabel, Input, Textarea, FormErrorMessage, Center, toast, useToast, Divider
} from "@chakra-ui/react"
import { SiGithub, SiYoutube, SiGmail, SiSpotify, SiAddthis } from "react-icons/si";
import { AiFillFire } from "react-icons/ai"
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import qs from "qs";
import githubProfile from "./widgets/GithubProfile";
import SpotifyEmbed from "./widgets/SpotifyEmbed";
import checkCookie from "../tools/checkCookie";

export default function AddWidgetButton() {
	const toast = useToast();
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting }
	} = useForm();
	//TODO: Add good bodies
	const token = checkCookie("user", "token");
	if (token == null)
		return null;
	function onSubmit(defaults) {
		return async (values: { params: any, description: string, servicename: string, name: string }) => {
			values = { ...defaults, ...values };
			return new Promise<void>((resolve) => {
				setTimeout(() => { }, 500);
				//TODO: ADD ITEM TO WIDGET BACKEND, AND ADD TOKEN TO IDENTIFY USER
				//TODO: ADD A WAY TO DICERN WHAT IS CALLING THAT FUNCTION AND MATCH IT TO A JSX ELEMENT
				//TODO: 'GithubProfile' = <GithubProfile />
				//TODO: 'GithubStars' = <GithubStars props={props} />
				//TODO: WE NEED TO PASS THE PROPS TO BE EQUAL TO THE WHOLE FORM VALUES
				console.log(`Adding a widget of name: ${values.name} with params: ${values.params}
					and description: ${values.description}
					and servicename: ${values.servicename}
					the token is: ${token}
					`);
				axios.put('localhost:8080/widget/edit', qs.stringify({
					name: values.name,
					description: values.description,
					servicename: values.servicename,
					params: JSON.stringify({
						isEnabled: true,
						...[values.params],
					}),
				}))
					.finally(() => {
						toast.closeAll()
						toast({
							title: `Widget addded !`,
							status: "success",
							position: "top-right",
							duration: 1000,
							isClosable: true,
						})
					});
				resolve();
			});
		}
	}
	const GithubBody =
		<VStack>
			<Box>
				<form onSubmit={handleSubmit(onSubmit({
					token: token,
					name: "GithubStars",
					description: "GithubStars",
					serviceName: "github",
					params: {
						isEnabled: true
					}
				}))}>
					<FormControl isInvalid={errors.repourl}>
						<FormLabel htmlFor="repourl">Add repo stars widget ???</FormLabel>
						<Input
							id="repourl"
							defaultValue={"ajnart/mynetflix"}
							{...register("repourl")}
						/>
					</FormControl>
					<FormErrorMessage>
						{errors.repourl}
					</FormErrorMessage>
					<Center>
						<Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">Add widget
						</Button>
					</Center>
				</form>

			</Box>
			<Divider />
			<Box>
				<form onSubmit={handleSubmit(onSubmit({
					token: token,
					name: "GithubProfile",
					description: "GithubProfile",
					serviceName: "github",
					params: {
						isEnabled: true
					}
				}))}>
					<Text>Add profile widget</Text>
					<Center>
						<Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">Add widget
						</Button>
					</Center>
				</form>
			</Box>
		</VStack>

	const YouTubeBody =
		<VStack >
			<Box>
				<form onSubmit={handleSubmit(onSubmit({
					token: token,
					name: "YoutubeProfile",
					description: "YoutubeProfile",
					serviceName: "youtube",
					params: {
						isEnabled: true
					}
				}))}>
					<Text>Add Youtube profile widget</Text>
					<Center>
						<Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">Add widget
						</Button>
					</Center>
				</form>
			</Box>
		</VStack >
	const GmailBody =
		<VStack>
			<Box>
				<form onSubmit={handleSubmit(onSubmit({
					token: token,
					name: "GmailUnread",
					description: "GmailUnread",
					serviceName: "gmail",
					params: {
						isEnabled: true
					}
				}))}>
					<Text>Add gmail unread widget</Text>
					<Center>
						<Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">Add widget
						</Button>
					</Center>
				</form>
			</Box>
			<Divider />
			<Box>
				<form onSubmit={handleSubmit(onSubmit({
					token: token,
					name: "GmailSender",
					description: "GmailSender",
					serviceName: "gmail",
					params: {
						isEnabled: true
					}
				}))}>
					<Text>Add gmail sender widget</Text>
					<Center>
						<Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">Add widget
						</Button>
					</Center>
				</form>
			</Box>
		</VStack>

	const SpotifyBody =
		<VStack>
			<Box>
				<form onSubmit={handleSubmit(onSubmit({
					token: token,
					name: "SpotifyPlaylists",
					description: "SpotifyPlaylists",
					serviceName: "spotify",
					params: {
						isEnabled: true
					}
				}))}>
					<Text>Add Spotify public playlists widget</Text>
					<Center>
						<Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">Add widget
						</Button>
					</Center>
				</form>
			</Box>
			<Divider />
			<Box>
				<form onSubmit={handleSubmit(onSubmit({
					token: token,
					name: "SpotifyProfile",
					description: "SpotifyProfile",
					serviceName: "spotify",
					params: {
						isEnabled: true
					}
				}))}>
					<Text>Add Spotify profile widget</Text>
					<Center>
						<Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">Add widget
						</Button>
					</Center>
				</form>
			</Box>
			<Divider />
			<Box>
				<form onSubmit={handleSubmit(onSubmit({
					token: token,
					name: "SpotifyEmbed",
					description: "SpotifyEmbed",
					serviceName: "spotify",
					params: {
						isEnabled: true
					}
				}))}>
					<FormControl isInvalid={errors.playlistId}>
						<FormLabel htmlFor="playlistId">Add spotify embed playlist</FormLabel>
						<Input
							id="playlistId"
							defaultValue={"37i9dQZF1DXcBWIGoYBM5M"}
							{...register("playlistId")}
						/>
					</FormControl>
					<FormErrorMessage>
						{errors.playlistId}
					</FormErrorMessage>
					<Center>
						<Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">Add widget
						</Button>
					</Center>
				</form>

			</Box>
			<Divider />
			<Box>
				<form onSubmit={handleSubmit(onSubmit({
					token: token,
					name: "SpotifyTrackEmbed",
					description: "SpotifyTrackEmbed",
					serviceName: "spotify",
					params: {
						isEnabled: true
					}
				}))}>
					<FormControl isInvalid={errors.songId}>
						<FormLabel htmlFor="songId">Add spotify embed song</FormLabel>
						<Input
							id="songId"
							defaultValue={"6eHKoMFFoMJ4cWwPscl382"}
							{...register("songId")}
						/>
					</FormControl>
					<FormErrorMessage>
						{errors.songId}
					</FormErrorMessage>
					<Center>
						<Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">Add widget
						</Button>
					</Center>
				</form>
			</Box>
		</VStack>

	const RedTubeBody = <Text>Hello world</Text>
	const CustomModal = ({ showModalButtonText, modalHeader, modalBody, leftIcon }) => {
		const { isOpen, onOpen, onClose } = useDisclosure();
		return (
			<>
				<MenuItem as={Button} leftIcon={leftIcon} onClick={onOpen}>
					{showModalButtonText}
				</MenuItem>
				<Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>{modalHeader}</ModalHeader>
						<ModalCloseButton />
						<ModalBody>{modalBody}</ModalBody>
					</ModalContent>
				</Modal>
			</>
		);
	};
	return (
		<Menu>
			<MenuButton boxShadow={'xl'} position={"fixed"} left={5} bottom={5} as={Button} leftIcon={<SiAddthis />} >
				Add a widget
			</MenuButton>
			<MenuList>
				<CustomModal showModalButtonText={"Github"} modalHeader={"Github add widget menu"} modalBody={GithubBody} leftIcon={<SiGithub />} />
				<CustomModal showModalButtonText={"YouTube"} modalHeader={"YouTube add widget menu"} modalBody={YouTubeBody} leftIcon={<SiYoutube />} />
				<CustomModal showModalButtonText={"Gmail"} modalHeader={"Gmail add widget menu"} modalBody={GmailBody} leftIcon={<SiGmail />} />
				<CustomModal showModalButtonText={"Spotify"} modalHeader={"Spotify add widget menu"} modalBody={SpotifyBody} leftIcon={<SiSpotify />} />
				<CustomModal showModalButtonText={"RedTube"} modalHeader={"RedTube add widget menu"} modalBody={RedTubeBody} leftIcon={<AiFillFire />} />
			</MenuList>
		</Menu>
	)
}
