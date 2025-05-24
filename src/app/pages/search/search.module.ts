import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SearchMaterialModule } from '../../shared/materials/search-material.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [
        SearchComponent
    ],
    imports: [
        CommonModule,
        SearchRoutingModule,
        SearchMaterialModule,
        TranslateModule
    ]
})
export class SearchModule { }
