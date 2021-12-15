import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  Center,
  Select,
  useDisclosure
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { AddIcon } from "@chakra-ui/icons"
import ConnectionModale from "./ConnectionModale"
import { useState } from "react"

const ConnectionModaleWrap = ({ name, selectService }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useState(() => {
    onOpen()
  }, [])
  function onCloseWrap() {
    onClose()
    selectService("")
  }
  return (
    <ConnectionModale isOpen={isOpen} onClose={onCloseWrap} serviceName={name} />
  )
}

const Add = ({ services, isOpen, onClose, selectService }) => {
  const {
    handleSubmit,
    register
  } = useForm();

  function onSubmit(data) {
    console.log(data)
    selectService(data.service)
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose a service to add</ModalHeader>
          <ModalBody>
            <Center>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <Select
                    id="service"
                    placeholder="Choose..."
                    {...register("service", {
                      required: "pls",
                    })}
                  >
                    {services.map((service, _) => (
                      <option value={service}>{service}</option>
                    ))}
                  </Select>
                </FormControl>
                <Box align="center">
                  <Button mt={4} colorScheme="teal" type="submit">
                    Submit
                  </Button>
                </Box>
              </form>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ({ list }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedService, selectService] = useState("")
  return (
    <>
      <Button
        variant="outline"
        h="20"
        w="100%"
        ml={5}
        mr={5}
        onClick={() => onOpen()}
      >
        <Center>
          <AddIcon />
        </Center>
      </Button>
      {selectedService == "" ? <Add services={list} onClose={onClose} isOpen={isOpen} selectService={selectService} />
        : <ConnectionModaleWrap name={selectedService} selectService={selectService} />}
    </>

  )
}
