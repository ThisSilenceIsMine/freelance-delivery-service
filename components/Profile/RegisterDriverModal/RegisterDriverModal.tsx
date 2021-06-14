import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Tab,
  useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';

import { Driver, Tag } from '@lib/types';
import { DriverForm } from '../DriverProfile/DriverForm';
import { api } from '@lib/Api/backend';
import { renameTagsTo } from '@lib/utils';
import { useMutation, useQueryClient } from 'react-query';

export interface Props {
  tags: Tag[];
  token: string;
  isDriver?: boolean;
}

interface registerVars {
  token: string;
  driver: Partial<Driver>;
}

const registerDriver = ({ token, driver }: registerVars) => {
    return api.post(
      '/user/driver',
      {
        experience: driver?.experience,
        description: driver?.description,
        name: driver?.fullName,
        types: driver.tags && renameTagsTo(driver.tags),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
};

export const RegisterDriverModal = ({ token, tags, isDriver }: Props) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef<HTMLFormElement>(null);

  const queryClient = useQueryClient();
  const { mutate, status } = useMutation(registerDriver, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
      toast({
        title: 'Успіх!',
        description: 'Ви були успішно зареєстровані у якості водія',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      onClose();
    },
    onError: () => {
      toast({
        title: 'Помилка!',
        description: 'Щось пішло не так. Перевірте вхідні дані.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });


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
            <DriverForm onFormSubmit={(driver) => mutate({token, driver})} tagOptions={tags} ref={ref} />
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
