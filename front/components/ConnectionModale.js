import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Center,
} from "@chakra-ui/react"
import { providers } from "./Providers"

export default ({ serviceName, isOpen, onClose }) => {
  const Sender = providers.find( ({name}) => name == serviceName).send
  console.log(typeof serviceName)

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect to {serviceName}</ModalHeader>
        <ModalBody>
          <Center>
            <Sender />
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
