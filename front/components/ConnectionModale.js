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

export default ({ serviceName, isOpen, onClose }) => {
  function connect() {
    console.log("connect")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect to {serviceName}</ModalHeader>
        <ModalBody>
          <Center>
            <Button align="center" onClick={connect}>Connect!</Button>
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
