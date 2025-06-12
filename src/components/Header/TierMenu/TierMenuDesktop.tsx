import { useEffect, useState } from 'react';
import { Flex, Menu, Text, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'tabler-icons-react';
import { sanity } from '@lib/sanity';
import classes from '@components/Header/Header.module.css';
import type { Tier } from '@typedefs/sanity';

export default function TierMenuDesktop({
  shouldHeaderBeColoured,
}: {
  shouldHeaderBeColoured: boolean;
}) {
  const theme = useMantineTheme();
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchTiers = async () => {
      const query = `*[_type == "tier"]{ _id, title, slug, rank }`;
      const data = await sanity.fetch<Tier[]>(query);
      setTiers(data.sort((a, b) => a.rank - b.rank));
    };

    fetchTiers();
  }, []);

  const getColor = () => {
    if (isHovered) {
      return theme.colors.celesteGold[5];
    }

    return shouldHeaderBeColoured ? theme.black : theme.colors.coolWhite[0];
  };

  return (
    <Menu shadow="md" width="9rem" offset={30} trigger="hover" openDelay={100} closeDelay={400}>
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
          Products by Tier <ChevronDown size={16} style={{ marginLeft: 4, marginTop: 4 }} />
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        {tiers.map((tier) => (
          <Menu.Item key={tier._id} component={Link} to={`/tier/${tier.slug.current}`}>
            <Text fw={400}>{tier.title}</Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
