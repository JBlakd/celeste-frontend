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
} from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { sanity } from '@lib/sanity';
import type { DeliveryPage } from '@typedefs/sanity';

export default function Delivery() {
  const [delivery, setDelivery] = useState<DeliveryPage | null>(null);
  const [loading, setLoading] = useState(true);
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

  return (
    <>
      <title>Celeste Stone | Delivery Info</title>
      <meta name="description" content="Learn about our delivery policy." />
      <link rel="canonical" href="https://celestestone.com.au/delivery" />

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

          {/* Right: map (sticky on desktop, full-width on mobile) */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            {delivery.map?.asset?.url ? (
              <Box
                style={{
                  position: 'sticky',
                  top: 'calc(var(--mantine-spacing-xl) + 64px)', // comfy offset under header
                }}
              >
                <Card withBorder radius="md" p="sm" shadow="sm">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={delivery.map.asset.url}
                      alt="Map showing our delivery area"
                      radius="md"
                      fit="cover"
                    />
                  </AspectRatio>
                  <Text size="sm" c={theme.colors.gray[6]} ta="center" mt="xs">
                    Delivery area (indicative)
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
