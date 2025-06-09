import { Button, Box, Text } from '@mantine/core';
import type { HomepageSettings } from '@typedefs/sanity';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CallToAction({
  homepageSettings,
}: {
  homepageSettings: HomepageSettings | null;
}) {
  const navigate = useNavigate();

  if (!homepageSettings) {
    return null;
  }

  return (
    <Box mt="xl">
      <Text size="xl" fw={700} mb="sm">
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
