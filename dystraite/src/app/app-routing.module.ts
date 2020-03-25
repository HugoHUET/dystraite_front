import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActualiteComponent } from 'src/app/components/actualite/actualite.component';
import { JeuxComponent } from 'src/app/components/jeux/jeux.component';
import { CoursComponent } from 'src/app/components/cours/cours.component';
import { BibliothequeComponent } from 'src/app/components/bibliotheque/bibliotheque.component';
import { ConseilComponent } from 'src/app/components/conseil/conseil.component';
import { ProfilComponent } from './components/profil/profil.component';
import { OrthophonisteComponent } from 'src/app/components/orthophoniste/orthophoniste.component';
import { ArticleComponent } from './components/bibliotheque/article/article.component';


const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: ActualiteComponent },
  { path: 'jeux', component: JeuxComponent },
  { path: 'cours', component: CoursComponent },
  { path: 'bibliotheque', component: BibliothequeComponent },
  { path: 'bibliotheque/article', component: ArticleComponent },
  { path: 'conseil', component: ConseilComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'ortophoniste', component: OrthophonisteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
