import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
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
          <MenuItem key={x.id}>
            <NotificationItem title={x.title} text={x.text} />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
