import { useEffect, useState } from 'react';
import { Container, Title, Text, Box, Image } from '@mantine/core';
import { sanity } from '@lib/sanity';
import type { AboutUsPage } from '@typedefs/sanity';

export default function About() {
  const [aboutUs, setAboutUs] = useState<AboutUsPage | null>(null);

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
        <Title order={2} mb="md">
          {aboutUs.pageTitle}
        </Title>

        {aboutUs.mission && (
          <Box mb="md">
            <Title order={4}>Our Mission</Title>
            <Text>{aboutUs.mission}</Text>
          </Box>
        )}

        {aboutUs.vision && (
          <Box mb="md">
            <Title order={4}>Our Vision</Title>
            <Text>{aboutUs.vision}</Text>
          </Box>
        )}

        {aboutUs.factoryParagraphs?.map((section, i) => (
          <Box key={i} mb="lg">
            {section.title && (
              <Title order={5} mb="xs">
                {section.title}
              </Title>
            )}
            {section.body && <Text>{section.body}</Text>}
          </Box>
        ))}

        {aboutUs.factoryCarousel?.length && (
          <Box mt="xl">
            <Title order={4} mb="sm">
              Our Factory
            </Title>
            <Box
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
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
                    <Title order={6} mt="xs">
                      {item.title}
                    </Title>
                  )}
                  {item.caption && <Text size="sm">{item.caption}</Text>}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}
