import { useEffect, useState } from 'react';
import { Spotlight, openSpotlight } from '@mantine/spotlight';
import { ActionIcon, Loader, Tooltip } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { sanity } from '@lib/sanity';
import { useMediaQuery } from '@mantine/hooks';

type Product = {
  slug: { current: string };
  title: string;
  range: {
    title: string;
  };
  finish: string[];
  features?: string[];
};

export default function SearchProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    sanity
      .fetch<Product[]>(`*[_type == "product"]{title, slug, finish, features, range->{ title } }`)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products', err);
        setLoading(false);
      });
  }, []);

  const actions =
    products
      .filter((product) => product.range)
      .map((product) => ({
        label: `${product.title} | ${product.slug.current.toUpperCase()}`,
        description: [product.range.title, ...product.finish, ...(product.features ?? [])].join(
          ', ',
        ),
        id: product.slug.current,
        onClick: () => {
          navigate(`/${product.slug.current}`);
        },
      })) || [];

  if (loading) {
    return <Loader size="xs" />;
  }

  return (
    <>
      <Tooltip label="Search Products" position="bottom" offset={25}>
        <ActionIcon variant="subtle" size="lg" onClick={openSpotlight}>
          <IconSearch />
        </ActionIcon>
      </Tooltip>

      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <IconSearch />,
          placeholder: `${isMobile ? '' : 'Search by '}Slab Name, ID, Range, or Feature...`,
        }}
        limit={isMobile ? 3 : 7}
        centered={!isMobile}
      />
    </>
  );
}
