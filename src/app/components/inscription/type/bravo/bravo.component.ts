import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bravo',
  templateUrl: './bravo.component.html',
  styleUrls: ['./../../inscription.component.css', './bravo.component.css']
})
export class BravoComponent implements OnInit {

  type: string;

  constructor(private route: ActivatedRoute) { 
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
    });
  }

  ngOnInit() {
  }

}
