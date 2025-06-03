import { useEffect, useState } from 'react';
import { Menu, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { sanity } from '../lib/sanity';
import { ChevronDown } from 'tabler-icons-react';

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
        <Button rightSection={<ChevronDown size={16} />}>
          Products by Tier
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {tiers.map((tier) => (
          <Menu.Item
            key={tier._id}
            component={Link}
            to={`/tiers/${tier.slug.current}`}
          >
            {tier.title}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
