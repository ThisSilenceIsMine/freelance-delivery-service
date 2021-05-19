import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
} from '@chakra-ui/react'
import {useRef, FC} from 'react'

export const MenuDrawer: FC = ({children}) => {
const { isOpen, onOpen, onClose } = useDisclosure();
const btnRef = useRef(null);

return (
  <>
    <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
      Меню
    </Button>
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          {children}
        </DrawerBody>

      </DrawerContent>
    </Drawer>
  </>
);
}
