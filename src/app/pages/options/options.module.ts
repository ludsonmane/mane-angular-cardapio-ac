import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizationComponent } from './components/localization/localization.component';
import { optionsMaterialModule } from '../../shared/materials/options-material.module';


@NgModule({
    declarations: [
        OptionsComponent,
        LocalizationComponent
    ],
    imports: [
        CommonModule,
        OptionsRoutingModule,
        optionsMaterialModule,
        SharedModule,
        TranslateModule,
    ]
})
export class OptionsModule { }
