import { Tabs, Text } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

export function SettingsPage() {
  return (
    <>
      <Tabs defaultValue="colorScheme" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="colorScheme">Color Scheme</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="colorScheme">
          <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
            Select a color scheme:
          </Text>
          <ColorSchemeToggle />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
