import {
  Button,
  Circle,
  VStack,
  HStack,
  Box,
  Flex,
  Spacer,
  Heading,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import dataset from '../mocks/service.json'
import { useRef } from 'react'
import { useEffect, useState } from 'react'

import Providers from './Providers'
import ConnectionModal from './ConnectionModale'

const ServiceButton = ({ index, name }) => {
  const s = {
    OK: 0,
    KO: 1,
    loading: 2,
  }
  const provider = Providers.find(provider => provider.name === name)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isConnected, setIsConnected] = useState(s.KO);
  useEffect(() => {
    if (!provider.needAuth) {
      setIsConnected(s.OK)
    } else {
      setIsConnected(s.loading)
      //make a test request to check if its connected
      //if it's woring, set isConnected to OK
      //else, set isConnected to KO
      // setIsConnected(status.OK)
    }
  }, [])

  function selectService() {
    if (isConnected != s.OK) {
      onOpen()
      return
    }
    //select the service, we'll need a hook to return the selected service
    console.log("service " + name + " have been selected")
  }

  return (
    <>
      <Button key={index} variant="outline" h="20" w="100%" ml={5} mr={5} onClick={selectService}>
        <HStack justifyContent="space-between" w="100%">
          <VStack align="left">
            <Text as="b" size="md" align="left">{name}</Text>
            <Text size="sm" align="left">this is a description</Text>
          </VStack>
          <Circle background={isConnected == s.OK ? "green.500" : isConnected == s.KO ? "red" : "orange"} size="30px" />
        </HStack>
      </Button>
      <ConnectionModal isOpen={isOpen} onClose={onClose} serviceName={name} />
    </>
  )
}

export default () => {
  // const obj = JSON.parse(mockdata);
  // const dataset = obj.services
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            Available Services
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={10}>
              {dataset.services.map((item, index) => (
                <ServiceButton key={index} name={item.name} />
              ))}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
