// src/pages/FindADisplay.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  Title,
  Text,
  Card,
  SimpleGrid,
  Grid,
  Box,
  Divider,
  Badge,
  Group,
  Skeleton,
  ScrollArea,
  ActionIcon,
  useMantineTheme,
  Tooltip,
  type MantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconMapPin, IconExternalLink, IconMail, IconPhone } from '@tabler/icons-react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { sanity } from '@lib/sanity';
import type { Collaborator } from '@typedefs/sanity';
import { showNotification } from '@mantine/notifications';

const MAP_STYLE = { width: '100%', height: '520px' };
const DEFAULT_CENTER = { lat: -33.8688, lng: 151.2093 }; // Sydney

export default function FindADisplay() {
  const theme = useMantineTheme();
  const gold = theme.colors.celesteGold?.[5] ?? theme.colors.yellow[6];
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [loading, setLoading] = useState(true);
  const [collabs, setCollabs] = useState<Collaborator[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'gmaps',
    googleMapsApiKey: import.meta.env.VITE_GMAPS_BROWSER_KEY as string,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    setLoading(true);
    sanity
      .fetch<Collaborator[]>(
        `*[_type == "collaborator"] | order(rank asc){
          _id,
          name,
          website,
          description,
          contactEmail,
          phone,
          address,
          logo {
            asset->{
              url
            }
          },
          "coordinates": coordinates{lat, lng, alt},
          rank
        }`,
      )
      .then((res) => setCollabs(res || []))
      .catch((err) => console.error('Couldn’t fetch collaborators:', err))
      .finally(() => setLoading(false));
  }, []);

  const collabsWithCoords = useMemo(
    () =>
      collabs.filter(
        (c) =>
          c.coordinates &&
          typeof c.coordinates.lat === 'number' &&
          typeof c.coordinates.lng === 'number',
      ),
    [collabs],
  );

  const initialCenter = useMemo(
    () => collabsWithCoords[0]?.coordinates ?? DEFAULT_CENTER,
    [collabsWithCoords],
  );

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    if (!collabsWithCoords.length) return;
    if (collabsWithCoords.length === 1) {
      map.setCenter(collabsWithCoords[0].coordinates!);
      map.setZoom(12);
      return;
    }
    const bounds = new google.maps.LatLngBounds();
    collabsWithCoords.forEach((c) => bounds.extend(c.coordinates!));
    map.fitBounds(bounds);
  };

  const panToCollab = (c: Collaborator) => {
    if (!mapRef.current || !c.coordinates) return;
    mapRef.current.panTo(c.coordinates);
    mapRef.current.setZoom(Math.max(mapRef.current.getZoom() ?? 18, 18));
    setActiveId(c._id);
  };

  const copyText = async (e: React.MouseEvent, text: string, label: 'email' | 'phone') => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      showNotification({ message: `Copied ${label}!`, color: 'teal' });
    } catch {
      showNotification({ message: `Couldn’t copy ${label}`, color: 'red' });
    }
  };

  if (loading || !isLoaded) {
    return (
      <Container size="lg" py="xl">
        <Skeleton height={28} width={280} mb="lg" />
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <SimpleGrid cols={{ base: 1 }} spacing="md">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} withBorder radius="md" p="lg" shadow="sm">
                  <Skeleton height={18} mb="xs" />
                  <Skeleton height={12} width="70%" mb="xs" />
                  <Skeleton height={12} width="50%" />
                </Card>
              ))}
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Card withBorder radius="md" p="sm" shadow="sm">
              <Skeleton height={400} />
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" align="baseline" mb="sm">
        <Title order={2} c={gold}>
          Find a Display
        </Title>
        <Badge variant="light" size="lg">
          Australia
        </Badge>
      </Group>
      <Divider mb="xl" />

      <Grid gutter="xl">
        {/* LEFT: Scrollable list */}
        <Grid.Col span={{ base: 12, md: 7 }} order={{ base: 2, md: 1 }}>
          <ScrollArea.Autosize mah="70vh" type="hover" offsetScrollbars>
            <SimpleGrid cols={{ base: 1 }} spacing="md">
              {collabs.map((c) => {
                const hasCoords = !!c.coordinates;
                const active = activeId === c._id;

                const commonProps = {
                  c,
                  active,
                  hasCoords,
                  theme,
                  onPin: () => hasCoords && panToCollab(c),
                  onCopyEmail: (e: React.MouseEvent) =>
                    c.contactEmail && copyText(e, c.contactEmail, 'email'),
                  onCopyPhone: (e: React.MouseEvent) => c.phone && copyText(e, c.phone, 'phone'),
                };

                return isMobile ? (
                  <MobileCard key={c._id} {...commonProps} />
                ) : (
                  <DesktopCard key={c._id} {...commonProps} />
                );
              })}
            </SimpleGrid>
          </ScrollArea.Autosize>
        </Grid.Col>

        {/* RIGHT: Sticky map */}
        <Grid.Col span={{ base: 12, md: 5 }} order={{ base: 1, md: 2 }}>
          <Box style={{ position: 'sticky', top: 'calc(var(--mantine-spacing-xl) + 64px)' }}>
            <Card withBorder radius="md" p="sm" shadow="sm">
              <GoogleMap
                mapContainerStyle={MAP_STYLE}
                center={initialCenter}
                zoom={10}
                onLoad={handleMapLoad}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                  clickableIcons: false,
                }}
              >
                {collabsWithCoords.map((c) => {
                  return (
                    <Marker
                      key={c._id}
                      position={c.coordinates!}
                      onClick={() => setActiveId(c._id)}
                      icon={
                        c.name.includes('Celeste Stone') && c.logo.asset.url
                          ? {
                              url: c.logo.asset.url,
                              scaledSize: new window.google.maps.Size(32, 32), // adjust this down if it’s still big (e.g. 32,32)
                              anchor: new window.google.maps.Point(24, 24), // keeps the image centred on the point
                            }
                          : {
                              path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
                              fillColor: theme.colors.celesteGold[3],
                              fillOpacity: 1,
                              strokeColor: theme.colors.celesteGold[5],
                              strokeWeight: 2,
                              scale: 1.5,
                            }
                      }
                    />
                  );
                })}

                {collabsWithCoords.map(
                  (c) =>
                    c._id === activeId && (
                      <InfoWindow
                        key={`iw-${c._id}`}
                        position={c.coordinates!}
                        onCloseClick={() => setActiveId(null)}
                      >
                        <div style={{ maxWidth: 260 }}>
                          <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.name}</div>
                          {c.address && (
                            <div style={{ fontSize: 12, marginBottom: 6 }}>{c.address}</div>
                          )}
                          {c.website && (
                            <a
                              href={c.website}
                              target="_blank"
                              rel="noreferrer"
                              style={{ fontSize: 12 }}
                            >
                              Visit website →
                            </a>
                          )}
                        </div>
                      </InfoWindow>
                    ),
                )}
              </GoogleMap>
            </Card>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

