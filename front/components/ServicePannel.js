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
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useCookies } from 'react-cookie';

import { providers } from './Providers'
import ConnectionModal from './ConnectionModale'

const ServiceButton = ({ index, provider, service, setService, closeDrawer }) => {
  const s = {
    OK: 0,
    KO: 1,
    loading: 2,
  }
  const cookieName = provider.name + 'Service'
  const [cookies, setCookie] = useCookies(['currentServiceName', cookieName]);
  const [isConnected, setIsConnected] = useState(s.loading);
  const serviceCookie = cookies[cookieName]
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    async function checkConnection() {
      console.log(provider)
      await provider.check({ token: serviceCookie.token })
        .then(() => {
          console.log(provider.name, ": good...")
          setIsConnected(s.OK)
        })
        .catch(() => {
          console.log(provider.name, ": oof...")
          setIsConnected(s.KO)
        })
    }
    console.log("name: ", serviceCookie)
    if (!serviceCookie || !"token" in serviceCookie) {
      if (!provider.needAuth) {
        setIsConnected(s.OK)
      } else {
        setIsConnected(s.KO)
      }
    }
    else {
      console.log(provider.name, ": checking connection...")
      checkConnection()
    }
  }, [])

  function selectService() {
    if (isConnected == s.loading) {
      return
    }
    if (isConnected == s.KO) {
      onOpen()
      return
    }
    setCookie('currentServiceName', provider.name, { path: '/' })
    setService(provider.name)
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
        background={service == provider.name ? "lightgrey" : ""}
      >
        <HStack justifyContent="space-between" w="100%">
          <VStack align="left">
            <Text as="b" size="md" align="left">{provider.name}</Text>
            <Text size="sm" align="left">this is a description</Text>
          </VStack>
          <Circle
            background={isConnected == s.OK ? "green.500" : isConnected == s.KO ? "red" : "orange"}
            size="30px"
          />
        </HStack>
      </Button>
      <ConnectionModal isOpen={isOpen} onClose={onClose} serviceName={provider.name} />
    </>
  )
}

export default ({ service, setService }) => {
  // const obj = JSON.parse(mockdata);
  // const dataset = obj.services
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  // const [dataset, setDataset] = useState([])
    //
  // useEffect(() => {
  //   async function fetchList() {
  //     return await fetch('/api/services')
  //     .then(res => {
  //       console.log(res.json())
  //       setDataset(res.json())
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  //   }
  //   fetchList()
  // }, [])

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
      />
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
              {providers.map((item, index) => (
                <ServiceButton
                  key={index}
                  provider={item}
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
