import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HomeModule } from './pages/home/home.module';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './pages/product/product.module';
import { RestaurantsModule } from './pages/restaurants/restaurants.module';
import { SearchModule } from './pages/search/search.module';
import { FavoritesModule } from './pages/favorites/favorites.module';
import { OptionsModule } from './pages/options/options.module';
import { ServiceWorkerModule } from '@angular/service-worker';

// loader de i18n
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    HomeModule,
    SharedModule,
    ProductModule,
    RestaurantsModule,
    SearchModule,
    FavoritesModule,
    OptionsModule,

    // SW: registra imediatamente em produção → evita precisar de F5
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    }),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
