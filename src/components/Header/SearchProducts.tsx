import { useEffect, useState } from 'react';
import { Spotlight, openSpotlight } from '@mantine/spotlight';
import { Loader } from '@mantine/core';
import { Search } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { sanity } from '@lib/sanity';

type Product = {
  slug: { current: string };
  title: string;
};

export default function SearchProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      <Search size="1.2rem" onClick={openSpotlight} />
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <Search size={20} stroke="1.5" />,
          placeholder: 'Search by Slab Name or ID...',
        }}
        limit={3}
      />
    </>
  );
}
