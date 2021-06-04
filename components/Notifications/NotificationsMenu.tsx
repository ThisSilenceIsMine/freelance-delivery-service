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

import { NotificationItem } from './Item/NotificationItem';
import { Notification } from '@lib/types';

export interface Props {
  notifications: Notification[];
}

export const NotificationsMenu = ({ notifications }: Props) => {
  return (
    <Menu closeOnSelect={false} closeOnBlur={true} autoSelect={false}>
      <MenuButton
        icon={<FiBell />}
        aria-label="Show notifications"
        variant="ghost"
        as={IconButton}
      />
      <MenuList p="2.5">
        {notifications.map((x) => (
          <NotificationItem title={x.title} text={x.text} id={x.id} key={x.id} onDismiss={console.log} />
        ))}
      </MenuList>
    </Menu>
  );
};
