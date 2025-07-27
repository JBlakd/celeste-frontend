import {
  Drawer,
  ActionIcon,
  Text,
  Stack,
  Divider,
  ScrollArea,
  Group,
  useMantineTheme,
  Badge,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ShoppingCart, Trash } from 'tabler-icons-react';
import { useCart } from '@context/cart/useCart';
import { ItemQuantityInput } from '@components/Product/ItemQuantityInput';
import { useAuth } from '@context/auth/useAuth';

export function CartDrawer() {
  const theme = useMantineTheme();
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
              <Stack>
                {cart?.items.map((item) => (
                  <Stack
                    key={`${item.id}-${item.finish}`}
                    gap="xs"
                    p="xs"
                    style={{ border: `1px solid ${theme.colors.gray[3]}`, borderRadius: 8 }}
                  >
                    <Group justify="space-between">
                      <Text fw={500}>{item.title}</Text>
                      <Badge>{item.finish}</Badge>
                    </Group>
                    <ItemQuantityInput id={item.id} title={item.title} finish={item.finish} />
                  </Stack>
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
