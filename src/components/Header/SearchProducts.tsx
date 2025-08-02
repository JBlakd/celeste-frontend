import { useEffect, useState } from 'react';
import { Spotlight, openSpotlight } from '@mantine/spotlight';
import { ActionIcon, Loader, Tooltip } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { sanity } from '@lib/sanity';
import { useMediaQuery } from '@mantine/hooks';
import { ItemCartToggle } from '@components/Product/ItemCartToggle';

type Product = {
  slug: { current: string };
  sku: string;
  title: string;
  range: {
    title: string;
  };
  finish: ('Polished' | 'Matte')[];
  features?: string[];
};

export default function SearchProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    sanity
      .fetch<Product[]>(
        `*[_type == "product"]{title, slug, sku, finish, features, range->{ title } }`,
      )
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
      .flatMap((product) => {
        return product.finish.map((finish: 'Polished' | 'Matte') => {
          const id = `${product.sku}-${finish === 'Matte' ? 'M' : 'P'}`;
          return {
            label: `${product.title} | ${product.sku}`,
            description: [product.range.title, finish, ...(product.features ?? [])].join(', '),
            id,
            onClick: () => {
              navigate(`/${product.slug.current}?finish=${finish.toLowerCase()}`);
            },
            rightSection: <ItemCartToggle id={id} title={product.title} finish={finish} />,
          };
        });
      }) || [];

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
        centered={!isMobile}
        maxHeight={isMobile ? '80vh' : '60vh'}
        scrollable
        keepMounted
      />
    </>
  );
}
