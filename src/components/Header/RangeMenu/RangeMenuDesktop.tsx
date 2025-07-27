import { useEffect, useState } from 'react';
import { Flex, Menu, Text, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@tabler/icons-react';
import { sanity } from '@lib/sanity';
import classes from '@components/Header/Header.module.css';
import type { Range } from '@typedefs/sanity';

export default function RangeMenuDesktop({
  shouldHeaderBeColoured,
}: {
  shouldHeaderBeColoured: boolean;
}) {
  const theme = useMantineTheme();
  const [ranges, setRanges] = useState<Range[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchRanges = async () => {
      const query = `*[_type == "range"]{ _id, title, slug, rank }`;
      const data = await sanity.fetch<Range[]>(query);
      setRanges(data.sort((a, b) => a.rank - b.rank));
    };

    fetchRanges();
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
          Products by Range <IconChevronDown size={16} style={{ marginLeft: 4, marginTop: 4 }} />
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        {ranges.map((range) => (
          <Menu.Item key={range._id} component={Link} to={`/range/${range.slug.current}`}>
            <Text fw={400}>{range.title}</Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
