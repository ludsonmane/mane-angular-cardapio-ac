import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductMaterialModule } from '../../shared/materials/product-material.module';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [
        ProductComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        ProductMaterialModule,
        SharedModule
    ]
})
export class ProductModule { }
