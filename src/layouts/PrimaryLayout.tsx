import { IconHome, IconSettings } from '@tabler/icons-react';
import { Link, Outlet } from 'react-router';
import { AppShell, Box, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './PrimaryLayout.module.css';

export function PrimaryLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 250, lg: 300 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Link to="/">
            <IconHome />
          </Link>
          <Text
            className={classes.headerText}
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Guitar Web
          </Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Box className={classes.navbarLink}>
          <IconHome />
          <Link to="/">Home</Link>
        </Box>
        <Box className={classes.navbarLink}>
          <IconSettings />
          <Link to="/settings">Settings</Link>
        </Box>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
