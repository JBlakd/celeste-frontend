import { Paper, Group, Text, Anchor, useMantineTheme } from '@mantine/core';
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
      .fetch<Announcement>(`*[_type == "announcement"][0]{ message, linkText, linkUrl }`)
      .then((res) => setQueriedAnnouncement(res))
      .catch((err) => console.error('Couldn’t fetch announcement content:', err));
  }, []);

  const msg = queriedAnnouncement?.message;
  const linkText = queriedAnnouncement?.linkText;
  const linkUrl = queriedAnnouncement?.linkUrl;

  if (!msg && !linkText) return null;

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
        width: '100vw',
        maxWidth: '100%',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + var(--mantine-spacing-sm))',
        borderTop: '1px solid var(--mantine-color-default-border)',
        background: theme.colors.celesteGold[4],
        boxShadow: 'var(--mantine-shadow-sm)',
      }}
    >
      <Group justify="center" gap="xs" wrap="nowrap" style={{ width: '100%' }}>
        <Text
          size="sm"
          fw={600}
          c={theme.colors.coolWhite[6]}
          ta="center"
          // max width for nicer line breaks on big screens
          style={{ maxWidth: 1100 }}
        >
          {msg}
          {linkText && linkUrl ? (
            <>
              {' '}
              <Anchor
                // keep it inline so it wraps with the sentence
                component="button"
                onClick={() => navigate(linkUrl)}
                fw={700}
                c={theme.colors.coolWhite[6]}
                underline="always"
                aria-label={linkText}
                style={{
                  // slightly bigger tappable area on mobile
                  paddingInline: 2,
                }}
              >
                {linkText}
              </Anchor>
            </>
          ) : null}
        </Text>
      </Group>
    </Paper>
  );
}
