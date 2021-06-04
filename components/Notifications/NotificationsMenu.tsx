import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
  Portal,
  Button,
} from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';
import { VscBell, VscBellDot } from 'react-icons/vsc'

import { NotificationItem } from './Item/NotificationItem';
import { Notification } from '@lib/types';

export interface Props {
  notifications: Notification[];
}

export const NotificationsMenu = ({ notifications }: Props) => {
  return (
    <Menu closeOnSelect={false} closeOnBlur={true} autoSelect={false}>
      <MenuButton
        icon={notifications.length ? <VscBellDot /> : <VscBell />}
        aria-label="Show notifications"
        variant="ghost"
        size="lg"
        as={IconButton}
      />
      <MenuList p="2.5" maxW="90vw">
        {notifications.length ? notifications.map((x) => (
          <NotificationItem title={x.title} text={x.text} id={x.id} key={x.id} onDismiss={console.log} />
        )) : "Всі повідомлення прочитано!"}
      </MenuList>
    </Menu>
  );
};
