import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type',
  templateUrl: './token.component.html',
  styleUrls: ['./../changePassword.component.css', './token.component.css']
})
export class TokenComponent implements OnInit {

  token: string;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      if (params.get('token')) {
        this.token = params.get('token');
      }
    });
  }

  ngOnInit() {
  }

}
