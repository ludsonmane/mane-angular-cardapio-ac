import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';

// Função para carregar os arquivos JSON
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'i18n/', '.json')
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        provideHttpClient()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
