import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { register } from 'swiper/element/bundle';
import { BannerCarouselComponent } from './components/banner-carousel/banner-carousel.component';

register()

@NgModule({
    declarations: [
        HomeComponent,
        BannerCarouselComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
