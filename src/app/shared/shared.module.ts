import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UnitLocationBottomSheetComponent } from './components/unit-location-bottom-sheet/unit-location-bottom-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list'
import { TranslateModule } from '@ngx-translate/core';
import { ProductCardComponent } from './components/product-card/product-card.component';


@NgModule({
    declarations: [
        UnitLocationBottomSheetComponent,
        ProductCardComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatBottomSheetModule,
        MatListModule,
        TranslateModule
    ],
    exports: [
        UnitLocationBottomSheetComponent,
        ProductCardComponent
    ]
})
export class SharedModule { }
