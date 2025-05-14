import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationSelectionRoutingModule } from './location-selection-routing.module';
import { LocationSelectionComponent } from './location-selection.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [
        LocationSelectionComponent
    ],
    imports: [
        CommonModule,
        LocationSelectionRoutingModule,
        TranslateModule,
    ]
})
export class LocationSelectionModule { }
