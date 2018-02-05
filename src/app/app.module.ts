import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ThemePanelComponent } from './layout/theme-panel/theme-panel.component';
import { AppRoutingModule } from './app-routing.module';
import { FournisseurModule } from './fournisseur/fournisseur.module';
import { HttpModule } from '@angular/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategorieModule } from './categorie/categorie.module';
import { ProductModule } from './product/product.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  
  imports: [
    AppRoutingModule,
    Ng4LoadingSpinnerModule,
    HttpClientModule,
    HttpModule,
    FournisseurModule,
    CategorieModule,
    ProductModule,
    DashboardModule,
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ThemePanelComponent

    
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent],
  schemas: [
    
]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
