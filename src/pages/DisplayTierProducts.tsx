// src/components/DisplayTierProducts.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Title,
  SimpleGrid,
  Card,
  Image,
  Text,
  Loader,
  Center,
} from '@mantine/core';
import { sanity } from '../lib/sanity';

type Product = {
  _id: string;
  title: string;
  description?: string;
  image?: { asset: { url: string } };
  slug: { current: string };
};

export default function DisplayTierProducts() {
  const { tierSlug } = useParams(); // Make sure route param is named "tierSlug"
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tierSlug) return;

    const query = `*[_type == "product" && tier->slug.current == $slug]{
      _id,
      title,
      description,
      slug,
      image {
        asset->{
          url
        }
      }
    }`;

    sanity
      .fetch(query, { slug: tierSlug })
      .then((res) => {
        setProducts(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, [tierSlug]);

  if (loading)
    return (
      <Center>
        <Loader />
      </Center>
    );
  if (!products?.length)
    return (
      <Center>
        <Text>No products found in this tier.</Text>
      </Center>
    );

  return (
    <>
      <Title order={2} mb="md">
        Products in {tierSlug} Range
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {products.map((product) => (
          <Card
            key={product._id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            {product.image?.asset?.url && (
              <Card.Section>
                <Image
                  src={product.image.asset.url}
                  height={160}
                  alt={product.title}
                />
              </Card.Section>
            )}
            <Text fw={500} mt="md">
              {product.title}
            </Text>
            {product.description && (
              <Text size="sm" color="dimmed">
                {product.description}
              </Text>
            )}
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
