import { useState } from 'react';
import { Menu, Text, useMantineTheme, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@tabler/icons-react';

export default function InfoMenuMobile({
  shouldHeaderBeColoured,
}: {
  shouldHeaderBeColoured: boolean;
}) {
  const theme = useMantineTheme();

  const [menuOpened, setMenuOpened] = useState(false);

  const menuItemNames = ['About', 'Resources'];

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
          Info
          <IconChevronDown size={16} style={{ marginLeft: 4, marginTop: 4 }} />{' '}
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        {menuItemNames.map((menuItemName) => (
          <Menu.Item
            key={menuItemName}
            component={Link}
            to={`/${menuItemName}`}
            w={140} // tighter
          >
            <Text fw={400}>{menuItemName}</Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
