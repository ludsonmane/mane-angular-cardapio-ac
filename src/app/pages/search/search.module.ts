import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SearchMaterialModule } from '../../shared/materials/search-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        SearchComponent,
        CategoryCardComponent
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
