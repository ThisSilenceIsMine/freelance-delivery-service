import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  AccordionIcon,
  CloseButton,
  Tooltip,
} from '@chakra-ui/react';
import { Notification } from '@lib/types';

export type Props = Omit<Notification, 'id'>;
  
export const NotificationItem = ({ title, text }: Props) => {
  return (
    <Accordion allowToggle maxW="45ch">
      <AccordionItem>
        <h2>
          <AccordionButton boxShadow="md">
            <Tooltip label={title}>
              <Heading isTruncated p="1.5" size="md">
                {title}
              </Heading>
            </Tooltip>
            <AccordionIcon ml="auto" mr="0" />
            <CloseButton mr="0" />
          </AccordionButton>
        </h2>
        <AccordionPanel boxShadow="sm">
          <Heading size="sm">{title}</Heading>
          <Text>{text}</Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
/*
    
    <Box maxW="45ch" boxShadow="base" p="1.5">
      <Heading boxShadow="base" p="1.5" size="md">{title}</Heading>
      <Text>{text}</Text>
    </Box>
*/
/*
<Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Фільтр Замовлень...
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <OrdersFilter tagOptions={tags} fullWidth={true} onFilterSubmit={onFilterSubmit} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
  */
