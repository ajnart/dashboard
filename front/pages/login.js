import { useForm } from "react-hook-form";
import React from "react";
import Link from "next/link";
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Button,
	Center
} from "@chakra-ui/react";

export default function HookForm() {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting }
	} = useForm();

	function onSubmit(values){
		return new Promise((resolve) => {
			setTimeout(() => {
				alert(JSON.stringify(values, null, 2));
				resolve();
			}, 3000);
		});
	}

	return (
		<Center>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl isInvalid={errors.name}>
					<FormLabel m="2" htmlFor="login">Username</FormLabel>
					<Input
						id="login"
						type="text"
						placeholder="username"
						{...register("username", {
							required: "A username is required.",
						})}
					/>
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
						{errors.name && errors.name.message}
					</FormErrorMessage>
				</FormControl>
				<Button m={4} colorScheme="teal" isLoading={isSubmitting} type="submit">Login</Button>
				<Button m={4}><Link href="/register">Register</Link></Button>
			</form>
		</Center>
	);
}