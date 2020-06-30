import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours/cours.service';
import { Cours } from 'src/app/models/cours/cours.model';

@Component({
  selector: 'app-lecon',
  templateUrl: './lecon.component.html',
  styleUrls: ['./lecon.component.css']
})
export class LeconComponent implements OnInit {

  id: String;
  cours: Cours;

  constructor(private route: ActivatedRoute, private coursService: CoursService) { 
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

    });
    this.coursService.getCours(this.id).subscribe(res => {
      this.cours = res;
    });
  }

  ngOnInit() {
  }

}
