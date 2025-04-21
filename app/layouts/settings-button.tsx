'use client';

import { usePresets } from 'app/config/color-presets';
import { useDirection } from 'app/packages/hooks/use-direction';
import { useDrawer } from 'app/shared/drawer-views/use-drawer';
import { lazy, Suspense, useEffect, startTransition } from 'react';
import { ActionIcon } from 'rizzui';
import { useApplyColorPreset, useColorPresets } from './settings/use-theme-color';
import cn from 'app/packages/utils/class-names';
import DrawerHeader from './drawer-header';
import CogSolidIcon from 'app/packages/components/icons/cog-solid';

// Lazy load the SettingsDrawer component
const SettingsDrawer = lazy(() => import("app/layouts/settings-drawer"));

export default function SettingsButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const COLOR_PRESETS = usePresets();
  const { openDrawer, closeDrawer } = useDrawer();
  const { direction } = useDirection();
  const { colorPresets } = useColorPresets();

  // Apply color presets
  useApplyColorPreset<any>(colorPresets ?? COLOR_PRESETS[0].colors);

  // Set the `dir` attribute on the HTML tag when the direction changes
  useEffect(() => {
    document.documentElement.dir = direction ?? 'ltr';
  }, [direction]);

  return (
    <ActionIcon
      aria-label="Settings"
      variant={"text" as any}
      className={cn(
        'relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9',
        className
      )}
      onClick={() => {
        // Wrap state update in startTransition to prevent blocking UI
        startTransition(() => {
          openDrawer({
            view: (
              <Suspense fallback={<div className="p-4 text-gray-600">Loading settings...</div>}>
                <DrawerHeader onClose={closeDrawer} />
                <SettingsDrawer />
              </Suspense>
            ),
            placement: 'right',
            containerClassName: 'max-w-[420px]',
          });
        });
      }}
    >
      {children ? (
        children
      ) : (
        <CogSolidIcon
          strokeWidth={1.8}
          className="h-[22px] w-auto animate-spin-slow"
        />
      )}
    </ActionIcon>
  );
}
