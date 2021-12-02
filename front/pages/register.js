import { useForm } from "react-hook-form";
import React from "react";
import Link from "next/link";
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Button,
	Text,
	Center,
	useToast,
	InputGroup,
	InputRightElement,
	VStack
} from "@chakra-ui/react";

export default function HookForm() {
	const [show, setShow] = React.useState(false)
	const handleClick = () => setShow(!show)

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting }
	} = useForm();

	function onSubmit(values) {
		toast({
			title: `Trying to register you..`,
			position: "top-right",
			isClosable: true,
		})
		return new Promise((resolve) => {
			console.log('trying to register')
			setTimeout(() => {
				fetch("/api/register", { method: "POST", body: values })
					.then((res) => res.json())
					.finally(() => {
						toast.closeAll()
					});
			}, 3000);
			resolve();
			// TODO: Add JWT to cookie
		});
	}
	const toast = useToast()
	return (
		<>
			<Center h="100vh">
				<VStack>
					<Text fontSize="4xl" m="4">Welcome! Please register</Text>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormControl isInvalid={errors.username}>
							<FormLabel m="2" htmlFor="login">Username</FormLabel>
							<Input
								id="login"
								type="text"
								placeholder="username"
								{...register("username", {
									required: "A username is required.",
								})}
							/>
							<FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={errors.email}>
							<FormLabel m="2" htmlFor="email">Email</FormLabel>
							<Input
								id="email"
								type="email"
								placeholder="toto@gmail.com"
								{...register("email", {
									required: "A vail email is required.",
								})}
							/>
							<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={errors.password}>
							<FormLabel m="2" htmlFor="password">Password</FormLabel>
							<InputGroup size="md">
							<Input
								id="password"
								type={show ? "text" : "password"}
								placeholder="password"
								{...register("password", {
									required: "A password of 4 characters is required.",
									minLength: 4,
									validate: (value) => value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/) || "A password should be strong.",
								})}
							/>
							<InputRightElement width="4.5rem">
								<Button h="1.75rem" size="sm" onClick={handleClick}>
									{show ? "Hide" : "Show"}
								</Button>
							</InputRightElement>
							</InputGroup>
							<FormErrorMessage>
								{errors.password && errors.password.message}
							</FormErrorMessage>
						</FormControl>
						<Center>
						<Button m={4} colorScheme="blue" isLoading={isSubmitting} type="submit">Register</Button>
						</Center>
					</form>
				</VStack>
			</Center>
		</>
	);
}