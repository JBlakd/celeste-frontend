import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Text, Loader, Center, Box } from '@mantine/core';
import { sanity } from '../lib/sanity';
import type { Product, Range } from '@typedefs/sanity';
import RangeHero from '@components/Range/RangeHero';
import ProductGrid from '@components/Range/ProductGrid';

export default function DisplayRangeProducts() {
  const { rangeSlug } = useParams(); // Make sure route param is named "rangeSlug"
  const [products, setProducts] = useState<Product[] | null>(null);
  const [range, setRange] = useState<Range | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!rangeSlug) return;

    const rangeQuery = `*[_type == "range" && slug.current == $slug][0]{
      title,
      description,
      slug,
      heroImage {
        asset->{
          url
        }
      }
    }`;

    const productsQuery = `*[_type == "product" && range->slug.current == $slug]{
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
      gallery[]{
        asset->{
          url
        }
      }
    }`;

    Promise.all([
      sanity.fetch(rangeQuery, { slug: rangeSlug }),
      sanity.fetch(productsQuery, { slug: rangeSlug }),
    ])
      .then(([rangeData, productData]) => {
        setRange(rangeData);
        setProducts(productData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch range or products:', err);
        setLoading(false);
      });
  }, [rangeSlug]);

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
          zIndex: 9999, // stays on top
        }}
      >
        <Loader size="xl" />
      </Box>
    );

  return (
    <>
      <RangeHero range={range} />
      {products?.length ? (
        <ProductGrid products={products} />
      ) : (
        <Center>
          <Text>No products found in this range.</Text>
        </Center>
      )}
    </>
  );
}
