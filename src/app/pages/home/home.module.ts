import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { register } from 'swiper/element/bundle';
import { BannerCarouselComponent } from './components/banner-carousel/banner-carousel.component';
import { SharedModule } from '../../shared/shared.module';
import { MenuItemSectionComponent } from './components/menu-item-section/menu-item-section.component';
import { TranslateModule } from '@ngx-translate/core';

register()

@NgModule({
    declarations: [
        HomeComponent,
        BannerCarouselComponent,
        MenuItemSectionComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        TranslateModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
