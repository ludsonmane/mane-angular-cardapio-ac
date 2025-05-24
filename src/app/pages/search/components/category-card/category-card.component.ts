import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-category-card',
    standalone: false,
    templateUrl: './category-card.component.html',
    styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
    @Input() isVertical?: boolean = false
    @Input() name!: string
    @Input() imageUrl!: string
    @Input() colorBg!: string
    @Input() colorText!: string
}
