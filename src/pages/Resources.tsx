import { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Title,
  Text,
  Box,
  Card,
  Group,
  Anchor,
  Badge,
  Button,
  List,
  useMantineTheme,
  Skeleton,
  SimpleGrid,
} from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { sanity } from '@lib/sanity';
import type { ResourcePage } from '@typedefs/sanity';

function bytesToReadable(n?: number) {
  if (!n || n <= 0) return '';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(n) / Math.log(1024));
  const size = (n / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1);
  return `${size} ${units[i]}`;
}

export default function Resources() {
  const [data, setData] = useState<ResourcePage | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useMantineTheme();

  useEffect(() => {
    setLoading(true);
    sanity
      .fetch<ResourcePage>(
        `*[_type == "resourcesPage"][0]{
          pageTitle,
          paragraphs,
          resources[]{
            title,
            description,
            file{
              asset->{
                url,
                originalFilename,
                mimeType,
                size
              }
            }
          }
        }`,
      )
      .then((res) => setData(res))
      .catch((err) => console.error('Couldn’t fetch resources page:', err))
      .finally(() => setLoading(false));
  }, []);

  const hasResources = useMemo(() => (data?.resources?.length ?? 0) > 0, [data]);

  if (loading) {
    return (
      <>
        <title>Celeste Stone | Resources</title>
        <meta name="description" content="Download brochures, spec sheets, and documents." />
        <link rel="canonical" href="https://celestestone.com.au/resources" />
        <Container size="lg" py="xl">
          <Skeleton height={28} width={240} mb="lg" />
          <Skeleton height={16} mt="xs" />
          <Skeleton height={16} mt="xs" />
          <Skeleton height={16} mt="xs" width="70%" />
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md" mt="xl">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} withBorder radius="md">
                <Skeleton height={18} mb="sm" />
                <Skeleton height={12} mb="xs" />
                <Skeleton height={12} width="60%" />
                <Skeleton height={34} mt="md" />
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </>
    );
  }

  if (!data) return null;

  return (
    <>
      <title>Celeste Stone | Resources</title>
      <meta name="description" content="Download brochures, spec sheets, and documents." />
      <link rel="canonical" href="https://celestestone.com.au/resources" />

      <Container size="lg" py="xl">
        <Title order={2} mb="xl" c={theme.colors.celesteGold?.[5] ?? theme.colors.yellow[6]}>
          {data.pageTitle || 'Resources'}
        </Title>

        {data.paragraphs?.length ? (
          <Box mb="xl">
            {data.paragraphs.map((p, idx) =>
              p.trim().startsWith('-') ? (
                <List key={idx} spacing="xs" size="md" c={theme.colors.gray[7]} withPadding mb="md">
                  {p
                    .split('\n')
                    .filter((line) => line.trim().startsWith('-'))
                    .map((line, i) => (
                      <List.Item key={i}>{line.replace(/^\s*-\s*/, '')}</List.Item>
                    ))}
                </List>
              ) : (
                <Text key={idx} c={theme.colors.gray[7]} mb="sm">
                  {p}
                </Text>
              ),
            )}
          </Box>
        ) : null}

        {hasResources ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 3 }} spacing="md">
            {data.resources!.map((res, i) => {
              const asset = res.file?.asset;
              const baseUrl = asset?.url ?? '';
              const filename = asset?.originalFilename || 'download';
              const downloadUrl = baseUrl ? `${baseUrl}?dl=${encodeURIComponent(filename)}` : '';
              const size = bytesToReadable(asset?.size);
              const mime = asset?.mimeType ?? '';
              const mimeLabel = mime ? mime.split('/').pop()?.toLowerCase() : '';

              return (
                <Card key={i} withBorder radius="md" padding="lg">
                  <Group justify="space-between" align="start" mb="xs">
                    <Title order={5} style={{ lineHeight: 1.3 }}>
                      {res.title || filename || `File ${i + 1}`}
                    </Title>
                    {mimeLabel ? <Badge variant="light">{mimeLabel}</Badge> : null}
                  </Group>

                  {res.description ? (
                    <Text size="sm" c={theme.colors.gray[7]} mb="sm">
                      {res.description}
                    </Text>
                  ) : null}

                  <Text size="xs" c={theme.colors.gray[6]} lineClamp={1}>
                    {asset?.originalFilename}
                  </Text>

                  <Text size="xs" c={theme.colors.gray[6]} mb="md">
                    {size ? `${size}` : ''}
                  </Text>

                  <Group justify="space-between">
                    {baseUrl ? (
                      <>
                        <Anchor
                          href={baseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          c={theme.colors.blue[6]}
                          size="sm"
                        >
                          Open in new tab
                        </Anchor>
                        <Button
                          component="a"
                          href={downloadUrl} // force attachment via ?dl=
                          leftSection={<IconDownload size={16} />}
                          variant="filled"
                          color="dark"
                        >
                          Download
                        </Button>
                      </>
                    ) : (
                      <Text size="sm" c={theme.colors.red[6]}>
                        File missing
                      </Text>
                    )}
                  </Group>
                </Card>
              );
            })}
          </SimpleGrid>
        ) : (
          <Text c={theme.colors.gray[7]}>No resources yet. Check back soon.</Text>
        )}
      </Container>
    </>
  );
}
