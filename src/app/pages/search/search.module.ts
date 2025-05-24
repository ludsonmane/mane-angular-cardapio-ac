import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchHomeComponent } from './pages/search-home/search-home.component';
import { SearchMaterialModule } from '../../shared/materials/search-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { CategoryHeaderComponent } from './components/category-header/category-header.component';


@NgModule({
    declarations: [
        SearchHomeComponent,
        CategoryCardComponent,
        CategoryProductsComponent,
        CategoryHeaderComponent
    ],
    imports: [
        CommonModule,
        SearchRoutingModule,
        SearchMaterialModule,
        TranslateModule,
        SharedModule
    ]
})
export class SearchModule { }
