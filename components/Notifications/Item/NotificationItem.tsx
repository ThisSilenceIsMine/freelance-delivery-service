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
  MenuItem,
  Collapse,
  SlideFade,
  VStack,
} from '@chakra-ui/react';
import {useDisclosure} from '@chakra-ui/hooks'

import { Notification } from '@lib/types';

export type Props = Notification;
  
export const NotificationItem = ({ title, text }: Props) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <MenuItem>
      <VStack>
        <Heading isTruncated p="1.5" maxW="45ch" size="md" onClick={onToggle}>
          {title}
        </Heading>
        <SlideFade in={isOpen} hidden={!isOpen}>
          <Heading size="sm" maxW="45ch">
            {title}
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

