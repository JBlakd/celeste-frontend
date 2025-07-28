import {
  Drawer,
  ActionIcon,
  Text,
  Stack,
  Divider,
  ScrollArea,
  Group,
  Flex,
  Indicator,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconShoppingCart, IconShoppingCartX, IconShoppingCartCheck } from '@tabler/icons-react';
import { useCart } from '@context/cart/useCart';
import { ItemQuantityInput } from '@components/Product/ItemQuantityInput';
import { useAuth } from '@context/auth/useAuth';
import type { CartItem as CartItemType } from '@stores/cartStoreEntry';
import { ResponsiveTooltip } from '@lib/ResponsiveTooltip';
import { ButtonWithConfirmation } from '@lib/ButtonWithConfirmation';
import { showNotification } from '@mantine/notifications';

async function submitCart({ email, items }: { email: string; items: CartItemType[] }) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/receiveOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, items }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data?.error || 'Failed to submit cart';
      showNotification({
        message,
        color: 'red',
      });
      throw new Error(message);
    }

    showNotification({
      message: data.message,
      color: 'green',
    });

    return {
      success: true,
      message: data.message,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    showNotification({
      message,
      color: 'red',
    });
    console.error('🧨 Failed to submit cart:', err);
    return {
      success: false,
      error: message,
    };
  }
}

function CartItem({ item }: { item: CartItemType }) {
  return (
    <Group
      key={`${item.id}-${item.finish}`}
      justify="space-between"
      align="center"
      py="xs"
      style={{
        borderBottom: '1px solid #eee',
      }}
    >
      <Flex direction="column" gap={0} style={{ flex: 1 }}>
        <Text size="sm" fw={500} truncate>
          {item.title}
        </Text>
        <Text size="xs" c="dimmed">
          {item.finish}
        </Text>
      </Flex>

      <ItemQuantityInput id={item.id} title={item.title} finish={item.finish} />
    </Group>
  );
}

export function CartDrawer({
  shouldHeaderBeColoured,
  onClick,
}: {
  shouldHeaderBeColoured: boolean;
  onClick?: () => void;
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { cart, totalQuantity, clearCart } = useCart();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <Flex
          gap="xs"
          align="center"
          onClick={() => {
            open();
            onClick?.();
          }}
        >
          <Text c={theme.colors.celesteGold[5]}>Cart ({totalQuantity} items)</Text>
          <IconShoppingCart color={theme.colors.celesteGold[5]} />
        </Flex>
      ) : (
        <Indicator
          inline
          size={18}
          radius="xl"
          label={totalQuantity > 0 ? totalQuantity : undefined}
          disabled={totalQuantity === 0}
          position="top-end"
          offset={6}
          zIndex={10}
          styles={{
            indicator: {
              color: shouldHeaderBeColoured ? 'black' : 'white', // text color
              fontWeight: 600,
              fontSize: '0.75rem',
            },
          }}
        >
          <ActionIcon onClick={open} variant="subtle" size="lg">
            <IconShoppingCart />
          </ActionIcon>
        </Indicator>
      )}

      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Flex gap="md" align="center">
            <Text fw={700} size="lg">
              Your Cart
            </Text>
            <ResponsiveTooltip
              label={
                <Stack gap="xs">
                  <Text size="xs">
                    Cart contents are not shared between devices, even if you have logged onto the
                    other device with the same account.
                  </Text>
                  <Text size="xs">
                    If you order bookmatched slabs, we will automatically assign half of your order
                    quantity to each side.
                  </Text>
                </Stack>
              }
            />
          </Flex>
        }
        position="right"
        padding="md"
        size={isMobile ? 'xs' : 'md'}
        styles={{
          content: {
            marginTop: 80,
            marginRight: 16,
            height: 'calc(100% - 80px)',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderBottomLeftRadius: 5,
            overflow: 'hidden',
          },
        }}
      >
        {!cart || cart?.items.length === 0 ? (
          <Text size="sm" c="dimmed">
            There are no items in your cart.
          </Text>
        ) : (
          <>
            <ScrollArea h={isMobile ? '60vh' : '70vh'}>
              <Stack gap={0}>
                {cart?.items.map((item) => (
                  <CartItem key={`${item.id}-${item.finish}`} item={item} />
                ))}
              </Stack>
            </ScrollArea>

            <Divider my="sm" />

            <Group justify="space-between">
              <Flex gap={isMobile ? 'lg' : 'xs'}>
                <ButtonWithConfirmation
                  buttonLabel="Clear Cart"
                  modalMessage="Are you sure you want to clear your cart?"
                  size={isMobile ? 'lg' : 'sm'}
                  color="red"
                  variant={isMobile ? 'filled' : 'outline'}
                  onConfirm={clearCart}
                  iconComponent={isMobile ? <IconShoppingCartX /> : undefined}
                />
                <ButtonWithConfirmation
                  buttonLabel="Submit Cart"
                  modalMessage="Are you sure you want to submit your cart?"
                  size={isMobile ? 'lg' : 'sm'}
                  color="green"
                  variant="filled"
                  onConfirm={async () => {
                    await submitCart({
                      email: user.email,
                      items: cart.items,
                    });
                    clearCart();
                    close();
                  }}
                  iconComponent={isMobile ? <IconShoppingCartCheck /> : undefined}
                />
              </Flex>
              <Flex gap="xs">
                <Text fw={700}>Total items:</Text>
                <Text fw={500}>{totalQuantity}</Text>
              </Flex>
            </Group>
          </>
        )}
      </Drawer>
    </>
  );
}
