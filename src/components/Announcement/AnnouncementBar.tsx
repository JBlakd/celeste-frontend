// AnnouncementBarAffix.tsx
import { Affix, Paper, Group, Text, CloseButton, Transition, useMantineTheme } from '@mantine/core';
import { useReducedMotion } from '@mantine/hooks';
import { useFlags } from '@context/flags/useFlags';
import { useEffect, useState } from 'react';
import type { Announcement } from '@typedefs/sanity';
import { sanity } from '@lib/sanity';

export default function AnnouncementBar({
  zIndex = 400,
  withinPortal = true,
}: {
  zIndex?: number;
  /** set false if you want it rendered in-place instead of a portal */
  withinPortal?: boolean;
}) {
  const theme = useMantineTheme();
  const prefersReduced = useReducedMotion();
  const { flags, setFlag } = useFlags();
  const lastDismissedAnnouncement = flags?.lastDismissedAnnouncement;
  const [queriedAnnouncement, setQueriedAnnouncement] = useState<Announcement | null | undefined>(
    undefined,
  );
  const shouldAnnouncementBeVisible =
    !!queriedAnnouncement?.message && queriedAnnouncement.message !== lastDismissedAnnouncement;

  useEffect(() => {
    sanity
      .fetch<Announcement>(
        `*[_type == "announcement"][0]{
            message
          }`,
      )
      .then((res) => setQueriedAnnouncement(res))
      .catch((err) => console.error('Couldn’t fetch announcement content:', err));
  }, []);

  return (
    <Affix
      position={{ bottom: 0, left: 0 }}
      zIndex={zIndex}
      withinPortal={withinPortal}
      /* stretch full width across viewport */
      style={{ left: 0, right: 0 }}
    >
      <Transition
        mounted={shouldAnnouncementBeVisible}
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
                  {queriedAnnouncement?.message}
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
