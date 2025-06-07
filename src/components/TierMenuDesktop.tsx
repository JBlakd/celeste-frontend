import { useEffect, useState } from 'react';
import { Flex, Menu, Text, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'tabler-icons-react';
import { sanity } from '../lib/sanity';
import classes from '@components/Header/Header.module.css';

type Tier = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
};

export default function TierMenuDesktop({
  headerBackgroundColor,
}: {
  headerBackgroundColor: string;
}) {
  const theme = useMantineTheme();
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchTiers = async () => {
      const query = `*[_type == "tier"]{ _id, title, slug }`;
      const data = await sanity.fetch(query);
      setTiers(data);
    };

    fetchTiers();
  }, []);

  const getColor = () => {
    if (isHovered) {
      return theme.colors.celesteGold[5];
    }

    return headerBackgroundColor === theme.white ? theme.black : theme.white;
  };

  return (
    <Menu
      shadow="md"
      width="9rem"
      offset={30}
      trigger="hover"
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <Flex
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={classes.navLink}
          style={{
            color: getColor(),
            cursor: 'pointer',
          }}
          align="center"
        >
          Products by Tier{' '}
          <ChevronDown size={16} style={{ marginLeft: 4, marginTop: 4 }} />
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        {tiers.map((tier) => (
          <Menu.Item
            key={tier._id}
            component={Link}
            to={`/tier/${tier.slug.current}`}
          >
            <Text fw={400}>{tier.title}</Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
