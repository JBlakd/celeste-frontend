import { useEffect, useState } from 'react';
import { Menu, Text, useMantineTheme, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@tabler/icons-react';
import type { Range } from '@typedefs/sanity';
import { sanity } from '@lib/sanity';

export default function RangeMenuMobile({
  shouldHeaderBeColoured,
}: {
  shouldHeaderBeColoured: boolean;
}) {
  const theme = useMantineTheme();

  const [ranges, setRanges] = useState<Range[]>([]);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    const fetchRanges = async () => {
      const query = `*[_type == "range"]{ _id, title, slug, rank }`;
      const data = await sanity.fetch<Range[]>(query);
      setRanges(data.sort((a, b) => a.rank - b.rank));
    };

    fetchRanges();
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
          color={shouldHeaderBeColoured ? theme.black : theme.colors.coolWhite[0]}
          onClick={(event) => {
            event.stopPropagation();
            setMenuOpened((prev) => !prev);
          }}
        >
          Products by Range{' '}
          <IconChevronDown size={16} style={{ marginLeft: 4, marginTop: 4 }} />{' '}
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        {ranges
          .filter((range) => range.slug.current !== 'all')
          .map((range) => (
            <Menu.Item
              key={range._id}
              component={Link}
              to={`/range/${range.slug.current}`}
              w={140} // tighter
            >
              <Text fw={400}>{range.title}</Text>
            </Menu.Item>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
}
