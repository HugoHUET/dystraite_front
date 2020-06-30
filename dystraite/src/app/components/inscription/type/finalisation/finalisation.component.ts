import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-finalisation',
  templateUrl: './finalisation.component.html',
  styleUrls: ['./../../inscription.component.css', './finalisation.component.css']
})
export class FinalisationComponent implements OnInit {
  
  type : string;

  constructor(private route: ActivatedRoute) { 
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
    });
  }

  ngOnInit() {
  }

}
