import { useEffect, useState } from 'react';
import { Spotlight, openSpotlight } from '@mantine/spotlight';
import { Flex, Loader, useMantineTheme } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { sanity } from '@lib/sanity';
import classes from '@components/Header/Header.module.css';
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

export default function SearchProducts({
  shouldHeaderBeColoured,
}: {
  shouldHeaderBeColoured: boolean;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const theme = useMantineTheme();
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

  const getColor = () => {
    if (isHovered) {
      return theme.colors.celesteGold[5];
    }

    return shouldHeaderBeColoured ? theme.black : theme.colors.coolWhite[0];
  };

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
      <Flex
        align="center"
        gap="xs"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={isMobile ? undefined : classes.navLink}
        style={{
          color: getColor(),
          cursor: 'pointer',
        }}
        onClick={openSpotlight}
      >
        {isMobile ? null : 'Search Products'}
        <IconSearch size={isMobile ? '1.75rem' : '1.2rem'} />
      </Flex>
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
