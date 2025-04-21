'use client';

import { Badge, ActionIcon } from 'rizzui';
import NotificationDropdown from './notification-dropdown';
import RingBellSolidIcon from 'app/packages/components/icons/ring-bell-solid';
import MessagesDropdown from './messages-dropdown';
import ChatSolidIcon from 'app/packages/components/icons/chat-solid';
import SettingsButton from './settings-button';
import ProfileMenu from './profile-menu';

export default function HeaderMenuRight() {
  return (
    <div className="ms-auto grid shrink-0 grid-cols-4 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant={"text" as any}
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
        >
          <RingBellSolidIcon className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </NotificationDropdown>
      <MessagesDropdown>
        <ActionIcon
          aria-label="Messages"
          variant={"text" as any}
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
        >
          <ChatSolidIcon className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="success"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </MessagesDropdown>

      <SettingsButton />
      <ProfileMenu />
    </div>
  );
}
