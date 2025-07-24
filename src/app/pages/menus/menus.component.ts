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
                      this.menus = response.data[0]
                    }
                })
            }
        })

  }

}
