import { ProductService } from './../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { ProductModel } from '../../shared/models/product.model';

@Component({
    selector: 'app-product',
    standalone: false,
    templateUrl: './product.component.html',
    styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

    product!: ProductModel
    productId!: string

    scrollY: number = 0

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.productId = this.activatedRoute.snapshot.paramMap.get('id') || ''
        this.getDetailsProduct(this.productId)
    }

    @HostListener('window:scroll', [])
    onScroll(): void {
        this.scrollY = window.scrollY
    }

    getDetailsProduct(id: string): void {
        this.productService.getProductById(id)
            .subscribe((response) => { if (response) this.product = response })
    }
}
