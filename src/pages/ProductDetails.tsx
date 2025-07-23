import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Text, Loader, Box } from '@mantine/core';
import { sanity } from '../lib/sanity';
import type { Product } from '@typedefs/sanity';
import ProductImages from '@components/Product/ProductImages';
import ProductDescription from '@components/Product/ProductDescription';
import ProductSpecifications from '@components/Product/ProductSpecifications';

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
      },
      range->{
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

  if (!product) return <Text>Product not found</Text>;

  return (
    <>
      <ProductImages product={product} />
      <ProductDescription product={product} />
      <ProductSpecifications product={product} />
    </>
  );
}
