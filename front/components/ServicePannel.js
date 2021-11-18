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

const ServiceButton = ({ index, name }) => {
  return (
    <Button key={index} variant="outline" h="20" w="100%" ml={5} mr={5}>
      <HStack justifyContent="space-between" w="100%">
        <VStack align="left">
          <Text as="b" size="md" align="left">{name}</Text>
          <Text size="sm" align="left">this is a description</Text>
        </VStack>
        <Circle background="green" size="30px" />
      </HStack>
    </Button>
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
