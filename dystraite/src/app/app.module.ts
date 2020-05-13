import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

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
import { ConnexionComponent } from './components/profil/connexion/connexion.component';
import { InscriptionComponent } from './components/profil/connexion/inscription/inscription.component';
import { ChoixComponent } from './components/profil/connexion/inscription/choix/choix.component';
import { StatsComponent } from './components/profil/stats/stats.component';
import { ProgrammeComponent } from './components/profil/programme/programme.component';
import { EditComponent } from './components/profil/edit/edit.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';

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
    ChoixComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClickOutsideModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
