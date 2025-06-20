import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-menu-item-section',
    standalone: false,
    templateUrl: './menu-item-section.component.html',
    styleUrl: './menu-item-section.component.css'
})
export class MenuItemSectionComponent {
    @Input() title!: string
    @Input() items!: any[]
}
