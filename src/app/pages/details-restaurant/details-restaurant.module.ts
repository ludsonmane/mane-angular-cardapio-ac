import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRestaurantRoutingModule } from './details-restaurant-routing.module';
import { DetailsRestaurantComponent } from './details-restaurant.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../../shared/shared.module';
import { DetailsRestaurantMaterialModule } from '../../shared/materials/details-restaurant-material.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [
        DetailsRestaurantComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        DetailsRestaurantRoutingModule,
        SharedModule,
        DetailsRestaurantMaterialModule,
        TranslateModule
    ]
})
export class DetailsRestaurantModule { }
