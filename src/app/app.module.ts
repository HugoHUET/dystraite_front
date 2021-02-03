import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActualiteComponent } from './components/actualite/actualite.component';
import { JeuxComponent } from './components/jeux/jeux.component';
import { CoursComponent } from './components/cours/cours.component';
import { BibliothequeComponent } from './components/bibliotheque/bibliotheque.component';
import { ConseilComponent } from './components/conseil/conseil.component';
import { ProfilComponent } from './components/profil/profil.component';
import { OrthophonisteComponent } from './components/orthophoniste/orthophoniste.component';
import { ArticleComponent } from './components/bibliotheque/article/article.component';
import { LeconComponent } from './components/cours/lecon/lecon.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { StatsComponent } from './components/profil/stats/stats.component';
import { ProgrammeComponent } from './components/profil/programme/programme.component';
import { EditComponent } from './components/profil/edit/edit.component';
import { TypeComponent } from './components/inscription/type/type.component';
import { VerifMailComponent } from './components/inscription/type/verif-mail/verif-mail.component';
import { FinalisationComponent } from './components/inscription/type/finalisation/finalisation.component';
import { BravoComponent } from './components/inscription/type/bravo/bravo.component';
import { JwtHelperService, JwtInterceptor, JwtModule } from "@auth0/angular-jwt";
import { environment, tokenKey } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './services/http/HttpErrorInterceptor';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { IonicModule } from '@ionic/angular';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,
    ActualiteComponent,
    JeuxComponent,
    CoursComponent,
    BibliothequeComponent,
    ConseilComponent,
    ProfilComponent,
    OrthophonisteComponent,
    ArticleComponent,
    LeconComponent,
    ConnexionComponent,
    InscriptionComponent,
    StatsComponent,
    TypeComponent,
    VerifMailComponent,
    FinalisationComponent,
    BravoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClickOutsideModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem(tokenKey);
        },
        //allowedDomains: [environment.apiUrl],
        //disallowedRoutes: [environment.apiUrl, environment.apiUrl + '/login', environment.apiUrl + '/register'],
      },
    }),
    IonicModule.forRoot()
  ],
  providers: [
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
