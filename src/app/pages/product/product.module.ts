import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductMaterialModule } from '../../shared/materials/product-material.module';

@NgModule({
    declarations: [
        ProductComponent,
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        ProductMaterialModule,
    ]
})
export class ProductModule { }
