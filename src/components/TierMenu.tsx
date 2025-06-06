import { useEffect, useState } from 'react';
import { Flex, Menu } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'tabler-icons-react';
import { sanity } from '../lib/sanity';
import classes from '@components/Header/Header.module.css'; // import the navLink styles lad

type Tier = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
};

export default function TierMenu() {
  const [tiers, setTiers] = useState<Tier[]>([]);

  useEffect(() => {
    const fetchTiers = async () => {
      const query = `*[_type == "tier"]{ _id, title, slug }`;
      const data = await sanity.fetch(query);
      setTiers(data);
    };

    fetchTiers();
  }, []);

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Flex
          className={classes.navLink}
          style={{ cursor: 'pointer' }}
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
            {tier.title}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
