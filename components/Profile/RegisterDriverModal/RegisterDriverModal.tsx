import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react'
import { useDisclosure } from '@chakra-ui/hooks';

import { Driver, Tag } from '@lib/types';
import { DriverProfile } from '../DriverProfile/DriverProfile';

export interface Props {
  tags: Tag[];
  onFormSubmit: (_arg0: Partial<Driver>) => void;
}

export const RegisterDriverModal = ({ onFormSubmit, tags }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef<HTMLFormElement>(null)

  return (
    <>
      <Button onClick={onOpen}>Стати водієм</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Зареєструйтесь як водій</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DriverProfile onFormSubmit={onFormSubmit} tagOptions={tags} ref={ref} />
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