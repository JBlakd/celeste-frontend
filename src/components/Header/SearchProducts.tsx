import { useEffect, useState } from 'react';
import { Spotlight, openSpotlight } from '@mantine/spotlight';
import { Flex, Loader, useMantineTheme } from '@mantine/core';
import { Search } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { sanity } from '@lib/sanity';
import classes from '@components/Header/Header.module.css';

type Product = {
  slug: { current: string };
  title: string;
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

  useEffect(() => {
    sanity
      .fetch<Product[]>(`*[_type == "product"]{title, slug}`)
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
    products.map((product) => ({
      label: product.title,
      description: product.slug.current.toUpperCase(),
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
        className={classes.navLink}
        style={{
          color: getColor(),
          cursor: 'pointer',
        }}
        onClick={openSpotlight}
      >
        Search Products
        <Search size="1.2rem" />
      </Flex>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <Search />,
          placeholder: 'Search by Slab Name or ID...',
        }}
        limit={3}
      />
    </>
  );
}
