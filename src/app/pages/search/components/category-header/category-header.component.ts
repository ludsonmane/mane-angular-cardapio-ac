import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-category-header',
    standalone: false,
    templateUrl: './category-header.component.html',
    styleUrl: './category-header.component.css'
})
export class CategoryHeaderComponent {
    @Input() title!: string
    @Input() imageUrl!: string
    @Input() scrolled: boolean = false
}