/* --------------------- Subcomponents --------------------- */

function DesktopCard({
  c,
  active,
  hasCoords,
  theme,
  onPin,
  onCopyEmail,
  onCopyPhone,
}: {
  c: Collaborator;
  active: boolean;
  hasCoords: boolean;
  theme: MantineTheme;
  onPin: () => false | void;
  onCopyEmail: (e: React.MouseEvent) => '' | Promise<void> | undefined;
  onCopyPhone: (e: React.MouseEvent) => '' | Promise<void> | undefined;
}) {
  return (
    <Card
      withBorder
      radius="md"
      p="lg"
      shadow={active ? 'md' : 'sm'}
      style={{
        borderColor: active ? theme.colors.blue[5] : undefined,
        outline: active ? `2px solid ${theme.colors.blue[3]}` : 'none',
        cursor: hasCoords ? 'pointer' : 'default',
      }}
      onClick={hasCoords ? onPin : undefined}
    >
      <Group justify="space-between" mb={6}>
        <Title order={4}>{c.name}</Title>
        <Group gap="xs">
          {hasCoords && (
            <ActionIcon variant="light" color="blue" title="Show on map" onClick={onPin}>
              <IconMapPin size={18} />
            </ActionIcon>
          )}
          {c.website && (
            <Tooltip label={c.website}>
              <ActionIcon
                variant="subtle"
                component="a"
                href={c.website}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <IconExternalLink size={18} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </Group>
      <Group justify="space-between">
        {c.address && (
          <Text c={theme.colors.gray[7]} fz="sm" mb={6}>
            {c.address}
          </Text>
        )}

        <Group gap="xs" justify="flex-end">
          {c.contactEmail && (
            <Tooltip label={c.contactEmail}>
              <ActionIcon variant="subtle" onClick={onCopyEmail}>
                <IconMail size={18} />
              </ActionIcon>
            </Tooltip>
          )}
          {c.phone && (
            <Tooltip label={c.phone}>
              <ActionIcon variant="subtle" onClick={onCopyPhone}>
                <IconPhone size={18} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </Group>

      {c.description && (
        <Text c={theme.colors.gray[6]} fz="sm" lineClamp={3}>
          {c.description}
        </Text>
      )}
    </Card>
  );
}

function MobileCard({
  c,
  active,
  hasCoords,
  theme,
  onPin,
  onCopyEmail,
  onCopyPhone,
}: {
  c: Collaborator;
  active: boolean;
  hasCoords: boolean;
  theme: MantineTheme;
  onPin: () => false | void;
  onCopyEmail: (e: React.MouseEvent) => '' | Promise<void> | undefined;
  onCopyPhone: (e: React.MouseEvent) => '' | Promise<void> | undefined;
}) {
  return (
    <Card
      withBorder
      radius="md"
      p="md"
      shadow={active ? 'md' : 'sm'}
      style={{
        borderColor: active ? theme.colors.blue[5] : undefined,
        outline: active ? `2px solid ${theme.colors.blue[3]}` : 'none',
        cursor: hasCoords ? 'pointer' : 'default',
      }}
      onClick={hasCoords ? onPin : undefined}
    >
      <Title order={5} mb={4}>
        {c.name}
      </Title>
      {c.address && (
        <Text c={theme.colors.gray[7]} fz="sm" mb={4}>
          {c.address}
        </Text>
      )}
      <Group gap="xs">
        {hasCoords && (
          <ActionIcon variant="light" color="blue" onClick={onPin}>
            <IconMapPin size={18} />
          </ActionIcon>
        )}
        {c.website && (
          <Tooltip label={c.website}>
            <ActionIcon
              variant="subtle"
              component="a"
              href={c.website}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <IconExternalLink size={18} />
            </ActionIcon>
          </Tooltip>
        )}
        {c.contactEmail && (
          <Tooltip label={c.contactEmail}>
            <ActionIcon variant="subtle" onClick={onCopyEmail}>
              <IconMail size={18} />
            </ActionIcon>
          </Tooltip>
        )}
        {c.phone && (
          <Tooltip label={c.phone}>
            <ActionIcon variant="subtle" onClick={onCopyPhone}>
              <IconPhone size={18} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </Card>
  );
}
