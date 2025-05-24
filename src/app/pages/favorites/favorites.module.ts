import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FavoritesMaterialModule } from '../../shared/materials/favorites-material.module';


@NgModule({
    declarations: [
        FavoritesComponent
    ],
    imports: [
        CommonModule,
        FavoritesRoutingModule,
        SharedModule,
        TranslateModule,
        FavoritesMaterialModule
    ]
})
export class FavoritesModule { }
