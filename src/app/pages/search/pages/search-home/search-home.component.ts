import { Component, OnInit } from '@angular/core';
import { SearchDataService } from '../../services/search-data.service';
import { ProductService } from '../../../../shared/services/product/product.service';
import { RestaurantService } from '../../../../shared/services/restaurant/restaurant.service';

@Component({
    selector: 'app-search-home',
    standalone: false,
    templateUrl: './search-home.component.html',
    styleUrl: './search-home.component.css'
})
export class SearchHomeComponent implements OnInit {

    search: string = ''
    selectedType: string = 'pratos'

    listCategories: any[] = []
    types: string[] = ['pratos', 'restaurantes']
    listProducts: any[] = []
    listRestaurants: any[] = []
    filteredProducts: any[] = []
    filteredRestaurants: any[] = []

    constructor(
        private searchDataService: SearchDataService,
        private productService: ProductService,
        private restaurantService: RestaurantService
    ) {}

    ngOnInit(): void {
        this.loadCategories()
        //this.loadAllProducts()
        //this.loadAllRestaurants()
    }

    loadCategories(): void {
        this.searchDataService.getCategories()
            .subscribe((response) => {
                //const principalCategoriesArr = response.data.filter((el:any) => el.theme.principal)
                //const ordinaryCategoriesArr = response.data.filter((el:any) => el.theme.principal === undefined)
                //console.log(principalCategoriesArr, ordinaryCategoriesArr)
                this.listCategories = response.data.sort((a:any, b:any) => {
                    // Acessa o valor de 'order' de cada elemento. 
                    // O '?' (optional chaining) evita erros se 'theme' não existir.
                    const orderA = a.theme?.order;
                    const orderB = b.theme?.order;

                    // Verifica se os elementos possuem a propriedade 'order'
                    const hasOrderA = orderA !== undefined && orderA !== null;
                    const hasOrderB = orderB !== undefined && orderB !== null;

                    if (hasOrderA && hasOrderB) {
                        // Se ambos têm 'order', ordena por seus valores numéricos
                        return orderA - orderB;
                    } else if (hasOrderA) {
                        // Se apenas 'a' tem 'order', 'a' vem primeiro
                        return -1;
                    } else if (hasOrderB) {
                        // Se apenas 'b' tem 'order', 'b' vem primeiro (e 'a' vai para o fim)
                        return 1;
                    } else {
                        // Se nenhum tem 'order', mantém a ordem original entre eles
                        return 0;
                    }
                });
            //this.listCategories = [...principalCategoriesArr, ...ordinaryCategoriesArr]
        })
    }

    loadAllProducts(): void {
        this.productService.getProductByRestaurant()
            .subscribe((response) => {
                this.listProducts = response
                this.filteredProducts = response
            })
    }

    loadAllRestaurants(): void {
        this.restaurantService.getAllRestaurants()
            .subscribe((response) => {
                this.listRestaurants = response
                this.filteredRestaurants = response
            })
    }

    cancelSearch(): void {
        this.search = ''
        this.filteredProducts = [...this.listProducts]
        this.filteredRestaurants = [...this.listRestaurants]
    }

    onSearch(): void {
        if(this.search.length > 3) {
            const term = this.search.toLowerCase().trim() || ''

            this.searchDataService.getProductsSearch(term)
                .subscribe((response) => {
                    this.filteredProducts = response.data
                    //this.filteredProducts = response
            })
        }
        /*
        this.filteredProducts = this.listProducts
            .filter(product => product.name.toLowerCase().includes(term))

        this.filteredRestaurants = this.listRestaurants
            .filter(restaurant => restaurant.name.toLowerCase().includes(term))
            */
    }

    setType(type: string): void {
        this.selectedType = type
        this.onSearch()
    }

    getCount(type: string): number {
        return type === 'pratos' ? this.filteredProducts.length : this.filteredRestaurants.length
    }
}
