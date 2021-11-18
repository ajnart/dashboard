import {
  Button,
  Circle,
  VStack,
  HStack,
  IconButton,
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
import { GiHamburgerMenu } from 'react-icons/gi'

import Providers from './Providers'
import ConnectionModal from './ConnectionModale'

const ServiceButton = ({ index, name, service, setService, closeDrawer }) => {
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
    setService(name)
    closeDrawer()
  }

  return (
    <>
      <Button
        key={index}
        variant="outline"
        h="20"
        w="100%"
        ml={5}
        mr={5}
        onClick={selectService}
        background={service == name ? "lightgrey" : ""}
      >
        <HStack justifyContent="space-between" w="100%">
          <VStack align="left">
            <Text as="b" size="md" align="left">{name}</Text>
            <Text size="sm" align="left">this is a description</Text>
          </VStack>
          <Circle
            background={isConnected == s.OK ? "green.500" : isConnected == s.KO ? "red" : "orange"}
            size="30px"
          />
        </HStack>
      </Button>
      <ConnectionModal isOpen={isOpen} onClose={onClose} serviceName={name} />
    </>
  )
}

export default ({ service, setService }) => {
  // const obj = JSON.parse(mockdata);
  // const dataset = obj.services
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <IconButton
        isRound
        colorScheme="blue"
        aria-label="Toggle service list"
        mt={8}
        ml={8}
        icon={<GiHamburgerMenu />}
        onClick={onOpen}
        ref={btnRef}
      >
      </IconButton>
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
                <ServiceButton
                  key={index}
                  name={item.name}
                  service={service}
                  setService={setService}
                  closeDrawer={onClose}
                />
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
