import { Paper, Group, Text, useMantineTheme, Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import type { Announcement } from '@typedefs/sanity';
import { sanity } from '@lib/sanity';
import classes from './AnnouncementBar.module.css';
import { useNavigate } from 'react-router-dom';

export default function AnnouncementBar() {
  const theme = useMantineTheme();
  const [queriedAnnouncement, setQueriedAnnouncement] = useState<Announcement | null | undefined>(
    undefined,
  );
  const navigate = useNavigate();

  useEffect(() => {
    sanity
      .fetch<Announcement>(
        `*[_type == "announcement"][0]{
            message,
            linkText,
            linkUrl
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
        <Flex gap="0.25rem">
          <Text size="sm" fw={600} c={theme.colors.coolWhite[6]}>
            {queriedAnnouncement?.message}
          </Text>
          {queriedAnnouncement?.linkUrl && queriedAnnouncement?.linkText && (
            <Text
              size="sm"
              fw={700}
              c={theme.colors.coolWhite[6]}
              td="underline"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(queriedAnnouncement?.linkUrl || '/')}
            >
              {queriedAnnouncement?.linkText}
            </Text>
          )}
        </Flex>
      </Group>
    </Paper>
  );
}
