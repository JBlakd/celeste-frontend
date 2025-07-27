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
import { ShoppingCart, ShoppingCartX } from 'tabler-icons-react';
import { useCart } from '@context/cart/useCart';
import { ItemQuantityInput } from '@components/Product/ItemQuantityInput';
import { useAuth } from '@context/auth/useAuth';
import type { CartItem as CartItemType } from '@stores/cartStoreEntry';
import { ResponsiveTooltip } from '@lib/ResponsiveTooltip';
import { ButtonWithConfirmation } from '@lib/ButtonWithConfirmation';

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

export function CartDrawer({ onClick }: { onClick?: () => void }) {
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
          <ShoppingCart color={theme.colors.celesteGold[5]} />
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
              color: 'black', // text color
              fontWeight: 600,
              fontSize: '0.75rem',
            },
          }}
        >
          <ActionIcon onClick={open} variant="subtle" size="lg">
            <ShoppingCart />
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
        {cart?.items.length === 0 ? (
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
              <ButtonWithConfirmation
                buttonLabel="Clear Cart"
                modalMessage="Are you sure you want to clear your cart?"
                size={isMobile ? 'lg' : 'sm'}
                color="red"
                variant={isMobile ? 'filled' : 'outline'}
                onConfirm={clearCart}
                iconComponent={isMobile ? <ShoppingCartX /> : undefined}
              />
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
