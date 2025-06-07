import { useEffect, useState } from 'react';
import { Menu, Text, useMantineTheme, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'tabler-icons-react';
import { sanity } from '../lib/sanity';

type Tier = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
};

export default function TierMenuMobile({
  headerBackgroundColor,
}: {
  headerBackgroundColor: string;
}) {
  const theme = useMantineTheme();

  const [tiers, setTiers] = useState<Tier[]>([]);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    const fetchTiers = async () => {
      const query = `*[_type == "tier"]{ _id, title, slug }`;
      const data = await sanity.fetch(query);
      setTiers(data);
    };

    fetchTiers();
  }, []);

  return (
    <Menu
      opened={menuOpened}
      onChange={setMenuOpened}
      shadow="md"
      width={120}
      withinPortal
      position="left-start"
      offset={17}
    >
      <Menu.Target>
        <Flex
          variant="subtle"
          color={
            headerBackgroundColor === theme.white ? theme.black : theme.white
          }
          onClick={(event) => {
            event.stopPropagation();
            setMenuOpened((prev) => !prev);
          }}
        >
          Products by Tier{' '}
          <ChevronDown size={16} style={{ marginLeft: 4, marginTop: 4 }} />{' '}
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        {tiers.map((tier) => (
          <Menu.Item
            key={tier._id}
            component={Link}
            to={`/tier/${tier.slug.current}`}
            w={140} // tighter
          >
            <Text fw={400}>{tier.title}</Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
