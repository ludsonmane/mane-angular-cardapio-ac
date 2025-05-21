import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-product-info',
    standalone: false,
    templateUrl: './product-info.component.html',
    styleUrl: './product-info.component.css'
})
export class ProductInfoComponent {
    @Input() title!: string
    @Input() description!: string
    @Input() price!: number
}
