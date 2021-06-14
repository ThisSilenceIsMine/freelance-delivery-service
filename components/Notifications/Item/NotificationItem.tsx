import { Heading, Text, MenuItem, SlideFade, VStack, HStack, Icon, Spacer } from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';

import { useDisclosure } from '@chakra-ui/hooks';

import { Notification } from '@lib/types';

// export type Props = Notification;

export interface Props extends Notification {
  
  onDismiss: (id: number | string) => void;
}

export const NotificationItem = ({ title, text, id, onDismiss, time_stamp }: Props) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <MenuItem>
      <VStack>
        <HStack>
          <Heading isTruncated p="1.5" maxW="45ch" size="sm" onClick={onToggle}>
            {title}
          </Heading>
          <Spacer/>
          <Icon as={AiOutlineClose} onClick={() => onDismiss(id)} />
        </HStack>
        <SlideFade in={isOpen} hidden={!isOpen} onClick={onClose}>
          <Heading size="sm" maxW="45ch">
            {time_stamp}
          </Heading>
          <Text maxW="45ch">{text}</Text>
        </SlideFade>
      </VStack>
    </MenuItem>
  );
};

// export const NotificationItem = ({ title, text }: Props) => {
//   return (
//     <Accordion allowToggle maxW="45ch">
//       <AccordionItem>
//         {/* <h2> */}
//           <AccordionButton boxShadow="md">
//             <Tooltip label={title}>
//               <Heading isTruncated p="1.5" size="md">
//                 {title}
//               </Heading>
//             </Tooltip>
//             <AccordionIcon ml="auto" mr="0" />
//             {/* <CloseButton mr="0" /> */}
//           </AccordionButton>
//         {/* </h2> */}
//         <AccordionPanel boxShadow="sm">
// <Heading size="sm">{title}</Heading>
// <Text>{text}</Text>
//         </AccordionPanel>
//       </AccordionItem>
//     </Accordion>
//   );
// };
