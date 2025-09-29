import { useEffect, useState } from 'react';
import { Container, Title, Text, Image, List, useMantineTheme, Flex } from '@mantine/core';
import { sanity } from '@lib/sanity';
import type { DeliveryPage } from '@typedefs/sanity';

export default function Delivery() {
  const [delivery, setDelivery] = useState<DeliveryPage | null>(null);
  const theme = useMantineTheme();

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
          },
        }`,
      )
      .then((res) => setDelivery(res))
      .catch((err) => console.error('Couldn’t fetch delivery content:', err));
  }, []);

  if (!delivery) return null;

  return (
    <>
      <title>Celeste Stone | Delivery Info</title>
      <meta name="description" content="Learn about our delivery policy." />
      <link rel="canonical" href="https://celestestone.com.au/delivery" />

      <Container size="lg" py="xl">
        <Title order={2} mb="xl" c={theme.colors.celesteGold[5]}>
          {delivery.pageTitle}
        </Title>

        {delivery.paragraphs?.map((section, i) => (
          <Flex gap="0.25rem" key={i}>
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
          </Flex>
        ))}

        {delivery.map?.asset?.url && (
          <Image src={delivery.map.asset.url} alt="Map showing our delivery area" my="xl" />
        )}
      </Container>
    </>
  );
}
