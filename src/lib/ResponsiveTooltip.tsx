import { useState } from 'react';
import { Tooltip, ActionIcon } from '@mantine/core';
import { InfoCircle } from 'tabler-icons-react';
import { useMediaQuery } from '@mantine/hooks';

export function ResponsiveTooltip({ label }: { label: string }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, setOpened] = useState(false);

  const toggleTooltip = () => {
    if (isMobile) setOpened((prev) => !prev);
  };

  return (
    <Tooltip
      label={label}
      opened={isMobile ? opened : undefined}
      position="top"
      withArrow
      transitionProps={{ duration: 150 }}
    >
      <ActionIcon
        variant="subtle"
        size="sm"
        onClick={toggleTooltip}
        onMouseEnter={!isMobile ? () => setOpened(true) : undefined}
        onMouseLeave={!isMobile ? () => setOpened(false) : undefined}
        aria-label="Info"
      >
        <InfoCircle size={16} />
      </ActionIcon>
    </Tooltip>
  );
}
