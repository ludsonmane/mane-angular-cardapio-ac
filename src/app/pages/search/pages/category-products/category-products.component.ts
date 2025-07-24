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
    //selectedPortion: string = 'Tudo'
    selectedCategory: string = 'Tudo'
    listProducts: any[] = []
    filteredProducts: any[] = []
    listCategories: any[] = ['Tudo']

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
                if (parseData.selectedItem !== 'Tudo') {
                    this.selectedCategory = parseData.selectedItem
                }
                this.loadCategory(parseData)
                this.loadProducts(parseData.name)

            }
        })
    }

    ngOnDestroy(): void {
        this.clearInlineTheme()
    }

    setPortion(item: string) {
        //this.selectedPortion = item
        this.filterProducts()
    }

    loadCategory(data: any): void {
        this.categoryData = data

        this.document.documentElement.style.setProperty('--header-bg', data.theme.colorBg)
        this.document.documentElement.style.setProperty('--button-bg', data.theme.colorBg)
        if (data.theme.colorText)
            this.document.documentElement.style.setProperty('--color-text', data.theme.colorText)
    }

    loadProducts(category: string): void {
        this.productService.getProductByCategory(category)
            .subscribe((response: any) => {
                this.listProducts = response.data
                const categories = response.data.map((element: any) => element.categories)
                const refinedCategories = ['Tudo']
                for(let i = 0; i < categories.length; i++) {
                    for (let j = 0; j< categories[i].length; j++) {
                        refinedCategories.push(categories[i][j].name)
                    }
                }
                this.listCategories = [... new Set(refinedCategories)]
                this.filterProducts()

                // this.filterProducts()
            })
    }
/*
    filterProducts(): void {
        this.filteredProducts = this.listProducts.filter(product => {
            return this.selectedPortion === 'Tudo' ||
                product.portion === this.selectedPortion
        })
    }
        */

    setCategory(category: string): void {
        this.selectedCategory = category
        this.filterProducts()
    }

    filterProducts() {
        this.filteredProducts = this.listProducts.filter(product => {
            const allCategories = product.categories.map((element: any) => element.name)
            const matchesCategory = this.selectedCategory === 'Tudo' ||
                allCategories.includes(this.selectedCategory)
            /*
            const matchesSearch = this.search
                ? product.name.toLowerCase().includes(this.search.toLowerCase())
                : true*/

            return matchesCategory
        })
    }

    clearInlineTheme(): void {
        this.document.documentElement.style.removeProperty('--header-bg')
        this.document.documentElement.style.removeProperty('--color-text')
    }
}
