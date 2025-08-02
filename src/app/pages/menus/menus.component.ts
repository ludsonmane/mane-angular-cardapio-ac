import { ActivatedRoute } from '@angular/router';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { SearchDataService } from '../search/services/search-data.service';
import { ProductService } from '../../shared/services/product/product.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-menus',
  standalone: false,
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css'
})
export class MenusComponent {
  menus: any
  imageUrl: string = '/img/background-location.png'
  headerConf = {
    showMenu: true,
    menuTitle: 'Menus Especiais'
  }
  description = true

  constructor(
      private activatedRoute: ActivatedRoute,
      private productService: ProductService
  ) {}

  ngOnInit(): void {
            this.activatedRoute.params.subscribe(params => {
            const id = params['id']
            if (id) {
              this.productService.getMenus(id)
                .subscribe((response: any) => {
                    if (response) {
                      console.log(response)
                      const p = response.data[0].products.filter((el:any) => {
                        if (el.isActive == true) return el 
                      })
                      this.menus = {
                        name: response.data[0].name,
                        days: response.data[0].days,
                        documentId: response.data[0].documentId,
                        endDate: response.data[0].endDate,
                        id: response.data[0].id,
                        startDate: response.data[0].startDate,
                        products: p
                      }
                      console.log(this.menus)
                    }
                })
            }
        })

  }

}
