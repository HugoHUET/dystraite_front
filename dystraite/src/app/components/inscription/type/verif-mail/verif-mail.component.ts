import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verif-mail',
  templateUrl: './verif-mail.component.html',
  styleUrls: ['./../../inscription.component.css', './verif-mail.component.css']
})
export class VerifMailComponent implements OnInit {
  
  type : string;
  
  constructor(private route: ActivatedRoute) { 
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
    });
  }

  ngOnInit() {
  }

}
