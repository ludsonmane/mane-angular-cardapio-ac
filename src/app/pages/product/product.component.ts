import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-product',
    standalone: false,
    templateUrl: './product.component.html',
    styleUrl: './product.component.css'
})
export class ProductComponent {

    scrollY: number = 0

    @HostListener('window:scroll', [])
    onScroll(): void {
        this.scrollY = window.scrollY
    }
}
