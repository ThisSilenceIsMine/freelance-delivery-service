import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  IconButton,
  Flex,
  useColorMode,
} from '@chakra-ui/react';
import { useRef, FC } from 'react';
import { AiOutlineMenu } from 'react-icons/ai'
export const MenuDrawer: FC = ({ children }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <Flex
        w="100%"
        p="4"
        bg={colorMode === "dark" ? "gray.900" : "white"}
        direction="row"
        boxShadow="md"
        justify="flex-start"
        align="center"
      >
        <Button ref={btnRef} variant="ghost" onClick={onOpen} as={IconButton} aria-label="Sidebar Menu" icon={<AiOutlineMenu/>}>
          Меню
        </Button>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
