import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Text,
  Image,
  List,
  useMantineTheme,
  Card,
  SimpleGrid,
  Grid,
  Box,
  Divider,
  Badge,
  Group,
  Skeleton,
  AspectRatio,
  Modal, // 👈 added
} from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { sanity } from '@lib/sanity';
import type { DeliveryPage } from '@typedefs/sanity';

export default function Delivery() {
  const [delivery, setDelivery] = useState<DeliveryPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapOpen, setMapOpen] = useState(false); // 👈 modal state
  const theme = useMantineTheme();
  const gold = theme.colors.celesteGold?.[5] ?? theme.colors.yellow[6];

  useEffect(() => {
    sanity
      .fetch<DeliveryPage>(
        `*[_type == "delivery"][0]{
          pageTitle,
          paragraphs[]{
            title,
            body
          },
          map{
            asset->{
              url
            }
          }
        }`,
      )
      .then((res) => setDelivery(res))
      .catch((err) => console.error('Couldn’t fetch delivery content:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <title>Celeste Stone | Delivery Info</title>
        <meta name="description" content="Learn about our delivery policy." />
        <link rel="canonical" href="https://celestestone.com.au/delivery" />
        <Container size="lg" py="xl">
          <Skeleton height={28} width={260} mb="lg" />
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <SimpleGrid cols={{ base: 1 }} spacing="md">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} withBorder radius="md" p="lg" shadow="sm">
                    <Skeleton height={20} mb="sm" />
                    <Skeleton height={12} mb="xs" />
                    <Skeleton height={12} width="70%" />
                  </Card>
                ))}
              </SimpleGrid>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Card withBorder radius="md" p={0} shadow="sm">
                <AspectRatio ratio={16 / 9}>
                  <Skeleton />
                </AspectRatio>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </>
    );
  }

  if (!delivery) return null;

  const mapUrl = delivery.map?.asset?.url || '';

  return (
    <>
      <title>Celeste Stone | Delivery Info</title>
      <meta name="description" content="Learn about our delivery policy." />
      <link rel="canonical" href="https://celestestone.com.au/delivery" />

      {/* Map Modal */}
      <Modal
        opened={mapOpen}
        onClose={() => setMapOpen(false)}
        size="auto"
        centered
        withCloseButton={false}
        styles={{
          body: { padding: 0 },
        }}
        withinPortal
        zIndex={9999}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {mapUrl ? (
          <Box
            style={{
              maxWidth: '1400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'black',
            }}
          >
            <img
              src={mapUrl}
              alt="Delivery area map (expanded)"
              // natural size, only constrained by viewport
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto',
                display: 'block',
                borderRadius: '8px',
              }}
            />
          </Box>
        ) : null}
      </Modal>

      <Container size="lg" py="xl">
        <Group justify="space-between" align="baseline" mb="sm">
          <Title order={2} c={gold}>
            {delivery.pageTitle}
          </Title>
          <Badge variant="light" size="lg">
            Sydney region
          </Badge>
        </Group>
        <Divider mb="xl" />

        <Grid gutter="xl">
          {/* Left: content */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <SimpleGrid cols={{ base: 1 }} spacing="md">
              {delivery.paragraphs?.map((section, i) => {
                const isList = !!section.body && section.body.trim().startsWith('-');
                return (
                  <Card key={i} withBorder radius="md" p="lg" shadow="sm">
                    {section.title ? (
                      <Title order={4} mb="xs">
                        {section.title}
                      </Title>
                    ) : null}

                    {section.body ? (
                      isList ? (
                        <List
                          spacing="xs"
                          size="md"
                          c={theme.colors.gray[7]}
                          icon={<IconCircleCheck size={16} />}
                          withPadding
                        >
                          {section.body
                            .split('\n')
                            .filter((line) => line.trim().startsWith('-'))
                            .map((line, index) => (
                              <List.Item key={index}>{line.replace(/^\s*-\s*/, '')}</List.Item>
                            ))}
                        </List>
                      ) : (
                        <Text c={theme.colors.gray[7]} fz="md" lh={1.7}>
                          {section.body}
                        </Text>
                      )
                    ) : null}
                  </Card>
                );
              })}
            </SimpleGrid>
          </Grid.Col>

          {/* Right: map (clickable, sticky on desktop) */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            {mapUrl ? (
              <Box
                style={{
                  position: 'sticky',
                  top: 'calc(var(--mantine-spacing-xl) + 64px)',
                }}
              >
                <Card withBorder radius="md" p="sm" shadow="sm">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={mapUrl}
                      alt="Map showing our delivery area"
                      radius="md"
                      fit="cover"
                      style={{ cursor: 'zoom-in' }}
                      onClick={() => setMapOpen(true)} // 👈 open modal on click
                    />
                  </AspectRatio>
                  <Text size="sm" c={theme.colors.gray[6]} ta="center" mt="xs">
                    Indicative Delivery Map (click to enlarge)
                  </Text>
                </Card>
              </Box>
            ) : null}
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
