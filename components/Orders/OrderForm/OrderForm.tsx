import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  Text,
  Textarea,
  NumberInput,
  NumberInputField,
  Button,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  HStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, FormEvent } from 'react';
import { RiMapPin2Line, RiMapPin2Fill, RiPhoneLine } from 'react-icons/ri';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';

import { Form } from '~/components/StyledForm';
import { useForm } from '~/hooks/useForm';
import { TagPicker } from '~/components/TagPicker';
import DatePicker from '~/components/DatePicker/DatePicker';
import { Order, Tag } from '@lib/types';

export enum MODE {
  DEPARTURE,
  DESTINATION,
}

type FormData = Order;

export interface Props {
  departure: string;
  destination: string;
  tags: Tag[];
  onFormSubmit: (_arg0: Partial<FormData>) => void;
  onModeChange: (_arg0: MODE) => void;
}

export const OrderForm = ({ departure, destination, tags, onFormSubmit, onModeChange }: Props) => {
  const { data, handleChange } = useForm<FormData>({ departure, destination });

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onFormSubmit(data);
    },
    [onFormSubmit, data]
  );

  useEffect(() => {
    handleChange('departure', departure);
    handleChange('destination', destination);
  }, [departure, destination])

  return (
    <Form onSubmit={onSubmit}>
      <FormControl isRequired>
        <FormLabel>Заголовок</FormLabel>
        <Input value={data.title ?? ''} onChange={(e) => handleChange('title', e.target.value)} />
      </FormControl>
      <TagPicker tags={tags} onTagsPicked={(tags) => handleChange('tags', tags)} />
      <FormControl isRequired>
        <FormLabel>Точка відправки</FormLabel>
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
          <Input readOnly value={departure} onClick={() => onModeChange(MODE.DEPARTURE)} />
        </InputGroup>
        <FormHelperText>*Виберіть місце на карті</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Точка призначення</FormLabel>
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
          <Input readOnly value={destination} onClick={() => onModeChange(MODE.DESTINATION)} />
        </InputGroup>
        <FormHelperText>*Виберіть місце на карті</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Номер телефону</FormLabel>
        <InputGroup>
          <InputLeftAddon children={<Icon as={RiPhoneLine} />} />
          <Input
            value={data.phoneNumber ?? ''}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
          />
        </InputGroup>
      </FormControl>

      <Accordion allowToggle my="2">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Додаткова інформація
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <FormControl>
              <FormLabel>Дата</FormLabel>
              <DatePicker
                selectedDate={data.date}
                onChange={(date) => handleChange('date', date)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Бюджет</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<Icon as={BiDollar} />} />
                <NumberInput
                  precision={2}
                  w="full"
                  value={data.price}
                  onChange={(value) => handleChange('price', value)}
                >
                  <NumberInputField />
                </NumberInput>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Кількість людей</FormLabel>
              <NumberInput
                w="full"
                value={data.details?.peopleCount} //
                onChange={(value) => handleChange('details.peopleCount', value)}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Вага вантажу</FormLabel>
              <NumberInput
                precision={2}
                w="full"
                value={data.details?.weight} //
                onChange={(value) => handleChange('details.weight', value)}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Розміри вантажу</FormLabel>
              <HStack>
                <NumberInput
                  precision={2}
                  w="1/3"
                  value={data.details?.height} //
                  onChange={(value) => handleChange('details.height', value)}
                >
                  <NumberInputField placeholder="Висота" />
                </NumberInput>
                <NumberInput
                  precision={2}
                  w="1/3"
                  value={data.details?.width} //
                  onChange={(value) => handleChange('details.width', value)}
                >
                  <NumberInputField placeholder="Ширина" />
                </NumberInput>
                <NumberInput
                  precision={2}
                  w="1/3"
                  value={data.details?.length} //
                  onChange={(value) => handleChange('details.length', value)}
                >
                  <NumberInputField placeholder="Довжина" />
                </NumberInput>
              </HStack>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <FormControl isRequired>
        <FormLabel>Деталі замовлення</FormLabel>
        <Textarea
          value={data.description ?? ''}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </FormControl>
      <Button type="submit">Зберегти</Button>
    </Form>
  );
};
