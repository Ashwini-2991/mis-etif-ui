import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderMenuData } from '../types/header-menu-data';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    headerMenu: HeaderMenuData = [
        {
            label: 'Home',
            route: ['/'],
            icon: 'home'
        },
        {
            label: 'Excel Templates',
            route: ['templates'],
            icon: 'file-text'
        }
            
        // {
        //     label: 'Parent Page 2',
        //     children: [
        //         {
        //             label: 'Menu Item 2.A',
        //             href: '#'
        //         },
        //         {
        //             label: 'MenuItem 2.B',
        //             href: '#'
        //         }
        //     ]
        // },
        // {
        //     label: 'Help',
        //     route: ['/help']
        // } 
    ];
}
