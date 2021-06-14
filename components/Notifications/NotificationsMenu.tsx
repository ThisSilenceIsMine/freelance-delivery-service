import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
  Portal,
  Button,
  Skeleton
} from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';
import { VscBell, VscBellDot } from 'react-icons/vsc'

import { NotificationItem } from './Item/NotificationItem';
import { Notification } from '@lib/types';

export interface Props {
  notifications: Notification[];
  isLoading?: boolean;
  onDismiss: (id: number | string) => void;
}

export const NotificationsMenu = ({ notifications, onDismiss, isLoading }: Props) => {
  return (
    <Menu closeOnSelect={false} closeOnBlur={true} autoSelect={false}>
      <MenuButton
        icon={notifications.length ? <VscBellDot /> : <VscBell />}
        aria-label="Show notifications"
        variant="ghost"
        size="lg"
        as={IconButton}
      />
      <MenuList p="2.5" maxW={["90vw", "45ch", "45ch", "45ch"]}>
        <Skeleton isLoaded={!isLoading}>
          {notifications.length
            ? notifications.map((x) => (
                <NotificationItem
                  title={x.title}
                  text={x.text}
                  id={x.id}
                  key={x.id}
                  time_stamp={x.time_stamp}
                  onDismiss={onDismiss}
                />
              ))
            : 'Всі повідомлення прочитано!'}
        </Skeleton>
      </MenuList>
    </Menu>
  );
};
