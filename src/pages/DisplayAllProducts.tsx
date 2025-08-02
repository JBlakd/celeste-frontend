import { useEffect, useState } from 'react';
import { Text, Loader, Center, Box } from '@mantine/core';
import { sanity } from '../lib/sanity';
import type { Product } from '@typedefs/sanity';
import RangeHero from '@components/Range/RangeHero';
import ProductGrid from '@components/Range/ProductGrid';

export default function DisplayAllProducts() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "product"]{
      _id,
      title,
      description,
      finish,
      slug,
      sku,
      image {
        asset->{
          url
        }
      },
      lowRes {
        asset->{
          url
        }
      },
      highResZoomed {
        asset->{
          url
        }
      },
      gallery[] {
        asset->{
          url
        }
      }
    }`;

    sanity
      .fetch<Product[]>(query)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <Loader size="xl" />
      </Box>
    );

  return (
    <>
      <RangeHero range={null} />
      {products?.length ? (
        <ProductGrid products={products} condensed />
      ) : (
        <Center>
          <Text>No products found.</Text>
        </Center>
      )}
    </>
  );
}
