import { useState } from 'react';
import {
  Modal,
  Button,
  Text,
  Group,
  Stack,
  rem,
  type MantineSize,
  ActionIcon,
} from '@mantine/core';

type ButtonWithConfirmationProps = {
  onConfirm: () => void;
  buttonLabel: string;
  confirmLabel?: string;
  cancelLabel?: string;
  modalMessage?: string;
  color?: string;
  variant?: 'filled' | 'outline' | 'light' | 'subtle' | 'default' | 'white';
  size?:
    | (string & {})
    | MantineSize
    | 'compact-xs'
    | 'compact-sm'
    | 'compact-md'
    | 'compact-lg'
    | 'compact-xl'
    | undefined;
  iconComponent?: React.ReactNode;
};

export function ButtonWithConfirmation({
  onConfirm,
  buttonLabel,
  size = undefined,
  confirmLabel = 'Yes',
  cancelLabel = 'Cancel',
  modalMessage = 'Are you sure?',
  color = 'red',
  variant = 'filled',
  iconComponent,
}: ButtonWithConfirmationProps) {
  const [opened, setOpened] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpened(false);
  };

  return (
    <>
      {iconComponent ? (
        <ActionIcon color={color} variant={variant} onClick={() => setOpened(true)} size={size}>
          {iconComponent}
        </ActionIcon>
      ) : (
        <Button color={color} variant={variant} onClick={() => setOpened(true)} size={size}>
          {buttonLabel}
        </Button>
      )}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        centered
        size="sm"
        styles={{
          body: { paddingTop: rem(24), paddingBottom: rem(24) },
        }}
      >
        <Stack align="center" gap="0.25rem">
          <Text fw={600} size="lg">
            {modalMessage}
          </Text>

          <Group mt="sm">
            <Button variant="default" onClick={() => setOpened(false)}>
              {cancelLabel}
            </Button>
            <Button color={color} onClick={handleConfirm}>
              {confirmLabel}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
