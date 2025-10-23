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
} from '@mantine/core';
import { IconMapPin, IconExternalLink } from '@tabler/icons-react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { sanity } from '@lib/sanity';
import type { Collaborator } from '@typedefs/sanity'; // use the interface you added

const MAP_STYLE = { width: '100%', height: '520px' };
const DEFAULT_CENTER = { lat: -33.8688, lng: 151.2093 }; // Sydney

export default function FindADisplay() {
  const theme = useMantineTheme();
  const gold = theme.colors.celesteGold?.[5] ?? theme.colors.yellow[6];

  const [loading, setLoading] = useState(true);
  const [collabs, setCollabs] = useState<Collaborator[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  console.log('import.meta.env.VITE_GMAPS_BROWSER_KEY', import.meta.env.VITE_GMAPS_BROWSER_KEY);

  // google maps loader
  const { isLoaded } = useJsApiLoader({
    id: 'gmaps',
    googleMapsApiKey: import.meta.env.VITE_GMAPS_BROWSER_KEY as string,
  });

  // hold the map instance to programmatically pan/zoom on card click
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    setLoading(true);
    sanity
      .fetch<Collaborator[]>(
        `*[_type == "collaborator"] | order(rank asc){
          _id,
          _type,
          _rev,
          _createdAt,
          _updatedAt,
          name,
          "slug": slug{_type, current},
          website,
          description,
          contactEmail,
          phone,
          address,
          "coordinates": coordinates{lat, lng, alt},
          rank,
          "logo": logo{
            _type,
            asset->{ _id, url, _type }
          }
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
    mapRef.current.setZoom(Math.max(mapRef.current.getZoom() ?? 12, 12));
    setActiveId(c._id);
  };

  if (loading || !isLoaded) {
    return (
      <>
        <title>Celeste Stone | Find a Display</title>
        <meta name="description" content="Find our collaborator showrooms and displays." />
        <link rel="canonical" href="https://celestestone.com.au/find-a-display" />
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
      </>
    );
  }

  return (
    <>
      <title>Celeste Stone | Find a Display</title>
      <meta name="description" content="Browse our collaborators and view them on the map." />
      <link rel="canonical" href="https://celestestone.com.au/find-a-display" />

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
          {/* LEFT: Scrollable list (first on mobile) */}
          <Grid.Col span={{ base: 12, md: 7 }} order={{ base: 2, md: 1 }}>
            <ScrollArea.Autosize mah="70vh" type="hover" offsetScrollbars>
              <SimpleGrid cols={{ base: 1 }} spacing="md">
                {collabs.map((c) => {
                  const hasCoords = !!c.coordinates;
                  const active = activeId === c._id;
                  return (
                    <Card
                      key={c._id}
                      withBorder
                      radius="md"
                      p="lg"
                      shadow={active ? 'md' : 'sm'}
                      style={{
                        borderColor: active ? theme.colors.blue[5] : undefined,
                        outline: active ? `2px solid ${theme.colors.blue[3]}` : 'none',
                        transition: 'outline-color 120ms ease, border-color 120ms ease',
                        cursor: hasCoords ? 'pointer' : 'default',
                      }}
                      onClick={() => hasCoords && panToCollab(c)}
                    >
                      <Group justify="space-between" mb={6}>
                        <Title order={4} style={{ lineHeight: 1.2 }}>
                          {c.name}
                        </Title>
                        <Group gap="xs">
                          {hasCoords && (
                            <ActionIcon
                              variant="light"
                              color="blue"
                              title="Show on map"
                              onClick={(e) => {
                                e.stopPropagation();
                                panToCollab(c);
                              }}
                            >
                              <IconMapPin size={18} />
                            </ActionIcon>
                          )}
                          {c.website && (
                            <ActionIcon
                              variant="subtle"
                              component="a"
                              href={c.website}
                              target="_blank"
                              rel="noreferrer"
                              title="Visit website"
                            >
                              <IconExternalLink size={18} />
                            </ActionIcon>
                          )}
                        </Group>
                      </Group>

                      {c.address && (
                        <Text c={theme.colors.gray[7]} fz="sm" mb={6}>
                          {c.address}
                        </Text>
                      )}
                      {c.description && (
                        <Text c={theme.colors.gray[6]} fz="sm" lineClamp={3}>
                          {c.description}
                        </Text>
                      )}

                      {!hasCoords && (
                        <Text c={theme.colors.red[6]} fz="xs" mt="xs">
                          No coordinates set — won’t show on map
                        </Text>
                      )}
                    </Card>
                  );
                })}
              </SimpleGrid>
            </ScrollArea.Autosize>
          </Grid.Col>

          {/* RIGHT: Sticky map (first on desktop) */}
          <Grid.Col span={{ base: 12, md: 5 }} order={{ base: 1, md: 2 }}>
            <Box
              style={{
                position: 'sticky',
                top: 'calc(var(--mantine-spacing-xl) + 64px)',
              }}
            >
              <Card withBorder radius="md" p="sm" shadow="sm">
                <div style={{ height: 0 }}>{/* empty div keeps layout calm */}</div>
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
                  {collabsWithCoords.map((c) => (
                    <Marker
                      key={c._id}
                      position={c.coordinates!}
                      onClick={() => setActiveId(c._id)}
                    />
                  ))}

                  {collabsWithCoords.map((c) =>
                    c._id === activeId ? (
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
                    ) : null,
                  )}
                </GoogleMap>
              </Card>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
