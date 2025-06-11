import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Text, Loader, Center } from '@mantine/core';
import { sanity } from '../lib/sanity';
import type { Product, Tier } from '@typedefs/sanity';
import TierHero from '@components/Tier/TierHero';
import ProductGrid from '@components/Tier/ProductGrid';

export default function DisplayTierProducts() {
  const { tierSlug } = useParams(); // Make sure route param is named "tierSlug"
  const [products, setProducts] = useState<Product[] | null>(null);
  const [tier, setTier] = useState<Tier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tierSlug) return;

    const tierQuery = `*[_type == "tier" && slug.current == $slug][0]{
      title,
      description,
      slug,
      heroImage {
        asset->{
          url
        }
      }
    }`;

    const productsQuery = `*[_type == "product" && tier->slug.current == $slug]{
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

    Promise.all([
      sanity.fetch(tierQuery, { slug: tierSlug }),
      sanity.fetch(productsQuery, { slug: tierSlug }),
    ])
      .then(([tierData, productData]) => {
        setTier(tierData);
        setProducts(productData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch tier or products:', err);
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
      <TierHero tier={tier} />
      <ProductGrid tierSlug={tierSlug} products={products} />
    </>
  );
}
