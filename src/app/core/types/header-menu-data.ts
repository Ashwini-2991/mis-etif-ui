import { BlueIconName, BlueInputConst } from '@moodys/blue-ng';

export type HeaderMenuData = Array<{
    label: string;
    icon?: BlueInputConst<typeof BlueIconName>;
    href?: string;
    route?: string[];
    children?: HeaderMenuData;
}>;
