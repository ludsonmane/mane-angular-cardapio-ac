import { Component, Input } from '@angular/core';
import { MenuItemModel } from '../../../../shared/models/menu-item.model';

@Component({
    selector: 'app-menu-item-section',
    standalone: false,
    templateUrl: './menu-item-section.component.html',
    styleUrl: './menu-item-section.component.css'
})
export class MenuItemSectionComponent {
    @Input() title!: string
    @Input() items!: MenuItemModel[]
}
