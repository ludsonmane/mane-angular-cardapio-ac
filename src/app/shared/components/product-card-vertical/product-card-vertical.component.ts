import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-product-card-vertical',
    standalone: false,
    templateUrl: './product-card-vertical.component.html',
    styleUrl: './product-card-vertical.component.css'
})
export class ProductCardVerticalComponent {
    @Input() id!: string
    @Input() imageUrl!: string
    @Input() title!: string
    @Input() price!: number

    onNavigate(): void {}
}
