import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../../../shared/services/restaurant/restaurant.service';
import { DOCUMENT } from '@angular/common';
import { ProductService } from '../../../../shared/services/product/product.service';

@Component({
    selector: 'app-details-restaurant',
    standalone: false,
    templateUrl: './details-restaurant.component.html',
    styleUrl: './details-restaurant.component.css'
})
export class DetailsRestaurantComponent implements OnInit, OnDestroy {
    restaurant!: any;
    search: string = '';
    selectedCategory: string = ''; // será preenchido com a 1ª categoria real

    listChefTips: any[] = [];
    listCategories: any[] = [];
    listProducts: any[] = [];
    filteredProducts: any[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private restaurantService: RestaurantService,
        @Inject(DOCUMENT) private document: Document,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.loadDetailsRestaurand(id);
                this.loadChefTips();
                this.loadAllProducts(id);
            }
        });
    }

    ngOnDestroy(): void {
        this.clearInlineTheme();
    }

    loadDetailsRestaurand(id: string): void {
        this.restaurantService.getRestaurantById(id)
            .subscribe((response) => {
                if (response) {
                    this.restaurant = response.data[0];
                    const theme = response.data[0].theme;
                    this.document.documentElement.style.setProperty('--header-bg', theme.headerBg);
                    this.document.documentElement.style.setProperty('--color-text', theme.colorText);
                    this.document.documentElement.style.setProperty('--button-bg', theme.buttonBg);
                }
            });
    }

    cancelSearch(): void {
        this.search = '';
        this.filterProducts();
    }

    loadChefTips(): void {
        this.productService.getChefTips()
            .subscribe((response) => this.listChefTips = response);
    }

    /** Monta lista de categorias únicas e define a PRIMEIRA como selecionada (se ainda não houver uma) */
    refineProducts(listData: any): void {
        const categoriesArrays = listData.map((element: any) => element?.categories ?? []);
        const refinedCategories: string[] = [];

        for (let i = 0; i < categoriesArrays.length; i++) {
            const catArr = categoriesArrays[i];
            for (let j = 0; j < catArr.length; j++) {
                const name = catArr[j]?.name;
                if (name) refinedCategories.push(name);
            }
        }

        // categorias únicas (mantendo ordem de aparição)
        this.listCategories = [...new Set(refinedCategories)];

        // Se ainda não há categoria ativa, seleciona a PRIMEIRA
        if (!this.selectedCategory && this.listCategories.length > 0) {
            this.selectedCategory = this.listCategories[0];
        }

        this.filterProducts();
    }

    loadAllProducts(zigBarId: string): void {
        this.productService.getProductByRestaurant(zigBarId)
            .subscribe((response: any) => {
                const page1 = response.data || [];
                const pageCount = response?.meta?.pagination?.pageCount || 1;

                if (pageCount > 1) {
                    this.productService.getProductByRestaurant(zigBarId, 2)
                        .subscribe((response2: any) => {
                            const page2 = response2.data || [];
                            this.listProducts = [...page1, ...page2];
                            this.refineProducts(this.listProducts);
                        });
                } else {
                    this.listProducts = page1;
                    this.refineProducts(this.listProducts);
                }
            });
    }

    /** Clique nos chips: se clicar na ativa, vira "Tudo"; senão, seleciona a clicada */
    setCategory(category: string): void {
        this.selectedCategory = (this.selectedCategory === category) ? 'Tudo' : category;
        this.filterProducts();
    }

    /** Filtra por categoria e busca */
    filterProducts(): void {
        this.filteredProducts = this.listProducts.filter(product => {
            const productCategories = (product?.categories ?? []).map((c: any) => c?.name).filter(Boolean);

            const matchesCategory = this.selectedCategory === 'Tudo'
                ? true
                : productCategories.includes(this.selectedCategory);

            const matchesSearch = this.search
                ? (product?.name || '').toLowerCase().includes(this.search.toLowerCase())
                : true;

            return matchesCategory && matchesSearch;
        });
    }

    clearInlineTheme(): void {
        this.document.documentElement.style.removeProperty('--header-bg');
        this.document.documentElement.style.removeProperty('--color-text');
        this.document.documentElement.style.removeProperty('--button-bg');
    }
}
