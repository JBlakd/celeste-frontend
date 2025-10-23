import { useState } from 'react';
import { Flex, Menu, Text, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@tabler/icons-react';
import classes from '@components/Header/Header.module.css';

export default function InfoMenuDesktop({
  shouldHeaderBeColoured,
}: {
  shouldHeaderBeColoured: boolean;
}) {
  const theme = useMantineTheme();
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = {
    About: 'about',
    Delivery: 'delivery',
    'Find A Display': 'findADisplay',
    Resources: 'resources',
  };

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
          Info <IconChevronDown size={16} style={{ marginLeft: 4, marginTop: 4 }} />
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        {Object.entries(menuItems).map(([title, endpoint]) => {
          return (
            <Menu.Item key={endpoint} component={Link} to={`/${endpoint}`}>
              <Text fw={400}>{title}</Text>
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
