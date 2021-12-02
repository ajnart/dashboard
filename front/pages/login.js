import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  Center,
  useToast,
  VStack
} from "@chakra-ui/react";
import { useCookies } from "react-cookie"

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  const toast = useToast();
  const [cookie, setCookie] = useCookies();
  const router = useRouter();

  useEffect(() => {
    if (cookie["user"]) {
      toast({
        title: "You are already logged in",
        description: "You can't login twice",
        status: "error",
        duration: 9000,
        isClosable: true
      });
      router.push("/");
    }
  }, []);

  function onSubmit(values) {
    toast({
      title: `Trying to log you in...`,
      position: "top-right",
      isClosable: true,
    })
    axios.post('http://localhost:8080/login', values)
      .then((res) => {
        if (res.status == 202) {
          setCookie("user", {
            token: res.data.token,
            expires: res.data.expire,
            refreshToken: res.data.refreshToken,
          }, { path: "/" });
          toast.closeAll()
            router.push("/")
        } else {
          toast({
            title: "Error:" + err.message,
            status: "error",
            position: "top-right",
            isClosable: true,
          })
        }
      })
      .catch((err) => {
        toast({
          title: "Error:" + err.message,
          status: "error",
          position: "top-right",
          isClosable: true,
        })
      });
  }
  return cookie["user"] ? <></> : (
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
            <Button m={4} colorScheme="blue" isLoading={isSubmitting} type="submit">Login</Button>
            <Button m={4}><NextLink href="/register">Register</NextLink></Button>
          </form>
        </VStack>
      </Center>
    </>
  );
}
