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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AddIcon } from "@chakra-ui/icons";
import ConnectionModale from "./ConnectionModale";
import { useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { ServiceContext } from './hooks/ServiceContext';

const ConnectionModaleWrap = ({ service, selectService }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const serviceContext = useContext(ServiceContext);
  useEffect(() => {
    onOpen();
  }, []);
  function onCloseWrap() {
    onClose();
    selectService("");
  }
  const bite = serviceContext.providers.find((elem) => elem.name == service);
  return (
    <ConnectionModale isOpen={isOpen} onClose={onCloseWrap} service={bite} />
  );
};

const Add = ({ isOpen, onClose, selectService }) => {
  const {
    handleSubmit,
    register
  } = useForm();
  const serviceContext = useContext(ServiceContext);
  const [dataset, setDataset] = useState(serviceContext.providers);
  const [cookies] = useCookies(['user']);

  function onSubmit(data) {
    selectService(data.service);
  }

  useEffect(() => {
    async function fetchList() {
      return await fetch('http://localhost:8080/service/fetchAll?token=' + cookies.user.token)
        .then(res => {
          setDataset(
            serviceContext.providers.filter((elem) => {
              return !(elem.name in res);
            })
          );
        })
        .catch(_ => {
        });
    }
    fetchList();
  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose a service to add</ModalHeader>
          <ModalBody>
            <Center>
              {dataset && <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <Select
                    id="service"
                    placeholder="Choose..."
                    {...register("service", {
                      required: "pls",
                    })}
                  >
                    {dataset.map((service, _) => (
                      <option value={service.name}>{service.name}</option>
                    ))}
                  </Select>
                </FormControl>
                <Box align="center">
                  <Button mt={4} colorScheme="teal" type="submit">
                    Submit
                  </Button>
                </Box>
              </form>}
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, selectService] = useState("");

  const serviceContext = useContext(ServiceContext);
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
      {selectedService == "" ? <Add onClose={onClose} isOpen={isOpen} selectService={selectService} />
        : <ConnectionModaleWrap service={selectedService} selectService={selectService} />}
      {/*selectedService == "" ? <Add onClose={onClose} isOpen={isOpen} selectService={selectService} />
        { : <ConnectionModaleWrap service={selectedService} selectService={selectService} />} */}
    </>

  );
};
