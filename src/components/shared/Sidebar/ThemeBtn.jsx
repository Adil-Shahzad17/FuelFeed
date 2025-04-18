import { Menu, Button } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';

export default function ThemeBtn() {
    return (
        <Menu width={200} shadow="md">
            <Menu.Target>
                <Button>Toggle menu</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item component="a" href="https://mantine.dev">
                    Mantine website
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconExternalLink size={14} />}
                    component="a"
                    href="https://mantine.dev"
                    target="_blank"
                >
                    External link
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}