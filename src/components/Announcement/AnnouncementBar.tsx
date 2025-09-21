// AnnouncementBarAffix.tsx
import { Affix, Paper, Group, Text, CloseButton, Transition, useMantineTheme } from '@mantine/core';
import { useReducedMotion } from '@mantine/hooks';
import { useFlags } from '@context/flags/useFlags';
import type { ReactNode } from 'react';

export default function AnnouncementBar({
  message,
  zIndex = 400,
  withinPortal = true,
}: {
  message: ReactNode;
  zIndex?: number;
  /** set false if you want it rendered in-place instead of a portal */
  withinPortal?: boolean;
}) {
  const theme = useMantineTheme();
  const prefersReduced = useReducedMotion();
  const { flags, setFlag } = useFlags();
  const isAnnouncementDismissed = flags?.isAnnouncementDismissed;

  return (
    <Affix
      position={{ bottom: 0, left: 0 }}
      zIndex={zIndex}
      withinPortal={withinPortal}
      /* stretch full width across viewport */
      style={{ left: 0, right: 0 }}
    >
      <Transition
        mounted={!isAnnouncementDismissed}
        transition="slide-up"
        duration={prefersReduced ? 0 : 200}
        timingFunction="ease"
      >
        {(styles) => (
          <Paper
            role="region"
            aria-live="polite"
            aria-label="Site announcement"
            withBorder
            radius={0}
            p="0.2rem"
            style={{
              ...styles,
              /* full-width + safe-area padding for iOS notches */
              width: '100vw',
              maxWidth: '100%',
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + var(--mantine-spacing-sm))',
              borderTop: '1px solid var(--mantine-color-default-border)',
              background: theme.colors.celesteGold[4],
              boxShadow: 'var(--mantine-shadow-sm)',
            }}
          >
            <Group justify="space-between" gap="xs" wrap="nowrap">
              <Group
                gap="md"
                wrap="nowrap"
                style={{ textAlign: 'center', justifyContent: 'center', width: '100%' }}
              >
                <Text size="sm" fw={600} c={theme.colors.coolWhite[6]}>
                  {message}
                </Text>
              </Group>

              <CloseButton
                aria-label="Dismiss announcement"
                onClick={() => setFlag('isAnnouncementDismissed', true)}
                c={theme.colors.coolWhite[6]}
                variant="transparent"
              />
            </Group>
          </Paper>
        )}
      </Transition>
    </Affix>
  );
}
