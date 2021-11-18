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
	VStack
} from "@chakra-ui/react";

export default function HookForm() {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting }
	} = useForm();

	function onSubmit(values) {
		return new Promise((resolve) => {
			console.log('trying to log in')
			setTimeout(() => {
				fetch("/api/login", { method: "POST", body: values })
					.then((res) => res.json())
					.finally(() => {
						toast.closeAll()
					});
			}, 3000);
			resolve();
		});
	}

	return (
		<>
			<Center h="100vh">
				<VStack>
					<Text fontSize="4xl" m="4">Welcome back ! Please log-in</Text>
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
						<FormControl isInvalid={errors.password}>
							<FormLabel m="2" htmlFor="password">Password</FormLabel>
							<Input
								id="password"
								type="password"
								placeholder="password"
								{...register("password", {
									required: "A password is required.",
								})}
							/>
							<FormErrorMessage>
								{errors.password && errors.password.message}
							</FormErrorMessage>
						</FormControl>
						<Button m={4} colorScheme="teal" isLoading={isSubmitting} type="submit">Login</Button>
						<Button m={4}><Link href="/register">Register</Link></Button>
					</form>
				</VStack>
			</Center>
		</>
	);
}