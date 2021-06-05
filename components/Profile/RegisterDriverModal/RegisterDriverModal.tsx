import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Tab
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';

import { Driver, Tag } from '@lib/types';
import { DriverForm } from '../DriverProfile/DriverForm';

export interface Props {
  tags: Tag[];
  isDriver?: boolean;
  onFormSubmit: (_arg0: Partial<Driver>) => void;
}

export const RegisterDriverModal = ({ onFormSubmit, tags, isDriver }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef<HTMLFormElement>(null);

  return (
    <>
      {/* <Button onClick={onOpen}>Стати водієм</Button> */}
      <Tab onClick={isDriver ? () => {} : onOpen}>Водій</Tab>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Зареєструйтесь як водій</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DriverForm onFormSubmit={onFormSubmit} tagOptions={tags} ref={ref} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() =>
                ref.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
              }
            >
              Зберегти
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Відмінити
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
