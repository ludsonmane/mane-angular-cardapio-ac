import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

    constructor(private router: Router) {}

    openCategoryProducts(): void {
        this.router.navigate(['categoria/', '1'])
    }
}
