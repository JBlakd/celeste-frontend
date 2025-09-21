import { Paper, Group, Text, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import type { Announcement } from '@typedefs/sanity';
import { sanity } from '@lib/sanity';
import classes from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
  const theme = useMantineTheme();
  const [queriedAnnouncement, setQueriedAnnouncement] = useState<Announcement | null | undefined>(
    undefined,
  );

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
    <Paper
      className={classes.announcementBar}
      role="region"
      aria-live="polite"
      aria-label="Site announcement"
      withBorder
      radius={0}
      px="1.25rem"
      py="0.3rem"
      style={{
        /* full-width + safe-area padding for iOS notches */
        width: '100vw',
        maxWidth: '100%',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + var(--mantine-spacing-sm))',
        borderTop: '1px solid var(--mantine-color-default-border)',
        background: theme.colors.celesteGold[4],
        boxShadow: 'var(--mantine-shadow-sm)',
      }}
    >
      <Group
        gap="md"
        wrap="nowrap"
        style={{ textAlign: 'center', justifyContent: 'center', width: '100%' }}
      >
        <Text size="sm" fw={600} c={theme.colors.coolWhite[6]}>
          {queriedAnnouncement?.message}
        </Text>
      </Group>
    </Paper>
  );
}
