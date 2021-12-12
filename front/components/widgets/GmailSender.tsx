import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    FormErrorMessage,
    Center,
} from '@chakra-ui/react'
import { useForm } from "react-hook-form"
import { useToast } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import axios from "axios"
import qs from "qs"
import CardWrapper from '../CardWrapper'
import checkCookie from '../../tools/checkCookie'
import { EmailIcon } from '@chakra-ui/icons'

function GmailSender(props: any): JSX.Element {
    const cookies = checkCookie("gmailService", "Gmail");
    if (cookies == null)
        return null;
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm();
    const [from, setFrom] = useState()
    const toast = useToast();

    useEffect(() => {
        axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
            headers: {
                Authorization: `Bearer ${cookies.gmailService.token}`
            }
        })
            .then((response) => {
                setFrom(response.data.email)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    async function onSubmit(values: { to: any; subject: any; msg: any }) {
        toast({
            title: `Trying to send mail...`,
            description: "Please wait...",
            status: "info",
            position: "top-right",
            isClosable: true,
        })
        return new Promise<void>((resolve) => {
            setTimeout(() => {}, 500);
            axios.post('/api/GmailSender', qs.stringify({
                from: from,
                to: values.to,
                token: cookies.gmailService.token,
                subject: values.subject,
                message: values.msg,
            }))
                .finally(() => {
                    toast.closeAll()
                    toast({
                        title: `Mail sent !`,
                        description: `Your mail has been sent to ${values.to}`,
                        status: "success",
                        position: "top-right",
                        duration: 1000,
                        isClosable: true,
                    })
                });
            resolve();
        });
    }


    return (
        <CardWrapper name="send email">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.from}>
                    <FormLabel htmlFor="from">From</FormLabel>
                    <Input
                        id="from"
                        isDisabled
                        defaultValue={from}
                        {...register("from")}
                    />
                </FormControl>
                <FormControl isInvalid={errors.to}>
                    <FormLabel htmlFor="email">To</FormLabel>
                    <Input
                        id="to"
                        placeholder="email"
                        type="email"
                        {...register("to", {
                            required: "Required.",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.to && errors.email.to}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.subject}>
                    <FormLabel htmlFor="text">Subject</FormLabel>
                    <Input
                        id="subject"
                        placeholder="subject"
                        type="text"
                        {...register("subject", {
                        })}
                    />
                    <FormErrorMessage>
                        {errors.subject && errors.email.subject}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.msg}>
                    <FormLabel htmlFor="msg">Message</FormLabel>
                    <Textarea
                        id="msg"
                        placeholder="Your message..."
                        resize="vertical"
                        {...register("msg", {
                            required: "Required",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.msg && errors.msg.message}
                    </FormErrorMessage>
                </FormControl>
                <Center>
                    <Button mt={4} leftIcon={<EmailIcon />} colorScheme="teal" isLoading={isSubmitting} type="submit">
                        Submit
                    </Button>
                </Center>
            </form>
        </CardWrapper>
    )
}

export default GmailSender;