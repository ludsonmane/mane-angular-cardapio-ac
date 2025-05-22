import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UnitLocationBottomSheetComponent } from './components/unit-location-bottom-sheet/unit-location-bottom-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list'
import { TranslateModule } from '@ngx-translate/core';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HeaderActionsComponent } from './components/header-actions/header-actions.component';
import { ProductCardVerticalComponent } from './components/product-card-vertical/product-card-vertical.component';


@NgModule({
    declarations: [
        UnitLocationBottomSheetComponent,
        ProductCardComponent,
        HeaderActionsComponent,
        ProductCardVerticalComponent
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
        ProductCardComponent,
        HeaderActionsComponent,
        ProductCardVerticalComponent
    ]
})
export class SharedModule { }
