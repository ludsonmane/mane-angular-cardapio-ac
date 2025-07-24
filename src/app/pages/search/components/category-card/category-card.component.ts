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
    @Input() dataCategory: any

    constructor(private router: Router) {}

    openCategoryProducts(): void {
        console.log(this.dataCategory)
        const categoryObject = {
            name: this.dataCategory.name,
            theme: this.dataCategory.theme,
            selectedItem: 'Tudo'
        }
        this.router.navigate(['categoria/', JSON.stringify(categoryObject)])
    }
}
