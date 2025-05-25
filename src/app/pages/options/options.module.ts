import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizationComponent } from './components/localization/localization.component';
import { optionsMaterialModule } from '../../shared/materials/options-material.module';
import { LanguageBottomSheetComponent } from './components/language-bottom-sheet/language-bottom-sheet.component';


@NgModule({
    declarations: [
        OptionsComponent,
        LocalizationComponent,
        LanguageBottomSheetComponent
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
