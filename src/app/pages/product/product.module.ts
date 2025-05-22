import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductMaterialModule } from '../../shared/materials/product-material.module';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        ProductComponent,
        HeaderComponent,
        ProductInfoComponent,
        RestaurantCardComponent
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        ProductMaterialModule,
        SharedModule,
        TranslateModule
    ]
})
export class ProductModule { }
