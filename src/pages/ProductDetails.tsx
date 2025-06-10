// src/pages/ProductDetails.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Text, Title, Container, Loader } from '@mantine/core';
import { sanity } from '../lib/sanity';
import type { Product } from '../types/sanity';

export default function ProductDetails() {
  const { productSlug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productSlug) return;

    const query = `*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      description,
      sku,
      finish,
      features,
      dimensions,
      image {
        asset->{
          url
        }
      },
      gallery[]{
        asset->{
          url
        }
      },
      tier->{
        title,
        slug
      }
    }`;

    sanity
      .fetch(query, { slug: productSlug })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [productSlug]);

  if (loading) return <Loader />;

  if (!product) return <Text>Product not found</Text>;

  return (
    <Container size="sm">
      <Title order={2}>{product.title}</Title>
      <Image src={product.image?.asset?.url} alt={product.title} mt="md" />
      <Text mt="md">{product.description}</Text>
      <Text>📐 Dimensions: {product.dimensions}</Text>
      <Text>🧱 Finish: {product.finish}</Text>
      <Text>📌 SKU: {product.sku}</Text>
      <Text mt="sm">🧰 Features:</Text>
      <ul>{product.features?.map((f: string, idx: number) => <li key={idx}>{f}</li>)}</ul>
    </Container>
  );
}
