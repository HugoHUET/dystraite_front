import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivreService } from 'src/app/services/livre/livre.service';
import { Livre } from 'src/app/models/livre/livre.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  id: String;
  livre: Livre;

  constructor(private route: ActivatedRoute, private coursService: LivreService) { 
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

    });
    this.coursService.getLivre(this.id).subscribe(res => {
      this.livre = res;
    });
  }

  ngOnInit() {
  }

}
