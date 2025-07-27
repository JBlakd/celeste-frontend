import {
  Drawer,
  ActionIcon,
  Text,
  Stack,
  Divider,
  ScrollArea,
  Group,
  Badge,
  Flex,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ShoppingCart, Trash } from 'tabler-icons-react';
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
      <ActionIcon onClick={open} variant="subtle" size="lg">
        <ShoppingCart />
        {totalQuantity > 0 && (
          <Badge
            color="red"
            size="sm"
            variant="filled"
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            {totalQuantity}
          </Badge>
        )}
      </ActionIcon>

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
        }}
      >
        {cart?.items.length === 0 ? (
          <Text size="sm" c="dimmed">
            There are no items in your cart.
          </Text>
        ) : (
          <>
            <ScrollArea h={400}>
              <Stack gap={0}>
                {cart?.items.map((item) => (
                  <CartItem key={`${item.id}-${item.finish}`} item={item} />
                ))}
              </Stack>
            </ScrollArea>

            <Divider my="sm" />

            <Group justify="space-between">
              <Text fw={500}>Total items: {totalQuantity}</Text>
              <ActionIcon color="red" variant="light" onClick={clearCart}>
                <Trash />
              </ActionIcon>
            </Group>
          </>
        )}
      </Drawer>
    </>
  );
}
