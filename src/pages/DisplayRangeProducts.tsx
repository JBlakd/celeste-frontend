import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Text, Loader, Center } from '@mantine/core';
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
      slug,
      sku,
      image {
        asset->{
          url
        }
      },
      lowResZoomed {
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
      <Center>
        <Loader />
      </Center>
    );

  return (
    <>
      <RangeHero range={range} />
      {products?.length ? (
        <ProductGrid rangeSlug={rangeSlug} products={products} />
      ) : (
        <Center>
          <Text>No products found in this range.</Text>
        </Center>
      )}
    </>
  );
}
