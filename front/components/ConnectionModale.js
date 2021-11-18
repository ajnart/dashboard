import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
        <ModalCloseButton />
        <ModalBody>
          <Button onClick={connect}>Connection...</Button>
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
