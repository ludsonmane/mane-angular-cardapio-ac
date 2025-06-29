import { ActivatedRoute } from '@angular/router';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { SearchDataService } from '../../services/search-data.service';
import { ProductService } from '../../../../shared/services/product/product.service';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-category-products',
    standalone: false,
    templateUrl: './category-products.component.html',
    styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit, OnDestroy {

    listPortion: string[] = ['Tudo', 'Individual', 'Pra galera']
    selectedPortion: string = 'Tudo'

    listProducts: any[] = []
    filteredProducts: any[] = []

    categoryData: any

    constructor(
        private productService: ProductService,
        @Inject(DOCUMENT) private document: Document,
        private searchDataService: SearchDataService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            const data = params.get('data')
            if (data) {
                const parseData = JSON.parse(data)
                this.loadCategory(parseData)
                this.loadProducts(parseData.name)
            }
        })
    }

    ngOnDestroy(): void {
        this.clearInlineTheme()
    }

    setPortion(item: string) {
        this.selectedPortion = item
        this.filterProducts()
    }

    loadCategory(data: any): void {
        this.categoryData = data

        this.document.documentElement.style.setProperty('--header-bg', data.theme.colorBg)
        if (data.theme.colorText)
            this.document.documentElement.style.setProperty('--color-text', data.theme.colorText)
    }

    loadProducts(category: string): void {
        this.productService.getProductByCategory(category)
            .subscribe((response: any) => {
                this.listProducts = response.data

                // this.filterProducts()
            })
    }

    filterProducts(): void {
        this.filteredProducts = this.listProducts.filter(product => {
            return this.selectedPortion === 'Tudo' ||
                product.portion === this.selectedPortion
        })
    }

    clearInlineTheme(): void {
        this.document.documentElement.style.removeProperty('--header-bg')
        this.document.documentElement.style.removeProperty('--color-text')
    }
}
