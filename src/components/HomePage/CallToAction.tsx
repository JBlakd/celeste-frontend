import { Button, Box, Text, useMantineTheme } from '@mantine/core';
import type { HomepageSettings } from '@typedefs/sanity';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CallToAction({
  homepageSettings,
}: {
  homepageSettings: HomepageSettings | null;
}) {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  if (!homepageSettings) {
    return null;
  }

  return (
    <Box style={{ border: '5px solid red' }}>
      <Text size="xl" fw={700} mb="sm" c={theme.white}>
        {homepageSettings?.heroText}
      </Text>
      {homepageSettings?.ctaButtonLabel && homepageSettings?.ctaButtonLink && (
        <Button
          component="a"
          variant="filled"
          onClick={() => {
            if (!homepageSettings.ctaButtonLink) {
              return;
            }

            navigate(homepageSettings.ctaButtonLink);
          }}
        >
          {homepageSettings.ctaButtonLabel}
        </Button>
      )}
    </Box>
  );
}
