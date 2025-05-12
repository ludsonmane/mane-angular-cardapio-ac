import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationSelectionRoutingModule } from './location-selection-routing.module';
import { LocationSelectionComponent } from './location-selection.component';


@NgModule({
    declarations: [
        LocationSelectionComponent
    ],
    imports: [
        CommonModule,
        LocationSelectionRoutingModule
    ]
})
export class LocationSelectionModule { }
