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
  Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ShoppingCart } from 'tabler-icons-react';
import { useCart } from '@context/cart/useCart';
import { ItemQuantityInput } from '@components/Product/ItemQuantityInput';
import { useAuth } from '@context/auth/useAuth';
import type { CartItem as CartItemType } from '@stores/cartStoreEntry';

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

export function CartDrawer() {
  const [opened, { open, close }] = useDisclosure(false);
  const { cart, totalQuantity, clearCart } = useCart();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <>
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

      <Drawer
        opened={opened}
        onClose={close}
        title="Your Cart"
        position="right"
        padding="md"
        size="md"
        styles={{
          content: {
            marginTop: 80,
            marginRight: 16,
            height: 'calc(100% - 80px)',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderBottomLeftRadius: 5,
            overflow: 'hidden', // keeps inner content clipped to the curve
          },
          title: {
            fontWeight: 700,
            fontSize: '1.5rem',
          },
        }}
      >
        {cart?.items.length === 0 ? (
          <Text size="sm" c="dimmed">
            There are no items in your cart.
          </Text>
        ) : (
          <>
            <ScrollArea h="75vh">
              <Stack gap={0}>
                {cart?.items.map((item) => (
                  <CartItem key={`${item.id}-${item.finish}`} item={item} />
                ))}
              </Stack>
            </ScrollArea>

            <Divider my="sm" />

            <Group justify="space-between">
              <Button color="red" variant="light" onClick={clearCart}>
                Clear Cart
              </Button>
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
