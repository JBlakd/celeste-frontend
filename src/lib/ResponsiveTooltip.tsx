import { useState } from 'react';
import { Tooltip } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

export function ResponsiveTooltip({ label }: { label: React.ReactNode }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, setOpened] = useState(false);

  const toggleTooltip = () => {
    if (isMobile) setOpened((prev) => !prev);
  };

  return (
    <Tooltip
      label={label}
      opened={isMobile ? opened : undefined}
      position="bottom"
      withArrow
      multiline
      transitionProps={{ duration: 150 }}
    >
      <IconInfoCircle
        onClick={toggleTooltip}
        onMouseEnter={!isMobile ? () => setOpened(true) : undefined}
        onMouseLeave={!isMobile ? () => setOpened(false) : undefined}
        size="1.2rem"
      />
    </Tooltip>
  );
}
