import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActualiteComponent } from 'src/app/components/actualite/actualite.component';
import { JeuxComponent } from 'src/app/components/jeux/jeux.component';
import { CoursComponent } from 'src/app/components/cours/cours.component';
import { LeconComponent } from 'src/app/components/cours/lecon/lecon.component';
import { BibliothequeComponent } from 'src/app/components/bibliotheque/bibliotheque.component';
import { ConseilComponent } from 'src/app/components/conseil/conseil.component';
import { ProfilComponent } from './components/profil/profil.component';
import { OrthophonisteComponent } from 'src/app/components/orthophoniste/orthophoniste.component';
import { ArticleComponent } from './components/bibliotheque/article/article.component';
import { StatsComponent } from './components/profil/stats/stats.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { TypeComponent } from './components/inscription/type/type.component';
import { VerifMailComponent } from './components/inscription/type/verif-mail/verif-mail.component';
import { FinalisationComponent } from './components/inscription/type/finalisation/finalisation.component';
import { BravoComponent } from './components/inscription/type/bravo/bravo.component';
import { WordblitzComponent } from './components/jeux/wordblitz/wordblitz.component';


const routes: Routes = [
  { path: '404', redirectTo: 'accueil' },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: ActualiteComponent },
  { path: 'jeux', component: JeuxComponent },
  { path: 'jeux/maximots', component: WordblitzComponent },
  { path: 'cours', component: CoursComponent },
  { path: 'cours/lecon/:id', component: LeconComponent },
  { path: 'bibliotheque', component: BibliothequeComponent },
  { path: 'bibliotheque/article/:id', component: ArticleComponent },
  { path: 'bibliotheque/article', component: ArticleComponent },
  { path: 'conseil', component: ConseilComponent },
  { path: 'ortophoniste', component: OrthophonisteComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'inscription/:type', component: TypeComponent },
  { path: 'inscription/:type/verif-mail', component: VerifMailComponent },
  { path: 'inscription/:type/finalisation', component: FinalisationComponent },
  { path: 'inscription/:type/bravo', component: BravoComponent },
  { path: 'ortophoniste', component: OrthophonisteComponent },
  { path: 'profil/stats', component: StatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
