import {
  Heading,
  Button,
  Wrap,
  Tag,
  Input,
  InputLeftAddon,
  InputGroup,
  Stack,
  Icon,
  Text,
  FormControl,
  FormHelperText,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Spacer,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { RiMapPin2Line, RiMapPin2Fill, RiPhoneLine } from 'react-icons/ri';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { Order } from '~/lib/types';
import { useState } from 'react';
import { api } from '@lib/Api/backend';

// export interface Props {
//   order: Order;
// }

export interface Props extends Order {
  isAdmin?: boolean;
  isDriver?: boolean;
  isOwner?: boolean;
  token?: string;
}

export const OrderDisplay = ({
  id,
  title,
  tags,
  details,
  destination,
  departure,
  phoneNumber,
  date,
  price,
  description,
  isAdmin,
  isDriver,
  isOwner,
  token,
}: Props) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [reason, setReason] = useState('');

  const showMenu = isDriver || isOwner || isAdmin;

  return (
    <Stack direction="column">
      <Stack direction="row">
        <Heading>{title}</Heading>
        <Spacer/>
        {(showMenu) ? (
          <Menu>
            <MenuButton>Меню</MenuButton>
            <MenuList>
              {isOwner && (
                <NextLink href={`/orders/${id}/edit`}>
                  <MenuItem>Редагувати</MenuItem>
                </NextLink>
              )}
              {isDriver && <MenuItem onClick={() => applyForOrder(id, token)}>Відгукнутись</MenuItem>}
              {isAdmin && <MenuItem onClick={() => onToggle()}>Заблокувати</MenuItem>}
            </MenuList>
          </Menu>
        ) : null}
      </Stack>
      {tags && (
        <Wrap p="2" boxShadow="base">
          {tags.map((x) => (
            <Tag key={x.value}>{x.label}</Tag>
          ))}
        </Wrap>
      )}
      <InputGroup>
        <InputLeftAddon
          minW="80px"
          children={
            <>
              <Icon as={RiMapPin2Line} mr="2" />
              <Text>З</Text>
            </>
          }
        />
        <Input readOnly value={departure} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon
          minW="80px"
          children={
            <>
              <Icon as={RiMapPin2Fill} mr="2" />
              <Text>До</Text>
            </>
          }
        />
        <Input readOnly value={destination} />
      </InputGroup>
      <Stack direction={['column', 'column', 'row', 'row']}>
        {date && (
          <InputGroup>
            <InputLeftAddon children={<Icon as={AiOutlineCalendar} />} />
            <Input readOnly value={date.toString()} />
          </InputGroup>
        )}
        {price && (
          <InputGroup>
            <InputLeftAddon children={<Icon as={BiDollar} />} />
            <Input readOnly value={price} />
          </InputGroup>
        )}
        <InputGroup>
          <InputLeftAddon children={<Icon as={RiPhoneLine} />} />
          <Input readOnly value={phoneNumber} />
        </InputGroup>
      </Stack>
      {details?.width && details?.height && details?.length && (
        <FormControl>
          <FormLabel>Розміри вантажу:</FormLabel>
          <Stack direction="row">
            <Input readOnly value={details?.width} />
            <Input readOnly value={details?.height} />
            <Input readOnly value={details?.length} />
          </Stack>
        </FormControl>
      )}
      {details?.weight && (
        <FormControl>
          <FormLabel>Вага вантажу (кг):</FormLabel>
          <Input readOnly value={details?.weight} />
        </FormControl>
      )}
      {details?.peopleCount && (
        <FormControl>
          <FormLabel>Кількість людей:</FormLabel>
          <Input readOnly value={details?.peopleCount} />
        </FormControl>
      )}
      <Text>{description}</Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Заблокувати оголошення</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Вкажіть причину</FormLabel>
              <Textarea value={reason} onChange={(e) => setReason(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="orange"
              onClick={() => suspendOrder(id, reason, token)}
            >
              Підтвердити
            </Button>
            <Button ml={3} onClick={onClose}>
              Відмінити
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

async function suspendOrder(id: number | string, reason: string, token: string | undefined) {
  try {
    if (!token) {
      console.error('Cannot suspend order! Reason: Token not provided.');
      return;
    }
    await api.post(
      `/admin/blockAdvertisement/${id}`,
      {
        title: 'Оголошення заблоковано!',
        message: reason,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(`Cannot suspend order! Reason: ${error}`);
  }
}

async function applyForOrder(advertisement_id: number | string, token: string | undefined) {
  try {
    if (!token) {
      console.error('Cannot apply for order! Reason: Token not provided.');
      return;
    }
    await api.get(
      '/user/driver/respond/',
      {
        params: {
          advertisement_id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.error(`Cannot suspend order! Reason: ${error}`);
  }
}
