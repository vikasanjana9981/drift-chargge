'use client';

import { useEffect } from 'react';
import { Drawer } from 'rizzui';
import { useDrawer } from './use-drawer';
import cn from 'app/packages/utils/class-names';
import { useLocation } from '@remix-run/react';

export default function GlobalDrawer() {
  const { isOpen, view, placement, containerClassName, closeDrawer } =
    useDrawer();
  const { pathname } = useLocation();
  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      placement={placement}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
      containerClassName={cn(
        'min-w-[320px] max-w-[420px] dark:bg-gray-100',
        containerClassName
      )}
      className="z-[9999]"
    >
      {view}
    </Drawer>
  );
}
