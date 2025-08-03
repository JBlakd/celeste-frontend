import { useEffect, useState } from 'react';
import { Container, Title, Text, Box, Image, List, useMantineTheme } from '@mantine/core';
import { sanity } from '@lib/sanity';
import type { AboutUsPage } from '@typedefs/sanity';

export default function About() {
  const [aboutUs, setAboutUs] = useState<AboutUsPage | null>(null);
  const theme = useMantineTheme();

  useEffect(() => {
    sanity
      .fetch<AboutUsPage>(
        `*[_type == "aboutUs"][0]{
          pageTitle,
          mission,
          vision,
          factoryParagraphs[]{
            title,
            body
          },
          factoryCarousel[]{
            image{
              asset->{
                url
              }
            },
            title,
            caption
          }
        }`,
      )
      .then((res) => setAboutUs(res))
      .catch((err) => console.error('Couldn’t fetch about us content:', err));
  }, []);

  if (!aboutUs) return null;

  return (
    <>
      <title>Celeste Stone | About Us</title>
      <meta name="description" content="Learn about our mission, vision and partnerships." />
      <link rel="canonical" href="https://celestestone.com.au/about" />

      <Container size="lg" py="xl">
        <Title order={2} mb="xl" c={theme.colors.celesteGold[5]}>
          {aboutUs.pageTitle}
        </Title>

        {aboutUs.mission && (
          <Box mb="xl">
            <Title order={4} mb="xs">
              Our Mission
            </Title>
            <Text c={theme.colors.gray[7]}>{aboutUs.mission}</Text>
          </Box>
        )}

        {aboutUs.vision && (
          <Box mb="xl">
            <Title order={4} mb="xs">
              Our Vision
            </Title>
            <Text c={theme.colors.gray[7]}>{aboutUs.vision}</Text>
          </Box>
        )}

        {aboutUs.factoryParagraphs?.map((section, i) => (
          <Box key={i} mb="xl">
            {section.title && (
              <Title order={4} mb="xs">
                {section.title}
              </Title>
            )}
            {section.body &&
              (section.body.startsWith('-') ? (
                <List spacing="xs" size="md" c={theme.colors.gray[7]} withPadding>
                  {section.body
                    .split('\n')
                    .filter((line) => line.trim().startsWith('-'))
                    .map((line, index) => (
                      <List.Item key={index}>{line.replace(/^\s*-\s*/, '')}</List.Item>
                    ))}
                </List>
              ) : (
                <Text c={theme.colors.gray[7]}>{section.body}</Text>
              ))}
          </Box>
        ))}

        {aboutUs.factoryCarousel?.length && (
          <Box mt="xl">
            <Box
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {aboutUs.factoryCarousel.map((item, i) => (
                <Box key={i}>
                  {item.image?.asset?.url && (
                    <Image
                      src={item.image.asset.url}
                      alt={item.caption || item.title || `Factory image ${i + 1}`}
                      radius="md"
                      fit="cover"
                    />
                  )}
                  {item.title && (
                    <Title order={6} mt="sm">
                      {item.title}
                    </Title>
                  )}
                  {item.caption && (
                    <Text size="sm" c={theme.colors.gray[7]}>
                      {item.caption}
                    </Text>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}
